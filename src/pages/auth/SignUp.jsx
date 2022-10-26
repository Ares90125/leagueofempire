import { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useSnackbar } from 'notistack';
import jwt_decode from 'jwt-decode';

import { Web3Context } from "@store/providers/Web3Provider";
import { registerUser } from "@services/auth.service";
import { pubKeyShortAddress } from "@utils/format";
import { setCredential } from "@store/slices/auth.slice";

const SignUp = () => {
    const { connectWallet } = useContext(Web3Context);
    const [activeStep, setActiveStep] = useState(0);
    const [account, setAccount] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repass, setRepass] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const handleConnectWallet = async () => {
        setAccount(await connectWallet());
    }

    const validate = () => {
        if (!account) {
            enqueueSnackbar("Please register your wallet address first!", { variant: 'error' });

            return false;
        }
        else if (!email) {
            enqueueSnackbar("Please type your email!", { variant: 'error' });

            return false;
        } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) {
            enqueueSnackbar("Invalid email!", { variant: 'error' });

            return false;
        } else if (!username) {
            enqueueSnackbar("Please type your username!", { variant: 'error' });

            return false;
        } else if (!password) {
            enqueueSnackbar("Please type your password!", { variant: 'error' });

            return false;
        } else if (password !== repass) {
            enqueueSnackbar("Mismatched password!", { variant: 'error' });

            return false;
        }
        
        return true;
    }

    const handleToNextStep = () => {
        setActiveStep(activeStep => activeStep + 1);
    }

    const handleSignUp = async () => {
        if (!validate()) return;

        try {
            const response = await registerUser({ email, username, password, wallet_address: account });
            if (response.success)
                enqueueSnackbar("Registered! Please confirm your email.", { variant: 'warning' });
            else throw new Error('error');
        } catch (err) {
            if (err?.status == 409)
                enqueueSnackbar("Registered User!", { variant: 'error' });
            else if (err?.status == 500)
                enqueueSnackbar("Internal Server Error!", { variant: 'error' });
            else enqueueSnackbar("Error occured!", { variant: 'error' });
        }
    }

    useEffect(() => {
        setActiveStep(0);
        setAccount('');
        setEmail('');
        setUsername('');
        setPassword('');
        setRepass('');
    }, []);

    return (
        <section className="d-flex flex-column mx-auto p-mx-width align-items-center py-5">
            <div className="auth-form d-flex flex-column align-items-center">
                {
                    activeStep == 0 &&
                        <>
                            <div className="mb-4" style={{ width: '100%', height: '20px', borderBottom: '1px solid white', textAlign: 'left' }}>
                                <span style={{ fontSize: '20px', backgroundColor: 'rgb(28,28,30)', padding: '0 10px' }}>
                                    Step 1: Connect Wallet
                                </span>
                            </div>
                            <button className="btn btn-warning text-white btn-lg cus-btn-warning w-100" onClick={ handleConnectWallet }>
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
                            <button className="btn btn-warning text-white btn-lg cus-btn-warning w-50 mt-4" onClick={ handleToNextStep } style={{ backgroundColor: 'transparent' }}>
                                Next Step
                            </button>
                        </>
                }
                {
                    activeStep == 1 &&
                        <>
                            <div className="mb-4" style={{ width: '100%', height: '20px', borderBottom: '1px solid white', textAlign: 'left' }}>
                                <span style={{ fontSize: '20px', backgroundColor: 'rgb(28,28,30)', padding: '0 10px' }}>
                                    Step 2: Email, username, password
                                </span>
                            </div>
                            <input className="cus-input-outline-primary w-100" placeholder="Email"
                                    value={ email } onChange={ e => setEmail(e.target.value) } />
                            <input className="cus-input-outline-primary w-100 mt-4" placeholder="Username"
                                    value={ username } onChange={ e => setUsername(e.target.value) } />
                            <input className="cus-input-outline-primary w-100 mt-4" type="password" placeholder="Password"
                                    value={ password } onChange={ e => setPassword(e.target.value) } />
                            <input className="cus-input-outline-primary w-100 mt-4" type="password" placeholder="Confirm Password"
                                    value={ repass } onChange={ e => setRepass(e.target.value) } />
                            <button className="btn btn-warning text-white btn-lg cus-btn-warning mt-3 px-5" onClick={ handleSignUp }>Sign Up</button>
                        </>
                }
            </div>
        </section>
    );
}

export default SignUp;