import React, { useState, useEffect } from "react";
import { changeUserInfo } from "../../auth/actions/auth"
import axios from "axios";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import defaultProfile from "../../assets/defaultProfile.jpg"

// components
export default function CardSettings(props) {

  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      props.setNewFotoUsuario(false);
      const image = e.target.files[0];
      const reader = new FileReader();
      setImage(image);
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        props.setFotoUsuario(imageDataUrl);
        props.setNewFotoUsuario(true);
        setSelectedImage(imageDataUrl);
      };

      reader.readAsDataURL(image);
    }
  };

  const navigate = useNavigate()
  var { nombre, edad, aboutMe, setNombre, setEdad, setAboutMe } = props
  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    about_me: "",
    interests: "",
    achievements_and_trophies: "",
    codePhoto: "",
  });

  const { name, age, about_me, interests, achievements_and_trophies } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/profile/change_info/`, { 'name': name, 'age': parseInt(age), 'about_me': about_me, 'interests': interests, 'achievements_and_trophies': achievements_and_trophies }, config)

      if (props.fotoUsuario) {

        const config2 = {
          headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json',
          }
        }

        const formData = new FormData();
        formData.append("profile_photo", image, image.name);
        //formData.append("profile_photo", newFile);
        const resProfilePhoto = await axios.post(`${process.env.REACT_APP_API_URL}/api/profile/upload_profile_photo/`, formData, config2);
        console.log(resProfilePhoto);
      }

      Swal.fire({
        timer: 3000,
        timerProgressBar: true,
        icon: 'success',
        title: `¡Se actualizaron los cambios de manera exitosa!`,
      })
      navigate('/profile');
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

  useEffect(() => {
    setFormData({
      name: props.nombre,
      age: props.edad,
      about_me: props.aboutMe,
      interests: props.intereses,
      achievements_and_trophies: props.logros_y_trofeos,
      codePhoto: "",
    });
  }, []);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 bg-white">
        <div className="rounded-t mb-0 px-6 py-6 ">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Mi perfil</h6>
            <button
              className="bg-lightBlue-500 active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              Ajustes
            </button>
          </div>
        </div>
        <div className="flex flex-wrap justify-center">
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 m-2 font-bold uppercase">
            Foto de perfil:
          </h6>
          <input
            accept="image/*"
            type="file"
            onChange={imageChange}
          />
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
                    placeholder="Nombre"
                    name='name'
                    value={name}
                    autoComplete="off"
                    onChange={
                      e => {
                        props.setNombre(e.target.value);
                        onChange(e)
                      }
                    }
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
                    placeholder="Edad"
                    name="age"
                    value={age}
                    min={12}
                    max={99}
                    onChange={(e) => {
                      props.setEdad(e.target.value);
                      onChange(e);
                    }
                    }
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
                    descripción sobre tí
                  </label>
                  <textarea
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Descripción básica"
                    rows="4"
                    name='about_me'
                    value={about_me}
                    onChange={
                      (e) => {
                        props.setAboutMe(e.target.value);
                        onChange(e)
                      }
                    }
                  ></textarea>
                </div>
              </div>
            </div>
            <hr className="mt-6 border-b-1 border-blueGray-300" />
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Intereses
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    tus intereses
                  </label>
                  <textarea
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Comparte tus intereses para los demás usuarios puedan verlos"
                    rows="4"
                    name='interests'
                    value={interests}
                    onChange={
                      (e) => {
                        props.setIntereses(e.target.value);
                        onChange(e)
                      }
                    }
                  ></textarea>
                </div>
              </div>
            </div>
            <hr className="mt-6 border-b-1 border-blueGray-300" />
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Logros y Trofeos
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    tus logros y trofeos
                  </label>
                  <textarea
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Comparte los logros y trofeos de los que estes más orgulloso para los demás usuarios puedan verlos"
                    rows="4"
                    name='achievements_and_trophies'
                    value={achievements_and_trophies}
                    onChange={
                      (e) => {
                        props.setLogros_y_trofeos(e.target.value);
                        onChange(e)
                      }
                    }
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