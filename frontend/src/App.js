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
import Admin from "./layouts/Admin";
import Profile from "./profile/Profile"
import ProfileId from "./profile/ProfileId";
import Match from "./match/Match"
import Analytics from "./analytics/Analytics";
import Sample from "./home/test"
import Chat from "./chat/Chat";
import ChatContent from './chat/ChatContent'

function App() {
    return (
        
        <Provider store={store}>
            
            <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/sample" element={<Sample />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
                        <Route path="/activate/:uid/:token" element={<Activate />} />
                        <Route path="/games" element={<PreferenceForm/>} />
                        <Route path="/dashboard" element={<Dashboard/>} />
                        <Route path="/check-first-login" element={<AfterLogin/>} />
                        <Route path="/chat/*" element={<Chat/>}/>
                        <Route path="/chat/:id" element={<ChatContent/>}/>
                        <Route path="/match" element={<Match/>} />
                        <Route path="/Analytics" element={<Analytics/>} />
                        {/* <Route path="/forum" element={<Forum/>}/> */} 
                        <Route path="/admin/*" element={<Admin />} />  
                        <Route path="/profile/*" element={<Profile />} /> 
                        <Route path="/profile/:id"  element={<ProfileId />}/>
                    </Routes>
            </Router>   
        </Provider>
    );
}

export default App;