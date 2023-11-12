import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./screens/home/Home";
import Catalog from "./screens/catalog/Catalog";
import Category from "./screens/category/Category";
import Register from "./screens/auth/Register";
import Profile from "./screens/profile/Profile";
import Favorites from "./screens/favorites/Favorites";
import Cart from "./screens/cart/Cart";
import Product from "./screens/product/Product";
import NotFound from "./screens/not-found/NotFound";
import Layout from "./layout/Layout";
import Search from "./screens/search/Search";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {fetchLoginMe} from "../store/auth/auth.action";
import Login from "./screens/auth/Login";

const Router = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchLoginMe())
    }, [dispatch])

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/favorites" element={<Favorites/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/security/register" element={<Register/>}/>
                    <Route path="/security/login" element={<Login/>}/>
                    <Route path="/category" element={<Catalog/>}/>
                    <Route path="/category/:href" element={<Category/>}/>
                    <Route path="/category/:href/:href" element={<Product/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router