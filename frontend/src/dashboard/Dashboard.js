import React from "react";
import { SideBar } from "../components/SideBar";
import { FriendList } from "../components/FriendList";
import { Header } from "../components/Header" 
import { SuggestedGames } from "../components/Cards/CardSuggestions"

function Dashboard() {
    return (
        <div className="flex w-full h-full">
        <div className="absolute top-96 left-24"> 
                <SuggestedGames/>
            </div>
        <SideBar />
        <div className="flex flex-col w-full">
            <div className="flex justify-center mt-7 h-16">
                <Header />
            </div>
            
            <div className="w-full h-full flex flex-col items-end">
                <div className="flex flex-1 w-2/5">
                    <div className="flex flex-col items-end w-full h-full ml-auto">       
                            <FriendList/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Dashboard