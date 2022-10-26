import { useState } from 'react';
import { useSnackbar } from 'notistack';

import { confirmForgetPassEmail } from "@services/auth.service";
import "@assets/styles/auth.module.css";

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    const validate = () => {
        if (!email) {
            enqueueSnackbar("Please type your email!", { variant: 'error' });

            return false;
        } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) {
            enqueueSnackbar("Invalid email!", { variant: 'error' });

            return false;
        }

        return true;
    }

    const handleForgetPassword = async () => {
        try {
            if (!validate()) return;

            await confirmForgetPassEmail({ email });
            enqueueSnackbar("Sent update password request Email successfully", { variant: 'success' });
        } catch (err) {
            if (err?.status == 404)
                enqueueSnackbar("Non Registered User!", { variant: 'error' });
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
                <input className="cus-input-outline-primary w-100 mt-4" placeholder="Email"
                        value={ email } onChange={ e => setEmail(e.target.value) } />
                <button className="btn btn-warning text-white btn-lg cus-btn-warning mt-3 px-5" onClick={ handleForgetPassword }>Send Email</button>
            </div>
        </section>
    );
}

export default ForgetPassword;