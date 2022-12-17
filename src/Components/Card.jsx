import {
  Box,
  Image,
  Badge,
  Center,
  Text,
  Spacer,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function ProductCard(props) {
  const { title, avatar, rating, price, category, id } = props;

  const toast = useToast();
  const { cartshowData, cartData } = useContext(AuthContext);
   const user = JSON.parse(localStorage.getItem("user")) || "";
  console.log(cartData)

  const addToCart = (id) => {
    if (cartData.length === 0) {
      axios
        .post("https://cartify-project-api-production.up.railway.app/cart", {
          ...props,
          userEmail: user.email,
          qty: 1,
        })
        .then((res) => {
          cartshowData();
          toast({
            title: "Product added.",
            description: "Product added in the cart",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
        });
    } else {
      cartData.map((el) => {
        if (el.id === id) {
          axios
            .get(
              `https://cartify-project-api-production.up.railway.app/cart/${id}`
            )
            .then((res) => {
              res.data.qty += 1;
              axios
                .patch(
                  `https://cartify-project-api-production.up.railway.app/cart/${id}`,
                  { qty: res.data.qty }
                )
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
            .post(
              "https://cartify-project-api-production.up.railway.app/cart",
              { ...props, qty: 1, userEmail: user.email }
            )
            .then((res) => {
              cartshowData();
              toast({
                title: "Product added.",
                description: "Product added in the cart successfully",
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
    <Box
      maxW="sm"
      borderWidth="1.5px"
      w="23%"
      p="20px"
      borderRadius="lg"
      overflow="hidden"
      background="white"
      marginTop={5}
    >
      <Badge borderRadius="5px" p="3px 5px" background="#84be52" color="white">
        {rating} *
      </Badge>
      <Center>
        <Image height="150px" marginBottom={5} src={avatar} alt="img" />
      </Center>
      <Text fontSize="sm" height={10} fontWeight="600">
        {title}
      </Text>
      <Text as="em" color="gray.600" lineHeight="25px" fontSize="xs">
        Category : <span>{category}</span>{" "}
      </Text>
      <Text fontWeight="bold" color="#6f7284" lineHeight="25px">
        Price* <span style={{ color: "#ef4281" }}>$ {Math.floor(price)}</span>{" "}
      </Text>
      <Flex gap={5}>
        <Link to={`/shoppingcart/${id}`}>
          <Button background="tomato" color="white" marginTop="15px">
            Check Details
          </Button>
        </Link>
        <Button
          background="#24aeb1"
          color="white"
          marginTop="15px"
          onClick={() => addToCart(id)}
        >
          ADD TO CART
        </Button>
      </Flex>
    </Box>
  );
}
