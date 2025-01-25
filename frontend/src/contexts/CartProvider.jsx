import { createContext, useContext, useEffect, useReducer } from "react";
import axiosInstance from "../utils/axiosInstance";

const cartContext = createContext();

const initialCart = { products: [], totalPrice: 0 };

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      return {
        ...state,
        products: action.payload.products,
        totalPrice: action.payload.totalPrice,
      };
    }
    case "REMOVE_ITEM": {
      return (state.products = state.payload);
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
      console.log(postItem.data.cart);
      cartDispatch({
        type: "ADD_ITEM",
        payload: {
          products: postItem.data.cart.products,
          totalPrice: postItem.data.cart.totalPrice,
        },
      });
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
    cartDispatch({ type: "ADD_CART", payload: cart });
  }

  return (
    <cartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, setCart }}
    >
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
