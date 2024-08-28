import { useState } from "react";
import useProducts from "../../Hooks/useProducts";
import Loading from "../Loading/Loading";
import RecentProducts from "../RecentProducts/RecentProducts";

export default function Products() {
  const { data, isLoading } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = data?.data.data.filter((product) =>
    product.category.name.toLowerCase().includes(searchTerm.toLowerCase())||
    product.brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {isLoading ? (
        <div className="center h-screen">
          <Loading />
        </div>
      ) : (
        <div className="center flex-col items-center">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 p-2 border border-gray-300 outline-green-500 w-1/2 rounded-lg tr3 my-4"
          />
          <div className="flex flex-wrap justify-center">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <RecentProducts key={product.id} product={product} />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
