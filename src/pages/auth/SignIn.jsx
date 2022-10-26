import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useSnackbar } from 'notistack';
import jwt_decode from 'jwt-decode';

import { Web3Context } from "@store/providers/Web3Provider";
import { setCredential } from "@store/slices/auth.slice";
import { loginUser, confirmEmail, airdropNFT } from "@services/auth.service";
import "@assets/styles/auth.module.css";

const SignIn = () => {
    const { connectWallet } = useContext(Web3Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validate = () => {
        if (!email) {
            enqueueSnackbar("Please type your email!", { variant: 'error' });

            return false;
        } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) {
            enqueueSnackbar("Invalid email!", { variant: 'error' });

            return false;
        } else if (!password) {
            enqueueSnackbar("Please type your password!", { variant: 'error' });

            return false;
        }
        
        return true;
    }

    const handleResendVerification = email => async () => {
        try {
            await confirmEmail({ email });
        } catch (err) {
            if (err?.status == 406)
                enqueueSnackbar(err.data.message, { variant: 'error' });
            else if (err?.status == 500)
                enqueueSnackbar("Internal Server Error!", { variant: 'error' });
            else enqueueSnackbar("Error occured!", { variant: 'error' });
        }
    }

    const handleLogin = (loginMode) => async () => {
        try {
            let wallet_address;
            if (loginMode == 'wallet')
                wallet_address = await connectWallet();
            else if(!validate())
                return;

            const response = await loginUser({ wallet_address, email, password, mode: loginMode });
            const decoded = jwt_decode(response.token);
            console.log(decoded);
            enqueueSnackbar("Logged in Successfully!", { variant: 'success' });

            if (decoded.isWhiteListed && !decoded.isAirdropped) {
                console.log("here");
                airdropNFT()
                    .then(response => {
                        enqueueSnackbar(response.message, { variant: 'success' });
                    })
                    .catch(err => {
                        if (err.message)
                            enqueueSnackbar(err.data.message, { variant: 'error' });
                        else enqueueSnackbar("Error occured!", { variant: 'error' });
                    });
            }
            localStorage.setItem("jwtToken", response.token);
            decoded.token = response.token;
            dispatch(setCredential(decoded));
            navigate("/");
        } catch (err) {
            console.log(err);
            if (err?.status == 406)
                enqueueSnackbar(err.data.message, { variant: 'error' });
            else if (err?.status == 400)
                enqueueSnackbar(<p className="mb-0">Warning, please verify your email.&nbsp;<a href="#" onClick={ handleResendVerification(err.data.email) }>Resend Email</a></p>, { variant: 'warning' });
            else if (err?.status == 500)
                enqueueSnackbar("Internal Server Error!", { variant: 'error' });
            else enqueueSnackbar("Error occured!", { variant: 'error' });
        }
    }

    return (
        <section className="d-flex flex-column mx-auto p-mx-width align-items-center py-5">
            <div className="auth-form d-flex flex-column align-items-center">
                <button className="btn btn-warning text-white btn-lg cus-btn-warning w-100" onClick={ handleLogin('wallet') }>
                    <AccountBalanceWalletIcon /> Login with Wallet
                </button>
                <div className="mt-4" style={{ width: '100%', height: '20px', borderBottom: '1px solid white', textAlign: 'center' }}>
                    <span style={{ fontSize: '20px', backgroundColor: 'rgb(28,28,30)', padding: '0 10px' }}>
                        Or
                    </span>
                </div>
                <input className="cus-input-outline-primary w-100 mt-4" placeholder="Email"
                        value={ email } onChange={ e => setEmail(e.target.value) } />
                <input className="cus-input-outline-primary w-100 mt-4" type="password" placeholder="Password"
                        value={ password } onChange={ e => setPassword(e.target.value) } />
                <button className="btn btn-warning text-white btn-lg cus-btn-warning mt-3 px-5" onClick={ handleLogin('email') }>Sign In</button>
                <h6 className="mt-2 font-">or <Link to="/register" className="">Register</Link></h6>
            </div>
        </section>
    );
}

export default SignIn;