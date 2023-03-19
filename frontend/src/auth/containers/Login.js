import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../actions/auth'
import backgroundImage from "./../../assets/login.png"
import Footer from "../../components/Footers/Footer";

function Login({ login, isAuthenticated }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const { email, password } = formData
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = e => {
        e.preventDefault()
        login(email, password)
    }
    if (isAuthenticated) {
        return <Navigate to='/check-first-login' />
    }
    return (
        <>
            <div
                
            >
            </div>
            <div
                className="container mx-auto px-4 h-full w-full">
                <div className="flex content-center items-center justify-center ">
                    <div className="w-full lg:w-4/12 px-4 pt-40">
                        <div
                            className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">

                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <div className="text-center mb-3">
                                    <h1 className="text-blueGray-600 font-bold">
                                        Login
                                    </h1>
                                </div>
                                <form onSubmit={e => onSubmit(e)}>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Email
                                        </label>
                                        <input
                                            className="form-control border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            type="email"
                                            placeholder='email'
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
                                            Password
                                        </label>
                                        <input
                                            className="form-control border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                                            type="password"
                                            placeholder='Password'
                                            name='password'
                                            value={password}
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
                                <div className="flex flex-wrap mt-6 relative">
                                    <div className="w-1/2">
                                        <p className="mt-3">Don't have an account? <Link to="/signup">Sign up</Link></p>
                                    </div>
                                    <div className="w-1/2 text-right">
                                        <p className="mt-3">Forgot your password?  <Link to="/reset-password">Reset Password</Link></p>
                                    </div>
                                </div>
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
export default connect(mapStateToProps, { login })(Login)