import {
  CircularProgress,
  Flex,
  Heading,
  Image,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ProductCard from "./Card";
import Styles from "./Home.module.css";
import image from "../img/cartifyhome.PNG";
import Navbar from "./Navbar";

// api="https://gk-general-api.herokuapp.com/"

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("ASC");
  const [data, setData] = useState([]);

  const sortByPrice = (e) => {
    setSortBy(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://cartify-project-api-production.up.railway.app/products?_sort=price&_order=${sortBy}`
      )
      .then((res) => {
        setData(res.data);
        setLoading(false);
      });
  }, [sortBy]);

  return (
    <>
      <Navbar />
      <div style={{ postion: "relative" }}>
        <div>
          <Image src={image} />
        </div>
        <Flex margin={10} gap={10}>
          <Heading>Home</Heading>
          <Select w="15%" onChange={sortByPrice}>
            <option>Sort By Price</option>
            <option value="ASC">Asending</option>
            <option value="DESC">Descending</option>
          </Select>
        </Flex>
        {loading ? (
          <CircularProgress
            size="200px"
            marginLeft="45%"
            isIndeterminate
            color="green.300"
          />
        ) : (
          <Flex flexWrap="wrap" justify="space-around">
            {data.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                title={item.title}
                avatar={item.image}
                price={item.price}
                category={item.category}
                rating={item.rating.rate}
              />
            ))}
          </Flex>
        )}
      </div>
    </>
  );
};

export default Home;
