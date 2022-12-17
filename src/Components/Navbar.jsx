import { Link, NavLink, useSearchParams } from "react-router-dom";
import {
  Box,
  Text,
  Flex,
  Image,
  Heading,
  Center,
  Input,
  InputRightElement,
  InputGroup,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdShoppingCart } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Search2Icon } from "@chakra-ui/icons";
import axios from "axios";
import SearchItem from "./SearchItem";

const Navbar = () => {
  const { isAuth, cartData, handleLogout } = useContext(AuthContext);
  const [searchParam, setSearchParam] = useSearchParams();
  const [query, setQuery] = useState(searchParam.get("q") || "");
  const [data, setData] = useState([]);

  const searchData = (query) => {
    axios
      .get(
        `https://cartify-project-api-production.up.railway.app/products?q=${query}`
      )
      .then((res) => {
        setData(res.data);
      });
  };

  const handleQuery = (e) => {
    setTimeout(() => {
      setQuery(e.target.value);
      searchData(e.target.value);
    }, 1000);
  };

  useEffect(() => {
    setSearchParam({ q: query });
  }, [query]);

  return (
    <>
      <Flex
        justifyContent="space-between"
        height={20}
        background="black"
        color="White"
        fontSize={20}
        align="center"
        position="sticky"
        top="0px"
        zIndex="5"
      >
        <Box>
          <Image
            width="120px"
            borderRadius="50%"
            src="https://i.pinimg.com/originals/c3/b3/14/c3b3146e35033a66d563dbce4e53a0b7.png"
          />
        </Box>
        <InputGroup w="35%">
          <InputRightElement
            pointerEvents="none"
            children={<Search2Icon color="gray.500" marginRight={10} />}
          />
          <Input
            type="text"
            background="white"
            color="gray"
            placeholder="Search for product brand and more"
            onChange={handleQuery}
          />
        </InputGroup>
        <Flex margin={10} gap={5}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/men">Men</NavLink>
          <NavLink to="/women">Women</NavLink>
          <NavLink to="/jewellary">Jewellary</NavLink>
          <NavLink to="/electronics">Electronics</NavLink>
          {isAuth.auth === true ? (
            <>
              <Text>{isAuth.name}</Text>
              <Button color="white" background="#f56642" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Signup</NavLink>
            </>
          )}
          <NavLink to="/shoppingcart">
            <MdShoppingCart fontSize={35} />
            <Box
              marginTop={-12}
              marginLeft={4}
              background="tomato"
              w={7}
              h={6}
              opacity="8"
              zIndex={8}
              borderRadius="50%"
            >
              <Center paddingBottom="-5px">{cartData.length}</Center>
            </Box>
          </NavLink>
        </Flex>
      </Flex>

      {query.length === 0 || data.length === 0 ? null : (
        <Box
          maxH="300px"
          overflowX="scroll"
          w="30%"
          marginLeft="13%"
          marginTop={-5}
          overflow-y="hidden"
          position="absolute"
          top="100px"
          background="white"
          paddingLeft={5}
          css={{
            "&::-webkit-scrollbar": {
              width: "1px",
            },
          }}
        >
          {data.map((item) => (
            <SearchItem key={item.id} {...item} />
          ))}
        </Box>
      )}
    </>
  );
};

export default Navbar;
