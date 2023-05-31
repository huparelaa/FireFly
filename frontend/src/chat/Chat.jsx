import React from "react";
import ChatSideBar from "./ChatSideBar";
import { SideBar } from "../components/SideBar";

const Chat = () => {
  return (
    <div className="flex h-screen w-screen">
      <SideBar />
      <ChatSideBar/>
      <div className="flex items-center justify-center flex-1 text-white text-5xl font-bold p-10">
        Todas las buenas historias comienzan en una taberna... <br />
        O en FireFly
      </div>
    </div>
  );
};

export default Chat;
