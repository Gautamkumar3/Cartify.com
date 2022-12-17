import { Flex, Highlight, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const AddressCard = ({ pin, house, road, name, phone, email }) => {
  return (
    <Link to="/payment">
      <Flex
        _hover={{ color: "black" }}
        padding={"1rem"}
        borderRadius={"10px"}
        border={"2px dotted #4287f5"}
        flexDirection={"column"}
      >
        <Text>
          <Highlight
            styles={{ pr: "16", color: "#4287f5", fontWeight: "bold" }}
            query={"Pin :"}
          >{`Pin : ${pin}`}</Highlight>
        </Text>
        <Text>
          <Highlight
            styles={{ pr: "3", color: "#4287f5", fontWeight: "bold" }}
            query={"House No :"}
          >{`House No :    ${house}`}</Highlight>
        </Text>
        <Text>
          <Highlight
            styles={{ pr: "12", color: "#4287f5", fontWeight: "bold" }}
            query={"Road :"}
          >{`Road : ${road}`}</Highlight>
        </Text>
        <Text>
          <Highlight
            styles={{ pr: "10", color: "#4287f5", fontWeight: "bold" }}
            query={"Name :"}
          >{`Name : ${name}`}</Highlight>
        </Text>
        <Text>
          <Highlight
            styles={{ pr: "4", color: "#4287f5", fontWeight: "bold" }}
            query={"Phone No :"}
          >{`Phone No :${phone}`}</Highlight>
        </Text>
        <Text>
          <Highlight
            styles={{ pr: "12", color: "#4287f5", fontWeight: "bold" }}
            query={"Email :"}
          >{`Email : ${email}`}</Highlight>
        </Text>
      </Flex>
    </Link>
  );
};

export default AddressCard;
