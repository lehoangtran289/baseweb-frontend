import React from 'react';
import './App.css';
import {Slide, ToastContainer} from "react-toastify";
import Routes from "./Routes";
import {BrowserRouter as Router} from "react-router-dom";

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
