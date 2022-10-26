import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BigNumber from "bignumber.js";

import { Web3Context } from "@store/providers/Web3Provider";
import StakedToken from "@components/Staking/StakedToken";
import AddStakingModal from "@components/Staking/AddStakingModal";

const Staking = () => {
  const { web3, isReady, loeTokenContract, account } = useContext(Web3Context);
  const [isAddStakingModalOpened, setIsAddStakingModalOpened] = useState(false);
  const [myStakes, setMyStakes] = useState(null);
  const [decimals, setDecimals] = useState(18);

  const log = (log) => {
    console.log(log + "asdf");
  };

  const handleCloseAddStakingModal = () => {
    setIsAddStakingModalOpened(false);
  };

  useEffect(() => {
    (async () => {
      if (isReady) {
        const myStakes = await loeTokenContract.methods
          .hasStake(account)
          .call();
        setDecimals(Number(await loeTokenContract.methods.decimals().call()));
        setMyStakes(myStakes);
      }
    })();
  }, [isReady]);

  let totalAmount = new BigNumber(myStakes?.total_amount);
  totalAmount = totalAmount.shiftedBy(-Math.abs(decimals));

  return (
    <>
      <section className="d-flex flex-column align-items-center mx-auto m2-mx-width">
        <Container maxWidth={false} sx={{ mt: 5 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link to="/marketplace" className="sm-icons">
              <p className="fs-5">
                <i className="fas fa-chevron-left me-3"></i> To Marketplace
              </p>
            </Link>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsAddStakingModalOpened(true)}
              startIcon={<AddIcon />}
            >
              Add Staking
            </Button>
          </Box>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant="h5">Total Staked Amount:</Typography>
              <Typography variant="h4" color="primary" sx={{ ml: 2 }}>
                {myStakes ? totalAmount.toString() : 0} LOE
              </Typography>
            </Box>
            {myStakes &&
              myStakes?.stakes.map((stake, index) => (
                <StakedToken key={index} />
              ))}
          </Grid>
        </Container>
        <div className="d-flex justify-content-center my-5"></div>
      </section>
      <AddStakingModal
        open={isAddStakingModalOpened}
        onClose={handleCloseAddStakingModal}
      />
    </>
  );
};

export default Staking;
