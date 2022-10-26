import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import WebLayout from "@layouts/web";
import SignIn from "@pages/auth/SignIn";
import SignUp from "@pages/auth/SignUp";
import Verify from "@pages/auth/Verify";
import ForgetPassword from "@pages/auth/ForgetPassword";
import UpdatePassword from "@pages/auth/UpdatePassword";
import Home from "@pages/web/Home";
import Welcome from "@pages/web/Welcome";
import Claim from "@pages/web/Match/Claim";
import Marketplace from "@pages/web/Marketplace";
import BuyItem from "@pages/web/BuyItem";
import MyItems from "@pages/web/MyItems";
import Staking from "@pages/web/Staking";

import AdminSignIn from "@pages/admin/SignIn";
import AdminAttribute from "@pages/admin/Attribute";
import Error404Page from "@pages/error/Error404";
import { setCredential } from "@store/slices/auth.slice";

const MainRoutes = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    let isLoggined = !!auth.username;
    let isAdminLoggined = isLoggined && (auth.role == 'ADMIN' || auth.role == 'SUPER_ADMIN');

    const authRedirect = element => {
        if (isLoggined)
          return element;
        return <Navigate to="/login" />
    }

    const adminAuthRedirect = element => {
        if (isLoggined && (auth.role == 'ADMIN' || auth.role == 'SUPER_ADMIN'))
            return element;
        return <Navigate to="/login" />
    }

    const WebLayoutPage = element => {        
        return (
            <WebLayout>
                { element }
            </WebLayout>
        );
    }

    if (localStorage.jwtToken && !isLoggined) {
        try {
          const decoded = jwt_decode(localStorage.jwtToken);
          decoded.token = localStorage.jwtToken;
          isLoggined = true;
          dispatch(setCredential(decoded));
          
          return null;
        } catch (err) {
          
        }
    }

    return (
        <Router>
            <Routes>
                {/*<Route index element={<Home/>} />*/}
                <Route index element={ isLoggined ? <Navigate to="/welcome" /> : <Navigate to="/login" /> } />
                <Route path='/admin'>
                    <Route path='/admin' exact element={ isAdminLoggined ? <Navigate to='/admin/attribute' /> : <Navigate to="/admin/login" /> } />
                    <Route path='/admin/login' exact element={WebLayoutPage(<AdminSignIn />)} />
                    <Route path='/admin/attribute' element={adminAuthRedirect(WebLayoutPage(<AdminAttribute />))} />
                </Route>
                <Route path='/login' exact element={WebLayoutPage(<SignIn />)} />
                <Route path='/register' exact element={WebLayoutPage(<SignUp />)} />
                <Route path='/verify' exact element={WebLayoutPage(<Verify />)} />
                <Route path='/forgetpassword' exact element={WebLayoutPage(<ForgetPassword />)} />
                <Route path='/update-password' exact element={WebLayoutPage(<UpdatePassword />)} />
                <Route path='/welcome' exact element={authRedirect(WebLayoutPage(<Welcome />))} />
                {/*<Route path='/claim' exact element={authRedirect(WebLayoutPage(<Claim />))} />
                <Route path='/marketplace' exact element={WebLayoutPage(<Marketplace />)} />
                <Route path='/buy/:tokenId' element={WebLayoutPage(<BuyItem />)} />
                <Route path='/myitems' element={authRedirect(WebLayoutPage(<MyItems />))} />
                <Route path='/staking-LOE' element={authRedirect(WebLayoutPage(<Staking />))} />*/}
                <Route path='/*' element={WebLayoutPage(<Error404Page />)} />
            </Routes>
        </Router>
    );
};

export default MainRoutes;