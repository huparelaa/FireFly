import { useState } from "react";
import { NavLink } from "react-router-dom";

import control from "../assets/control.png"
import home from "../assets/home.svg"
import match from "../assets/match.svg"
import group from "../assets/group.svg"
import chat from "../assets/chat.svg"
import logout from "../assets/logout.svg"

function SideBar() {
    const [open, setOpen] = useState(false);
    const Menus = [
        { title: "Dashboard", src: home, path: "/dashboard" },
        { title: "Match", src: match, path: "/match" },
        { title: "Forum", src: group, path: "/forum"},
        { title: "Chat", src: chat, path: "/chat" },
        { title: "Logout", src: logout, gap: true, path: "/logout"},
        { title: "Analytics", src: "Chart" },
    ];
    return (
        <div className="flex">
            <div
                className={` ${
                open ? "w-72" : "w-20 "
                } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
            >
            <img
                src={control}
                className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
                border-2 rounded-full  ${!open && "rotate-180"}`}
                onClick={() => setOpen(!open)}
            />
            <div className="flex gap-x-4 items-center">
                <img
                src="./src/assets/logo.png"
                className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
                }`}
            />
            <h1
                className={`text-white origin-left font-medium text-xl duration-200 ${
                !open && "scale-0"
            }`}> Designer </h1>
            </div>
            <ul className="pt-6"> 
                {Menus.map((Menu, index) => (
                    <NavLink
                        to = {Menu.path}
                        key={index}
                        className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                        ${Menu.gap ? "mt-9" : "mt-2"} ${
                            index === 0 && "bg-light-white"
                        } `} >
                            <img src= {`${Menu.src}`} />
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                {Menu.title}
                            </span>
                    </NavLink>
                ))}
            </ul>
            </div>
            <div className="h-screen flex-1 p-7">
                    <h1 className="text-2xl font-semibold ">Home Page</h1>
                </div>
        </div>
    )
} 

export { SideBar }