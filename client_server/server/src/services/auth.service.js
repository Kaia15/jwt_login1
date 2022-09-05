const user = require('../models/user.model')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tokenService = require('./token.service')

const createUser = async (body) => {
    const { password, ...rest}  = body
    let hashPassword;
    hashPassword = bcrypt.hashSync(password, 8);
    const newUser = await user.create({
        password: hashPassword,
        ...rest
    })
    // console.log(newUser)
    return newUser
}

const findUser = async (body) => {
    const { email, password } = body
    // console.log(email, password)
    let existingUser;
    existingUser = await user.findOne({email: email})
    // console.log(existingUser)
    let isValidPassword = false;
    isValidPassword = await bcrypt.compare(password, existingUser.password)
    // console.log(isValidPassword)

    /*try {
        isValidPassword = await bcrypt.compare(password, existingUser.password)
        console.log(isValidPassword)
    } catch(err) {
        console.log(err)
    }
    if (isValidPassword) {
        const accessToken = jwt.sign({
            id: existingUser._id,
            email: existingUser.email
        },
        process.env.JWT_ACCESS_KEY, {
            expiresIn: "2h"
        })
        return { ...existingUser, accessToken: accessToken}
    } else {
        return null
    }*/

    if (isValidPassword) {
        const accessToken = tokenService.generateToken("accessToken", existingUser)
        const refreshToken = tokenService.generateToken("refreshToken", existingUser)
        // console.log(refreshToken)
        // return {...existingUser, accessToken: accessToken}
        return { user: {...existingUser, accessToken: accessToken, refreshToken: refreshToken}, refreshToken: refreshToken }
    } else {
        return {}
    }
}

module.exports = {
    createUser,
    findUser
}