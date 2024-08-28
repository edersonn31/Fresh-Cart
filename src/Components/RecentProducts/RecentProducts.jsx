import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useGetCart } from "../../Hooks/useGetCart";
import StarRating from "../StarRating/StarRating";
import toast from "react-hot-toast";
import { useGetWishList } from "../../Hooks/useGetWishList";

export default function RecentProducts({ product }) {
  const { imageCover, title, category, ratingsAverage, price, id } = product;
  const [isAdding, setIsAdding] = useState(false);
  const { refetch } = useGetCart();
  const { refetch: refetchWishList, data } = useGetWishList();

  const handleAddToWishList = async () => {
    setIsAdding(true);
    try {
      let response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishList`,
        {
          productId: id,
        },
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      toast.success(response.data.message);
      console.log(data);
      refetchWishList();
      console.log(data);
    } catch (error) {
      toast.error(
        "Error: Unable to add the product to your wishList. Please try again later."
      );
      console.error("Error adding to wishList:", error);
    } finally {
      setIsAdding(false);
    }
  };
  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      let response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: id,
        },
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      toast.success(response.data.message);
      refetch();
    } catch (error) {
      toast.error(
        "Error: Unable to add the product to your cart. Please try again later."
      );
      console.error("Error adding to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      <div className="product hover:border rounded-lg border-emerald-500 hover:shadow-lg hover:shadow-green-900  transform transition-transform overflow-hidden w-1/6 p-6 m-5">
        <div>
          <Link to={`/productDetails/${product.id}`}>
            <img
              src={product.imageCover}
              className="w-full"
              alt={product.title}
            />
            <h2 className="text-emerald-500"> {product.category.name}</h2>
            <h2 className="">
              {product.title.split(" ").slice(0, 2).join(" ")}
            </h2>
            <div className="flex justify-between my-2">
              <h3>{product.price} EGP</h3>
              <h3>
                <i className="fas fa-star text-yellow-400"></i>
                {product.ratingsAverage}
              </h3>
            </div>
          </Link>
          <div className="flex justify-between gap-4">
            <button
              onClick={() => handleAddToCart(product.id)}
              className="btn w-full text-white bg-emerald-700 rounded py-1 hover:bg-green-900 "
            >
              ADD TO CART
            </button>
            <button
              className="w-1/4 text-2xl text-gray-300 hover:text-red-500"
              onClick={() => handleAddToWishList(product.id)}
            >
              <i className="fa-solid fa-heart"></i>
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
