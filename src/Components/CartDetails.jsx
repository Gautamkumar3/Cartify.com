import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const CartDetails = ({ p = 2, bor = "10px", al = "center", total }) => {
  console.log(typeof total);
  return (
    <Box p={p}>
      <Flex
        height={"50px"}
        align="center"
        bg={"gray.300"}
        border={"2px solid gray"}
        borderTopRadius={bor}
        justify={al}
      >
        <Text fontWeight={"bold"} ml={5}>
          Order Summary
        </Text>
      </Flex>
      <Flex
        justify={"space-between"}
        height={"50px"}
        align="center"
        border={"1px solid gray"}
      >
        <Box></Box>
        <Box>
          <Text fontWeight={"500"}>Class Sub Total:</Text>
        </Box>
        <Box textAlign={"left"} flexShrink={"0"} w="20%">
          <Text fontWeight={"500"}>$ {total}</Text>
        </Box>
      </Flex>
      <Flex
        justify={"space-between"}
        height={"50px"}
        align="center"
        border={"1px solid gray"}
      >
        <Box></Box>
        <Box>
          <Text fontWeight={"500"}>GST 12%</Text>
        </Box>
        <Box textAlign={"left"} flexShrink={"0"} w="20%">
          <Text fontWeight={"500"}>
            $ {(total + (total * 12) / 100 - total).toFixed(2)}
          </Text>
        </Box>
      </Flex>
      <Flex
        justify={"space-between"}
        height={"50px"}
        align="center"
        border={"1px solid gray"}
      >
        <Box></Box>
        <Box>
          {" "}
          <Text fontWeight={"500"}>Total Cart Amount:</Text>
        </Box>
        <Box textAlign={"left"} flexShrink={"0"} w="20%">
          <Text fontWeight={"500"}>
            $ {(total + (total * 12) / 100).toFixed(2)}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default CartDetails;
