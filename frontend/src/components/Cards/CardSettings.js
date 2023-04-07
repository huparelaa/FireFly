import React, { useState } from "react";
import { changeUserInfo } from "../../auth/actions/auth"
import axios from "axios";
import Swal from 'sweetalert2'

// components

export default function CardSettings(props) {
  var { nombre, edad, aboutMe, setNombre, setEdad, setAboutMe } = props
  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    about_me: "",
  });
  const { name, age, about_me } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  console.log(formData);
  const onSubmit = async (e) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json',
      }
    }
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/profile/change_info/`, { 'name': name, 'age': parseInt(age), 'about_me': about_me }, config)
      console.log(res.data);
      Swal.fire({
        timer: 3000,
        timerProgressBar: true,
        icon: 'success',
        title: `Se actualizaron los cambios de manera exitosa!!`,
      })
    } catch (error) {
      Swal.fire({
        timer: 3000,
        timerProgressBar: true,
        icon: 'fail',
        title: `Opps ocurrio un error al actualizar los cambios`,
      })
      console.error(error);
    }
  };
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Mi perfil</h6>
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              Settings
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={(e) => onSubmit(e)}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Información Personal
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="David Gonzalez"
                    name='name'
                    value={name}
                    onChange={
                      e => {
                        setNombre(e.target.value);
                        onChange(e)
                      }
                    }
                    required
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Edad
                  </label>
                  <input
                    type="number"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="19"
                    name="age"
                    value={age}
                    min={12}
                    max={99}
                    onChange={(e) => {
                      setEdad(e.target.value);
                      onChange(e);
                    }
                    }
                    required
                  />
                </div>
              </div>
            </div>
            <hr className="mt-6 border-b-1 border-blueGray-300" />
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              About Me
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    descripcion sobre ti
                  </label>
                  <textarea
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Amante de los videojuegos tipo shooters como fortnite, csgo y valorant"
                    rows="4"
                    name='about_me'
                    value={about_me}
                    onChange={
                      (e) => {
                        setAboutMe(e.target.value);
                        onChange(e)
                      }
                    }
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <button
              className="bg-blueGray-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              type="submit"
            >
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
