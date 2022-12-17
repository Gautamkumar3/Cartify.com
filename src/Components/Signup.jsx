import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import Styles from "./Login.module.css";
import { useUserContext } from "../Context/UserContext";
import Navbar from "./Navbar";

// url="https://reqres.in/api/login"

const Signup = () => {
  const { signupUser, signInWithGoogle } = useUserContext();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signupUser(formData);
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <>
      <Navbar />
      <div className={Styles.form}>
        <div className={Styles.center}>
          <h1>Signup</h1>
          <form onSubmit={handleSubmit}>
            <div className={Styles.inputbox}>
              <input
                type="name"
                required="required"
                placeholder="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className={Styles.inputbox}>
              <input
                type="email"
                required="required"
                placeholder="email"
                value={formData.email}
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className={Styles.inputbox}>
              <input
                type="password"
                required="required"
                placeholder="password"
                value={formData.password}
                name="password"
                onChange={handleChange}
              />
            </div>

            <input className={Styles.btn} type="submit" />
          </form>
          <Text my={5} textAlign="center">
            Or
          </Text>
          <Button
            onClick={signInWithGoogle}
            p={"1.6rem"}
            borderRadius={"1rem"}
            colorScheme="blue"
            style={{
              display: "flex",
              margin: "1rem 0",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box style={{ fontSize: "1.3rem", marginRight: "1rem" }} />
            <span style={{ fontSize: "1rem" }}>Sign up via Google</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Signup;
