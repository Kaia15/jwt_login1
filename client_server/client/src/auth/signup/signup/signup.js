import React, { useState, useEffect, useContext } from 'react'
import {useFormik} from 'formik'
import { loginSchema, userSchema } from '../../yubschema/yup'
import signupcss from './signup.module.css';

const onSubmit = async (values, actions) => {
    await fetch("http://localhost:8000/user/signup", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: values.username,
            name: values.name,
            email: values.email,
            password: values.password,
            typeLogin: "Email"
        })
    })
    await actions.resetForm()
}

const RenderSignUp = () => {
    const {values, errors, handleBlur, handleSubmit, handleChange, onChange, onBlur, isSubmitting } = 
    useFormik({
        initialValues: {
            username: "",
            name: "",
            email: "",
            password: "",
            typeLogin: "Email",
            friends: []
        },
        validationSchema: userSchema,
        onSubmit
    })
    console.log(values)
    console.log(errors)
    return (
    <form onSubmit={handleSubmit}>
        <label htmlFor='username' className={signupcss.label}> Username </label>
        <input 
        type = "text"
        id = "username"
        value = {values.username}
        onChange = {handleChange}
        className = {errors.username ? (signupcss.input_error) : (signupcss.input)}
        />
        <br />
        <label htmlFor='name' className={signupcss.label}> Name </label>
        <input 
        type = "text"
        id = "name"
        value = {values.name}
        onChange = {handleChange}
        className = {errors.name ? (signupcss.input_error) : (signupcss.input)}
        />
        <br />
        <label htmlFor='email' className={signupcss.label}> Email </label>
        <input 
        type = "email"
        id = "email"
        value = {values.email}
        onChange = {handleChange}
        className = {errors.email ? (signupcss.input_error) : (signupcss.input)}
        />
        <br />
        <label htmlFor='password' className={signupcss.label}> Password </label>
        <input 
        type = "password"
        id = "password"
        value = {values.password}
        onChange = {handleChange}
        className = {errors.password ? (signupcss.input_error) : (signupcss.input)}
        />
        <br />
        <button 
        type = "submit"
        className={signupcss.button}>
            Submit
        </button>
    </form>
    )
}

export default RenderSignUp