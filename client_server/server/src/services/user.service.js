const user = require('../models/user.model')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tokenService = require('./token.service')

const getUser = async(id) => {
    return user.findById(id);
}

const editUser = async(id, fields) => {
    return user.findByIdAndUpdate(id, fields, {new: true})
}

module.exports = {
    getUser,
    editUser
    // createUser,
    // findUser
}