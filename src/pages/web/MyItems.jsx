import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Skeleton, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import axios from "axios";

import { Web3Context } from "@store/providers/Web3Provider";
import MyGameItem from "@components/MyItems/GameItem";

const MyItems = () => {
  const { defaultMarketplaceContract, account } = useContext(Web3Context);
  const myNFTs = useSelector((state) => state.marketplace.myItems);
  const auth = useSelector((state) => state.auth);
  const [myItems, setMyItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const loadMyItems = async () => {
    const myItems = await defaultMarketplaceContract.methods
      .fetchGameItemsByOwner(auth.wallet_address)
      .call();
    console.log(myItems);
    let newMyItems = [];
    for (let i = 0; i < myItems.length; i++) {
      const metadata = await axios.get(myItems[i].metadata);
      newMyItems.push({
        gameItem: myItems[i].gameItem,
        metadata: metadata.data,
        saleAmount: myItems[i].saleAmount,
        metahash: myItems[i].metadata,
      });
    }
    setMyItems(newMyItems);
    setIsLoaded(true);
  };

  useEffect(() => {
    return () => {
      setMyItems([]);
      setIsLoaded(false);
    };
  }, []);

  useEffect(() => {
    if (auth.wallet_address) {
      (async () => {
        setIsLoaded(false);
        if (!account && !auth.wallet_address) {
          enqueueSnackbar("Please sign in!", { variant: "error" });
          navigate("/");
        }

        defaultMarketplaceContract && (await loadMyItems());
      })();
    }
  }, [defaultMarketplaceContract, account, auth]);

  return (
    <section className="d-flex flex-column align-items-center mx-auto m2-mx-width">
      <div className="px-1 w-100 mt-5">
        <Link to="/marketplace" className="sm-icons">
          <p className="fs-5">
            <i className="fas fa-chevron-left me-3"></i> To Marketplace
          </p>
        </Link>
        <Typography variant="h3" color="primary" sx={{ textAlign: "center" }}>
          My Items
        </Typography>
        <div className="row mt-5 products-group active">
          {!isLoaded
            ? [...Array(3)].map((element, index) => (
                <div className="col-lg-4 col-md-4 mb-4" key={index}>
                  <div className="product-item rounded p-1 bg-1 position-relative pt-5 pt-sm-2">
                    <Typography variant="h3">
                      <Skeleton width="40%" />
                    </Typography>
                    <Typography variant="h4">
                      <Skeleton width="35%" />
                    </Typography>
                    <Skeleton variant="rectangular" height={300} />
                    <Typography
                      variant="h4"
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Skeleton width="40%" />
                    </Typography>
                  </div>
                </div>
              ))
            : myItems.map((item, index) => (
                <MyGameItem
                  key={index}
                  tokenId={item?.gameItem.tokenId}
                  name={item?.metadata.name}
                  image={item?.metadata.image}
                  saleAmount={item?.saleAmount}
                  price={item?.gameItem.price}
                />
              ))}
        </div>
      </div>

      <div className="d-flex justify-content-center my-5"></div>
    </section>
  );
};

export default MyItems;
