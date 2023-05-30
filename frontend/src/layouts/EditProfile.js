import React from "react";
import { SideBar } from "../components/SideBar";

// components


import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import { Footer } from "../home/Footer.js";

// views

import Settings from "../admin/Settings.js";

export default function EditProfile() {
  return (
    <div className="bg-dark-purple flex">
      <SideBar />
      <div>
        <div className="relative bg-lightBlue-600 md:pt-32"></div>
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Settings></Settings>
          <Footer />
        </div>
      </div>
    </div>
  );
}
