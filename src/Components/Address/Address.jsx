import { AddIcon } from "@chakra-ui/icons";
import {
  border,
  Box,
  Center,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import CartDetails from "../CartDetails";
import Navbar from "../Navbar";
import AddressCard from "./AddressCard";
import AddressModal from "./AddressModal";

const Address = () => {
  const { cartData, address: data } = useContext(AuthContext);

  const user = JSON.parse(localStorage.getItem("user")) || "";
  const total = cartData
    .filter((el) => el.userEmail === user.email)
    .reduce((acc, el) => acc + el.price * el.qty, 0);
  const filterAddress = data.filter((el) => el.userEmail === el.userEmail);

  return (
    <>
      <Navbar />

      <Box w={"80%"} m="auto">
        <Flex justify={"space-between"} align="center">
          <Box>
            <Heading>Choose Address</Heading>
            <Text fontSize={"14px"} color="gray.500">
              Detailed address will help our delivery partner reach your
              doorstep quickly.
            </Text>
          </Box>
          <Box>
            <Image src="https://adn-static1.nykaa.com/media/wysiwyg/Payments/desktop-icons/header-address.svg" />
          </Box>
        </Flex>

        <Flex justify={"space-between"} mt={5}>
          <AddressModal />
          <Box>
            <Box>
              <CartDetails total={+total.toFixed(2)} />
            </Box>

            <Flex w="25vw" bg={"gray.100"} p={2} mt={2} borderRadius="10px">
              <Text fontSize={"12px"}>
                Buy authentic products. Pay securely. Easy returns and exchange
              </Text>
              <Image src="https://adn-static1.nykaa.com/media/wysiwyg/Payments/desktop-icons/pay-secure-lock.png" />
            </Flex>
          </Box>
        </Flex>
      </Box>
      <SimpleGrid columns={3} w="80%" m={"auto"} spacing={5}>
        {filterAddress?.map((address) => (
          <AddressCard key={address.id} {...address} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default Address;
