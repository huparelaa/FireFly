import React from "react";
import { SideBar } from "../components/SideBar";

// components



// views

import Settings from "../admin/Settings.js";

export default function EditProfile() {
  return (
    <div className="bg-dark-purple flex">
      <div className="bg-dark-purple flex">
        <SideBar />
      </div>

      <div>
        <div className="bg-dark-purple flex">
          <div className="relative bg-lightBlue-600 md:pt-32 ">
          </div>
        </div>
        <div className=""><div className="px-4 md:px-10 mx-auto w-full -m-24"></div>
          <div className="bg-dark-purple flex">
            <Settings></Settings>
          </div>


        </div>
      </div>
    </div>
  );
}
