import { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import axiosInstance from "../utils/axiosInstance";

const ProductsListing = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => 
    product?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleSearch(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <section>
      <main>
        <div className="text-end">
          <label htmlFor="search" className="font-medium">
            Search Items:
          </label>
          <input
            type="text"
            className="mt-2 border placeholder:text-center"
            placeholder="Search name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="m-4 flex gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductItem key={product?._id} {...product} />
            ))
          ) : (
            <div className="w-full text-center text-gray-500">
              {searchTerm ? "No products found" : "No products available"}
            </div>
          )}
        </div>
      </main>
    </section>
  );
};

export default ProductsListing;