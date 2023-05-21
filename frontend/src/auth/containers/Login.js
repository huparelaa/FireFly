import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import UserApi from '../actions/auth'
import { useMediaQuery } from 'react-responsive'
import cloud1 from "../../assets/cloudbig.svg"
import cloud2 from "../../assets/cloudMiddle.svg"
import { Formik } from 'formik'
import * as Yup from "yup";

function Login() {
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1024px)' })
    const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
    const isMobile = useMediaQuery({ query: '(min-width: 360px) and (max-width: 767px)' });
    const navigate = useNavigate();

    const schema = Yup.object().shape({
        email: Yup.string()
            .required("El correo es requerido")
            .email("Correo invalido"),
        password: Yup.string()
            .required("La contraseña es requerida")
            .min(8, "La contraseña debe tener al menos 8 caracteres")
            .max(100, "La contraseña debe tener maximo 50 caracteres"),
    });

    function submit(data) {
        UserApi.login(data).then(res => {
            console.log(data);
            localStorage.setItem('access', res.data.access);
            localStorage.setItem('refreshToken', res.data.refresh);
            UserApi.verify().then(() => {
                Swal.fire({
                    timer: 1000,
                    timerProgressBar: true,
                    icon: 'success',
                    title: `Inicio de sesión exitoso`,
                    text: `Bienvenido a FireFly`,
                }).then(() => navigate('/check-first-login'));
            })
        }).catch(err => {
            console.log(err)
            Swal.fire({
                timer: 2000,
                timerProgressBar: true,
                icon: 'error',
                title: 'Error',
                text: err.response.data.password,
            })
        });
    }
    return (
        <div className="container mx-auto px-4 h-screen w-full flex items-center justify-center">
            <div className="clouds -z-20">
                <img src={cloud1} className='absolute right-2/4' alt=""/>
                <img src={cloud1} className='absolute top-0 right-1/4' alt=""/>
                <img src={cloud2} className='absolute left-3/4' alt=""/>
                <img src={cloud1} className='absolute top-0 right-3/4' alt=""/>
            </div>
            <Formik
                    validationSchema={schema}
                    initialValues={{ email: "", password: "" }}
                    onSubmit={submit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    }) => (
            <div className="bg-form-color lg:w-1/3 md:w-3/4 h-3/4 rounded-lg flex flex-col items-center py-16 shadow-2xl">
                <div className="text-center mb-3 flex flex-col items-center">
                        <h2 className="text-blueGray-600 font-bold text-white mt-2 mb-2 font-roboto text-2xl">
                            ¡Bienvenido de nuevo!
                        </h2>
                        <h3 className='text-white'>
                            ¡Nos alegra verte en FireFly!
                        </h3>
                </div>
                <form onSubmit={handleSubmit} className='w-5/6'>
                    <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2 text-white"
                            htmlFor="grid-password"
                        >
                            Correo
                        </label>
                        <input
                            className="text-white form-control border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-input_color rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
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
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2 text-white"
                            htmlFor="grid-password"
                        >
                            Contraseña
                        </label>
                        <input
                            className="text-white form-control border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-input_color rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            type="password"
                            name='password'
                            value={values.password}
                            onChange={handleChange}
                            minLength="8"
                        />
                        <p className="text-red-400 text-xs mt-2">
                            {errors.password && touched.password && errors.password}
                        </p>
                        <div className="w-3/4">
                            <p className="mt-3">
                                <Link to="/reset-password" className='text_help_color text-white underline hover:text-footer-text'>¿Olvidaste tu constraseña?</Link>
                            </p>
                        </div>
                    </div>
                    <div className="text-center mt-6">
                        <button
                            className="text-white bg-blueGray-800 active:bg-blueGray-600 bg-button-color-principal text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg hover:bg-button-color-pr-hov outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="submit"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>
                <div className="w-full flex justify-center">
                    <p className="mt-3 text-white">
                        ¿No tienes una cuenta? <Link to="/signup" className='underline hover:text-footer-text'>Regístrate</Link>
                    </p>
                </div>
            
            </div>
                )}
            </Formik>
        </div>
    )
}
export default Login