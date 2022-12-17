import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const toast = useToast();

  const [cartData, setCartData] = useState([]);
  const [qty, setQty] = useState(0);

  const cartshowData = () => {
    try {
      axios
        .get("https://cartify-project-api-production.up.railway.app/cart")
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
      .get(`https://cartify-project-api-production.up.railway.app/cart/${id}`)
      .then((res) => {
        res.data.qty += 1;
        axios
          .patch(
            `https://cartify-project-api-production.up.railway.app/cart/${id}`,
            {
              qty: res.data.qty,
            }
          )
          .then((res) => {
            setQty(qty + 1);
            toast({
              title: "Product added",
              description: "Quantity Increases",
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
      .get(`https://cartify-project-api-production.up.railway.app/cart/${id}`)
      .then((res) => {
        res.data.qty -= 1;
        axios
          .patch(
            `https://cartify-project-api-production.up.railway.app/cart/${id}`,
            {
              qty: res.data.qty,
            }
          )
          .then((res) => {
            setQty(qty - 1);
            toast({
              title: "Product removed",
              description: "Quantity decreases",
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
        `https://cartify-project-api-production.up.railway.app/cart/${id}`
      )
      .then((res) => {
        setQty(qty + 1);
        toast({
          title: "Product Deleted",
          description: "Product removed from the cart",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      });
  };

  const [isAuth, setIsAuth] = useState({ auth: false, name: null });

  const handleLogin = (name) => {
    setIsAuth({ auth: true, name: name });
  };
  const handleLogout = (name) => {
    setIsAuth({ auth: false, name: null });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        handleLogin,
        handleAddQty,
        handleDecreaseQty,
        handleDelete,
        cartData,
        cartshowData,
        setIsAuth,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
