import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "../contexts/CartProvider";
const Navbar = () => {
  const { cartItems } = useCart();
  console.log(cartItems);
  return (
    <header>
      <nav className="bg-violet-400 p-4 ">
        <ul className="flex justify-between items-center text-white">
          <li className="flex items-center space-x-5 ">
            <Link to="/">
              <a>Home</a>
            </Link>
            <Link to="/products">
              <a>Products</a>
            </Link>
          </li>
          <li className=" flex bg-violet-950 p-2 rounded-xl ">
            <Link to="/cart">
              <a>
                <ShoppingCart />
              </a>
            </Link>
            <span className="px-2">{cartItems[0]?.products.length}</span>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Navbar;
