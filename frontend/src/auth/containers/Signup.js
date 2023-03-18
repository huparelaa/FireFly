import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import backgroundImage from "./../../assets/login.png"

import { connect } from 'react-redux'
import { signup } from '../actions/auth'

function Signup({ signup, isAuthenticated }) {
    const [accountCreated, setAccountCreated] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        re_password: ''
    })
    const { name, email, password, re_password } = formData
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = e => {
        e.preventDefault()

        if (password === re_password) {
            signup(name, email, password, re_password)
            setAccountCreated(true)
        }
    }

    if (isAuthenticated) {
        return <Navigate to="/" />
    }
    if (accountCreated) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <div
                className="absolute top-0 w-full h-full bg-center bg-cover"
                style={{
                    backgroundImage: `url(${backgroundImage})`
                }}
            >
            </div>
            <div
                className="container mx-auto px-4 h-full w-full">
                <div className="flex content-center items-center justify-center ">
                    <div className="w-full lg:w-4/12 px-4 pt-20">
                        <div
                            className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">

                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <div className="text-center mb-3">
                                    <h1 className="text-blueGray-600 font-bold">
                                        Sign Up
                                    </h1>
                                    <p>Create your account</p>
                                </div>
                                <form onSubmit={e => onSubmit(e)}>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Nombre
                                        </label>
                                        <input
                                            className="form-control border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            type="text"
                                            placeholder='Name*'
                                            name='name'
                                            value={name}
                                            onChange={e => onChange(e)}
                                            required
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Correo
                                        </label>
                                        <input
                                            className="form-control border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            type="email"
                                            placeholder='Email*'
                                            name='email'
                                            value={email}
                                            onChange={e => onChange(e)}
                                            required
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Contraseña
                                        </label>
                                        <input
                                            className="form-control border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            type="password"
                                            placeholder='Password*'
                                            name='password'
                                            value={password}
                                            onChange={e => onChange(e)}
                                            minLength="6"
                                            required
                                        />
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Confirmar contraseña
                                        </label>

                                        <input
                                            className="form-control border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            type="password"
                                            placeholder='Confirm Password*'
                                            name='re_password'
                                            value={re_password}
                                            onChange={e => onChange(e)}
                                            minLength="6"
                                            required
                                        />
                                    </div>

                                    <div className="text-center mt-6">
                                        <button
                                            className="bg-blueGray-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { signup })(Signup)