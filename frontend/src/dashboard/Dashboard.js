import React from "react";
import { SideBar } from "../components/SideBar";
import { SearchPeople } from "../components/SearchPeople";
import { FriendList } from "../components/FriendList";
import { UserInfo } from "../components/UserInfo";

function Dashboard(){
    return (
        <div>
            <SideBar/>
            <SearchPeople />
            <FriendList />
            <UserInfo/>
        </div>
    )
}


export default Dashboard