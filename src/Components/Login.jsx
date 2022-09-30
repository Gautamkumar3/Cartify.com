import { Box, Heading, Input, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Styles from "./Login.module.css"
import { Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

// url="https://reqres.in/api/login"

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [signupData, setSignupData] = useState([])
    const navigate = useNavigate()
    const { handleLogin, setIsAuth } = useContext(AuthContext)
    const toast = useToast()


    useEffect(() => {
        axios.get("https://gk-general-api.herokuapp.com/signup").then((res) => {
            setSignupData(res.data)
        })
    }, [])


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let flag = false;
        let name = null
        signupData.map((el) => {
            if (el.email === formData.email && el.password === formData.password) {
                flag = true;
                name = el.name
                return
            }
        })
        if (flag === true) {
            handleLogin(name)
            toast({
                title: 'Account created.',
                description: "We've created your account for you.",
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: "top",
            })
            navigate("/shoppingcart")
        } else {
            toast({
                title: 'Login failed',
                description: "Invalid Credentials",
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: "top",
            })
        }
    }

    return (
        <div className={Styles.form}>
            <div className={Styles.center}>
                <h1>LogIn</h1>
                <form onSubmit={handleSubmit}>
                    <div className={Styles.inputbox}>
                        <input type="email" required="required" placeholder='email' name="email" onChange={handleChange} />
                    </div>
                    <div className={Styles.inputbox}>
                        <input type="password" required="required" placeholder='password' name="password" onChange={handleChange} />
                    </div>

                    <input className={Styles.btn} type="submit" />

                </form>
            </div>
        </div>
    )
}

export default Login
