import React from "react";
import Logo from "../assets/Logo-principal.svg"
import { AiOutlineInstagram } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillTwitterSquare } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'

function FooterComponent(){
  return (
    <div
    className="bottom-0 absolute w-full top-0 left-0 right-0 overflow-hidden"
    style={{ transform: "translateZ(0)", height: "579px"  }}
  >
      <div className="grid grid-cols-12 p-16 gap-x-4 font-roboto text-white box-border h-auto"> 
          <div className="flex flex-col col-span-3">
            <img src={Logo} className="w-48"/>
            <div className="flex w-full  mt-10 text-4xl ">
                <Link className="mr-4"><span><AiOutlineInstagram/></span></Link>
                <Link className="mr-4"><span><AiFillFacebook/></span></Link>
                <Link className="mr-4"><span><AiFillTwitterSquare/></span></Link>
                <Link className="mr-4"><span ><AiFillYoutube/></span></Link>
                <Link className="mr-4"><span><FaTiktok/></span></Link>
            </div>
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-2 flex flex-col">
            <h5 className="text-purple-400 font-bold">Explorar</h5>
            <Link to="#" className="mt-4">
              Item 1
            </Link >
            <Link to="#" className="mt-4">
              Item 2
            </Link>
            <Link to="#" className="mt-4">
              Item 3
            </Link>
          </div>
          <div className="col-span-2 flex flex-col">
            <h5 className="text-purple-400 font-bold">Seguridad</h5>
            <Link to="#" className="mt-4">
              Item 1
            </Link >
            <Link to="#" className="mt-4">
              Item 2
            </Link>
            <Link to="#" className="mt-4">
              Item 3
            </Link>
            <Link to="#" className="mt-4">
              Item 4
            </Link>
            <Link to="#" className="mt-4">
              Item 5
            </Link>
            <Link to="#" className="mt-4">
              Item 6
            </Link>
            <Link to="#" className="mt-4">
              Item 7
            </Link>
          </div>
          <div className="col-span-2 flex flex-col">
            <h5 className="text-purple-400 font-bold">Soporte</h5>
            <Link to="#" className="mt-4">
              Item 1
            </Link >
            <Link to="#" className="mt-4">
              Item 2
            </Link>
            <Link to="#" className="mt-4">
              Item 3
            </Link>
            <Link to="#" className="mt-4">
              Item 4
            </Link>
            <Link to="#" className="mt-4">
              Item 5
            </Link>
          </div>
          <div className="col-span-2 flex flex-col">
            <h5 className="text-purple-400 font-bold">Acerca de nosotros</h5>
            <Link to="#" className="mt-4">
              Item 1
            </Link >
            <Link to="#" className="mt-4">
              Item 2
            </Link>
            <Link to="#" className="mt-4">
              Item 3
            </Link>
          </div>
      </div>
      <hr className="w-11/12 px-16 mb-10 mx-16"/>
      <div className="grid grid-cols-12 gap-x-5 w-full px-16 text-white font-roboto ">
          <p className="col-span-2">© 2023 FireFly</p>
          <p className="col-start-8 col-end-10"><Link>Política de privacidad</Link></p>
          <p className="col-start-10 col-span-3"><Link>Términos y condiciones</Link></p>
      </div>
  </div>
  )
}
function FooterComponentT(){
  return (
    <div
    className="bottom-0 absolute w-full top-0 left-0 right-0 overflow-hidden"
    style={{ transform: "translateZ(0)", height: "782px"  }}
  >
      <div className="grid grid-cols-8 p-16 gap-x-4 font-roboto text-white box-border h-auto"> 
          <div className="flex flex-col col-span-3 row-span-2">
            <img src={Logo} className="w-48"/>
            <div className="flex w-full mt-10 text-4xl ">
                <Link className="mr-4"><span><AiOutlineInstagram/></span></Link>
                <Link className="mr-4"><span><AiFillFacebook/></span></Link>
                <Link className="mr-4"><span><AiFillTwitterSquare/></span></Link>
                <Link className="mr-4"><span ><AiFillYoutube/></span></Link>
                <Link className="mr-4"><span><FaTiktok/></span></Link>
            </div>
          </div>
          <div className="col-span-1 row-span-2"></div>
          <div className="col-span-2 flex flex-col">
            <h5 className="text-purple-400 font-bold">Explorar</h5>
            <Link to="#" className="mt-4">
              Item 1
            </Link >
            <Link to="#" className="mt-4">
              Item 2
            </Link>
            <Link to="#" className="mt-4">
              Item 3
            </Link>
          </div>
          <div className="col-span-2 flex flex-col">
            <h5 className="text-purple-400 font-bold">Seguridad</h5>
            <Link to="#" className="mt-4">
              Item 1
            </Link >
            <Link to="#" className="mt-4">
              Item 2
            </Link>
            <Link to="#" className="mt-4">
              Item 3
            </Link>
            <Link to="#" className="mt-4">
              Item 4
            </Link>
            <Link to="#" className="mt-4">
              Item 5
            </Link>
            <Link to="#" className="mt-4">
              Item 6
            </Link>
            <Link to="#" className="mt-4">
              Item 7
            </Link>
          </div>
          <div className="col-span-2 flex flex-col mt-5">
            <h5 className="text-purple-400 font-bold">Soporte</h5>
            <Link to="#" className="mt-4">
              Item 1
            </Link >
            <Link to="#" className="mt-4">
              Item 2
            </Link>
            <Link to="#" className="mt-4">
              Item 3
            </Link>
            <Link to="#" className="mt-4">
              Item 4
            </Link>
            <Link to="#" className="mt-4">
              Item 5
            </Link>
          </div>
          <div className="col-span-2 flex flex-col mt-5">
            <h5 className="text-purple-400 font-bold">Acerca de nosotros</h5>
            <Link to="#" className="mt-4">
              Item 1
            </Link >
            <Link to="#" className="mt-4">
              Item 2
            </Link>
            <Link to="#" className="mt-4">
              Item 3
            </Link>
          </div>
      </div>
      <hr className="w-11/12 px-16 mb-10 mx-16"/>
      <div className="grid grid-cols-8 gap-x-5 w-full px-16 text-white font-roboto ">
          <p className="col-span-3">© 2023 FireFly</p>
          <p className="col-start-5 col-end-8"><Link>Política de privacidad</Link></p>
          <p className="col-start-9 col-span-10"><Link>Términos y condiciones</Link></p>
      </div>
  </div>
  )
}
function FooterComponentM(){
  return (
    <div
    className="bottom-0 absolute w-full top-0 left-0 right-0 overflow-hidden pt-5"
    style={{ transform: "translateZ(0)", height: "908px"  }}
  >
      <div className="grid grid-cols-4 p-10 gap-x-4 font-roboto text-white box-border h-auto "> 
          <div className="flex flex-col col-span-3 mb-14">
            <img src={Logo} className="w-48 mb-5"/>
            <div className="flex w-full mt-2 text-2xl ">
                <Link className="mr-4"><span><AiOutlineInstagram/></span></Link>
                <Link className="mr-4"><span><AiFillFacebook/></span></Link>
                <Link className="mr-4"><span><AiFillTwitterSquare/></span></Link>
                <Link className="mr-4"><span ><AiFillYoutube/></span></Link>
                <Link className="mr-4"><span><FaTiktok/></span></Link>
            </div>
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-2 flex flex-col">
            <h5 className="text-purple-400 font-bold">Explorar</h5>
            <Link to="#" className="mt-4">
              Item 1
            </Link >
            <Link to="#" className="mt-4">
              Item 2
            </Link>
            <Link to="#" className="mt-4">
              Item 3
            </Link>
          </div>
          <div className="col-span-2 flex flex-col">
            <h5 className="text-purple-400 font-bold">Seguridad</h5>
            <Link to="#" className="mt-4">
              Item 1
            </Link >
            <Link to="#" className="mt-4">
              Item 2
            </Link>
            <Link to="#" className="mt-4">
              Item 3
            </Link>
            <Link to="#" className="mt-4">
              Item 4
            </Link>
            <Link to="#" className="mt-4">
              Item 5
            </Link>
            <Link to="#" className="mt-4">
              Item 6
            </Link>
            <Link to="#" className="mt-4">
              Item 7
            </Link>
          </div>
          <div className="col-span-2 flex flex-col">
            <h5 className="text-purple-400 font-bold mt-6">Soporte</h5>
            <Link to="#" className="mt-4">
              Item 1
            </Link >
            <Link to="#" className="mt-4">
              Item 2
            </Link>
            <Link to="#" className="mt-4">
              Item 3
            </Link>
            <Link to="#" className="mt-4">
              Item 4
            </Link>
            <Link to="#" className="mt-4">
              Item 5
            </Link>
          </div>
          <div className="col-span-2 flex flex-col mt-6">
            <h5 className="text-purple-400 font-bold">Acerca de nosotros</h5>
            <Link to="#" className="mt-4">
              Item 1
            </Link >
            <Link to="#" className="mt-4">
              Item 2
            </Link>
            <Link to="#" className="mt-4">
              Item 3
            </Link>
          </div>
      </div>
      <hr className="w-11/12 px-16 mb-10 mx-4"/>
      <div className="grid grid-cols-4 gap-x-5 w-full px-8 text-white font-roboto text-xs ">
          <p className="col-span-4">© 2023 FireFly</p>
          <p className="col-start-8 col-end-10"><Link>Política de privacidad</Link></p>
      </div>
  </div>
  )
}

function Footer() {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1024px)' })
  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  
  return (
    <div>
      <footer className="relative bg-footer-color">
      {isDesktopOrLaptop && (
        <FooterComponent />
      )}
      {isTablet && (
        <FooterComponentT/>
      )}
      {isMobile && (
        <FooterComponentM/>
      )}
      </footer >
    </div>
  );
}

export { Footer }