/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import FireFlyPng from '../../assets/Logo-principal.svg'

// components


export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link to="/dashboard">
              <img src={FireFlyPng} alt="FireFly" style={{ position: 'relative', top: '10px' , height: '50px' }} />
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
