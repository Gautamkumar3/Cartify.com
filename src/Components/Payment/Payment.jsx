import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import CartDetails from "../CartDetails";
import Navbar from "../Navbar";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const { cartData } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const total = cartData
    .filter((el) => el.userEmail === user.email)
    .reduce((acc, el) => acc + el.price * el.qty, 0);
  const navigate = useNavigate();

  const toast = useToast();

  const [formData, setFormData] = useState({
    card: "",
    name: "",
    date: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.card.length < 16 || formData.card.length > 16) {
      return alert("Card number should containe 16 numbers only");
    }
    if (formData.name === "") {
      return alert("Name is required");
    }
    if (formData.cvv.length < 3 || formData.cvv.length > 3) {
      return alert("CVV number should containe 3 numbers only ");
    }

    axios
      .post(
        "https://cartify-project-api-production-58d7.up.railway.app/payment",
        {
          ...formData,
          userEmail: user.email,
        }
      )
      .then((res) => console.log(res.data))
      .then((res) => {
        toast({
          title: "Payment Successfull",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        setTimeout(() => {
          navigate("/confirm");
        }, 2000);
      });
  };

  return (
    <>
      <Navbar />
      <SimpleGrid columns={2}>
        <Box w={"60%"} m="auto" mt={"10%"} boxShadow="md" p="6" rounded="md">
          <Flex
            height={"45px"}
            bg="#22c35e"
            justify={"center"}
            color="white"
            fontSize={"20px"}
            fontWeight="bold"
            align={"center"}
            borderRadius="10px"
            mb={8}
          >
            <Text>Payment Information</Text>
          </Flex>
          <form onSubmit={handleSubmit}>
            <FormLabel my={3}>Credit/Debit Card</FormLabel>
            <Input
              onChange={handleChange}
              name="card"
              placeholder="Card Number"
              type={"number"}
              value={formData.card}
            />
            <FormLabel my={3}>Name on card</FormLabel>
            <Input
              onChange={handleChange}
              name="name"
              placeholder="name"
              type={"text"}
            />
            <HStack spacing={10} my={3}>
              <Box>
                <FormLabel>Expires</FormLabel>
                <Input
                  onChange={handleChange}
                  name="date"
                  placeholder="name"
                  type={"Date"}
                />
              </Box>
              <Box>
                <FormLabel>CVV</FormLabel>
                <Input
                  onChange={handleChange}
                  name="cvv"
                  w={"60%"}
                  placeholder="CVV"
                  type={"number"}
                />
              </Box>
            </HStack>
            <Button mt={3} type="submit" colorScheme="whatsapp" w={"full"}>
              PAY NOW
            </Button>
          </form>
        </Box>
        <Box w={"60%"} m={"auto"}>
          <CartDetails total={+total.toFixed(2)} />
        </Box>
      </SimpleGrid>
    </>
  );
};

export default Payment;
