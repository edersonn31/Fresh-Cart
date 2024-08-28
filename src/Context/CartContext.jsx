import { createContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export let CartContext = createContext();
export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  async function getProductsInCart() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers,
        }
      );
      setCart(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function addProductToCart(productId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers,
        }
      );
      setCart(data);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(data.message);
    }
  }
  async function updateProductInCart(productId, count) {
    if (count > 0) {
      try {
        const { data } = await axios.put(
          `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,

          {
            count,
          },
          {
            headers,
          }
        );
        setCart(data);
        console.log(cart);
      } catch (error) {
        console.log(error);
      }
    }
  }
  async function deleteProductInCart(productId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers,
        }
      );
      setCart(data);
      toast.success(data.status);
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteProductsInCart() {
    try {
      const { data } = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers,
        }
      );
      setCart(null);
      console.log(cart);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <CartContext.Provider
        value={{
          cart,
          setCart,
          getProductsInCart,
          addProductToCart,
          updateProductInCart,
          deleteProductInCart,
          deleteProductsInCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
