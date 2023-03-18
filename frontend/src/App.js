import React from "react";
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from "./home/Home";
import ResetPassword from "./auth/containers/ResetPassword";
import ResetPasswordConfirm from "./auth/containers/ResetPasswordConfirm"
import Login from "./auth/containers/Login"
import Signup from "./auth/containers/Signup";
import Activate from "./auth/containers/Activate";
import PreferenceForm from "./games/GameList"
import Dashboard from './dashboard/Dashboard'
import { AfterLogin } from "./auth/Middle/AfterLogin";
import { Provider } from "react-redux";
import store from "./store";


function App() {
    return (
        <Provider store={store}>
            <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
                        <Route path="/activate/:uid/:token" element={<Activate />} />
                        <Route path="/games" element={<PreferenceForm/>} />
                        <Route path="/dashboard" element={<Dashboard/>} />
                        <Route path="/check-first-login" element={<AfterLogin/>} />
                    </Routes>
            </Router>   
        </Provider>
    );
}

export default App;