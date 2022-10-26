import { useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useSnackbar } from 'notistack';

import { Web3Context } from "@store/providers/Web3Provider";
import { updatePassword } from "@services/auth.service";
import { pubKeyShortAddress } from "@utils/format";
import "@assets/styles/auth.module.css";

const UpdatePassword = () => {
    const { connectWallet } = useContext(Web3Context);
    const [searchParams] = useSearchParams();
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [repass, setRepass] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    const validate = () => {
        if (!account) {
            enqueueSnackbar("Please connect to your wallet!", { variant: 'error' });

            return false;
        }
        else if (!password) {
            enqueueSnackbar("Please type your password!", { variant: 'error' });

            return false;
        } else if (password !== repass) {
            enqueueSnackbar("Mismatched password!", { variant: 'error' });

            return false;
        }        

        return true;
    }

    const handleConnectWallet = async () => {
        setAccount(await connectWallet());
    }

    const handleUpdatePassword = async () => {
        try {
            if (!validate()) return;

            await updatePassword({ wallet_address: account, password, token: searchParams.get('token') });
            setPassword('');
            setRepass('');
            enqueueSnackbar("Updated password successfully", { variant: 'success' });
        } catch (err) {
            setAccount('');
            setPassword('');
            setRepass('');
            
            if (err?.status == 404)
                enqueueSnackbar("Invalid token!", { variant: 'error' });
            else if (err?.status == 406)
                enqueueSnackbar("Please make sure you are connected to registered wallet!", { variant: 'error' });
            else if (err?.status == 500)
                enqueueSnackbar("Internal Server Error!", { variant: 'error' });
            else enqueueSnackbar("Error occured!", { variant: 'error' });
        }
    }

    return (
        <section className="d-flex flex-column mx-auto p-mx-width align-items-center py-5">
            <div className="auth-form d-flex flex-column align-items-center">
                <div className="mt-4" style={{ width: '100%', height: '20px', borderBottom: '1px solid white', textAlign: 'center' }}>
                    <span style={{ fontSize: '20px', backgroundColor: 'rgb(28,28,30)', padding: '0 10px' }}>
                        Update Password
                    </span>
                </div>
                <button className="btn btn-warning text-white btn-lg cus-btn-warning w-100 mt-4" onClick={ handleConnectWallet }>
                    {
                        account
                        ?
                            pubKeyShortAddress(account, 8)
                        :
                            <>
                                <AccountBalanceWalletIcon /> Register Wallet
                            </>
                    }
                </button>
                <input className="cus-input-outline-primary w-100 mt-4" type="password" placeholder="Password"
                        value={ password } onChange={ e => setPassword(e.target.value) } />
                <input className="cus-input-outline-primary w-100 mt-4" type="password" placeholder="Confirm Password"
                        value={ repass } onChange={ e => setRepass(e.target.value) } />
                <button className="btn btn-warning text-white btn-lg cus-btn-warning mt-3 px-5" onClick={ handleUpdatePassword }>Update Password</button>
            </div>
        </section>
    );
}

export default UpdatePassword;