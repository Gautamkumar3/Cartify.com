import { Box, Heading, Input, useToast } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Styles from "./Login.module.css"
import { useNavigate } from 'react-router-dom'


// url="https://reqres.in/api/login"

const Signup = () => {

    const navigate = useNavigate()
    const toast = useToast()

    const [formData, setFormData] = useState({ name: "", email: "", password: "" })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .post(
            "https://cartify-project-api-production.up.railway.app/signup",
            formData
          )
          .then((res) => {
            console.log(res.data);
            toast({
              title: "Product added",
              description: "Product added in the cart",
              status: "success",
              duration: 9000,
              isClosable: true,
              position: "top",
            });
            setFormData({ name: "", email: "", password: "" });
            navigate("/login");
          });

    }

    return (
        <div className={Styles.form}>
            <div className={Styles.center}>
                <h1>Signup</h1>
                <form onSubmit={handleSubmit}>
                    <div className={Styles.inputbox}>
                        <input type="name" required="required" placeholder='name' name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className={Styles.inputbox}>
                        <input type="email" required="required" placeholder='email' value={formData.email} name="email" onChange={handleChange} />
                    </div>
                    <div className={Styles.inputbox}>
                        <input type="password" required="required" placeholder='password' value={formData.password} name="password" onChange={handleChange} />
                    </div>

                    <input className={Styles.btn} type="submit" />

                </form>
            </div>
        </div>
    )
}

export default Signup
