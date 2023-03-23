import React from "react";

import UserDropdown from "../Dropdowns/UserDropdown";
import { Link } from 'react-router-dom'
import FireFlyPng from './FireFlyPng.png'

export default function Navbar() {
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}

          <p className="text-sm uppercase hidden lg:inline-block font-semibold">
            <Link to="/dashboard">
              <img src={FireFlyPng} alt="FireFly" style={{ position: 'relative', top: '10px' , height: '50px' }} />
            </Link>
          </p>

          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
