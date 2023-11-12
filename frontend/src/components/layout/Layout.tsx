import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";
import Footer from "../shared/footer/Footer";
import Header from "../shared/header/Header";

const Layout = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='page'>
            <Header/>
            <main className='container'>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;