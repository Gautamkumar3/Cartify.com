import React from 'react'
import { Route, Routes } from "react-router-dom";
import Cart from '../Components/Cart';
import Electronics from '../Components/Electronics'
import Error404 from '../Components/Error404';
import Home from '../Components/Home'
import Jewellary from '../Components/Jewellary'
import Login from '../Components/Login';
import Men from '../Components/Men'
import ProductDetails from '../Components/ProductDetails';
import Signup from '../Components/Signup';
import Women from '../Components/Women'
import PrivateRoute from './PrivateRoute';

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route path="/jewellary" element={<Jewellary />} />
            <Route path="/electronics" element={<Electronics />} />
            <Route path="/login" element={<Login />} />
            <Route path="/shoppingcart" element={<PrivateRoute><Cart /></PrivateRoute>} />
            <Route path="/shoppingcart/:id" element={<ProductDetails />} />
            <Route path="/*" element={<Error404 />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    )
}

export default AllRoutes
