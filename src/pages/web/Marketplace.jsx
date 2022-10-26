import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Skeleton, Typography } from "@mui/material";
import axios from "axios";

import GameItem from "@components/Marketplace/GameItem";
import { setNFTs } from "@store/slices/marketplace.slice";
import { Web3Context } from "@store/providers/Web3Provider";

const categories = [
  "Land",
  "Artilleries",
  "War academies",
  "Artillery factories",
  "Leagues",
];
const mockup = [
  {
    category: "Land",
    description: `The land, in the form of an island, is the first and foremost element of the game. On the island, you can gather resources, build your own workshops for artilleries, <br/>
        have war academies to better train your troops for ranking higher in levels. It also helps you increase your economic welfare which in turn will increase your token earning capacity.`,
  },
];

export default function MarketplacePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { defaultMarketplaceContract } = useContext(Web3Context);
  const dispatch = useDispatch();
  const nfts = useSelector((state) => state.marketplace.nfts);

  const loadNFTs = async () => {
    const gameItems = await defaultMarketplaceContract.methods
      .fetchGameItems()
      .call();

    console.log("items: ", gameItems);
    let newGameItems = [];
    for (let i = 0; i < gameItems.length; i++) {
      const metadata = await axios.get(gameItems[i].metadata);
      newGameItems.push({
        gameItem: gameItems[i].gameItem,
        metadata: metadata.data,
        saleAmount: gameItems[i].saleAmount,
        metahash: gameItems[i].metadata,
      });
    }

    setIsLoaded(true);
    dispatch(setNFTs({ nfts: newGameItems }));
  };

  useEffect(() => {
    return () => {
      setIsLoaded(false);
      setSelectedCategory(null);
    };
  }, []);

  useEffect(() => {
    (async () => {
      defaultMarketplaceContract && (await loadNFTs());
    })();
  }, [defaultMarketplaceContract]);

  return (
    <>
      <div className="mx-auto m2-mx-width m2-category-dropdown">
        <div className="cus-dropdown mt-3" id="category_dropdown">
          <div
            className="dropdown-value d-flex align-items-center h-100"
            id="display_dom"
          >
            Select category
          </div>
          <div className="options img-option">
            <div className="d-flex align-items-center">Land</div>

            <div>Artilleries</div>

            <div>War academies</div>

            <div>Artillery factories</div>

            <div>Leagues</div>
          </div>
        </div>
      </div>
      <section className="d-flex flex-column align-items-center mx-auto m2-mx-width">
        <div className="v-category d-flex border rounded fs-5 fw-light mt-5 border-color1">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`v-category-item cursor-pointer py-3 px-5
                                             text-center ${
                                               index < categories.length - 1
                                                 ? "border-end border-color1"
                                                 : "rounded-end"
                                             }
                                             ${
                                               index === 0 && "rounded-start"
                                             } ${
                category === selectedCategory && "active"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>

        <div className="px-1">
          {/* Land */}
          {(selectedCategory === categories[0] ||
            selectedCategory === null) && (
            <div className="row mt-5 products-group active">
              <p className="fs14 color-2 mb-0">
                <span className="color-primary">Land:</span> The land, in the
                form of an island, is the first and foremost element of the
                game. On the island, you can gather resources, build your own
                workshops for artilleries,
              </p>
              <p className="fs14 color-2">
                have war academies to better train your troops for ranking
                higher in levels. It also helps you increase your economic
                welfare which in turn will increase your token earning capacity.
              </p>
              {!isLoaded
                ? [...Array(6)].map((element, index) => (
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
                          <Skeleton width="30%" />
                        </Typography>
                      </div>
                    </div>
                  ))
                : nfts.map((nft, index) => (
                    <GameItem
                      key={index}
                      tokenId={nft.gameItem.tokenId}
                      name={nft.metadata.name}
                      image={nft.metadata.image}
                      saleAmount={nft.saleAmount}
                      price={nft.gameItem.price}
                    />
                  ))}
            </div>
          )}
        </div>

        <div className="d-flex justify-content-center my-5"></div>
      </section>
    </>
  );
}
