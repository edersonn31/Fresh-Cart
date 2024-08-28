import React from "react";
import axios from "axios";
import { useGetCart } from "../../Hooks/useGetCart";
import { useQuery } from "@tanstack/react-query";
import Loading from "./../Loading/Loading";

export default function Allorders() {
  const { data: cart } = useGetCart();

  function getAllorders() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${cart?.data?.cartOwner}`
    );
  }

  let { data: orders, isLoading } = useQuery({
    queryKey: ["allorders"],
    queryFn: getAllorders,
    staleTime: Infinity, // Prevent refetching by making data always fresh
    cacheTime: Infinity, // Prevent cache invalidation
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {orders?.data?.map((order, index) => (
            <div
              key={index}
              className="container mx-auto p-6 rounded  my-6 border-gray-300 border-2 border-dotted 
              "
            >
              <div className="flex flex-col md:justify-between  md:items-center md:flex-row mb-10border-gray-300 border-b-2 pb-3  border-dotted">
                <h1 className="text-lg text-gray-600">
                  <span className="font-semibold text-black">
                    Transaction Number:
                  </span>{" "}
                  #{order.id}
                </h1>
                <p className="text-lg text-gray-600">
                  <span className="font-semibold text-black"> Placed on:</span>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <p className="text-lg text-gray-600">
                  <span className="font-semibold text-black"> Payment: </span>{" "}
                  {order.paymentMethodType}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {order?.cartItems?.map((product, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 ">
                    <img
                      src={product.product.imageCover}
                      alt={product.product.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h2 className="text-xl font-medium">
                        {product.product.title.split(" ").slice(0, 2).join(" ")}
                      </h2>
                      <p className="text-green-500">
                        <span className="font-semibold text-black">Price:</span>{" "}
                        {product.price} EGP
                      </p>
                      <p className="text-green-500">
                        <span className="font-semibold text-black">
                          Quantity:{" "}
                        </span>
                        {product.count}
                      </p>
                      <p className="text-gray-600">
                        {product.product.category.name}
                      </p>
                      <p className="text-gray-600">
                        {product.product.brand.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <p className="text-lg text-green-600">
                  <span className="font-semibold text-black">
                    Products Quantity:{" "}
                  </span>
                  {order?.cartItems.reduce(
                    (total, item) => total + item.count,
                    0
                  )}
                </p>
                <p className="text-lg text-green-600">
                  <span className="font-semibold text-black">
                    Shipping Price:{" "}
                  </span>
                  {order.shippingPrice} EGP
                </p>
                <p className="text-lg text-green-600">
                  <span className="font-semibold text-black">Taxes: </span>
                  {order.taxPrice} EGP
                </p>
                <p className="text-lg font-semibold text-green-700">
                  <span className="font-semibold text-black">
                    Total Order Price:{" "}
                  </span>
                  {order.totalOrderPrice + order.taxPrice} EGP
                </p>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
