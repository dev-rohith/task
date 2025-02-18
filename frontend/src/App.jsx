import { Routes, Route } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import ProductsListing from "./pages/ProductsListing";
import ProductManagement from "./pages/ProductManagement";
import Cart from "./pages/Cart";
import { useEffect } from "react";
import axiosInstance from "./utils/axiosInstance";
import { useCart } from "./contexts/CartProvider";
import OrderSuccess from "./components/OrderSuccess";

const App = () => {
  
  const { setCart } = useCart();
  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await axiosInstance.get("/cart");
        setCart(response.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCart();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route path="/" element={<ProductsListing />} />
        <Route path="/products" element={<ProductManagement />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<OrderSuccess />} />
      </Route>
    </Routes>
  );
};
export default App;
