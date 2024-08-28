import { useState } from "react";
import axios from "axios";
import Loading from "./../Loading/Loading";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useGetWishList } from "../../Hooks/useGetWishList";
import { useGetCart } from "../../Hooks/useGetCart";

export default function WishList() {
  const {
    data: wishListData,
    isLoading,
    refetch: refetchWishList,
  } = useGetWishList();
  const [isProcessing, setIsProcessing] = useState(false);
  const deleteProductInWishList = async (productId) => {
    setIsProcessing(true);
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      toast.success("Product deleted successfully");
      refetchWishList();
    } catch (error) {
      console.error(
        "Error deleting product from wishList:",
        error.response || error.message
      );
      toast.error("Failed to delete the product.");
    } finally {
      setIsProcessing(false);
    }
  };
  const { refetch } = useGetCart(); // Use refetch to update the cart data

  const handleAddToCart = async (productId) => {
    setIsProcessing(true);
    try {
      let response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId,
        },
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      console.log(response);

      toast.success(response.data.message);
      refetch(); // Manually refetch the cart data
    } catch (error) {
      toast.error(
        "Error: Unable to add the product to your cart. Please try again later."
      );
      console.error("Error adding to cart:", error);
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
      ) : !wishListData || wishListData?.data.length == 0 ? (
        <div className="bg-[#f8f9fa] py-32 px-8 my-8 shadow-lg rounded-lg">
          <h1 className="text-3xl font-semibold text-center">
            Your WishList is Empty
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
        <div className="container mx-auto px-4 my-4 rounded-lg">
          <div className="bg-[#f8f9fa] shadow-lg rounded-lg my-8 overflow-hidden">
            <div className="between p-8">
              <h2 className="text-3xl font-semibold">My Wish List</h2>
            </div>
            {wishListData?.data.map((product) => (
              <div key={product.id} className="between border-b p-4">
                <div className="flex items-center">
                  <img
                    src={product.imageCover}
                    className="w-24 h-24 object-cover mr-4"
                    alt={product.title}
                  />
                  <div>
                    <h2 className="text-lg font-semibold">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h2>
                    <p className="text-gray-700">{product.price} EGP</p>
                    <button
                      onClick={() => deleteProductInWishList(product.id)}
                      className="text-red-600 hover:underline mt-2"
                    >
                      <i className="fas fa-trash"></i> Remove
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="px-4 py-2 border border-green-500 text-green-500 rounded-lg hover:bg-green-700 hover:text-white transition-all duration-500"
                >
                  <i className="fas fa-add"></i> Add To Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
