import React from "react";
import { SideBar } from "../components/SideBar";
import { SearchPeople } from "../components/SearchPeople";
import { FriendList } from "../components/FriendList";
import { UserInfo } from "../components/UserInfo";

function Dashboard(){
    return (
        <div className="flex">
            <SideBar/>
            <div className="flex">
                <SearchPeople/>
                <UserInfo/>
                <FriendList />
            </div>
        </div>
    )
}


export default Dashboard