import React from "react";
import ChatSideBar from "./ChatSideBar";
import { SideBar } from "../components/SideBar";

const Chat = () => {
  
  return (
    <div className="flex" style={{ width: "95%", height: "95%" }}>
    <SideBar />
      <ChatSideBar/>
      <div className="flex items-center justify-center flex-1 text-white text-4xl font-bold p-10">
        Todas las buenas historias comienzan en una taberna... <br/>O en un chat, ¿por qué no?
      </div>
    </div>
  );
};

export default Chat;
