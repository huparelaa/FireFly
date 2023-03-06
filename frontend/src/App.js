import React from "react";
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from "./auth/containers/Home";
import ResetPassword from "./auth/containers/ResetPassword";
import ResetPasswordConfirm from "./auth/containers/ResetPasswordConfirm"
import Login from "./auth/containers/Login"
import Signup from "./auth/containers/Signup";
import Activate from "./auth/containers/Activate";
import Layout from "./auth/hocs/Layout"

import { Provider } from "react-redux";
import store from "./store";


function App() {
    return (
        <Provider store={store}>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
                        <Route path="/activate/:uid/:token" element={<Activate />} />
                    </Routes>
                </Layout>
            </Router>   
        </Provider>
    );
}

export default App;