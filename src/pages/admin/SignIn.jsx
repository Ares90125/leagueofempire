import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import jwt_decode from 'jwt-decode';

import { setCredential } from "@store/slices/auth.slice";
import { loginAdmin } from "@services/admin/auth.service";
import "@assets/styles/auth.module.css";

const SignIn = () => {
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

    const handleLogin = async () => {
        try {
            if(!validate())
                return;
            const response = await loginAdmin({ email, password });
            const decoded = jwt_decode(response.token);
            enqueueSnackbar("Logged in Successfully!", { variant: 'success' });

            localStorage.setItem("jwtToken", response.token);
            decoded.token = response.token;
            dispatch(setCredential(decoded));
            navigate("/admin");
        } catch (err) {
            console.log(err);
            if (err?.status == 406)
                enqueueSnackbar(err.data.message, { variant: 'error' });
            else if (err?.status == 500)
                enqueueSnackbar("Internal Server Error!", { variant: 'error' });
            else enqueueSnackbar("Error occured!", { variant: 'error' });
        }
    }

    return (
        <section className="d-flex flex-column mx-auto p-mx-width align-items-center py-5">
            <div className="auth-form d-flex flex-column align-items-center">
                <input className="cus-input-outline-primary w-100 mt-4" placeholder="Email"
                        value={ email } onChange={ e => setEmail(e.target.value) } />
                <input className="cus-input-outline-primary w-100 mt-4" type="password" placeholder="Password"
                        value={ password } onChange={ e => setPassword(e.target.value) } />
                <button className="btn btn-warning text-white btn-lg cus-btn-warning mt-3 px-5" onClick={ handleLogin }>Sign In</button>
            </div>
        </section>
    );
}

export default SignIn;