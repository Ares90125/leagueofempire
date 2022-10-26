const Footer = () => {
    return (
        <section className="footer container-fluid">
            <div className="container">
                <div className="d-flex align-items-center justify-content-center subscribe-block flex-wrap">
                    <div className="d-flex align-items-center mb-1">
                        <i className="fas fa-edit edit-icon"></i>
                        <h4 className="text-uppercase m-0 mx-3">
                            SUBSCRIBE TO OUR MAILING LIST
                        </h4>
                    </div>
                    <div className="send-email-box d-flex mb-1 SubscribeBtn2Box">
                        <input type="text" className="w-100" placeholder="Enter your email" id="SubscribeBtn2Text" />
                        <button className="btn send-email-btn" id="SubscribeBtn2">
                            Subscribe
                        </button>
                    </div>
                    <br />
                    <div id='SubscribeBtn2Msg' style={{ color: '#FFF', display: 'block', width: '100%' , textAlign: 'right', paddingRight: '15%' }}></div>
                </div>
                
                <div className="row mt-5">
                    <div className="col-md-4">
                        <img src="./assets/image/logos/league.png" alt="" className="footer-logo mb-2" />
                        <p>
                            League of Empires is the first ever true MMORTS game on blockchain. It offers a rich and immersive gameplay. Train and command your troops in stunning 3D wars! Form alliances, fortify your land, deploy different strategies and increase your defences to protect your treasures from enemies. Gather resources and train your army to build up your power and expand it into a mighty Empire.
                        </p>
                        <p>
                            Experience blockchain gaming at its best! Challenge the world in multiplayer PvP style with a custom army of your favourite units. Think & play as a general. Build artillery and tactically use it on battlefields or sell it on the marketplace. Battle through different conquests, enjoy an adrenaline-filled gameplay and earn $LEGA tokens along the way!
                        </p>
                        <p>

                        </p>
                    </div>
                    <div className="col-md-2">
                        <a href="/tokenomics" className="sm-icons" ><p className="mb-2">Tokenomics</p></a>
                        <a href="https://whitepaper.leagueofempires.io" target="blank" className="sm-icons" ><p className="mb-2">Whitepaper</p></a>
                        <a href="/pitch-deck.pdf" target="blank" className="sm-icons" ><p className="mb-2">Pitch deck</p></a>
                        <a href="/marketplace" className="sm-icons" ><p className="mb-2">Marketplace</p></a>
                        <a href="/disclaimer" className="sm-icons" ><p className="mb-2">Disclaimer</p></a>
                        <a href="https://leagueofempires.medium.com/" target="blank" className="sm-icons" ><p className="mb-2">Blog</p></a>
                    </div>
                    <div className="col-md-6">
                        <div className="touch-form text-center pt-4 pb-5 fs12 position-relative">
                            <form id="FormWebsiteContacts" method="post">
                                <p className="fs-4 mb-0">
                                    GET IN TOUCH
                                </p>
                                <p>
                                    We would love to hear from you
                                </p>
                                <p className="fs-4 mt-0 d-none" id="notificationSection">
                                    <span style={{ color: 'green', border: '1px dotted green', padding: '10px' }}>Message sent successfully.</span>
                                </p>
                                <input type="text" required id="ContactUsName" name="name" placeholder="NAME" className="w-100 contact-input-form mb-2" />
                                
                                <input type="email" required id="ContactUsEmail" name="email" placeholder="EMAIL" className="w-100 contact-input-form mb-2" />
                                <textarea name="message" required id="" rows="6" placeholder="MESSAGE" className="w-100 contact-input-form p-2"></textarea>
                                <button className="send-btn">
                                    <span>Send</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="d-flex social-icons-group mb-5">
                    <a href="https://twitter.com/LeagueofEmpires" target="blank" className="sm-icons" ><i className="fab fa-twitter" style={{ marginRight: '1.25rem' }}></i></a>
                    <a href="https://t.me/leagueofempireschat" target="blank" className="sm-icons" ><i className="fab fa-telegram" style={{ marginRight: '1.25rem' }}></i></a>
                    <a href="https://leagueofempires.medium.com/what-is-a-rts-real-time-strategy-game-428a82b1b6e3" target="blank" className="sm-icons" ><i className="fab fa-medium px-1" style={{ marginRight: '1.25rem' }}></i></a>
                    <a href="https://discord.gg/leagueofempires" target="blank" className="sm-icons" ><i className="fab fa-discord px-1"></i></a>

                </div>
                
                <div className="d-flex justify-content-between align-items-center flex-wrap copyright-block py-5">
                    <p className="mb-1">
                    @ Copyright 2022. All rights reserved by <a href ="https://perus.eu/" target="_blank" rel="noreferrer">Perus Limited.</a>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Footer;