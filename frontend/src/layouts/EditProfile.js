import React from "react";

// components


import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import FooterAdmin from "../components/Footers/FooterAdmin.js";

// views

import Settings from "../admin/Settings.js";

export default function EditProfile() {
  return (
    <div className="bg-white">
      <AdminNavbar />
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12"></div>
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <Settings></Settings>
      <FooterAdmin />
      </div>
    </div>
  );
}
