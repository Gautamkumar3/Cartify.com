import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import CartDetails from "./CartDetails";
import Navbar from "./Navbar";

const Cart = () => {
  const { handleAddQty, handleDecreaseQty, handleDelete, cartData } =
    useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const filterData = cartData.filter((el) => el.userEmail === user.email);
  const total = cartData
    .filter((el) => el.userEmail === user.email)
    .reduce((acc, el) => acc + el.price * el.qty, 0);

  return (
    <>
      <Navbar />
      {filterData.length == 0 ? (
        <Flex justify={"center"}>
          <Image src="https://res.cloudinary.com/dbojqn7mx/image/upload/v1671311693/k4hbkjpy9ifo6udew4jz.png" />
        </Flex>
      ) : (
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Product Name</Th>
                <Th>Price</Th>
                <Th> Qty</Th>
                <Th> Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filterData.map((el) => (
                <Tr key={el.id}>
                  <Td>
                    <Image width="50px" src={el.avatar || el.image} />
                  </Td>
                  <Td>{el.title}</Td>
                  <Td>$ {el.price}</Td>
                  <Td>
                    <Button
                      background="green"
                      onClick={() => handleAddQty(el.id)}
                    >
                      <Heading color="white" marginTop="-5px">
                        +
                      </Heading>
                    </Button>
                    <Button>{el.qty}</Button>
                    <Button
                      disabled={el.qty === 1}
                      background="green"
                      onClick={() => handleDecreaseQty(el.id)}
                    >
                      <Heading color="white" marginTop="-5px">
                        -
                      </Heading>
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      background="red"
                      color="white"
                      onClick={() => handleDelete(el.id)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot></Tfoot>
          </Table>
        </TableContainer>
      )}
      <Flex m={8} justify={"space-between"}>
        <Link to={"/"}>
          <Button colorScheme="blue">CONTINUE SHOPPING</Button>
        </Link>
        {filterData.length == 0 ? (
          <Box></Box>
        ) : (
          <Link to={"/address"}>
            <Button colorScheme={"whatsapp"}>PROCEED TO PAY</Button>
          </Link>
        )}
      </Flex>
      <CartDetails total={+total.toFixed(2)} al={"left"} />
    </>
  );
};

export default Cart;
