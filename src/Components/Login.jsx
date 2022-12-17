import { Box, Button, Heading, Input, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import Styles from "./Login.module.css";
import Navbar from "./Navbar";
import { useUserContext } from "../Context/UserContext";

// url="https://reqres.in/api/login"

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { signInWithGoogle, loginUser } = useUserContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(formData.email, formData.password);
  };

  return (
    <>
      <Navbar />
      <div className={Styles.form}>
        <div className={Styles.center}>
          <h1>LogIn</h1>
          <form onSubmit={handleSubmit}>
            <div className={Styles.inputbox}>
              <input
                type="email"
                required="required"
                placeholder="email"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className={Styles.inputbox}>
              <input
                type="password"
                required="required"
                placeholder="password"
                name="password"
                onChange={handleChange}
              />
            </div>

            <input className={Styles.btn} type="submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
