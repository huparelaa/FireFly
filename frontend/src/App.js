import React from "react";
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from "./home/Home";
import Helper from "./home/Helper";
import Comunidad from "./home/Comunidad"
import ResetPassword from "./auth/containers/ResetPassword";
import ResetPasswordConfirm from "./auth/containers/ResetPasswordConfirm"
import Login from "./auth/containers/Login"
import Signup from "./auth/containers/Signup";
import Activate from "./auth/containers/Activate";
import Logout from "./auth/containers/Logout";
import PreferenceForm from "./games/GameList"
import Dashboard from './dashboard/Dashboard'
import { AfterLogin } from "./auth/Middle/AfterLogin";
import { Provider } from "react-redux";
import store from "./store";
import EditProfile from "./layouts/EditProfile";
import Profile from "./profile/Profile.jsx"
import ProfileId from "./profile/ProfileId.jsx";
import Profile2 from "./profile/Profile"
import ProfileId2 from "./profile/ProfileId";
import Match from "./match/Match"
import Analytics from "./analytics/Analytics";
import Chat from "./chat/Chat";
import ChatContent from './chat/ChatContent'
import ChatRoomContent from "./chat/ChatRoomContent";
import Page404 from "./Page404";


function App() {
    return (
        <Provider store={store}>
            <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/help" element={<Helper/>} />
                        <Route path="/comunidad" element={<Comunidad/>} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
                        <Route path="/activate/:uid/:token" element={<Activate />} />
                        <Route path="/logout" element={<Logout/>}/>
                        <Route path="/games" element={<PreferenceForm/>} />
                        <Route path="/dashboard" element={<Dashboard/>} />
                        <Route path="/check-first-login" element={<AfterLogin/>} />
                        <Route path="/chat/*" element={<Chat/>}/>
                        <Route path="/chat/:id" element={<ChatContent/>}/>
                        <Route path="/chatroom/*" element={<Chat/>}/>
                        <Route path="/chatroom/:id" element={<ChatRoomContent/>}/>
                        <Route path="/match" element={<Match/>} />
                        <Route path="/Analytics" element={<Analytics/>} />
                        {/* <Route path="/forum" element={<Forum/>}/> */} 
                        <Route path="/profile/*" element={<Profile />} /> 
                        <Route path="/profile/edit" element={<EditProfile />} />  
                        <Route path="/profile/:id"  element={<ProfileId />}/>
                        <Route path="/profile2/*" element={<Profile2 />} /> 
                        <Route path="/profile2/:id"  element={<ProfileId2 />}/>
                        <Route path="*" element={<Page404 />} />
                    </Routes>
            </Router>   
        </Provider>
    );
}

export default App;