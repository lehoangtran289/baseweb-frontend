import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Router} from "react-router";
import {Slide, ToastContainer} from "react-toastify";
import Routes from "./Routes";

function App() {
    return (
        <Router>
            <Routes/>
            <ToastContainer
                position="bottom-left"
                transition={Slide}
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Router>
    );
}

export default App;
