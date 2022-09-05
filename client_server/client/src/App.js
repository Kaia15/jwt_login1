import './App.css';
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from './context/context';
import SignUp from './auth/signup';
import Login  from './auth/login/index'
import axios from 'axios'

function App() {
  
  return (
    <Login />
  );
}

export default App;
