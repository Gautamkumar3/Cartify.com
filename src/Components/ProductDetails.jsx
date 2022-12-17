import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Flex,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Navbar from "./Navbar";

const detailsShow = (id) => {
  const api = "https://cartify-project-api-production.up.railway.app";

  if (id <= 20) {
    return fetch(`${api}/products/${id}`).then((res) => res.json());
  } else if (id > 20 && id <= 24) {
    return fetch(`${api}/men/${id}`).then((res) => res.json());
  } else if (id > 114 && id <= 120) {
    return fetch(`${api}/women/${id}`).then((res) => res.json());
  } else if (id > 34 && id <= 38) {
    return fetch(`${api}/jewellary/${id}`).then((res) => res.json());
  }
};

const ProductDetails = () => {
  const toast = useToast();
  const { id } = useParams();
  const [data, setData] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    detailsShow(id).then((res) => {
      setData(res);
    });
  }, [id]);
  // console.log(data.rating.rate)

  const { cartshowData, cartData } = useContext(AuthContext);

  const addToCart = (id) => {
    if (cartData.length === 0) {
      try {
        axios
          .post("https://cartify-project-api-production.up.railway.app/cart", {
            ...data,
            userEmail: user.email,
            qty: 1,
          })
          .then((res) => {
            cartshowData();
            toast({
              title: "Product added",
              description: "Product added in the cart",
              status: "success",
              duration: 9000,
              isClosable: true,
              position: "top",
            });
          });
      } catch (er) {
        console.log(er);
      }
    } else {
      cartData.map((el) => {
        if (el.id === id) {
          axios
            .get(`https://cartify-project-api-production.up.railway.app/cart/${id}`)
            .then((res) => {
              res.data.qty += 1;
              axios
                .patch(`https://cartify-project-api-production.up.railway.app/cart/${id}`, {
                  qty: res.data.qty,
                })
                .then((res) => {
                  cartshowData();
                  toast({
                    title: "Quantity Increase",
                    description: "Product already in the cart",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                    position: "top",
                  });
                });
            });
        } else {
          axios
            .post("https://cartify-project-api-production.up.railway.app/cart", {
              ...data,
              userEmail: user.email,
              qty: 1,
            })
            .then((res) => {
              cartshowData();
              toast({
                title: "Product added",
                description: "Product added in the cart",
                status: "success",
                duration: 9000,
                isClosable: true,
                position: "top",
              });
            });
        }
      });
    }
  };

  return (
    <>
      <Navbar />
      <Flex
        w="60%"
        margin="auto"
        marginTop={10}
        gap={20}
        border="1px solid black"
        padding={10}
        background="#9ab3b3"
      >
        <Box>
          <Image maxH="300px" src={data.image} alt="image" />
        </Box>
        <Box width="70%">
          <Text fontSize="2xl">{data.title}</Text>
          <Flex gap={10}>
            <Badge
              borderRadius="5px"
              p="3px 5px"
              background="#84be52"
              color="white"
            >
              4.3 *
            </Badge>
            <Text>{195} Reviews</Text>
          </Flex>
          <Text fontSize="2xl">$ {data.price}</Text>
          <Text>{data.description}</Text>
          <Link to="/">
            <Button background="tomato" color="white" marginTop={5}>
              Go Back
            </Button>
          </Link>
          <Button
            background="teal"
            color="white"
            marginTop={5}
            marginLeft="10px"
            onClick={() => addToCart(data.id)}
          >
            Add to Cart
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default ProductDetails;
