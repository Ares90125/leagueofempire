import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { verifyUser } from "@services/auth.service";

const Verify = () => {
    const [searchParams] = useSearchParams();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        verifyUser({ token: searchParams.get('token') })
            .then(response => {
                if (!response.success) {
                    enqueueSnackbar("Verify failed!", { variant: 'error' });

                    return;
                }
                
                enqueueSnackbar("Verified successfully!", { variant: 'success' });
            })
            .catch(err => {
                if (err?.status == 404)
                    enqueueSnackbar("Invalid token!", { variant: 'error' });
                else if (err?.status == 500)
                    enqueueSnackbar("Internal Server Error!", { variant: 'error' });
                else enqueueSnackbar("Error occured!", { variant: 'error' });
            });
        navigate("/login");
    }, []);

    return null;
}

export default Verify;