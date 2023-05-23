import React, { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import UserApi from '../actions/auth'
import cloud1 from "../../assets/cloudbig.svg"
import cloud2 from "../../assets/cloudMiddle.svg"
import { Formik } from 'formik';
import * as Yup from 'yup';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import RadioButtonCheckedTwoToneIcon from '@mui/icons-material/RadioButtonCheckedTwoTone';

function Signup() { 
    const navigate = useNavigate();
    // min 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
    const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const schema = Yup.object().shape({
        name: Yup.string()
            .min(4, "El nombre de usuario requiere minimo 4 caracteres")
            .max(50, "El nombre de usuario requiere maximo 50 caracteres")
            .required("El nombre de usuario es requerido"),
        lastname: Yup.string()
            .min(4, "El apellido de usuario requiere minimo 4 caracteres")
            .max(50, "El apellido de usuario requiere maximo 50 caracteres")
            .required("El apellido de usuario es requerido"),
        email: Yup.string()
            .required("El correo es requerido")
            .email("Correo invalido"),
        password: Yup
            .string()
            .matches(passwordRules, { message: "Crea una contraseña más segura por favor" })
            .required("La contraseña es requerida"),
        re_password: Yup
            .string()
            .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
            .required("Por favor confirma tu contraseña"),
        })
    function submit(data){
        if(localStorage.getItem('access')){
            localStorage.setItem('access', '')
            localStorage.setItem('refreshToken', '')
        } 
        UserApi.signup(data)
        .then(res => {
            Swal.fire({
                timer: 3000,
                timerProgressBar: true,
                icon: 'success',
                title: `Registro exitoso`,
                text: `¡Te llegará un correo de activación a tu correo!`,
            }).then(() => navigate('/login'));
        }).catch(err => {
            console.log(err.response)
            const email = err.response.data.email[0]  
            if(email === "user account with this email already exists."){
                Swal.fire({
                    timer: 2000,
                    timerProgressBar: true,
                    icon: 'error',
                    title: 'Error',
                    text: 'Tu correo ya existe, por favor ingresa otro',
                })
            } else {
                Swal.fire({
                    timer: 2000,
                    timerProgressBar: true,
                    icon: 'error',
                    title: 'Error',
                    text: err.response.data,
                })
            }
        });
    }
    return ( 
        <div className="container h-screen w-full flex items-center justify-center">
            <div className="clouds -z-20">
                <img src={cloud1} className='absolute left-0' alt=""/>
                <img src={cloud2} className='absolute top-0' alt=""/>
                <img src={cloud2} className='absolute right-0' alt=""/>
                <img src={cloud2} className='absolute top-1/3 right-1/4' alt=""/>
            </div>
            <Formik
                    validationSchema={schema}
                    initialValues={{ name: "", lastname: "", email:"", password:"", re_password:"" }}
                    onSubmit={submit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                    }) => (
            <div className="bg-form-color lg:w-2/6 md:w-3/4 h-auto rounded-lg flex flex-col items-center py-10 shadow-2xl">
                <div className="text-center mb-3 flex flex-col items-center">
                        <h2 className="text-blueGray-600 font-bold text-white mt-2 mb-2 font-roboto text-2xl">
                            ¡Comienza la aventura!
                        </h2>
                </div>
                <form noValidate onSubmit={handleSubmit} className='w-10/12'>
                    <div className="relative w-full mb-3 mr-5">
                        <label
                            className="text-white block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Nombre <span className='text-red-600'>*</span>
                        </label>
                        <input
                            id="name"
                            className="text-white border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-input_color rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            type="text"
                            name='name'
                            value={values.name}
                            onChange={handleChange}
                        />
                        <p className="text-red-400 text-xs mt-2">
                            {errors.name && touched.name && errors.name}
                        </p>
                    </div>
                    <div className="relative w-full mb-3">
                        <label
                            className="text-white block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Apellido <span className='text-red-600'>*</span>
                        </label>
                        <input
                            id="lastname"
                            className="text-white border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-input_color rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            type="text"
                            name='lastname'
                            value={values.lastname}
                            onChange={handleChange}
                        />
                        <p className="text-red-400 text-xs mt-2">
                            {errors.lastname && touched.lastname && errors.lastname}
                        </p>
                    </div>
                    <div className="relative w-full mb-3">
                        <label
                            className="text-white block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Correo <span className='text-red-600'>*</span>
                        </label>
                        <input
                            id="email"
                            className="text-white border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-input_color rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            type="email"
                            name='email'
                            value={values.email}
                            onChange={handleChange}
                        />
                            <p className="text-red-400 text-xs mt-2">
                                {errors.email && touched.email && errors.email}
                            </p>
                    </div>
                    <div className="relative w-full mb-3">
                        <label
                            className="text-white block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Contraseña <span className='text-red-600'>*</span>
                        </label>
                        <Tooltip title={
                                        <Fragment>
                                            <Stack direction='column' width="100%" spacing={2} justifyContent="flex-start" alignItems="flex-center" paddingY={2}>
                                                <Typography fontSize={12}>
                                                    <RadioButtonCheckedTwoToneIcon sx={{ fontSize: 15, color: "blue" }} /> La contraseña debe tener al menos 8 caracteres
                                                </Typography>
                                                <Typography fontSize={12}>
                                                    <RadioButtonCheckedTwoToneIcon sx={{ fontSize: 15, color: "blue" }} /> La contraseña debe tener una letra mayuscula
                                                </Typography>
                                                <Typography fontSize={12}>
                                                    <RadioButtonCheckedTwoToneIcon sx={{ fontSize: 15, color: "blue" }} /> La contraseña debe tener maximo 100 caracteres
                                                </Typography>
                                                <Typography fontSize={12}>
                                                    <RadioButtonCheckedTwoToneIcon sx={{ fontSize: 15, color: "blue" }} /> La contraseña debe tener una letra minuscula
                                                </Typography>
                                                <Typography fontSize={12}>
                                                    <RadioButtonCheckedTwoToneIcon sx={{ fontSize: 15, color: "blue" }} /> La contraseña debe tener un numero
                                                </Typography>
                                            </Stack>
                                        </Fragment>
                                    } placement="right">
                        <input
                            id="password"
                            className="text-white border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-input_color rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            type="password"
                            name='password'
                            value={values.password}
                            onChange={handleChange}
                        />

                        </Tooltip>
                        <p className="text-red-400 text-xs mt-2">
                            {errors.password&& touched.password && errors.password}
                        </p>
                    </div>
                    <div className="relative w-full mb-3">
                        <label
                            className="text-white block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Confirmar contraseña <span className='text-red-600'>*</span>
                        </label>
                        <input
                            id="re_password"
                            className="text-white border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-input_color rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            type="password"
                            name='re_password'
                            value={values.re_password}
                            onChange={handleChange}
                        />
                            <p className="text-red-400 text-xs mt-2">
                                {errors.re_password && touched.re_password && errors.re_password}
                            </p>
                    </div>
                    <div className="text-center mt-6">
                        <button
                            className="bg-button-color-principal text-white hover:bg-button-color-pr-hov active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="submit"
                        >
                            Continuar
                        </button>
                    </div>
                </form>
                <div className="w-full flex justify-center">
                    <p className="mt-3 text-white">
                        <Link to="/login" className='underline hover:text-footer-text'>¿Ya tienes una cuenta?</Link>
                    </p>
                </div>
            </div>
            )}
            </Formik>
        </div>
    )
}

export default Signup 