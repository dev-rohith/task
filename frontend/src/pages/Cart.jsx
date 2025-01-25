import { Trash2, ShoppingCart, CreditCard } from "lucide-react";
import { useCart } from "../contexts/CartProvider";

const Cart = () => {
  const {cartItems} = useCart()
  const { products, totalPrice } = cartItems

  return (
    <div className="bg-purple-50 p-6 rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <ShoppingCart className="text-violet-600 mr-2" />
        <h2 className="text-xl font-bold text-violet-800">Cart Details</h2>
      </div>

      {/* Billing Section */}
      <div className="bg-white p-4 rounded-lg mb-4">
        <h3 className="text-lg font-semibold text-violet-700 mb-3">Billing</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-violet-900">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-violet-900">
            <span>Tax (10%)</span>
            <span>${(totalPrice * 0.1).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-violet-800 border-t pt-2">
            <span>Total</span>
            <span>${(totalPrice * 1.1).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Cart Items Section */}
      <div className="bg-white p-4 rounded-lg mb-4">
        <h3 className="text-lg font-semibold text-violet-700 mb-3">
          Cart Items
        </h3>
        {products.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between mb-3 pb-3 border-b"
          >
            <div className="flex-grow mr-4">
              <span className="text-violet-900">
                Product ID: {item.product}
              </span>
              <div className="text-violet-600">Quantity: {item.quantity}</div>
            </div>
            <button
              className="text-violet-600 hover:bg-violet-100 p-2 rounded-full transition-colors"
              aria-label="Remove Item"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Proceed to Pay Section */}
      <button className="w-full bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700 transition-colors flex items-center justify-center">
        <CreditCard className="mr-2" />
        Proceed to Pay
      </button>
    </div>
  );
};

export default Cart;
