import React, { useState } from 'react'
import { Link, Navigate} from 'react-router-dom'

import { connect } from 'react-redux'
import { login } from '../actions/auth'

function Login({ login, isAuthenticated }) { 
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const { email, password } = formData
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = e => {
        e.preventDefault()
        login(email, password)
    }

    if(isAuthenticated) {
        return <Navigate to="/" />
    }

    return (
        <div className='container mt-5'>
            <h1>Sign in</h1>
            <p>Sign into your account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group mt-3'>
                    <input 
                        className='form-control' 
                        type="email" 
                        placeholder='email' 
                        name='email' 
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div> 
                <div className='form-group mt-3'>
                    <input 
                        className='form-control' 
                        type="password" 
                        placeholder='Password' 
                        name='password' 
                        value={password}
                        onChange = {e => onChange(e)} 
                        minLength = "6"
                        required
                    />
                </div>
                <button className='btn btn-primary mt-3' type="submit">Login</button>
            </form>
            <p className="mt-3">Don't have an account? <Link to="/signup">Sign up</Link></p>
            <p className="mt-3">Forgot your password?  <Link to="/reset-password">Reset Password</Link></p>
        </div>  
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { login })(Login)