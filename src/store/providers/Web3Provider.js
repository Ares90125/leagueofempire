import { createContext, useEffect, useState, useRef } from 'react';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import TrustWalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import Web3Modal from 'web3modal';
import Web3 from 'web3';
import { Stack, Typography, Backdrop, IconButton } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CloseIcon from '@mui/icons-material/Close';
import { SnackbarProvider } from 'notistack';

import NFTMarketplace from "@abi/contracts/nftmarketplace/NFTMarketplace.sol/NFTMarketplace.json";
import LOEToken from "@abi/contracts/token/LOEToken.sol/LOEToken.json";
import { marketplaceAddress, loeTokenAddress } from "@config/contracts";
import TrustWalletLogo from "@assets/images/logos/trust_wallet.png";
import LOETokenLogo from "@assets/images/logos/LOE.png";
import { CURRENT_NETWORK } from "@config/networks";

const providerOptions = {
    binancechainwallet: {
        package: true,
    },
    walletlink: {
        package: CoinbaseWalletSDK,
        options: {
            infuraId: process.env.REACT_APP_INFURA_ID
        }
    },
    "custom-trustwallet": {
        display: {
            logo: TrustWalletLogo,
            name: "Trust Wallet",
            description: "Scan with Trust Wallet to connect"
        },
        package: TrustWalletConnect,
        options: {
            infuraId: process.env.REACT_APP_INFURA_ID,
        },
        connector: async (ProviderPackage, options) => {
            const connector = new ProviderPackage({
                bridge: "https://bridge.walletconnect.org",
                qrcodeModal: QRCodeModal
            });

            if (!connector.connected)
                connector.createSession();

            return connector;
        }
    }
};

const defaultProvider = new Web3.providers.HttpProvider(CURRENT_NETWORK["rpcUrls"][0]);
const defaultWeb3 = new Web3(defaultProvider);

const contextDefaultValues = {
    account: '',
    network: CURRENT_NETWORK.chainId,
    provider: null,
    defaultProvider: new Web3.providers.HttpProvider(CURRENT_NETWORK["rpcUrls"][0]),
    connectWallet: () => {},
    marketplaceContract: null,
    loeTokenContract: null,
    defaultMarketplaceContract: new defaultWeb3.eth.Contract(NFTMarketplace.abi, marketplaceAddress),
    isReady: false,
    web3: null
};

const web3Modal = new Web3Modal({
    providerOptions,
    disableInjectedProvider: false
});

export const Web3Context = createContext(contextDefaultValues);

export default function Web3Provider({ children }) {
    const [account, setAccount] = useState(contextDefaultValues.account);
    const [network, setNetwork] = useState(contextDefaultValues.network);
    const [provider, setProvider] = useState(contextDefaultValues.provider);
    const [marketplaceContract, setMarketplaceContract] = useState(contextDefaultValues.marketplaceContract);
    const [loeTokenContract, setLOETokenContract] = useState(contextDefaultValues.loeTokenContract);
    const [isReady, setIsReady] = useState(contextDefaultValues.isReady);
    const [web3, setWeb3] = useState(contextDefaultValues.web3);
    const notistackRef = useRef();

    function initializeWeb3 () {
        const currentWeb3 = new Web3(contextDefaultValues.defaultProvider);
        setAccount(contextDefaultValues.account);
        setNetwork(contextDefaultValues.network);
        setProvider(contextDefaultValues.provider);
        setIsReady(contextDefaultValues.isReady);
        setWeb3(currentWeb3);
        setContracts(currentWeb3);
    }

    async function connectWallet () {
        try {
            const connection = await web3Modal.connect();
            const currentWeb3 = new Web3(connection);
                
            await connection.request({
                method: 'wallet_requestPermissions',
                params: [{ eth_accounts: {} }],
            });

            const accounts = await currentWeb3.eth.getAccounts();
            const currentChainId = await currentWeb3.eth.getChainId();

            accounts && setAccount(accounts[0]);
            setNetwork(currentChainId);
            setProvider(connection);
            setWeb3(currentWeb3);
            if (currentChainId != CURRENT_NETWORK.chainId)
                setContracts(new Web3(contextDefaultValues.defaultProvider));
            else setContracts(currentWeb3);
            setIsReady(true);

            if (connection) {
                connection.on("accountsChanged", async (accounts) => {
                    setAccount(accounts[0]);
                    await addLOETokenToWallet();
                });

                connection.on("chainChanged", (chainId) => {
                    const currentWeb3 = new Web3(connection);
                    setProvider(connection);
                    setWeb3(currentWeb3);
                    if (chainId != CURRENT_NETWORK.chainId)
                        setContracts(new Web3(contextDefaultValues.defaultProvider));
                    else setContracts(currentWeb3);
                    setNetwork(chainId);
                });
            }

            return accounts[0];
        } catch (err) {
            console.log(err);

            return null;
        }
    }

    function disconnectWallet() {
        web3Modal.clearCachedProvider();
        initializeWeb3();
    }

    async function addLOETokenToWallet() {
        if (!isReady)
            return false;
        try {
            const TokenAdded = JSON.parse(localStorage.getItem("TokenAdded")) || {};
            if (!TokenAdded[account.toLowerCase()]) {
                const isAdded = await provider.request({
                    method: 'wallet_watchAsset',
                    params: {
                        type: 'ERC20',
                        options: {
                            address: loeTokenAddress,
                            symbol: 'LOE',
                            decimals: await loeTokenContract.methods.decimals().call(),
                            image: LOETokenLogo
                        }
                    }
                });
                TokenAdded[account.toLowerCase()] = isAdded ? true : false;
                localStorage.setItem("TokenAdded", JSON.stringify(TokenAdded));

                return true;
            }

        } catch (error) {
            return false;
        }
    }

    function setContracts(currentWeb3) {
        setMarketplaceContract(new currentWeb3.eth.Contract(NFTMarketplace.abi, marketplaceAddress));
        setLOETokenContract(new currentWeb3.eth.Contract(LOEToken.abi, loeTokenAddress));
    }

    function useEffectIf(condition, fn) {
        useEffect(() => condition && fn(), [condition]);
    }

    useEffectIf(isReady, async () => {
        await addLOETokenToWallet();
    });

    useEffectIf(account, async () => {
        await addLOETokenToWallet();
    });

    return (
        <Web3Context.Provider value={{
            account,
            network,
            provider,
            marketplaceContract,
            loeTokenContract,
            defaultMarketplaceContract: contextDefaultValues.defaultMarketplaceContract,
            isReady,
            web3,
            connectWallet,
            disconnectWallet,
            addLOETokenToWallet
        }}>
            <SnackbarProvider ref={ notistackRef } maxSnack={3}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                transitionDuration={{ enter: 225, exit: 197 }}
                                action={ key  => <IconButton onClick={ () => notistackRef.current.closeSnackbar(key) }><CloseIcon sx={{ color: '#fff' }} /></IconButton> }>
                {
                    network && network != CURRENT_NETWORK.chainId &&
                        <Backdrop sx={{ color: '#fff', zIndex: 9999 }} open={ true }>
                            <Stack sx={{ alignItems: 'center' }}>
                                <WarningAmberIcon color="warning" fontSize="large" />
                                <Typography variant="h5" sx={{ marginTop: 1 }}>Please switch to BSC Network!</Typography>
                            </Stack>
                        </Backdrop>
                }
                { children }
            </SnackbarProvider>
        </Web3Context.Provider>
    );
}