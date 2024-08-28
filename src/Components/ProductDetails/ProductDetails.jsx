import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import { useGetCart } from "../../Hooks/useGetCart";
import toast from "react-hot-toast";
import { useGetWishList } from "../../Hooks/useGetWishList";
import StarRating from "../StarRating/StarRating";

export default function ProductDetails() {
  const [isAdding, setIsAdding] = useState(false);
  let { id } = useParams();
  let { refetch } = useGetCart();
  let { refetch: refetchWishList } = useGetWishList();
  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching product details:", error);
      throw error;
    }
  };

  const fetchRelatedProducts = async (categoryId) => {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching related products:", error);
      throw error;
    }
  };

  const {
    data: productDetails,
    isLoading: isLoadingProduct,
    error: productError,
  } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: fetchProductDetails,
  });

  const {
    data: relatedProducts,
    isLoading: isLoadingRelated,
    error: relatedError,
  } = useQuery({
    queryKey: ["relatedProducts", productDetails?.category?._id],
    queryFn: () => fetchRelatedProducts(productDetails?.category?._id),
    enabled: !!productDetails?.category?._id, // Fetch related products only if productDetails and categoryId are available
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: false,
  };

  const settingsRelatedProducts = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: false,
  };

  const handleAddToCart = async (productId) => {
    setIsAdding(true);
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
  const handleAddToWishList = async (productId) => {
    setIsAdding(true);
    try {
      let response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishList`,
        {
          productId,
        },
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      toast.success(response.data.message);
      refetchWishList();
    } catch (error) {
      toast.error(
        "Error: Unable to add the product to your wishList. Please try again later."
      );
      console.error("Error adding to wishList:", error);
    } finally {
      setIsAdding(false);
    }
  };

  if (isLoadingProduct || isLoadingRelated || isAdding)
    return (
      <div className="center h-screen">
        <Loading />;
      </div>
    );
  if (productError || relatedError) return <div>Error loading data</div>;


  const productTitle = productDetails?.title || "";
  const shortTitle = productTitle.split(" ").slice(0, 2).join(" ");

  return (
    <div>
      <div className="text-green-600 text-4xl">
        <h2 className=" text-center">Product Details {shortTitle}</h2>
      </div>
      <div className="flex flex-wrap items-center justify-center pt-10">
        <div className="w-1/4">
          <Slider {...settings}>
            {productDetails.images?.map((image, index) => (
              <img
                src={image}
                className="w-full h-[300px]"
                alt={productTitle}
                key={index}
              />
            ))}
          </Slider>
        </div>
        <div className="w-3/4">
          <div className="w-3/4 mx-auto">
            <h2>{productTitle}</h2>
            <p className="my-6 text-gray-400">{productDetails.description}</p>
            <h3>{productDetails.category?.name}</h3>
            <div className="flex justify-between items-center my-2">
              <p className="text-sm text-gray-600">
                {productDetails.price} EGP
              </p>
              <p className="text-sm text-gray-600">
                <StarRating ratingsAverage={productDetails.ratingsAverage} />
                {productDetails.ratingsAverage}
              </p>
            </div>
            <div className="between">
              <button
                onClick={() => handleAddToCart(productDetails.id)}
                className=" px-72 py-1 bg-green-500 my-4 rounded-lg text-white text-lg text-center transition-all duration-500 hover:bg-green-600"
              >
                <i className="fas fa-add"></i> Add to cart
              </button>
              <button
                onClick={() => handleAddToWishList(productDetails.id)}
                className=" px-3 py-1  my-4  text-4xl text-center transition-all duration-500  hover:text-red-700"
              >
                <i className="fa-solid fa-heart h3"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <h2 className="text-center text-green-600 text-3xl mb-6">
          Related Products
        </h2>
        <Slider {...settingsRelatedProducts}>
          {relatedProducts?.map((product, index) => (
            <Link
              to={`/productDetails/${product._id}`}
              className="cursor-pointer"
              key={index}
            >
              <img
                src={product.imageCover}
                className="w-full h-[250px]"
                alt={product.title}
              />
              <h3>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
}
