import React from "react";
import { SideBar } from "../components/SideBar";
import { Link } from "react-router-dom";

import { FriendList } from "../components/FriendList";
import { Header } from "../components/Header"
import { SuggestedGames } from "../components/Cards/CardSuggestions"
import Banner from "../assets/bannerdc.gif"

function Dashboard() {
    return (
        <div className="flex w-full h-full">
            <SideBar />
            <div className="flex flex-col w-full ml-20">
                <div className="flex justify-center mt-7 h-16">
                    <Header />
                </div>
                <div className="flex h-full w-full">
                    <div className="w-4/5">
                        <div className="w-full h-auto flex justify-center items-center">
                            <Link to="https://discord.gg/SPdaPuhdKH" target="_blank">
                                <img
                                    src={Banner}
                                    alt="coverphoto"
                                    className="pointer-events-none"
                                />
                            </Link>
                        </div>
                        <SuggestedGames />
                    </div>
                    <div className="w-1/5">
                        <FriendList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard