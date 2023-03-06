import React, { useState } from 'react'
import { Navigate, useParams} from 'react-router-dom'
import { connect } from 'react-redux'
import { reset_password_confirm } from '../actions/auth'

function ResetPasswordConfirm({ reset_password_confirm }) { 
    const routeParams = useParams()
    const [requestSent, setRequestSent] = useState(false)
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    })
    const { new_password, re_new_password } = formData
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = e => {
        e.preventDefault()
        const uid = routeParams.uid
        const token = routeParams.token
        reset_password_confirm(uid, token, new_password, re_new_password)
        setRequestSent(true)
    }

    if(requestSent) {
        return <Navigate to="/" />
    }

    return (
        <div className='container mt-5'>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group mt-3'>
                    <div    className='form-group mt-3'>
                        <input 
                            className='form-control' 
                            type="password" 
                            placeholder='New Password' 
                            name='new_password' 
                            value={new_password}
                            onChange = {e => onChange(e)} 
                            minLength = "6"
                            required
                        />  
                    </div>
                    <div className='form-group mt-3'>
                        <input 
                            className='form-control' 
                            type="password" 
                            placeholder='Confirm new Password' 
                            name='re_new_password' 
                            value={re_new_password}
                            onChange = {e => onChange(e)} 
                            minLength = "6"
                            required
                        />
                    </div>
                </div> 
                <button className='btn btn-primary mt-3' type="submit">Reset Pasword</button>
            </form>
        </div>  
    )
}

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm)