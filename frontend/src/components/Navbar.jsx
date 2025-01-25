import { Home, Package, ShoppingCart } from "lucide-react";
import { Link } from "react-router";

import { useCart } from "../contexts/CartProvider";

const Navbar = () => {
  const { cartItems } = useCart();
  return (
    <header className="sticky top-0 z-50">
    <nav className="bg-gradient-to-r from-violet-500 to-violet-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-violet-100 transition-colors flex items-center">
            <Home className="mr-2" />
            <span className="font-medium">Home</span>
          </Link>
          <Link to="/products" className="text-white hover:text-violet-100 transition-colors flex items-center">
            <Package className="mr-2" />
            <span className="font-medium">Products</span>
          </Link>
        </div>
        
        <Link to="/cart" className="relative">
          <div className="bg-violet-950 p-3 rounded-xl flex items-center space-x-2 hover:bg-violet-900 transition-colors">
            <ShoppingCart className="text-white" />
            {cartItems?.products.length > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center absolute -top-2 -right-2">
                {cartItems.products.length}
              </span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  </header>
  );
};
export default Navbar;
