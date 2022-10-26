import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Menu, MenuItem } from '@mui/material';
import CollectionsIcon from '@mui/icons-material/Collections';
import LogoutIcon from '@mui/icons-material/Logout';

import { Web3Context } from "@store/providers/Web3Provider";
import { destoryCredential } from "@store/slices/auth.slice";
import StakingIcon from "@assets/images/logos/staking.png";

const DropdownMenu = (props) => {
    const { disconnectWallet } = useContext(Web3Context);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { anchorEl, onClose } = props;

    const handleMyItemsNavigate = () => {
        navigate('/myitems');
        onClose();
    }

    const handleStakingNavigate = () => {
        navigate('/staking-LOE');
        onClose();
    }

    const handleLogout = () => {
        disconnectWallet();
	    dispatch(destoryCredential());
        onClose();
    };

    return (
        <Menu anchorEl={ anchorEl } open={ Boolean(anchorEl) } onClose={ onClose }>
            {/*<MenuItem onClick={ handleMyItemsNavigate }><CollectionsIcon sx={{ mr: 1 }} /> My Items</MenuItem>
            <MenuItem onClick={ handleStakingNavigate }>
                <img src={ StakingIcon } style={{ marginRight: '8px', width: '20px', height: '20px' }} alt="Staking" /> Stake Token
            </MenuItem>*/}
            <MenuItem onClick={ handleLogout }><LogoutIcon sx={{ mr: 1 }} /> Logout</MenuItem>
        </Menu>
    );
}

export default DropdownMenu;