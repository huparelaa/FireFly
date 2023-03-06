import React, {useEffect} from 'react'
import NavBar from '../components/NavBar'
import { connect } from 'react-redux'
import { checkAuthenticated, load_user } from '../actions/auth'

const Layout = (props) => { 
    useEffect(() => {
        props.checkAuthenticated()
        props.load_user()
    }, [props])
    
    return (
        <div className='container'>
            <NavBar />
            {props.children}
        </div>
    )
}

export default connect(null, {checkAuthenticated, load_user})(Layout)