import { createContext, useContext, useReducer } from "react";
import axiosInstance from "../utils/axiosInstance";

const cartContext = createContext();

const initialCart = [];

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      return state[0].products = action.payload
    }
    case "REMOVE_ITEM": {
      return state[0].products = action.payload
    }
    case "ADD_CART": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

function CartProvider({ children }) {
  const [cartItems, cartDispatch] = useReducer(cartReducer, initialCart);

  async function addToCart(item) {
    try {
      const postItem = await axiosInstance.post("/cart/add-item", item);
      console.log(postItem.data.cart.products)
      cartDispatch({type: "ADD_ITEM", payload: postItem.data.cart.products})
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromCart(item) {
    try {
      const postItem = await axiosInstance.post("/cart/remove-item", item);
      console.log(postItem);
    } catch (error) {
      console.log(error);
    }
  }

  function setCart(cart) {
    cartDispatch({type: 'ADD_CART', payload: cart})
  }

  return (
    <cartContext.Provider value={{ cartItems, addToCart, removeFromCart, setCart }}>
      {children}
    </cartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("context used outside");
  } else {
    return context;
  }
}

export default CartProvider;
