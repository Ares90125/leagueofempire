import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import AuthDropdownMenu from "@components/Auth/DropdownMenu";

const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const auth = useSelector((state) => state.auth);

  const handleDropdownMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/assets/js/home.js";
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <div className="flames" />
      <section className="container d-flex justify-content-between p-2">
        <div className="header-social-icons d-flex align-items-center px-1 fs-5">
          <a
            href="https://twitter.com/LeagueofEmpires"
            target="blank"
            className="sm-icons"
          >
            <i className="fab fa-twitter" style={{ marginRight: "1.25rem" }} />
          </a>
          {/* <a href="http://discord.com" target="blank" class="sm-icons" ><i class="fab fa-discord" style="margin-right:1.25rem"></i></a> */}
          <a
            href="https://t.me/leagueofempireschat"
            target="blank"
            className="sm-icons"
          >
            <i className="fab fa-telegram" style={{ marginRight: "1.25rem" }} />
          </a>
          <a
            href="https://leagueofempires.medium.com/what-is-a-rts-real-time-strategy-game-428a82b1b6e3"
            target="blank"
            className="sm-icons"
          >
            <i
              className="fab fa-medium px-1"
              style={{ marginRight: "1.25rem" }}
            />
          </a>
          <a
            href="https://discord.gg/CzpQzfv7KM"
            target="blank"
            className="sm-icons"
          >
            <i className="fab fa-discord px-1" />
          </a>
        </div>
        {auth.username ? (
          <button
            className="btn btn-primary cus-btn-primary btn-sm me-2"
            onClick={handleDropdownMenu}
          >
            <span style={{ fontSize: "13px" }}>{auth.username}</span>
          </button>
        ) : (
          <Link
            className="btn btn-primary cus-btn-primary btn-sm me-2"
            to="/login"
          >
            <span style={{ fontSize: "13px" }}>Sign In</span>
          </Link>
        )}
        <AuthDropdownMenu anchorEl={anchorEl} onClose={handleCloseDropdown} />
      </section>
      <div className="mobile-menu">
        <input type="checkbox" name="" id="" />
        <div className="hamburger-lines">
          <span className="line line1" />
          <span className="line line2" />
          <span className="line line3" />
        </div>
        <ul className="menu-items">
          <li>
            <a href="https://leagueofempires.zendesk.com/hc/en-us/articles/5343776721053-Tokenomics-chart">
              Tokenomics
            </a>
          </li>
          <li>
            <a href="https://leagueofempires.zendesk.com" target="_blank">
              Whitepaper
            </a>
          </li>
          <li>
            <Link to="/marketplace">Marketplace</Link>
          </li>
          <li>
            <Link to="/claim">Game</Link>
          </li>
          <li>
            <a href="/#team_section">Team</a>
          </li>
          {/*       <li><a href="#testimonials">Testimonial</a></li>
      <li><a href="#contact">Contact</a></li> */}
        </ul>
        <img
          src="/assets/image/logos/league.png"
          alt=""
          className="mobile-main-logo"
        />
      </div>
      {/*
    <ul class="menu-items">
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#food">Category</a></li>
      <li><a href="#food-menu">Menu</a></li>
      <li><a href="#testimonials">Testimonial</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
*/}
      {/*
	<div class="menu align-items-center">
      <div class="menu-item active">
        Home
      </div>
      <a href="tokenomics">
        <div class="menu-item ">
          Tokenomics
        </div>
      </a>
      <a href="https://legacyofempires.gitbook.io/untitled/" target="_blank">
        <div class="menu-item">
          Whitepaper
        </div>
      </a>
      <a href="/"><img src="/assets/image/logos/league.png" alt="" class="main-logo"></a>
      <a href="marketplace">
        <div class="menu-item ">
          Marketplace        
        </div>
      </a>
      <a class="menu-item menu-item-team" href="#team_section">
        Team
      </a>
    </div>
*/}{" "}
      <section className="container-fluid banner-section d-flex justify-content-center align-items-center">
        {/*<div class="menu align-items-center">
      <div class="menu-item active">
        <a href="/tokenomics">Tokenomics</a>
      </div>
      <div class="menu-item">
        <a href="http://www.google.com">Whitepaper</a>
      </div>
      <a href="/"><img src="/assets/image/logos/league.png" alt="" class="main-logo"></a>
      <div class="menu-item">
        <a href="/marketplace">Marketplace</a>
      </div>
      <a class="menu-item menu-item-team" href="/#team_section">
        Team
      </a>
    </div>
	*/}
        <div className="menu align-items-center">
          {/*<div class="menu-item active">
        Home
      </div>*/}
          <a href="https://leagueofempires.zendesk.com/hc/en-us/articles/5343776721053-Tokenomics-chart">
            <div className="menu-item ">Tokenomics</div>
          </a>
          <a href="https://leagueofempires.zendesk.com" target="_blank">
            <div className="menu-item">Whitepaper</div>
          </a>
          <a href="/">
            <img
              src="/assets/image/logos/league.png"
              alt=""
              className="main-logo"
            />
          </a>
          <Link to="/marketplace">
            <div className="menu-item ">Marketplace</div>
          </Link>
          <Link to="/claim">
            <div className="menu-item ">Game</div>
          </Link>
          <a className="menu-item menu-item-team" href="/#team_section">
            Team
          </a>
        </div>
        <div className="text-center">
          {/*       <p class="mb-0 title">CREATE YOUR OWN League</p> */}
          <h5>Build your own empire in the metaverse</h5>
          <h1 className="fw-bold title" style={{ fontSize: "2.75rem" }}>
            NFT GAME. Play. Conquer. Earn
          </h1>
          <p style={{ fontSize: "16px" }}>
            Play &amp; Conquer in the First True MMO Real Time Strategy Game on
            Blockchain
          </p>
          {/*       <div class="d-flex justify-content-center flex-wrap mt-4">
        <a href="https://www.youtube.com/watch?v=" class="video-popup">
		<button class="btn btn-primary cus-btn-primary mx-3 mb-2" id="open_youtube_video_popup">
          <span>Watch Trailer</span>
        </button>
		</a>
      </div> */}
          {/* 	<div class="d-flex justify-content-center flex-wrap mt-4">
		<h1 class="fw-bold title d-flex justify-content-center align-items-center" style="font-size:2.75rem; text-shadow: 2px 2px 4px #000000;">Incubated by</h1><object type="image/svg+xml" class="ms-4" style="width: 15rem; height: 50%; filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.9));" data="/assets/image/logos/seedify.svg" /></object>
      </div>	 */}
        </div>
      </section>
      {/*   <section class="container d-flex justify-content-center" style="margin-top:70px;">
<iframe width="812" height="457" src="https://www.youtube.com/embed/oPSctrqAjSo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</section> */}
      <section className="container mt-5 blog-section p-3">
        <div className="pr-4">
          <div className="row cart-block cus-bg-primary">
            <div className="col-lg-6">
              <p className="fs-4 color-primary fw-bold text-uppercase title">
                GAME OVERVIEW
              </p>
              <p>
                League of Empires is the first ever true MMORTS game on
                blockchain. It offers a rich and immersive gameplay. Train and
                command your troops in stunning 3D wars! Form alliances, fortify
                your land, deploy different strategies and increase your
                defences to protect your treasures from enemies. Gather
                resources and train your army to build up your power and expand
                it into a mighty Empire.
              </p>
              <p>
                Experience blockchain gaming at its best! Challenge the world in
                multiplayer PvP style with a custom army of your favourite
                units. Think &amp; play as a general. Build artillery and use it
                tactically on battlefields or sell it on the marketplace. Battle
                through different conquests, enjoy an adrenaline-filled gameplay
                and earn $LOE tokens along the way!
              </p>
            </div>
            <div className="col-lg-6 d-flex align-items-center justify-content-lg-start justify-content-center">
              <img
                src="/assets/image/battlefield.png"
                alt=""
                className="ms-lg-5 blog-main-img"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="container mt-5 shape-section">
        <p className="fs-4 color-primary fw-bold text-uppercase text-center title">
          KEY FEATURES
        </p>
        <div className="row">
          <div className="col-md-3 text-center">
            <div
              className="shape1 mb-2 d-flex justify-content-center align-items-center"
              style={{ backgroundImage: "url(/assets/image/island.png)" }}
            ></div>
            <p className="color-primary title key-features">
              Buy, Sell &amp; Rent Lands
            </p>
            <p>
              Every player will need a land to start playing. Got an excess
              land? Sell it or rent it on the Marketplace.
            </p>
          </div>
          <div className="col-md-3 text-center">
            <div
              className="shape1 mb-2 d-flex justify-content-center align-items-center"
              style={{ backgroundImage: "url(/assets/image/artillery.png)" }}
            ></div>
            <p className="color-primary title key-features">
              Build &amp; Sell Artilleries
            </p>
            <p>
              There are 10 different types of artilleries. Build your own, use
              in battlefields or sell them on the Marketplace.
            </p>
          </div>
          <div className="col-md-3 text-center">
            <div
              className="shape1 mb-2 d-flex justify-content-center align-items-center"
              style={{ backgroundImage: "url(/assets/image/alliance.png)" }}
            ></div>
            <p className="color-primary title key-features">Form Alliances</p>
            <p>
              United we stand, divided we fall. Forge powerful alliances with
              global players and grow faster!
            </p>
          </div>
          <div className="col-md-3 text-center">
            <div
              className="shape1 mb-2 d-flex justify-content-center align-items-center"
              style={{ backgroundImage: "url(/assets/image/swords.png)" }}
            ></div>
            <p className="color-primary title key-features">
              PvP &amp; PvE Modes
            </p>
            <p>
              Test and train your skills in PvE modes. Once ready, shift to PvP
              modes &amp; Leagues and earn even better rewards!
            </p>
          </div>
        </div>
      </section>
      <section className="container-fluid v-roadmap-section pt-5 pb-5 mt-5">
        <div className="row v-roadmap-content">
          <div className="col-md-5 left-img-block d-none d-md-block">
            <img src="/assets/image/image-6.png" alt="" />
          </div>
          <div className="col-md-7 d-flex">
            <img
              src="/assets/image/Divider.png"
              alt=""
              className="divider-img d-none d-md-block"
            />
            <div className="right-text-block">
              <h4 className="color-primary fw-bold text-uppercase mb-4 title">
                BUILD THE ULTIMATE KINGDOM
              </h4>
              <div className="v-roadmap-text-block">
                <p className="fw-bold mb-2 fs-125 title">
                  Console-Quality Graphics
                </p>
                <p className="mb-4 color-2">
                  Plan, strategize and fight enemies in a stunning 3D fantasy
                  world.
                </p>
                <p className="fw-bold mb-2 fs-125 title">
                  Dominate with Strategy
                </p>
                <p className="mb-4 color-2">
                  Train your troops, equip them with powerful artillery and lead
                  them into epic PvP battles.
                </p>
                <p className="fw-bold mb-2 fs-125  title">
                  Real-Time Battle Control
                </p>
                <p className="mb-4 color-2">
                  Go to war with thousands of troops, all under your direct
                  control.
                </p>
                <p className="fw-bold mb-2 fs-125  title">
                  Nonstop Events &amp; Campaigns
                </p>
                <p
                  className="color-2"
                  style={{ marginBottom: "2rem !important" }}
                >
                  Daily quests, leaderboard challenges, unique campaigns, and
                  alliance events.
                </p>
              </div>
              <button className="btn download-btn d-flex align-items-center">
                <i className="fas fa-cloud-download-alt me-3" />
                <div>
                  <p className="m-0 lh-1">Download</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="container-fluid bg-2 p-b-60">
        <h4 className="text-center color-primary fw-bold text-uppercase py-5 title">
          ROADMAP
        </h4>
        <div className="container d-none d-lg-block">
          <div className="row">
            <div className="col-sm-2 p-0">
              <h5 className="color-primary ps-3 title">Sep, 2021</h5>
              <div className="d-flex align-items-center mb-4">
                <div className="before-roadmap-line" />
                <div className="round-point" />
                <div className="roadmap-line w-100" />
              </div>
              <div className="ps-3 color-2">
                <p className="mb-4">
                  ¤ Idea assessment and project feasibility
                </p>
                <p className="mb-4">
                  ¤ Research, gathering resources and team building
                </p>
                <p className="mb-4">
                  ¤ Project planning, SWOT analysis and scope's layout
                </p>
              </div>
            </div>
            <div className="col-sm-2 p-0">
              <h5 className="color-primary ps-3 title">Oct - Nov, 2021</h5>
              <div className="d-flex align-items-center mb-4">
                <div className="before-roadmap-line" />
                <div className="round-point" />
                <div className="roadmap-line w-100" />
              </div>
              <div className="ps-3 color-2">
                <p className="mb-4">
                  ¤ Game design document and game's architecture
                </p>
                <p className="mb-4">¤ 3D models, assets and graphics</p>
                <p className="mb-4">
                  ¤ Begin game development and early prototypes
                </p>
              </div>
            </div>
            <div className="col-sm-2 p-0">
              <h5 className="color-primary ps-3 title">Dec, 2021</h5>
              <div className="d-flex align-items-center mb-4">
                <div className="before-roadmap-line" />
                <div className="round-point" />
                <div className="roadmap-line w-100" />
              </div>
              <div className="ps-3 color-2">
                <p className="mb-4">¤ Website design &amp; development</p>
                <p className="mb-4">
                  ¤ Marketplace design and building NFT assets
                </p>
                <p className="mb-4">
                  ¤ Whitepaper, pitch deck, <br /> early trailer video
                </p>
              </div>
            </div>
            <div className="col-sm-2 p-0">
              <h5 className="color-primary ps-3 title">Q1, 2022</h5>
              <div className="d-flex align-items-center mb-4">
                <div className="before-roadmap-line" />
                <div className="round-point" />
                <div className="roadmap-line w-100" />
              </div>
              <div className="ps-3 color-2">
                <p className="mb-4">
                  ¤ Website launch and social media accounts
                </p>
                <p className="mb-4">
                  ¤ Smart contracts audit and community building
                </p>
                <p className="mb-4">
                  ¤ Seed, private &amp; public rounds. Partnerships
                </p>
              </div>
            </div>
            <div className="col-sm-2 p-0">
              <h5 className="color-primary ps-3 title">Q2, 2022</h5>
              <div className="d-flex align-items-center mb-4">
                <div className="before-roadmap-line" />
                <div className="round-point" />
                <div className="roadmap-line w-100" />
              </div>
              <div className="ps-3 color-2">
                <p className="mb-4">¤ NFT Marketplace launch</p>
                <p className="mb-4">
                  ¤ Continuous game development &amp; release of updates for
                  community
                </p>
                <p className="mb-4">¤ Launch of secondary NFT marketplace</p>
              </div>
            </div>
            <div className="col-sm-2 p-0">
              <h5 className="color-primary ps-3 title">Q3, 2022</h5>
              <div className="d-flex align-items-center mb-4">
                <div className="before-roadmap-line" />
                <div className="round-point" />
                <div className="roadmap-line w-100" />
              </div>
              <div className="ps-3 color-2">
                <p className="mb-4">¤ Alpha game release</p>
                <p className="mb-4">
                  ¤ Release of help &amp; support articles for players
                </p>
                <p className="mb-4">¤ Staking rewards</p>
              </div>
            </div>
          </div>
        </div>
        <div className="d-lg-none">
          <div className="d-flex">
            <div className="d-flex align-items-center flex-column">
              <div className="before-roadmap-hline" />
              <div className="round-point" />
              <div className="roadmap-line h-100" />
            </div>
            <div>
              <h5 className="color-primary ps-3 mt-3 title">Sep, 2021</h5>
              <div className="ps-3 color-2">
                <p className="mb-1">
                  ¤ Idea assessment and project feasibility
                </p>
                <p className="mb-1">
                  ¤ Research, gathering resources and team building.
                </p>
                <p className="mb-1">
                  ¤ Project planning, SWOT analysis and scope's layout
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className="d-flex align-items-center flex-column">
              <div className="before-roadmap-hline" />
              <div className="round-point" />
              <div className="roadmap-line h-100" />
            </div>
            <div>
              <h5 className="color-primary ps-3 mt-3 title">Oct - Nov, 2021</h5>
              <div className="ps-3 color-2">
                <p className="mb-1">
                  ¤ Game design document and game's architecture
                </p>
                <p className="mb-1">¤ 3D models, assets and graphics</p>
                <p className="mb-1">
                  ¤ Begin game development and early prototypes
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className="d-flex align-items-center flex-column">
              <div className="before-roadmap-hline" />
              <div className="round-point" />
              <div className="roadmap-line h-100" />
            </div>
            <div>
              <h5 className="color-primary ps-3 mt-3 title">Dec, 2021</h5>
              <div className="ps-3 color-2">
                <p className="mb-1">¤ Website design &amp; development</p>
                <p className="mb-1">
                  ¤ Marketplace design and building NFT assets
                </p>
                <p className="mb-1">
                  ¤ Whitepaper, pitch deck, early trailer video
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className="d-flex align-items-center flex-column">
              <div className="before-roadmap-hline" />
              <div className="round-point" />
              <div className="roadmap-line h-100" />
            </div>
            <div>
              <h5 className="color-primary ps-3 mt-3 title">Q1, 2022</h5>
              <div className="ps-3 color-2">
                <p className="mb-1">
                  ¤ Website launch and social media accounts
                </p>
                <p className="mb-1">
                  ¤ Smart contracts audit and community building
                </p>
                <p className="mb-1">
                  ¤ Seed, private &amp; public rounds. Partnerships
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className="d-flex align-items-center flex-column">
              <div className="before-roadmap-hline" />
              <div className="round-point" />
              <div className="roadmap-line h-100" />
            </div>
            <div>
              <h5 className="color-primary ps-3 mt-3 title">Q2, 2022</h5>
              <div className="ps-3 color-2">
                <p className="mb-1">¤ NFT Marketplace launch</p>
                <p className="mb-1">
                  ¤ Continuous game development &amp; release of updates for
                  community
                </p>
                <p className="mb-1">¤ Launch of secondary NFT marketplace</p>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className="d-flex align-items-center flex-column">
              <div className="before-roadmap-hline" />
              <div className="round-point" />
              <div className="roadmap-line h-100" />
            </div>
            <div>
              <h5 className="color-primary ps-3 mt-3 title">Q3, 2022</h5>
              <div className="ps-3 color-2">
                <p className="mb-1">¤ Alpha game release</p>
                <p className="mb-1">
                  ¤ Release of help &amp; support articles for players
                </p>
                <p className="mb-1">¤ Staking rewards</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container text-uppercase supporters-section">
        <h4 className="text-center color-primary fw-bold text-uppercase py-5 title">
          PARTNERS &amp; SUPPORTERS
        </h4>
        <div className="d-flex flex-wrap justify-content-center">
          <div className="supporter-item">
            <div>
              <img
                src="/assets/image/seedify-1.png"
                alt=""
                className="mt-10"
                style={{ width: "170px", height: "auto", paddingTop: "19px" }}
              />
            </div>
          </div>
          <div className="supporter-item">
            <div>
              <img
                src="/assets/image/trustpad.png"
                alt=""
                className="mt-10"
                style={{ width: "170px", height: "auto", paddingTop: "19px" }}
              />
            </div>
          </div>
          <div className="supporter-item">
            <div>
              <img
                src="/assets/image/ggg.png"
                alt=""
                className="mt-10"
                style={{ width: "170px", height: "auto", paddingTop: "19px" }}
              />
            </div>
          </div>
          <div className="supporter-item">
            <div>
              <img
                src="/assets/image/enjinstarter.png"
                alt=""
                className="mt-10"
                style={{ width: "170px", height: "auto", paddingTop: "19px" }}
              />
            </div>
          </div>
          <div className="supporter-item">
            <div>
              <img
                src="/assets/image/uponly.png"
                alt=""
                className="mt-10"
                style={{ width: "170px", height: "auto", paddingTop: "19px" }}
              />
            </div>
          </div>
          <div className="supporter-item">
            <div>
              <img
                src="/assets/image/ysc.png"
                alt=""
                className="mt-10"
                style={{ width: "170px", height: "auto", paddingTop: "9px" }}
              />
            </div>
          </div>
          <div className="supporter-item">
            <div>
              <img
                src="/assets/image/nextype.png"
                alt=""
                className="mt-10"
                style={{ width: "170px", height: "auto", paddingTop: "9px" }}
              />
            </div>
          </div>
          <div className="supporter-item">
            <div>
              <img
                src="/assets/image/nftb.svg"
                alt=""
                className="mt-10"
                style={{ width: "170px", height: "58px", paddingTop: "26px" }}
              />
            </div>
          </div>
          <div className="supporter-item">
            <div>
              <img
                src="/assets/image/babylons.png"
                alt=""
                className="mt-10"
                style={{ width: "170px", height: "auto", paddingTop: "19px" }}
              />
            </div>
          </div>
          <div className="supporter-item">
            <div>
              <img
                src="/assets/image/crypto-dive-in.png"
                alt=""
                className="mt-10"
                style={{ width: "170px", height: "auto", paddingTop: "19px" }}
              />
            </div>
          </div>
          <div className="supporter-item">
            <div>
              <img
                src="/assets/image/vulture-peak.png"
                alt=""
                className="mt-10"
                style={{ width: "170px", height: "auto", paddingTop: "19px" }}
              />
            </div>
          </div>
          <div className="supporter-item">
            <div>
              <img
                src="/assets/image/unreal-capital.png"
                alt=""
                className="mt-10"
                style={{ width: "170px", height: "auto", paddingTop: "19px" }}
              />
            </div>
          </div>
          <div className="supporter-item">
            <div>
              <img
                src="/assets/image/gateio.png"
                alt=""
                className="mt-10"
                style={{ width: "170px", height: "auto", paddingTop: "9px" }}
              />
            </div>
          </div>
          <div className="supporter-item">
            <div>
              <img
                src="/assets/image/gotbit.png"
                alt=""
                className="mt-10"
                style={{ width: "170px", height: "auto", paddingTop: "9px" }}
              />
            </div>
          </div>
          <div className="supporter-item">
            <div>
              <img
                src="/assets/image/gamestarter-2.png"
                alt=""
                className="mt-10"
                style={{ width: "170px", height: "auto", paddingTop: "1px" }}
              />
            </div>
          </div>
          {/*       <div class="supporter-item">
        <div class="">
          <img src="/assets/image/enjinstarter.png" alt="" class="mt-10" style="width: 170px;
                      height: auto;padding-top: 19px;">
        </div>
      </div>
      <div class="supporter-item">
        <div class="">
          <img src="/assets/image/uponly.png" alt="" class="mt-10" style="width: 170px;
                      height: auto;padding-top: 19px;">
        </div> */}
        </div>
      </section>
      {/*   <section class="container blog-card-section mt-5">
    <h4 class="text-center color-primary fw-bold text-uppercase py-5 title">
      LOREM IPSUM
    </h4>
    <div class="row">
      <div class="col-sm-6 mb-5 px-4">
        <div class="d-flex flex-column flex-md-row">
          <div class="blog-img-block d-flex align-items-center justify-content-center bg-3">
            <img src="/assets/image/Golden Shield.H01.2k.png" alt="">
          </div>
          <div class="blog-content-block text-left bg-2 p-5">
            <h4 class="color-primary fw-bold text-uppercase py-2 title">
              CAPTURE, BUY & SELL LAND
            </h4>
            <p class="color-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            </p>
          </div>
        </div>
      </div>
      <div class="col-sm-6 mb-5 px-4">
        <div class="d-flex flex-column flex-md-row">
          <div class="blog-img-block d-flex align-items-center justify-content-center bg-3">
            <img src="/assets/image/Golden Shield.H01.2k.png" alt="">
          </div>
          <div class="blog-content-block text-left bg-2 p-5">
            <h4 class="color-primary fw-bold text-uppercase py-2 title">
              CAPTURE, BUY & SELL LAND
            </h4>
            <p class="color-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            </p>
          </div>
        </div>
      </div>
      <div class="col-sm-6 mb-5 px-4">
        <div class="d-flex flex-column flex-md-row">
          <div class="blog-img-block d-flex align-items-center justify-content-center bg-3">
            <img src="/assets/image/Golden Shield.H01.2k.png" alt="">
          </div>
          <div class="blog-content-block text-left bg-2 p-5">
            <h4 class="color-primary fw-bold text-uppercase py-2 title">
              CAPTURE, BUY & SELL LAND
            </h4>
            <p class="color-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            </p>
          </div>
        </div>
      </div>
      <div class="col-sm-6 mb-5 px-4">
        <div class="d-flex flex-column flex-md-row">
          <div class="blog-img-block d-flex align-items-center justify-content-center bg-3">
            <img src="/assets/image/Golden Shield.H01.2k.png" alt="">
          </div>
          <div class="blog-content-block text-left bg-2 p-5">
            <h4 class="color-primary fw-bold text-uppercase py-2 title">
              CAPTURE, BUY & SELL LAND
            </h4>
            <p class="color-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            </p>
          </div>
        </div>
      </div>
    </div>
  </section> */}
      <section className="container blog-card-section mt-5">
        <h4
          className="text-center color-primary fw-bold text-uppercase py-5 title"
          style={{ paddingBottom: "2rem !important", letterSpacing: "0.5px" }}
        >
          NFT marketplace
        </h4>
        <div className="row">
          <div className="col-sm-6 mb-5 px-4">
            <div
              className="d-flex flex-column flex-md-row"
              style={{
                boxShadow:
                  "0 4px 8px 0 rgb(0 0 0 / 28%), 0 6px 20px 0 rgb(0 0 0 / 31%)",
              }}
            >
              <div className="blog-img-block d-flex align-items-center justify-content-center bg-3">
                <img src="/assets/image/land-tier-2.jpg" alt="" />
              </div>
              <div className="blog-content-block text-left bg-2 p-5">
                <h4
                  className="color-primary fw-bold py-2 title"
                  style={{ letterSpacing: "0.5px" }}
                >
                  Sell &amp; Rent Land
                </h4>
                <p className="color-2">
                  Turn every 11th captured land into a NFT. Use it in gameplay,
                  or sell it or give on rent to other players to earn passive
                  income!
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 mb-5 px-4">
            <div
              className="d-flex flex-column flex-md-row"
              style={{
                boxShadow:
                  "0 4px 8px 0 rgb(0 0 0 / 28%), 0 6px 20px 0 rgb(0 0 0 / 31%)",
              }}
            >
              <div className="blog-img-block d-flex align-items-center justify-content-center bg-3">
                <img src="/assets/image/artillery.jpg" alt="" />
              </div>
              <div className="blog-content-block text-left bg-2 p-5">
                <h4
                  className="color-primary fw-bold py-2 title"
                  style={{ letterSpacing: "0.5px" }}
                >
                  Tactically Deploy Artilleries
                </h4>
                <p className="color-2">
                  Increase your warfare's strength by using Artilleries on the
                  battlefields tactically.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 mb-5 px-4">
            <div
              className="d-flex flex-column flex-md-row"
              style={{
                boxShadow:
                  "0 4px 8px 0 rgb(0 0 0 / 28%), 0 6px 20px 0 rgb(0 0 0 / 31%)",
              }}
            >
              <div className="blog-img-block d-flex align-items-center justify-content-center bg-3">
                <img src="/assets/image/factory.jpg" alt="" />
              </div>
              <div className="blog-content-block text-left bg-2 p-5">
                <h4
                  className="color-primary fw-bold py-2 title"
                  style={{ letterSpacing: "0.5px" }}
                >
                  Mint NFTs
                </h4>
                <p className="color-2">
                  Mint your own Artilleries, Land, Leagues, War academies, and
                  Artillery factories depending upon qualifying game behavior.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 mb-5 px-4">
            <div
              className="d-flex flex-column flex-md-row"
              style={{
                boxShadow:
                  "0 4px 8px 0 rgb(0 0 0 / 28%), 0 6px 20px 0 rgb(0 0 0 / 31%)",
              }}
            >
              <div className="blog-img-block d-flex align-items-center justify-content-center bg-3">
                <img src="/assets/image/leagues.jpg" alt="" />
              </div>
              <div className="blog-content-block text-left bg-2 p-5">
                <h4
                  className="color-primary fw-bold py-2 title"
                  style={{ letterSpacing: "0.5px" }}
                >
                  Play in Leagues
                </h4>
                <p className="color-2">
                  Earn the most rewards and play in leagues along side players
                  from around the globe!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        className="container d-flex justify-content-center"
        style={{ marginTop: "-42px", marginBottom: "25px" }}
      >
        <a
          href="https://leagueofempires.io/marketplace"
          style={{ color: "white", textDecoration: "none" }}
        >
          <button className="btn btn-primary cus-btn-primary my-4 m-0-auto">
            <span>Visit Marketplace</span>
          </button>
        </a>
      </div>
      <section className="container advertise-section d-flex justify-content-center align-items-center mt-5">
        <div className="text-center">
          <h4>Expand your Territory</h4>
          <h1 className="fw-bold title">SELL OR GIVE ON RENT</h1>
          {/*       <h4 class="text-uppercase">
         FOR PASSIVE INCOME
      </h4> */}
          <p>
            Not in the mood to fight? Give your unused land to other players and
            earn rent as passive income!
          </p>
        </div>
      </section>
      <div className="container d-flex justify-content-center">
        <button
          className="btn btn-primary cus-btn-primary my-4 m-0-auto"
          id="open_feature_image_popup"
        >
          <span>Register Interest</span>
        </button>
      </div>
      <section className="container team-section" id="team_section">
        <h4 className="text-center color-primary fw-bold text-uppercase py-5 title">
          TEAM
        </h4>
        <div className="row">
          <div className="col-md-6 mb-5">
            <div className="d-flex">
              <img src="/assets/image/p-1.png" alt="" className="team-logo" />
              <div className="px-4">
                <h5 className="color-primary fw-bold title">Shahid Pervaiz</h5>
                <p className="color-2">
                  CEO &amp; Co-founder <br />
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-5">
            <div className="d-flex">
              <img src="/assets/image/p-5.png" alt="" className="team-logo" />
              <div className="px-4">
                <h5 className="color-primary fw-bold title">Trev Emerson</h5>
                <p className="color-2">
                  CTO &amp; Co-founder
                  <br />
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-5">
            <div className="d-flex">
              <img src="/assets/image/p-7.png" alt="" className="team-logo" />
              <div className="px-4">
                <h5 className="color-primary fw-bold title">Matti Huhtala</h5>
                <p className="color-2">
                  Game developer <br />
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-5">
            <div className="d-flex">
              <img src="/assets/image/p-2-1.png" alt="" className="team-logo" />
              <div className="px-4">
                <h5 className="color-primary fw-bold title">Faiz Ehsan</h5>
                <p className="color-2">
                  Games &amp; Blockchain enthusiast <br />
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-5">
            <div className="d-flex">
              <img src="/assets/image/p-9.png" alt="" className="team-logo" />
              <div className="px-4">
                <h5 className="color-primary fw-bold title">Alexis</h5>
                <p className="color-2">
                  Full stack &amp; Blockchain developer <br />
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-5">
            <div className="d-flex">
              <img src="/assets/image/p-6.png" alt="" className="team-logo" />
              <div className="px-4">
                <h5 className="color-primary fw-bold title">
                  Kristina Jankeviciute
                </h5>
                <p className="color-2">
                  Business Development <br />
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-5">
            <div className="d-flex">
              <img src="/assets/image/p-13.png" alt="" className="team-logo" />
              <div className="px-4">
                <h5 className="color-primary fw-bold title">Elton Pajussi</h5>
                <p className="color-2">
                  Game Developer <br />
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-5">
            <div className="d-flex">
              <img src="/assets/image/p-11.png" alt="" className="team-logo" />
              <div className="px-4">
                <h5 className="color-primary fw-bold title">Madis Brenberg</h5>
                <p className="color-2">
                  3D Artist <br />
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-5">
            <div className="d-flex">
              <img src="/assets/image/p-8.png" alt="" className="team-logo" />
              <div className="px-4">
                <h5 className="color-primary fw-bold title">Edith Bauer</h5>
                <p className="color-2">
                  Graphics &amp; UI Designer <br />
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-5">
            <div className="d-flex">
              <img src="/assets/image/p-12.png" alt="" className="team-logo" />
              <div className="px-4">
                <h5 className="color-primary fw-bold title">Matīss</h5>
                <p className="color-2">
                  Game developer <br />
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-5">
            <div className="d-flex">
              <img src="/assets/image/p-15.png" alt="" className="team-logo" />
              <div className="px-4">
                <h5 className="color-primary fw-bold title">Hon Vu</h5>
                <p className="color-2">
                  Marketing Lead <br />
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-5">
            <div className="d-flex">
              <img
                src="/assets/image/seedify.png"
                alt=""
                className="team-logo"
              />
              <div className="px-4">
                <h5 className="color-primary fw-bold title">Seedify</h5>
                <p className="color-2">
                  Advisory <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container-fluid full-advertise-section position-relative py-5">
        <div className="row advertise-text">
          <div className="col-md-7 col-sm-5"></div>
          <div className="col-md-5 col-sm-7 d-flex justify-content-center flex-column">
            <div className="text-content mb-sm-5 mb-1">
              <h4 className="color-primary fw-bold">ALLIANCES &amp; LEAGUES</h4>
              <p className="color-2 fs16">
                Chat and unite with friends to strategize in real-time MMO and
                dominate other empires. Play in leagues and earn even higher
                rewards!
              </p>
            </div>
            <div className="text-content">
              <h4 className="color-primary fw-bold">STRATEGIZE &amp; BUILD</h4>
              <p className="color-2 fs16">
                Deploy your own strategies and politics! Build &amp; customize
                your very own Empire. Collect resources, mint NFTs, loot various
                rewards, train your troops to conquer and grow your metaverse
                Empire!
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* <section class="container d-flex justify-content-center" style="margin-top:70px;">
<iframe width="812" height="457" src="https://www.youtube.com/embed/oPSctrqAjSo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</section> */}
      <section className="container mt-5 blog-section p-3">
        <div className="pr-4">
          <div className="row cart-block bg-4">
            <div className="col-lg-6 d-flex align-items-center justify-content-lg-start justify-content-center">
              <img
                src="/assets/image/map.png"
                alt=""
                className="blog-img blog-main-img"
              />
            </div>
            <div className="col-lg-6">
              <p className="fs-4 color-primary fw-bold title">
                Turn your gaming passion into income
              </p>
              <p>
                Players spend billions of $$ each year on in‑game items which
                they don't truly own. We believe there is a better way. Players
                deserve to be able to own and trade their in-game assets for
                real money. League of Empires is a play-to-earn game where
                players can turn their passion into real income.
              </p>
              <p>
                Besides the earning potential for the players, we have
                emphasized heavily on the quality of the game and the time
                spent. Afterall, players are the ones who run the ecosystem and
                they deserve better gaming experiences which most of the
                play-to-earn games lack. We are on a mission to change that and
                redefine the meanings of a blockchain game.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="container my-5 users-section bg-4 p-4">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4 my-4 px-5">
            <div className="d-flex align-items-center pb-2 mb-4 user-logo-name-block">
              <h5
                className="color-primary fw-bold px-3 mb-0 title"
                style={{ paddingLeft: "0px !important" }}
              >
                High Entertainment Value
              </h5>
            </div>
            <p className="fs16 color-2">
              League of Empires offers 3D Console quality graphics, immersive
              game mechanics and a real time world building system and battles.
            </p>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 my-4 px-5">
            <div className="d-flex align-items-center pb-2 mb-4 user-logo-name-block">
              <h5
                className="color-primary fw-bold px-3 mb-0 title"
                style={{ paddingLeft: "0px !important" }}
              >
                Play-to-Earn
              </h5>
            </div>
            <p className="fs16 color-2">
              Engage in the most awe inspiring wars whether you play solo or
              with alliances or in leagues, and earn real cypto and NFTs.
            </p>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 my-4 px-5">
            <div className="d-flex align-items-center pb-2 mb-4 user-logo-name-block">
              <h5
                className="color-primary fw-bold px-3 mb-0 title"
                style={{ paddingLeft: "0px !important" }}
              >
                Create &amp; Sell NFTs
              </h5>
            </div>
            <p className="fs16 color-2">
              Mint various types of NFTs like, Artilleries, Factories and Land.
              Use them in your gameplay or sell them on the Marketplace.
            </p>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 my-4 px-5">
            <div className="d-flex align-items-center pb-2 mb-4 user-logo-name-block">
              <h5
                className="color-primary fw-bold px-3 mb-0 title"
                style={{ paddingLeft: "0px !important" }}
              >
                PvP Battle Modes &amp; Leagues
              </h5>
            </div>
            <p className="fs16 color-2">
              Fight in PvP modes to secure the top ranks and climb up the
              leaderboards to reap higher rewards &amp; earnings.
            </p>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 my-4 px-5">
            <div className="d-flex align-items-center pb-2 mb-4 user-logo-name-block">
              <h5
                className="color-primary fw-bold px-3 mb-0 title"
                style={{ paddingLeft: "0px !important" }}
              >
                Real Time Strategy &amp; Control
              </h5>
            </div>
            <p className="fs16 color-2">
              Design your unique formation, deploy real time strategy, take full
              control of your troops and guide them to victory.
            </p>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4 my-4 px-5">
            <div className="d-flex align-items-center pb-2 mb-4 user-logo-name-block">
              <h5
                className="color-primary fw-bold px-3 mb-0 title"
                style={{ paddingLeft: "0px !important" }}
              >
                Form Alliances with Real Players
              </h5>
            </div>
            <p className="fs16 color-2">
              Chat with global players, make friends and form massive Alliances
              with players and win huge prizes together.
            </p>
          </div>
        </div>
      </section>
      {/*   <section class="container news_updates-section mt-5">
    <h4 class="color-primary fw-bold text-center mb-5 title">
      NEWS & UPDATES
    </h4>
    <div class="position-relative px-4">
      <div class="news_updates-slider">
        <div class="news-card">
          <img src="/assets/image/image-4.jpeg" class="w-100 news-card-img">
          <div class="bg-6 py-4 news-card-content">
            <div class="d-flex align-items-center justify-content-between px-3 mt-3">
              <div>
                <p class="fs16 mb-0">
                  <b>MOMO Farmer</b>
                </p>
                <p class="mb-0">Farm and Earn!</p>
              </div>
              <p class="color-primary fw-bold mb-0 cursor-pointer">Go></p>
            </div>
          </div>
        </div>
        <div class="news-card">
          <img src="/assets/image/image-4.jpeg" class="w-100 news-card-img">
          <div class="bg-6 py-4 news-card-content">
            <div class="d-flex align-items-center justify-content-between px-3 mt-3">
              <div>
                <p class="fs16 mb-0">
                  <b>MOMO Farmer</b>
                </p>
                <p class="mb-0">Farm and Earn!</p>
              </div>
              <p class="color-primary fw-bold mb-0 cursor-pointer">Go></p>
            </div>
          </div>
        </div>
        <div class="news-card">
          <img src="/assets/image/image-4.jpeg" class="w-100 news-card-img">
          <div class="bg-6 py-4 news-card-content">
            <div class="d-flex align-items-center justify-content-between px-3 mt-3">
              <div>
                <p class="fs16 mb-0">
                  <b>MOMO Farmer</b>
                </p>
                <p class="mb-0">Farm and Earn!</p>
              </div>
              <p class="color-primary fw-bold mb-0 cursor-pointer">Go></p>
            </div>
          </div>
        </div>
        <div class="news-card">
          <img src="/assets/image/image-4.jpeg" class="w-100 news-card-img">
          <div class="bg-6 py-4 news-card-content">
            <div class="d-flex align-items-center justify-content-between px-3 mt-3">
              <div>
                <p class="fs16 mb-0">
                  <b>MOMO Farmer</b>
                </p>
                <p class="mb-0">Farm and Earn!</p>
              </div>
              <p class="color-primary fw-bold mb-0 cursor-pointer">Go></p>
            </div>
          </div>
        </div>
        <div class="news-card">
          <img src="/assets/image/image-4.jpeg" class="w-100 news-card-img">
          <div class="bg-6 py-4 news-card-content">
            <div class="d-flex align-items-center justify-content-between px-3 mt-3">
              <div>
                <p class="fs16 mb-0">
                  <b>MOMO Farmer</b>
                </p>
                <p class="mb-0">Farm and Earn!</p>
              </div>
              <p class="color-primary fw-bold mb-0 cursor-pointer">Go></p>
            </div>
          </div>
        </div>
        <div class="news-card">
          <img src="/assets/image/image-4.jpeg" class="w-100 news-card-img">
          <div class="bg-6 py-4 news-card-content">
            <div class="d-flex align-items-center justify-content-between px-3 mt-3">
              <div>
                <p class="fs16 mb-0">
                  <b>MOMO Farmer</b>
                </p>
                <p class="mb-0">Farm and Earn!</p>
              </div>
              <p class="color-primary fw-bold mb-0 cursor-pointer">Go></p>
            </div>
          </div>
        </div>
        <div class="news-card">
          <img src="/assets/image/image-4.jpeg" class="w-100 news-card-img">
          <div class="bg-6 py-4 news-card-content">
            <div class="d-flex align-items-center justify-content-between px-3 mt-3">
              <div>
                <p class="fs16 mb-0">
                  <b>MOMO Farmer</b>
                </p>
                <p class="mb-0">Farm and Earn!</p>
              </div>
              <p class="color-primary fw-bold mb-0 cursor-pointer">Go></p>
            </div>
          </div>
        </div>
        <div class="news-card">
          <img src="/assets/image/image-4.jpeg" class="w-100 news-card-img">
          <div class="bg-6 py-4 news-card-content">
            <div class="d-flex align-items-center justify-content-between px-3 mt-3">
              <div>
                <p class="fs16 mb-0">
                  <b>MOMO Farmer</b>
                </p>
                <p class="mb-0">Farm and Earn!</p>
              </div>
              <p class="color-primary fw-bold mb-0 cursor-pointer">Go></p>
            </div>
          </div>
        </div>
      </div>
      <div class="news-slider_btn prev-btn cursor-pointer">
        <div class="prev">
        </div>
      </div>
      <div class="news-slider_btn next-btn cursor-pointer">
        <div class="next">
        </div>
      </div>
    </div>
  </section> */}
      <section className="container-fluid benefits-section pt-5 pb-5 mt-5">
        <div className="row my-4">
          <div className="col-sm-5 left-img-block d-none d-lg-block pl-0">
            <img src="/assets/image/bottom.png" alt="" className="w-100" />
          </div>
          <div className="col-sm-1"></div>
          <div className="col-sm-6 d-flex align-items-center">
            <div className="right-text-block">
              <h3 className="color-primary fw-bold text-uppercase mb-4 title">
                NFTs Integrated
              </h3>
              <div className="v-roadmap-text-block fs16 ps-5">
                <p className="fw-bold mb-2 fs-6">
                  Buy, sell and rent land for profit
                </p>
                <p className="mb-4 color-2">
                  Buy land, upgrade it, expand it to an empire and sell or rent
                  on the marketplace.
                </p>
                <p className="fw-bold mb-2 fs-6">War Academies</p>
                <p className="mb-4 color-2">
                  Gather enough resources and mint your own War Academies. Use
                  them in your game or sell them on the marketplace.
                </p>
                <p className="fw-bold mb-2 fs-6">Artillery Workshops</p>
                <p className="mb-4 color-2">
                  Mint new artilleries. Use them in your gameplay or sell them
                  on marketplace.
                </p>
                <p className="fw-bold mb-2 fs-6">Own Leagues</p>
                <p className="mb-4 color-2">
                  Be the owner of leagues on blockchain. Earn a guaranteed cut
                  of players' earnings.
                </p>
                <div className="d-flex social-images flex-wrap mt-5">
                  <img
                    src="/assets/image/googlePay.f28ffad8.svg"
                    alt=""
                    className="mb-1"
                  />
                  <img
                    src="/assets/image/appStore.ae68299d.svg"
                    alt=""
                    className="px-2 mb-1"
                  />
                  <img
                    src="/assets/image/windowPay.fba0e54a.svg"
                    alt=""
                    className="mb-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container-fluid contact-section bg-5 fs18">
        <div className="contact-section-content">
          <div className="px-2">
            <h3 className="m-0">Be the first to know</h3>
            <p>
              Join us on our social channels and never miss an important update
            </p>
          </div>
          <div className="contact-block cus-bg-primary d-flex justify-content-around align-items-center">
            <div className="text-center contact-item">
              <a
                href="https://discord.gg/CzpQzfv7KM"
                target="blank"
                className="sm-icons"
              >
                <img
                  src="/assets/image/discord-icon.svg"
                  alt=""
                  style={{ height: "46px" }}
                />
                <p className="mb-0 mt-2">Discord</p>
              </a>
            </div>
            <div className="text-center contact-item">
              <a
                href="https://t.me/leagueofempireschat"
                target="blank"
                className="sm-icons"
              >
                <img src="/assets/image/icon-telegram.png" alt="" />
                <p className="mb-0 mt-2">Telegram</p>
              </a>
            </div>
            <div className="text-center contact-item">
              <a
                href="https://twitter.com/LeagueofEmpires"
                target="blank"
                className="sm-icons"
              >
                <img src="/assets/image/twitter.png" alt="" />
                <p className="mb-0 mt-2">Twitter</p>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="footer container-fluid">
        <div className="container">
          <div className="d-flex align-items-center justify-content-center subscribe-block flex-wrap">
            <div className="d-flex align-items-center mb-1">
              <i className="fas fa-edit edit-icon" />
              <h4 className="text-uppercase m-0 mx-3">
                SUBSCRIBE TO OUR MAILING LIST
              </h4>
            </div>
            <div className="send-email-box d-flex mb-1 SubscribeBtn2Box">
              <input
                type="text"
                className="w-100"
                placeholder="Enter your email"
                id="SubscribeBtn2Text"
              />
              <button className="btn send-email-btn" id="SubscribeBtn2">
                Subscribe
              </button>
            </div>
            <br />
            <div
              id="SubscribeBtn2Msg"
              style={{
                color: "#FFF",
                display: "block",
                width: "100%",
                textAlign: "right",
                paddingRight: "15%",
              }}
            />
          </div>
          <div className="row mt-5">
            <div className="col-md-4">
              <img
                src="/assets/image/logos/league.png"
                alt=""
                className="footer-logo mb-2"
              />
              <p>
                League of Empires is the first ever true MMORTS game on
                blockchain. It offers a rich and immersive gameplay. Train and
                command your troops in stunning 3D wars! Form alliances, fortify
                your land, deploy different strategies and increase your
                defences to protect your treasures from enemies. Gather
                resources and train your army to build up your power and expand
                it into a mighty Empire.
              </p>
              <p>
                Experience blockchain gaming at its best! Challenge the world in
                multiplayer PvP style with a custom army of your favourite
                units. Think &amp; play as a general. Build artillery and
                tactically use it on battlefields or sell it on the marketplace.
                Battle through different conquests, enjoy an adrenaline-filled
                gameplay and earn $LOE tokens along the way!
              </p>
              <p>
                {/*             <u>
              LEARN MORE
            </u> */}
              </p>
            </div>
            <div className="col-md-2">
              <a
                href="https://leagueofempires.zendesk.com/hc/en-us/articles/5343776721053-Tokenomics-chart"
                className="sm-icons"
              >
                <p className="mb-2">Tokenomics</p>
              </a>
              <a
                href="https://leagueofempires.zendesk.com"
                target="blank"
                className="sm-icons"
              >
                <p className="mb-2">Whitepaper</p>
              </a>
              {/* <a href="/pitch-deck.pdf" target="blank" class="sm-icons" ><p class="mb-2">Pitch deck</p></a> */}
              <a href="/marketplace" className="sm-icons">
                <p className="mb-2">Marketplace</p>
              </a>
              <a href="/disclaimer" className="sm-icons">
                <p className="mb-2">Disclaimer</p>
              </a>
              <a
                href="https://leagueofempires.medium.com/"
                target="blank"
                className="sm-icons"
              >
                <p className="mb-2">Blog</p>
              </a>
            </div>
            <div className="col-md-6">
              <div className="touch-form text-center pt-4 pb-5 fs12 position-relative">
                <form id="FormWebsiteContacts" method="post">
                  <p className="fs-4 mb-0">GET IN TOUCH</p>
                  <p>We would love to hear from you</p>
                  <p className="fs-4 mt-0" id="notificationSection">
                    <span
                      style={{
                        color: "green",
                        border: "1px dotted green",
                        padding: "10px",
                      }}
                    >
                      Message sent successfully.
                    </span>
                  </p>
                  <input
                    type="text"
                    required
                    id="ContactUsName"
                    name="name"
                    placeholder="NAME"
                    className="w-100 contact-input-form mb-2"
                  />
                  <input
                    type="email"
                    required
                    id="ContactUsEmail"
                    name="email"
                    placeholder="EMAIL"
                    className="w-100 contact-input-form mb-2"
                  />
                  <textarea
                    name="message"
                    required
                    rows={6}
                    placeholder="MESSAGE"
                    className="w-100 contact-input-form p-2"
                    defaultValue={"\t\t\t\t"}
                  />
                  <button className="send-btn">
                    <span>Send</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="d-flex social-icons-group mb-5">
            <a
              href="https://twitter.com/LeagueofEmpires"
              target="blank"
              className="sm-icons"
            >
              <i
                className="fab fa-twitter"
                style={{ marginRight: "1.25rem" }}
              />
            </a>
            {/* <a href="http://linkedin.com" target="blank" class="sm-icons" ><i class="fab fa-linkedin" style="margin-right:1.25rem"></i></a> */}
            {/* <a href="http://discord.com" target="blank" class="sm-icons" ><i class="fab fa-discord" style="margin-right:1.25rem"></i></a> */}
            <a
              href="https://t.me/leagueofempireschat"
              target="blank"
              className="sm-icons"
            >
              <i
                className="fab fa-telegram"
                style={{ marginRight: "1.25rem" }}
              />
            </a>
            <a
              href="https://leagueofempires.medium.com/what-is-a-rts-real-time-strategy-game-428a82b1b6e3"
              target="blank"
              className="sm-icons"
            >
              <i
                className="fab fa-medium px-1"
                style={{ marginRight: "1.25rem" }}
              />
            </a>
            <a
              href="https://discord.gg/CzpQzfv7KM"
              target="blank"
              className="sm-icons"
            >
              <i className="fab fa-discord px-1" />
            </a>
          </div>
          {/* <hr> */}
          <div className="d-flex justify-content-between align-items-center flex-wrap copyright-block py-5">
            {/* <p class="mb-1">
          @ Copyright 2022. All rights reserved by <a href ="https://perus.eu/" target="_blank">Perus Limited.</a>
        </p> */}
            {/*         <P class="mb-1">
          HOME | PAGES | PORTFOLIO | BLOG | CONTACT
        </p> */}
          </div>
        </div>
      </section>
      <div id="feature_image_popup" className="rounded-4">
        <div className="row m-0">
          <div className="col-md-5 modal-image-section">
            <img src="/assets/image/image-popup.jpg" alt="" />
          </div>
          <div className="col-md-7 modal-content-section p-md-5 pb-sm-2 pt-4 text-center">
            <h4 className="mt-2 fw-bold title">Stay up-to-date</h4>
            <div className="box-shadow1 position-relative px-4 pt-4 pb-4 mt-5 rounded-4">
              <img
                src="/assets/image/mailbox.png"
                alt=""
                className="mainbox-img"
              />
              <h5 className="mt-2 fw-bold title">Join Mailing List</h5>
              <p className="text-start px-2 mb-4">
                Join our mailing list and be the first to know. <br /> We shall
                never spam or sell your email address to anyone.
              </p>
              <div className="d-flex justify-content-center m-email-box">
                <div className="skew-input-box d-flex">
                  <input
                    type="text"
                    className="w-100"
                    placeholder="Email address"
                    id="SubscribeBtn2PopupText"
                  />
                </div>
                <button
                  className="btn send-email-btn px-4"
                  id="SubscribeBtn2Popup"
                >
                  <span className="d-block fs14">Subscribe</span>
                </button>
              </div>
              <div
                id="SubscribeBtn2PopupMsg"
                style={{
                  color: "green",
                  display: "block",
                  width: "100%",
                  textAlign: "center",
                  paddingRight: "15%",
                }}
              />
            </div>
            <div className="social-contact-block box-shadow1 rounded-4 p-4 d-flex justify-content-center mt-4 flex-md-row flex-column mb-3">
              <div className="text-center contact-item p-2 cursor-pointer">
                <a
                  href="https://t.me/leagueofempireschat"
                  target="blank"
                  className="sm-icons"
                >
                  <img src="/assets/image/telegram.png" alt="" />
                  <p className="mb-0 mt-2 fs13" style={{ color: "#575757" }}>
                    Join us on Telegram
                  </p>
                </a>
              </div>
              <div className="text-center contact-item p-2 cursor-pointer">
                <a
                  href="https://discord.gg/CzpQzfv7KM"
                  target="blank"
                  className="sm-icons"
                >
                  <img src="/assets/image/twiter.png" alt="" />
                  <p className="mb-0 mt-2 fs13" style={{ color: "#575757" }}>
                    Join us on Discord
                  </p>
                </a>
              </div>
              <div className="text-center contact-item p-2 cursor-pointer">
                <a
                  href="https://twitter.com/LeagueofEmpires"
                  target="blank"
                  className="sm-icons"
                >
                  <img src="/assets/image/twiter.png" alt="" />
                  <p className="mb-0 mt-2 fs13" style={{ color: "#575757" }}>
                    Follow us on Twitter
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*
 <div id="youtube_video_popup" class="rounded-4">
    <div class="row m-0">
      <div class="col-md-12 modal-content-section p-md-5 pb-sm-2 pt-4 text-center">
			
			<iframe width="560" height="315" src="https://www.youtube.com/embed/63tTmItIX5s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>			
			
      </div>
    </div>
 </div>
*/}
    </>
  );
};

export default Home;
