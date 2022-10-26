import { useState, useEffect, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography, Button, Backdrop, CircularProgress, Stack, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { useSnackbar } from 'notistack';
import BigNumber from 'bignumber.js';

import { Web3Context } from "@store/providers/Web3Provider";
import { WrapperContext } from "@store/providers/Wrapper";
import LOELogo from "@assets/images/logos/LOE.png";

const StyledAmountField = styled(TextField)({
    borderColor: '#fff',
    '& input': {
        color: '#fff'
    },
    '& label': {
        fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif",
        letterSpacing: '1px'
    },
    '& fieldset': {
        borderColor: '#F38433'
    }
});

const AddStakingModal = props => {
    const { web3, isReady, loeTokenContract, account } = useContext(Web3Context);
    const { identifyConnectWallet } = useContext(WrapperContext);
    const [progress, setProgress] = useState({ open: false, message: "" });
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState(1);
    const [decimals, setDecimals] = useState(18);
    const { enqueueSnackbar } = useSnackbar();
    const { open, onClose } = props;

    const addStaking = async () => {
        let wallet = await identifyConnectWallet();
        if (!wallet)
            return;
        else if (!Number.isInteger(amount)) {
            enqueueSnackbar("Invalid amount!", { variant: 'error' });

            return;
        }

        try {
            let myBalance = new BigNumber(balance);
            let stakingBalance = new BigNumber(amount);
            stakingBalance = stakingBalance.shiftedBy(Number(await loeTokenContract.methods.decimals().call()));
            let comparedResult = myBalance.comparedTo(stakingBalance);
            if (comparedResult == 1 || comparedResult == 0) {
                setProgress({ open: true, message: "Waiting for staking of token..." });
                const transaction = await loeTokenContract.methods.stake(stakingBalance.toString()).send({ from: account });
                setProgress({ open: false });
                enqueueSnackbar("Successfully staked your tokens!", { variant: 'success' });
            } else {
                enqueueSnackbar("Cannot stake more than you own!", { variant: 'error' });

                return;
            }
        } catch (err) {
            console.log("RPC function execution error: ", err);
            if (err?.code === 4001) // User denied transaction signature.
                enqueueSnackbar("Rejected approve!", { variant: 'error' });
            else enqueueSnackbar("Error occurred!", { variant: 'error' });
            setProgress({ open: false });
        }
    }

    const setAmountValue = e => {
        setAmount(Number(e.target.value) || 1);
    }

    useEffect(() => {
        if (open) {
            setAmount(1);
            setProgress({ open: false, message: "" });
        }
    }, [open]);

    useEffect(() => {
        (async () => {
            if (isReady && loeTokenContract) {
                setBalance(await loeTokenContract.methods.balanceOf(account).call())
                setDecimals(Number(await loeTokenContract.methods.decimals().call()));
            }
        })();
    }, [isReady, loeTokenContract]);

    let realBalance = new BigNumber(balance);
    realBalance = realBalance.shiftedBy(-Math.abs(decimals));

    return (
    <>
        <Dialog open={ open } onClose={ onClose }>
            <DialogTitle color="primary">Stake LOE Token</DialogTitle>
            <DialogContent>
                {
                    isReady
                        ?
                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="modalFormLabel" color="text.secondary">My Balance:</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={ LOELogo } />
                                    <Typography variant="h5" color="text">{ realBalance.toString() } LOE</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="modalFormLabel" color="text.secondary">Staking Amount:</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={ LOELogo } />
                                    <Typography variant="h5" color="text" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <StyledAmountField label="Amount" varaint="outlined" color="primary" type="number"
                                                            value={ amount } onChange={ setAmountValue } />&nbsp;LOE
                                    </Typography>
                                </Box>
                                
                            </Stack>
                        :
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography variant="h5">Loading...</Typography>
                            </Box>
                }
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={ onClose }>Cancel</Button>
                <Button variant="contained" color="primary" onClick={ addStaking }>Stake</Button>
            </DialogActions>
        </Dialog>

        <Backdrop sx={{ color: '#fff', zIndex: 9999 }} open={ progress.open }>
            <CircularProgress color="inherit" />
            <Typography variant="h5" sx={{ ml: 2 }}>{ progress.message }</Typography>
        </Backdrop>
    </>
    );
}

export default AddStakingModal;