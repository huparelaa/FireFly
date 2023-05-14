import React, { useState, Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import UserApi from '../actions/auth'
import cloud1 from "/home/julianv/FireFly/frontend/src/assets/cloudbig.svg"
import cloud2 from "/home/julianv/FireFly/frontend/src/assets/cloudMiddle.svg"
import { Formik } from 'formik';
import * as Yup from 'yup';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import RadioButtonCheckedTwoToneIcon from '@mui/icons-material/RadioButtonCheckedTwoTone';
import RadioButtonUncheckedTwoToneIcon from '@mui/icons-material/RadioButtonUncheckedTwoTone';

function Signup() { 
    const [isRequired, setRequired] = useState(false);
    const [isMinLength, setMinLength] = useState(false);
    const [isUppercase, setUppercase] = useState(false);
    const [isMaxLength, setMaxLength] = useState(false);
    const [isLowercase, setLowercase] = useState(false);
    const [isSpecial, setSpecial] = useState(false);
    const [isNumber, setNumber] = useState(false);
    const navigate = useNavigate();

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
        password: Yup.string().when('password', (password, field) => {
            if (password == null) {
                setRequired(false)
                return field.required()
            } else {
                setRequired(true)
            }
        }).when('password', (password, field) => {
            if (password[0]?.length <= 8) {
                setMinLength(false)
                return field.min(8)
            } else {
                setMinLength(true)
            }
        }).when('password', (password, field) => {
            if (password[0]?.length >= 100) {
                setMaxLength(false)
                return field.min(100)
            } else {
                setMaxLength(true)
            }
        }).when('password', (password, field) => {
            if (!(/[A-Z]+/.test(password))) {
                setUppercase(false)
                return field.matches(/[A-Z]+/)
            } else {
                setUppercase(true)
            }
        }).when('password', (password, field) => {
            if (!(/[a-z]+/.test(password))) {
                setLowercase(false)
                return field.matches(/[a-z]+/)
            } else {
                setLowercase(true)
            }
        }).when('password', (password, field) => {
            if (!(/[@$!%*#?&.]+/.test(password))) {
                setSpecial(false)
                return field.matches(/[@$!%*#?&]+/)
            } else {
                setSpecial(true)
            }
        }).when('password', (password, field) => {
            if (!(/[0-9]/.test(password))) {
                setNumber(false)
                return field.matches(/[0-9]/)
            } else {
                setNumber(true)
            }
        }),
    }, ["password", "password"]);
    function submit(data){
        console.log(data);
        if (data["password"] === data["re_password"]) {
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
                console.log(err)
                Swal.fire({
                    timer: 2000,
                    timerProgressBar: true,
                    icon: 'error',
                    title: 'Error',
                    text: err.response.data,
                })
            });
        }
    }
    return (
        <div className="container h-screen w-full flex items-center justify-center">
            <div className="clouds -z-20">
                <img src={cloud1} className='absolute left-0'/>
                <img src={cloud2} className='absolute top-0'/>
                <img src={cloud2} className='absolute right-0'/>
                <img src={cloud2} className='absolute top-1/3 right-1/4'/>
            </div>
            <Formik
                    validationSchema={schema}
                    initialValues={{ 'name': "", 'lastname': "", 'email':"", 'password':"", 're_password':"" }}
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
                            required
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
                            required
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
                            required
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
                                                    {(isMinLength && isRequired) ? <RadioButtonCheckedTwoToneIcon sx={{ fontSize: 15, color: "green" }} /> : <RadioButtonUncheckedTwoToneIcon sx={{ fontSize: 15, color: "red" }} />} Contraseña debe tener al menos 8 caracteres
                                                </Typography>
                                                <Typography fontSize={12}>
                                                    {(isUppercase && isRequired) ? <RadioButtonCheckedTwoToneIcon sx={{ fontSize: 15, color: "green" }} /> : <RadioButtonUncheckedTwoToneIcon sx={{ fontSize: 15, color: "red" }} />} Contraseña debe tener una letra mayuscula
                                                </Typography>
                                                <Typography fontSize={12}>
                                                    {(isMaxLength && isRequired) ? <RadioButtonCheckedTwoToneIcon sx={{ fontSize: 15, color: "green" }} /> : <RadioButtonUncheckedTwoToneIcon sx={{ fontSize: 15, color: "red" }} />} Contraseña debe tener maximo 100 caracteres
                                                </Typography>
                                                <Typography fontSize={12}>
                                                    {(isLowercase && isRequired) ? <RadioButtonCheckedTwoToneIcon sx={{ fontSize: 15, color: "green" }} /> : <RadioButtonUncheckedTwoToneIcon sx={{ fontSize: 15, color: "red" }} />} Contraseña debe tener una letra minuscula
                                                </Typography>
                                                <Typography fontSize={12}>
                                                    {(isSpecial && isRequired) ? <RadioButtonCheckedTwoToneIcon sx={{ fontSize: 15, color: "green" }} /> : <RadioButtonUncheckedTwoToneIcon sx={{ fontSize: 15, color: "red" }} />} Contraseña debe tener un simbolo
                                                </Typography>
                                                <Typography fontSize={12}>
                                                    {(isNumber && isRequired) ? <RadioButtonCheckedTwoToneIcon sx={{ fontSize: 15, color: "green" }} /> : <RadioButtonUncheckedTwoToneIcon sx={{ fontSize: 15, color: "red" }} />} Contraseña debe tener un numero
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
                            required
                        />
                        </Tooltip>
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
                            required
                        />
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