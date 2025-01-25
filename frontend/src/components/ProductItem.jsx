import { useState } from "react";
import { useCart } from "../contexts/CartProvider";

const ProductItem = ({ _id, name, price, image }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  function handleAddToCart() {
    addToCart({
      productId: _id,
      quantity,
    });
  }
  return (
    <div className="w-40  border-4 border-violet-300 p-0 text-center bg-pink-100">
      <img src={image} alt={name} className="w-40 h-40" />
      <h4 className="uppercase font-medium text-violet-900">{name}</h4>
      <p className="font-bold text-slate-700 text-lg">Price: ₹{price}</p>
      <label htmlFor="qantity">Quantity</label>
      <select
        name="quantity"
        id="quantity"
        onChange={(e) => setQuantity(e.target.value)}
      >
        {Array.from({ length: 5 }, (_, index) => (
          <option key={index}>{index + 1}</option>
        ))}
      </select>
      <button
        className="mb-2 mt-3 rounded-2xl text-white  bg-violet-400 hover:bg-violet-900 py-1 px-3"
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
    </div>
  );
};
export default ProductItem;
