import { useState } from "react";
import { useGetCart } from "../../Hooks/useGetCart";
import axios from "axios";
import Loading from "./../Loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  const { data: cartData, error, isLoading, refetch } = useGetCart();
  const [isProcessing, setIsProcessing] = useState(false);
  let Navigate = useNavigate();

  const updateProductInCart = async (productId, count) => {
    if (count > 0) {
      setIsProcessing(true);
      try {
        await axios.put(
          `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
          { count },
          {
            headers: { token: localStorage.getItem("userToken") },
          }
        );
        refetch();
      } catch (error) {
        console.error("Error updating cart:", error.response || error.message);
        toast.error("Failed to update the cart.");
      } finally {
        setIsProcessing(false);
      }
    } else {
      deleteProductInCart(productId);
    }
  };

  const deleteProductInCart = async (productId) => {
    setIsProcessing(true);
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      toast.success("Product deleted successfully");
      refetch();
    } catch (error) {
      console.error(
        "Error deleting product from cart:",
        error.response || error.message
      );
      toast.error("Failed to delete the product.");
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteAllProductsInCart = async () => {
    // if (cartData?.data?.products.length === 0) {
    //   toast.error("Your cart is already empty.");
    //   return;
    // }

    setIsProcessing(true);
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: localStorage.getItem("userToken") },
      });
      toast.success("All products deleted successfully");
      refetch();
      Navigate("/home");
    } catch (error) {
      console.error(
        "Error deleting all products from cart:",
        error.response || error.message
      );
      toast.error("Failed to clear the cart.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {isLoading || isProcessing ? (
        <div className="center h-screen">
          <Loading />
        </div>
      ) : !cartData || cartData?.numOfCartItems == 0 ? (
        <div className="bg-[#f8f9fa] py-32 px-8 my-8 shadow-lg rounded-lg">
          <h1 className="text-3xl font-semibold text-center">
            Your Cart is Empty
          </h1>
          <h2 className=" text-2xl text-center my-5">
            To Add Products go{" "}
            <Link
              to="/products"
              className="text-white bg-green-500 hover:bg-green-700 transition-all duration-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md px-3 py-1 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              products <i className="fas fa-arrow-right"></i>
            </Link>
          </h2>
        </div>
      ) : (
        <div className="container mx-auto px-4 my-4 rounded-lg ">
          <div className="bg-[#f8f9fa] shadow-lg rounded-lg my-8 overflow-hidden">
            <div className="between p-8">
              <h2 className="text-3xl font-semibold">Cart Shop</h2>
              <Link to="/checkout">
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition-colors duration-300">
                  Check Out
                </button>
              </Link>
            </div>
            <div className="between p-4">
              <div className="text-xl font-semibold">
                Total Price:{" "}
                <span className="text-green-500">
                  {cartData.data.totalCartPrice} EGP
                </span>
              </div>
              <div className="flex items-center">
                <div className="text-xl font-semibold mr-4">
                  Total Number of Items:{" "}
                  <span className="text-green-500">
                    {cartData.numOfCartItems}
                  </span>
                </div>
              </div>
            </div>
            {cartData?.data?.products.length > 0 &&
              cartData?.data?.products.map((product) => (
                <div key={product.id} className="between border-b p-4">
                  <div className="flex items-center">
                    <img
                      src={product.product.imageCover}
                      className="w-24 h-24 object-cover mr-4"
                      alt={product.product.title}
                    />
                    <div>
                      <h2 className="text-lg font-semibold">
                        {product.product.title.split(" ").slice(0, 2).join(" ")}
                      </h2>
                      <p className="text-gray-700">{product.price} EGP</p>
                      <button
                        onClick={() => deleteProductInCart(product.product.id)}
                        className="text-red-600 hover:underline mt-2"
                      >
                        <i className="fas fa-trash"></i> Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        updateProductInCart(
                          product.product.id,
                          product.count + 1
                        )
                      }
                      className="flex items-center justify-center p-1 h-8 w-8 text-sm font-medium text-gray-500 bg-white border border-green-500 rounded focus:outline-none hover:bg-green-100"
                      type="button"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                    <span className="mx-4">{product.count}</span>
                    <button
                      onClick={() =>
                        updateProductInCart(
                          product.product.id,
                          product.count - 1
                        )
                      }
                      className="flex items-center justify-center p-1 h-8 w-8 text-sm font-medium text-gray-500 bg-white border border-green-500 rounded focus:outline-none hover:bg-green-100"
                      type="button"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </div>
              ))}
          </div>
          {!(cartData?.data?.products.length === 0) && (
            <div className="center py-4">
              <button
                onClick={deleteAllProductsInCart}
                className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-700 hover:text-white transition-all duration-500"
              >
                {isProcessing ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <>
                    <i className="fas fa-trash"></i> Clear Your Cart
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
