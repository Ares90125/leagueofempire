import Web3 from 'web3';

const BSC_MAINNET_PARAMS = {
    chainId: '0x38',
    chainName: 'BNB Smart Chain Mainnet',
    nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com']
};

export default () => ({
    connectMetaMask: () => new Promise(async (resolve, reject) => {
        const { ethereum } = window;
        if (typeof ethereum !== 'undefined') {
            const currentChainId = await ethereum.request({ method: 'eth_chainId' });
            if (currentChainId !== BSC_MAINNET_PARAMS.chainId) {
                await ethereum.request({ method: 'wallet_addEthereumChain', params: [BSC_MAINNET_PARAMS] });
            }
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            resolve({ account: accounts[0] });
        } else {
            reject(new Error('Please Install Metamask!'));
        }
    })
});