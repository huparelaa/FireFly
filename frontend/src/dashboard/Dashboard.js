import React from "react";
import { SideBar } from "../components/SideBar";
import { SearchPeople } from "../components/SearchPeople";
import { FriendList } from "../components/FriendList";
import { UserInfo } from "../components/UserInfo";

function Dashboard() {
    return (
        <div className={"flex"} style={{width:"100%", height:"100%"}}>
            <SideBar />
            <SearchPeople />
            <FriendList />
            <div className={"ml-auto"}>
                <UserInfo className={"ml-auto"}/>
            </div>
        </div>
    )
}


export default Dashboard