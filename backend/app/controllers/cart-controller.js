import Product from "../models/products-model.js";
import Cart from "../models/cart-model.js";

const cartCtrl = {};

cartCtrl.getCart = async (req, res) => {
  try {
    const cart = await Cart.find()
    return res.status(200).json({ data: cart });
  } catch (error) {
    return res.status(400).json({ message: "cart not found" });
  }
};

cartCtrl.addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid product or quantity" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne();

    if (!cart) {
      cart = new Cart({
        products: [{ product: productId, quantity }],
        totalPrice: product.price * quantity,
      });
    } else {
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      // Recalculate the total price
      cart.totalPrice += product.price * quantity;
    }

    await cart.save();
    return res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

cartCtrl.removeItemFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (productIndex > -1) {
      // Retrieve product details
      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: "Product not found in database" });
      }

      // Adjust the total price
      cart.totalPrice -= product.price * cart.products[productIndex].quantity;

      // Remove the product from the cart
      cart.products.splice(productIndex, 1);

      await cart.save();
      return res
        .status(200)
        .json({ message: "Product removed from cart", cart });
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default cartCtrl;
