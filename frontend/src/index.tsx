import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from "./components/Router";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {ToastContainer} from "react-toastify";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <ToastContainer
            autoClose={3000}
        />
        <Router/>
    </Provider>
);
