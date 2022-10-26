import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Skeleton, Typography } from "@mui/material";

import PurchaseModal from "@components/BuyItem/PurchaseModal";
import { Web3Context } from "@store/providers/Web3Provider";
import { getMetaTag, copy } from "@utils/format";
import { setNFTs } from "@store/slices/marketplace.slice";

const BuyItem = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPurchaseModalOpened, setIsPurchaseModalOpened] = useState(false);
  const [thisNFT, setThisNFT] = useState(null);
  const { defaultMarketplaceContract } = useContext(Web3Context);
  const nfts = useSelector((state) => state.marketplace.nfts);
  const params = useParams();
  const dispatch = useDispatch();
  const tokenId = params.tokenId; //location.state?.tokenId;

  const handleClosePurchaseModal = () => {
    setIsPurchaseModalOpened(false);
  };

  const onPurchased = (purchasedQuantity) => {
    let currentNFT = Object.assign({}, thisNFT);
    currentNFT.saleAmount -= purchasedQuantity;
    if (nfts.length) {
      let copyedNFTs = copy(nfts);
      const thisItemIndex = copyedNFTs.findIndex(
        (nft) => nft.gameItem.tokenId == tokenId
      );
      copyedNFTs[thisItemIndex] = currentNFT;
      dispatch(setNFTs({ nfts: copyedNFTs }));
    }
    setThisNFT(currentNFT);
  };

  useEffect(() => {
    (async () => {
      if (!defaultMarketplaceContract) return;

      let thisItem;
      if (!nfts.length) {
        const currentNFT = await defaultMarketplaceContract.methods
          .fetchGameItemById(tokenId)
          .call();
        const metadata = await axios.get(currentNFT.metadata);

        thisItem = {
          gameItem: currentNFT.gameItem,
          metadata: metadata.data,
          saleAmount: currentNFT.saleAmount,
          metahash: currentNFT.metadata,
        };
      } else thisItem = nfts.find((nft) => nft.gameItem.tokenId == tokenId);

      setThisNFT(thisItem);
      setIsLoaded(true);
      dispatch(setNFTs({ nfts: nfts }));
    })();
  }, [defaultMarketplaceContract]);
  /*
    if (typeof tokenId === 'undefined') {
        //navigate('/marketplace');
        window.location.href = "/marketplace";
        return;
    }*/

  return (
    <>
      <section className="d-flex product-content mx-auto p-mx-width">
        <div className="product-image px-4 py-2 py-md-5">
          <div className="product-image-block">
            <Link to="/marketplace" className="sm-icons">
              <p className="fs-5">
                <i className="fas fa-chevron-left me-3"></i> Back
              </p>
            </Link>
            {isLoaded ? (
              <img
                src={thisNFT?.metadata.image}
                alt={thisNFT?.metadata.name}
                className="w-100"
              />
            ) : (
              <Skeleton variant="rectangular" width={527} height={400} />
            )}
          </div>
        </div>
        <div className="product-detail px-4 mt-0 mt-md-5 pt-2 pt-md-5 ">
          <div className="d-flex justify-content-between">
            <div>
              {isLoaded ? (
                <p className="mb-0 fs-4 lh-sm">{thisNFT?.metadata.name}</p>
              ) : (
                <Typography variant="h3">
                  <Skeleton width={100} />
                </Typography>
              )}
              {isLoaded ? (
                <p className="fs12 mb-0">{`${thisNFT?.gameItem.price} LOE`}</p>
              ) : (
                <Typography variant="h4">
                  <Skeleton width={60} />
                </Typography>
              )}
            </div>
            {isLoaded ? (
              <p className="mb-0 mt-2 fs16">{`${thisNFT?.gameItem.price} LOE`}</p>
            ) : (
              <Typography variant="h4">
                <Skeleton width={60} />
              </Typography>
            )}
          </div>
          <div className="border rounded p-3 border-color2 mt-2">
            <div className="d-flex justify-content-between">
              <div>
                <p className="mb-1 color-5">Total supply</p>
                {isLoaded ? (
                  <p>
                    {thisNFT?.saleAmount}/{thisNFT?.gameItem.totalAmount}
                  </p>
                ) : (
                  <Typography variant="h5">
                    <Skeleton width={60} />
                  </Typography>
                )}
              </div>
              <div>
                <p className="mb-1 color-5">Rarity</p>
                {isLoaded ? (
                  <div className="ticket ticket-green rounded px-2 fs12 fw-bold">
                    Rare
                  </div>
                ) : (
                  <Typography variant="h5">
                    <Skeleton width={60} />
                  </Typography>
                )}
              </div>
              <div>
                <p className="mb-1 color-5">Price</p>
                {isLoaded ? (
                  <p>{thisNFT?.gameItem.price} LOE</p>
                ) : (
                  <Typography variant="h5">
                    <Skeleton width={60} />
                  </Typography>
                )}
              </div>
              {isLoaded ? (
                <div className="ticket ticket-green rounded px-2 fs12 fw-bold">
                  Rare
                </div>
              ) : (
                <Typography variant="h5">
                  <Skeleton width={60} />
                </Typography>
              )}
            </div>
            {isLoaded ? (
              <p className="color-5 mb-2" style={{ wordBreak: "break-all" }}>
                Hash tag:
                <br />
                {getMetaTag(thisNFT?.metahash)}
              </p>
            ) : (
              <Typography variant="h5">
                <Skeleton width="100%" />
              </Typography>
            )}
          </div>
          <div className="border rounded p-3 border-color2 mt-5 fs16">
            {isLoaded ? (
              <p className="fs16">About</p>
            ) : (
              <Typography variant="h4">
                <Skeleton width={80} />
              </Typography>
            )}
            <div className={`${!isLoaded ? "" : "ps-2"} color-2`}>
              {isLoaded ? (
                <p>{thisNFT?.metadata.description}</p>
              ) : (
                <Skeleton variant="rectangular" height={200} />
              )}
              <button
                className="btn btn-warning text-white btn-lg w-100 mt-4 mb-3 cus-btn-warning"
                onClick={() => setIsPurchaseModalOpened(true)}
              >
                Buy
              </button>
            </div>
          </div>
          <div className="border rounded p-3 border-color2 my-5">
            <div className="d-flex justify-content-between">
              <div>
                <p className="mb-0 color-5">HEALTH</p>
                <div className="d-flex align-items-center">
                  <img
                    src="./assets/image/youtube.png"
                    alt=""
                    className="me-1 mt-1"
                  />
                  <p className="mb-0 fs-4 lh-1">58</p>
                </div>
              </div>
              <div>
                <p className="mb-0 color-5">HEALTH</p>
                <div className="d-flex align-items-center">
                  <img
                    src="./assets/image/youtube.png"
                    alt=""
                    className="me-1 mt-1"
                  />
                  <p className="mb-0 fs-4 lh-1">58</p>
                </div>
              </div>
              <div>
                <p className="mb-0 color-5">HEALTH</p>
                <div className="d-flex align-items-center">
                  <img
                    src="./assets/image/youtube.png"
                    alt=""
                    className="me-1 mt-1"
                  />
                  <p className="mb-0 fs-4 lh-1">58</p>
                </div>
              </div>
              <div>
                <p className="mb-0 color-5">HEALTH</p>
                <div className="d-flex align-items-center">
                  <img
                    src="./assets/image/youtube.png"
                    alt=""
                    className="me-1 mt-1"
                  />
                  <p className="mb-0 fs-4 lh-1">58</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PurchaseModal
        open={isPurchaseModalOpened}
        onClose={handleClosePurchaseModal}
        item={thisNFT}
        onPurchased={onPurchased}
      />
    </>
  );
};

export default BuyItem;
