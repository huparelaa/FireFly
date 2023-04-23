import React from "react";
import { SideBar } from "../components/SideBar";
import { FriendList } from "../components/FriendList";
import { Header } from "../components/Header" 

function Dashboard() {
    return (
        <div className="flex w-full h-full">
            <SideBar />
            <div className="flex flex-col w-full">
                <div className="flex justify-center mt-7 h-16">
                    <Header />
                </div>
                <div className="flex flex-1">
                    <div className="flex flex-col justify-center items-end w-full h-full" >
                        <div className="h-full w-1/4 flex items-center justify-center">
                            <FriendList/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard