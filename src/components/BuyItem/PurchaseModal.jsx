import { useState, useEffect, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography, Button, Backdrop, CircularProgress, FormControl, Select,
            MenuItem } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSnackbar } from 'notistack';
import BigNumber from 'bignumber.js';

import { Web3Context } from "@store/providers/Web3Provider";
import { WrapperContext } from "@store/providers/Wrapper";
import { marketplaceAddress, loeTokenAddress } from "@config/contracts";
import { PAYMENT_METHODS } from "@utils/enums";
import { toMaxPrecision } from "@utils/format";

const StyledSelect = styled(Select)({
    '&': {
        border: '1px solid #fff6',
        color: '#fff'
    },
    '& .MuiSvgIcon-root': {
        color: '#fff'
    }
});

const PurchaseModal = props => {
    const { marketplaceContract, loeTokenContract, account } = useContext(Web3Context);
    const { identifyConnectWallet } = useContext(WrapperContext);
    const [purchasingItem, setPurchasingItem] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [progress, setProgress] = useState({ open: false, message: "" });
    const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0]);
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();
    const { open, onClose, item, onPurchased } = props;

    const handleChangePaymentMethod = e => {
        setPaymentMethod(e.target.value)
    }

    const purchaseItem = async () => {
        console.log(marketplaceContract && loeTokenContract && account ? true : false);
        if (!account || !marketplaceContract || !loeTokenContract) {
            let wallet = await identifyConnectWallet();
            if (!wallet) 
                setProgress({ open: false });
            else setProgress({ open: true, message: "Initializing data..." });
            setPurchasingItem(true);
            return;
        }
        setProgress({ open: false });
        
        if (!item) {
            enqueueSnackbar("Item is not valid!", { variant: 'error' });

            return;
        }

        try {
            console.log(account);
            if (paymentMethod == 'LOE') {
                let myBalance = new BigNumber(await loeTokenContract.methods.balanceOf(account).call());
                let purchasingItemBalance = new BigNumber(item.gameItem.price * Number(quantity));
                purchasingItemBalance = purchasingItemBalance.shiftedBy(Number(await loeTokenContract.methods.decimals().call()));
                let comparedResult = myBalance.comparedTo(purchasingItemBalance);
                if (comparedResult == 1 || comparedResult == 0) {
                    console.log("mybalance, purchasingitembalance: ", myBalance.toString(), purchasingItemBalance.toString());
                    setProgress({ open: true, message: "Waiting for approve of user..." });
                    const transaction1 = await loeTokenContract.methods.approve(marketplaceAddress, purchasingItemBalance.toString()).send({ from: account });
                    enqueueSnackbar("Approved!", { variant: 'success' });
                    setProgress({ open: true, message: "Waiting for transaction of purchase..." });
                    const transaction2 = await marketplaceContract.methods.purchaseGameItem(loeTokenAddress, item.gameItem.tokenId, quantity, paymentMethod).send({ from: account, gas: '1000000' });
                } else {
                    enqueueSnackbar("Insufficient balance!", { variant: 'error' });
                    setProgress({ open: false });
                }
            } else if (paymentMethod == 'tBNB') {
                let myBalance = new BigNumber(toMaxPrecision(0.01 * Math.floor(quantity), 2));
                myBalance = myBalance.shiftedBy(18);
                setProgress({ open: true, message: "Waiting for approve of user..." });
                const transaction = await marketplaceContract.methods.purchaseGameItem(loeTokenAddress, item.gameItem.tokenId, quantity, paymentMethod)
                                            .send({
                                                from: account,
                                                gas: '1000000',
                                                value: myBalance.toString()
                                            });
            }

            setProgress({ open: false });
            onClose();
            enqueueSnackbar("Purchased item successfully!", { variant: 'success' });
            onPurchased(quantity);
        } catch (err) {
            console.log(err);
            if (err?.code === 4001) // User denied transaction signature.
                enqueueSnackbar("Rejected approve!", { variant: 'error' });
            else enqueueSnackbar("Error occurred!", { variant: 'error' });
            setProgress({ open: false });
        }
    }

    useEffect(() => {
        if (open) {
            setQuantity(1);
            setProgress({ open: false, message: "" });
        }
    }, [open]);

    useEffect(() => {
        (async () => {
            if (marketplaceContract && loeTokenContract && account && purchasingItem) {
                await purchaseItem();
            }
        })();
    }, [marketplaceContract, loeTokenContract, account, purchasingItem]);

    return (
    <>
        <Dialog open={ open } fullWidth={ true } maxWidth="sm" onClose={ onClose }>
            <DialogTitle color="primary">Purchase Game Item</DialogTitle>
            <DialogContent>
                {
                    item
                        ?
                            <Box sx={{ display: 'flex' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <img src={ item?.metadata.image } alt={ item?.metadata.name } width="200" />
                                    <Typography variant="modalFormLabel" color="text.secondary" sx={{ textAlign: 'center' }}>Item quantity</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                                        <Button variant="contained" sx={{ ...theme.custom.ActionButton }}
                                                startIcon={<FontAwesomeIcon icon={ faMinus } />} onClick={ () => setQuantity(quantity > 1 ? quantity - 1 : 1) } />
                                        <Button variant="contained" sx={{ ...theme.custom.ActionButton, ml: 1 }}>
                                            { quantity }
                                        </Button>
                                        <Button variant="contained" sx={{ ...theme.custom.ActionButton, ml: 1 }}
                                                startIcon={<FontAwesomeIcon icon={ faPlus } />} onClick={ () => setQuantity(quantity + 1) }></Button>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', px: 3, width: '100%' }}>
                                    <Box>
                                        <Typography variant="modalFormLabel" color="text.secondary">Name:</Typography>
                                        <Typography variant="modalFormLabel" color="text" sx={{ ml: 1 }}>{ item?.metadata.name }</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography variant="modalFormLabel" color="text.secondary">Payment method:</Typography>
                                        <FormControl sx={{ ml: 1 }}>
                                            <StyledSelect value={ paymentMethod } onChange={ handleChangePaymentMethod } displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                                                <MenuItem value={ PAYMENT_METHODS[0] }>{ PAYMENT_METHODS[0] }</MenuItem>
                                                <MenuItem value={ PAYMENT_METHODS[1] }>{ PAYMENT_METHODS[1] }</MenuItem>
                                            </StyledSelect>
                                        </FormControl>
                                    </Box>
                                    {
                                        paymentMethod == 'LOE' &&
                                            <>
                                                <Box>
                                                    <Typography variant="modalFormLabel" color="text.secondary">Price:</Typography>
                                                    <Typography variant="modalFormLabel" color="text" sx={{ ml: 1 }}>{ item?.gameItem.price } LOE</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="modalFormLabel" color="text.secondary">Total supply:</Typography>
                                                    <Typography variant="modalFormLabel" color="text" sx={{ ml: 1 }}>{ item?.gameItem.totalAmount }</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="modalFormLabel" color="text.secondary">Current quantity:</Typography>
                                                    <Typography variant="modalFormLabel" color="text" sx={{ ml: 1 }}>{ item?.saleAmount }</Typography>
                                                </Box>
                                                <hr />
                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Typography variant="modalFormLabel" color="text.secondary">Total price:</Typography>
                                                    <Typography variant="h5" color="primary" sx={{ ml: 1 }}>{ item?.gameItem.price * quantity } LOE</Typography>
                                                </Box>
                                            </>
                                    }
                                    {
                                        paymentMethod == 'tBNB' &&
                                            <>
                                                <Box>
                                                    <Typography variant="modalFormLabel" color="text.secondary">Price:</Typography>
                                                    <Typography variant="modalFormLabel" color="text" sx={{ ml: 1 }}>0.01 tBNB</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="modalFormLabel" color="text.secondary">Total supply:</Typography>
                                                    <Typography variant="modalFormLabel" color="text" sx={{ ml: 1 }}>{ item?.gameItem.totalAmount }</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="modalFormLabel" color="text.secondary">Current quantity:</Typography>
                                                    <Typography variant="modalFormLabel" color="text" sx={{ ml: 1 }}>{ item?.saleAmount }</Typography>
                                                </Box>
                                                <hr />
                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Typography variant="modalFormLabel" color="text.secondary">Total price:</Typography>
                                                    <Typography variant="h5" color="primary" sx={{ ml: 1 }}>{ toMaxPrecision(0.01 * Math.floor(quantity), 2) } tBNB</Typography>
                                                </Box>
                                            </>
                                    }
                                </Box>
                            </Box>
                        :
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography variant="h5">Loading...</Typography>
                            </Box>
                }
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={ onClose }>Cancel</Button>
                <Button variant="contained" color="primary" onClick={ purchaseItem }>Purchase</Button>
            </DialogActions>
        </Dialog>

        <Backdrop sx={{ color: '#fff', zIndex: 9999 }} open={ progress.open }>
            <CircularProgress color="inherit" />
            <Typography variant="h5" sx={{ ml: 2 }}>{ progress.message }</Typography>
        </Backdrop>
    </>
    );
}

export default PurchaseModal;