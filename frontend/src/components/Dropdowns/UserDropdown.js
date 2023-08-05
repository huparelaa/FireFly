import React, { useEffect, useState } from "react";
import axios from "../../apiConnection"
import { createPopper } from "@popperjs/core";
import { Link } from 'react-router-dom'
import ProfileIcon from '../../assets/profileicon.jpg'
import { useNavigate } from "react-router-dom";

const UserDropdown = (props) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "auto",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const config = {
    headers: {
      'Content-type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('access')}`,
      'Accept': 'application/json',
    }
  };
  useEffect(() => {
    async function getPhotoName() {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/get_name_photo/`, config)
        .then(response => {
          setUsuario(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
    getPhotoName()
  }, []);
  if (!usuario) {
    return (
      <div className="flex w-full items-center justify-end mr-10" id="contenedor">
        <div className="loaderPerfil" id="loaderPerfil"> </div>
        <p className="text-white"> Cargando usuario... </p>
      </div>
    )
  }
  return (
    <>
      <a
        className="text-blueGray-500 block"
        ref={btnDropdownRef}
        onClick={() => {
          navigate('/profile')
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 mr-10 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={usuario.photo ? `${process.env.REACT_APP_API_URL}${usuario.photo}` : ProfileIcon}
            />
          </span>
        </div>
      </a>
    </>
  );
};

export default UserDropdown;
