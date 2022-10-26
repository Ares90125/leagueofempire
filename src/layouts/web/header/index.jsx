import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AuthDropdownMenu from "@components/Auth/DropdownMenu";

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const auth = useSelector(state => state.auth);

    const handleDropdownMenu = e => {
        setAnchorEl(e.currentTarget);
    }

    const handleCloseDropdown = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <section className="header bg-7">
                <div className="m2-mx-width mx-auto d-flex align-items-center justify-content-between">
                    <Link to="/"><img src="assets/image/logos/league.png" alt="" className="logo" /></Link>
                    {/*
                    <div className="menu d-flex align-items-center">
                        <Link to="/marketplace">
                            <div className="menu-item ">
                                Marketplace
                            </div>
                        </Link>
                        <Link to="/claim">
                            <div className="menu-item ">
                                Game
                            </div>
                        </Link>
                    </div>
                    */}
		            {
	                    auth.username
	                        ?
	                            <button className="btn btn-primary cus-btn-primary btn-sm me-2" onClick={ handleDropdownMenu }>
	                                <span>{ auth.username }</span>
	                            </button>
	                        :
	                            <Link className="btn btn-primary cus-btn-primary btn-sm me-2" to="/login">
	                                <span>Sign In</span>
	                            </Link>
                    }
                    <AuthDropdownMenu anchorEl={ anchorEl } onClose={ handleCloseDropdown } />
                </div>
            </section>
        </>
    )
}

export default Header;