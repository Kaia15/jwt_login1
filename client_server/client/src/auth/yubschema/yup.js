import * as yup from 'yup'

const regEx = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})$/

export const userSchema = yup.object().shape({
    username: yup.string().min(2).required("your name is required"),
    name: yup.string().min(2).required("your name is required"),
    email: yup.string().email("Please enter a valid email address").required("Required"),
    password: yup.string().min(8).matches(regEx, { message: "Please create a stronger password" }).required("Password must be exactly 8 characters"),
    
})

export const loginSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email address").required("Required"),
    password: yup.string().min(8).matches(regEx, { message: "Please create a stronger password" }).required("Password must be exactly 8 characters")
})