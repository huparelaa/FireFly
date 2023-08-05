import React, {useState, Fragment} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import RadioButtonCheckedTwoToneIcon from '@mui/icons-material/RadioButtonCheckedTwoTone';
import cloud1 from "../../assets/cloudbig.svg"
import cloud2 from "../../assets/cloudMiddle.svg"
import UserApi from '../actions/auth'
import { Formik } from 'formik';
import Swal from 'sweetalert2'
import * as Yup from 'yup';

function ResetPasswordConfirm() { 
    const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const routeParams = useParams()
    const navigate = useNavigate();
    const schema = Yup.object().shape({
        new_password: Yup
            .string()
            .matches(passwordRules, { message: "Por favor, crea una contraseña más segura" })
            .required("Se requiere una contraseña"),
        re_new_password: Yup
            .string()
            .oneOf([Yup.ref("new_password"), null], "Las contraseñas deben coincidir")
            .required("Por favor, confirma tu contraseña"),
    })
    function submit(data){
        const uid = routeParams.uid
        const token = routeParams.token
        const dataNew = {uid, token, ...data}
        UserApi.retsetPasswordConfirm(dataNew)
        .then(res => {
            Swal.fire({
                timer: 3000,
                timerProgressBar: true,
                icon: 'success',
                title: `Cambio de contraseña exitoso`,
            }).then(() => navigate('/login'));
        }).catch(err => {
            console.error(err)
            Swal.fire({
                timer: 2000,
                timerProgressBar: true,
                icon: 'error',
                title: 'Error',
                text: err.response.data,
            })
        })
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
                    initialValues={{ 'new_password':"", 're_new_password':"" }}
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
                                ¡Ingresa tu nueva contraseña!
                        </h2>
                </div>
                <form noValidate onSubmit={handleSubmit} className='w-10/12'>
                <div className="relative w-full mb-3">
                        <label
                            className="text-white block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Nueva contraseña <span className='text-red-600'>*</span>
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
                            name='new_password'
                            value={values.new_password}
                            onChange={handleChange}
                            required
                        />
                        </Tooltip>
                        <p className="text-red-400 text-xs mt-2">
                            {errors.new_password && touched.new_password && errors.new_password}
                        </p>
                    </div>
                    <div className="relative w-full mb-3">
                        <label
                            className="text-white block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Confirma contraseña <span className='text-red-600'>*</span>
                        </label>
                        <input
                            id="re_new_password"
                            className="text-white border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-input_color rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            type="password"
                            name='re_new_password'
                            value={values.re_new_password}
                            onChange={handleChange}
                            required
                        />
                        <p className="text-red-400 text-xs mt-2">
                            {errors.re_new_password && touched.re_new_password && errors.re_new_password}
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
            </div>
            )}
            </Formik>
        </div>
    )
}
export default ResetPasswordConfirm