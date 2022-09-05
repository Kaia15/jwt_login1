import React, { useState, useEffect, useContext } from 'react'
import { useFormik } from 'formik'
// import { useDispatch } from 'react-redux'
import { loginSchema } from '../../yubschema/yup'
import { loginSuccess, loginFail } from '../../../redux/reducer'
import { AuthContext } from '../../../context/context'
// const dispatch = useDispatch()
import axios from 'axios'
import jwt_decode from 'jwt-decode'

const RenderLogin = ( { user, onSubmit, view, edit}) => {
    const { profile, setProfile } = useContext(AuthContext)
    const { values, actions, errors, onChange, handleChange, handleSubmit}  = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginSchema,
        onSubmit
    })
    // const { isLoggingIn, setIsLoggingIn } = useContext(AuthContext)
    /*useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('userData'));
        // console.log(new Date(stored.expiredDate) > new Date())
        if (stored && 
            stored.token  && 
            new Date(stored.expiredDate) > new Date()
        ) {
            login(stored.userId, stored.token, stored.expiredDate);
        } else {
            localStorage.removeItem("userID")
            // resetNewToken()
            
        }
    }, [login, resetNewToken])
    */
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label htmlFor = "email"> Email </label>
            <br />
            <input
            value = {values.email}
            type = "email"
            id = "email"
            onChange = {handleChange}
            />
            {errors.email && (<p> {errors.email} </p>)}
            <br />
            <label htmlFor = "password"> Password </label>
            <br />
            <input
            value = {values.password}
            type = "password"
            id = "password"
            onChange = {handleChange}
            />
            {errors.password && (<p> {errors.password} </p>)}
            <br />
            <button
            type = "submit">
                Login
            </button>

        </form>
        {user ? (<button
        onClick = {view}
        > View your profile </button>) : (<div></div>)}
        
        {user && (<button
        onClick = {edit}>
        Edit your profile
        </button>)}
        { profile && console.log(profile) }
        
        </div>
        
        
    )
    
}

export default RenderLogin 