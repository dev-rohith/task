import { Trash2 } from "lucide-react";
import { useCart } from "../contexts/CartProvider";

const CartItem = ({ product, quantity }) => {
  const { removeFromCart } = useCart();

  return (
    <div className="flex items-center justify-between mb-3 pb-3 border-b">
      <div className="flex-grow mr-4">
        <span className="text-violet-900">Product ID: {product}</span>
        <div className="text-violet-600">Quantity: {quantity}</div>
      </div>
      <button
        className="text-violet-600 hover:bg-violet-100 p-2 rounded-full transition-colors"
        aria-label="Remove Item"
        onClick={() => removeFromCart(product)}
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};
export default CartItem;
