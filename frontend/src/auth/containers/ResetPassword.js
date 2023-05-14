import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import UserApi from '../actions/auth'
import cloud1 from "../../assets/cloudbig.svg"
import cloud2 from "../../assets/cloudMiddle.svg"
import { Formik } from 'formik'
import * as Yup from "yup";

const ResetPassword = () => {
    const navigate = useNavigate();
    const schema = Yup.object().shape({
        email: Yup.string()
            .required("El correo es requerido")
            .email("Correo invalido"),
    });

    function submit(data) {
        UserApi.resetPassword(data)
        .then(() => {
            Swal.fire({
                timer: 5000,
                timerProgressBar: true,
                icon: 'success',
                title: '¡Correo enviado con éxito!',
                text:
                'Se ha enviado un correo electrónico a tu cuenta con las instrucciones para restablecer la contraseña. Puede que el correo llegue a spam.',
            });
        })
        .then(() => navigate('/login'));
    };
    return (
        <div className="container mx-auto px-4 h-screen w-full flex items-center justify-center">
            <div className="clouds -z-20">
                <img src={cloud1} className='absolute left-0'/>
                <img src={cloud2} className='absolute top-0'/>
                <img src={cloud2} className='absolute right-0'/>
                <img src={cloud2} className='absolute top-1/3 right-1/4'/>
            </div>
            <Formik
                    validationSchema={schema}
                    initialValues={{ email: ""}}
                    onSubmit={submit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                    }) => (
            <div className="bg-form-color lg:w-1/3 md:w-3/4 h-45vh rounded-lg flex flex-col items-center py-16 shadow-2xl">
                <div className="text-center mb-3 flex flex-col items-center">
                    <h2 className="text-blueGray-600 font-bold text-white mt-2 mb-2 font-roboto text-2xl">
                        ¿Olvidaste tu contraseña?
                    </h2>
                    <h3 className="text-white">Restaura tu contraseña aquí.</h3>
                </div>
                <form onSubmit={handleSubmit} className="w-5/6">
                    <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                            style={{ color: 'white' }}
                        >
                            Correo
                        </label>
                        <input
                            className="text-white form-control border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-input_color rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                        />
                        <p className="text-red-400 text-xs mt-2">
                            {errors.email && touched.email && errors.email}
                        </p>
                    </div>
                    <div className="text-center mt-6">
                        <button
                            className="text-white bg-blueGray-800 active:bg-blueGray-600 bg-button-color-principal text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg hover:bg-button-color-pr-hov outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="submit"
                        >
                            Restaurar contraseña
                        </button>
                        <Link to="/login">
                            <button
                                className="text-white bg-blueGray-800 active:bg-blueGray-60 bg-button-cancel-pass text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg hover:bg-black-rgba outline-none focus:outline-none mr-1 mb-1 mt-3 w-full ease-linear transition-all duration-150"
                            >
                                Cancelar
                            </button>
                        </Link>
                    </div>
                </form>
                <div className="w-full flex justify-center"></div>
            </div>
            )}
            </Formik>
        </div>
    );
};

export default ResetPassword
