import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/context';
import RenderSignUp from './signup/signup';

const SignUp = () => {
    const { isLoggingIn, setIsLoggingIn } = useContext(AuthContext);
    return (
    <RenderSignUp />
    )
}

export default SignUp