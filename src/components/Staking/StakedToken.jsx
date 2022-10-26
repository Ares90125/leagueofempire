import { Grid, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LockIcon from '@mui/icons-material/Lock';

import LOELogo from "@assets/images/logos/LOE.png";

const useStyles = makeStyles(( theme) => ({
    root: {
        width: '100%',
        filter: "blur(3px)",
        display: 'flex',
        justifyContent: 'center'
    },
    textOverlay: {
        position: "absolute",
        width: "100%"
    },
    notSelectable: {
        userSelect: "none"
    }
}));

const StakedToken = () => {
    const classes = useStyles();

    return (
        <Grid item xs={4} md={4}>
            <div className="product-item rounded p-1 bg-1 position-relative pt-5 pt-sm-2">
                <p className="fs-5 mb-1 px-2 title ls-title">
                    Staked Amount: 100 LOE
                </p>
                <p className="fs14 color-2 px-2">
                    
                </p>
                <Grid container directon="row" alignItems="center" justify="center">
                    <Grid item className={ classes.root }>
                        <img src={ LOELogo } style={{ width: '90%' }} />
                    </Grid>
                    <Grid item className={ classes.textOverlay }>
                        <div className="text-center">
                            <LockIcon sx={{ fontSize: 80 }} />
                            <Typography variant="h3">03:24:41</Typography>
                        </div>
                    </Grid>
                </Grid>
                <div className="d-flex justify-content-center my-3">
                    <Button variant="outlined" color="primary">Reward</Button>
                </div>
            </div>
        </Grid>
    );
}

export default StakedToken;