import { useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();
const api = "https://cartify-project-api-production-58d7.up.railway.app";

export default function AuthContextProvider({ children }) {
  const toast = useToast();

  const [cartData, setCartData] = useState([]);
  const [qty, setQty] = useState(0);
  const [address, setAddress] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios
      .get("https://cartify-project-api-production-58d7.up.railway.app")
      .then((res) => setAddress(res.data));
  }, []);
  const getAddress = async () => {
    axios
      .get("https://cartify-project-api-production-58d7.up.railway.app")
      .then((res) => setAddress(res.data));
  };

  const addAddress = async (data) => {
    let res = await axios
      .post(
        "https://cartify-project-api-production-58d7.up.railway.app",
        data
      )
      .then((res) => getAddress());
  };

  const cartshowData = () => {
    try {
      axios
        .get("https://cartify-project-api-production-58d7.up.railway.app/cart")
        .then((res) => {
          setCartData(res.data);
        });
    } catch (er) {
      console.log(er);
    }
  };

  useEffect(() => {
    cartshowData();
  }, [qty]);

  const handleAddQty = (id) => {
    axios
      .get(
        `https://cartify-project-api-production-58d7.up.railway.app/cart/${id}`
      )
      .then((res) => {
        res.data.qty += 1;
        axios
          .patch(
            `https://cartify-project-api-production-58d7.up.railway.app/cart/${id}`,
            {
              qty: res.data.qty,
            }
          )
          .then((res) => {
            setQty(qty + 1);
            toast({
              title: "Quantity Increases successfully",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
          });
      });
  };
  const handleDecreaseQty = (id) => {
    axios
      .get(
        `https://cartify-project-api-production-58d7.up.railway.app/cart/${id}`
      )
      .then((res) => {
        res.data.qty -= 1;
        axios
          .patch(
            `https://cartify-project-api-production-58d7.up.railway.app/cart/${id}`,
            {
              qty: res.data.qty,
            }
          )
          .then((res) => {
            setQty(qty - 1);
            toast({
              title: "Quantity decreases successfully",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
          });
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `https://cartify-project-api-production-58d7.up.railway.app/cart/${id}`
      )
      .then((res) => {
        setQty(qty + 1);
        toast({
          title: "Product removed from the cart successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <AuthContext.Provider
      value={{
        handleAddQty,
        handleDecreaseQty,
        handleDelete,
        cartData,
        cartshowData,
        address,
        addAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
