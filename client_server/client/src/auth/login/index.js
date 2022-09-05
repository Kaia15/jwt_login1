import React , { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/context'
import RenderLogin from './login/login'
import axios from 'axios'
import axiosClient from '../apiClient'
import jwt_decode from 'jwt-decode'

/*const login = (email, token, expirationDate) => {
    const tokenExpiredDate = expirationDate || new Date(new Date().getTime() + 2000)
    localStorage.setItem("userID", JSON.stringify({ userId: email, token: token, expiredDate: tokenExpiredDate}))
}*/


const Login = () => {
    const { user, setUser } = useContext(AuthContext)
    const { profile, setProfile } = useContext(AuthContext)

    const resetNewToken = async() => {
        // await localStorage.removeItem("userID")
        /*const newToken = await fetch('http://localhost:8000/user/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include' 
        })*/
        const newToken = await axios.post('http://localhost:8000/user/refresh')
        const data = await newToken.data
        // console.log(newTokenJson)
        console.log(data)
        setUser({...user, accessToken: data.accessToken, refreshToken: data.refreshToken})
        return data;
        // console.log(user)
        // return newTokenJson
    }
    
    const onSubmit = async (values, actions) => {
        /*const res = await fetch('http://localhost:8000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: values.email,
                password: values.password,
            })
        })*/
        const res = await axios.post('http://localhost:8000/user/login', {email: values.email, password: values.password});
        const data = await res.data;
        // await console.log(data)
        const id = await data['_doc']['_id']
        const email = await data['_doc']['email']
        const access = await data['accessToken']
        const refresh = await data['refreshToken']
        // console.log(data)
        setUser({id: id, email: email, accessToken: access, refreshToken: refresh})
        await actions.resetForm()
    }

    useEffect(() => 
    {
        console.log(user)
    } 
    , [user])
    
    const axiosJWT = axios.create()

    

    /*const a = async () => {
        const instance = await axios.create({
            baseURL: 'http://localhost:8000/user/login',
            timeout: 10000,
            params: {} // do not remove this, its added to add params later in the config
        });
        axios.interceptors.response.use(
            async() => {
                await console.log('abcd')
            }
        )
        /*await instance.interceptors.request.use(
            (config) => {
                console.log('abcd')
                return config
            }
            async(config)=> {
                console.log(true)
                let currDate = new Date();
                const decodedToken = jwt_decode(user.accessToken)
                console.log(decodedToken.exp)
                if (decodedToken.exp * 1000 < currDate.getTime())
                {
                    console.log(true);
                    const data = await resetNewToken()
                    // console.log(data);
                    config.headers['token'] = "Bearer " + data.accessToken;
                    // setUser({...user, exp: data})
                }    
                return config;
            }, error => {
                return Promise.reject(error);
            }
        )*/
    
    /*axiosClient.interceptors.response.use(
        async(config)=> {
            console.log(true)
            let currDate = new Date();
            const decodedToken = jwt_decode(user.accessToken)
            console.log(decodedToken.exp)
            if (decodedToken.exp * 1000 < currDate.getTime())
            {
                console.log(true);
                const data = await resetNewToken()
                // console.log(data);
                config.headers['token'] = "Bearer " + data.accessToken;
                // setUser({...user, exp: data})
            }    
            return config;
        }, error => {
            return Promise.reject(error);
        }
    )

    a()
    */
    
    
    

    const view = async() => {
        try{
            // await console.log(user.accessToken)
            const res = await axios.get(`http://localhost:8000/user/${user.id}`, {
                headers: {token: `Bearer ${user.accessToken}`},
            })
            const data = await res.data;
            const userPreview = { username: data.username, name: data.name, email: data.email, friendsList: data.friends }
            setProfile(userPreview);
            if (typeof data == "string") {
                setUser(null)
                setProfile(null)
                alert("Your time is expired, so please re-login")
            }
        } catch(err) {
            console.log(err)
        }
    }
    // if (user.token) console.log(jwt_decode(user.token))

    const edit = async () => {
        try {
            const res = await axios.patch(`http://localhost:8000/user/${user.id}/edit`, {
                headers: {token: `Bearer ${user.accessToken}`, "content-type": "application/json"},

                data: {
                    username: "anonymous1", // This is the body part
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
    

    return (
    <RenderLogin 
    resetNewToken = {resetNewToken}
    onSubmit = {onSubmit}
    user = {user}
    setUser = {setUser}
    view = {view}
    edit = {edit}
    />
    )
}

export default Login