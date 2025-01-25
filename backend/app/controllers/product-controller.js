import Product from "../models/products-model.js";


const productCtrl = {}

productCtrl.createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const newProduct = new Product({
      name,
      price,
      description,
      image: req.imageUrl || "", // Cloudinary URL from middleware
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      error: "Product creation failed",
      message: error.message,
    });
  }
};

productCtrl.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;

    const updateData = {
      name,
      price,
      description,
    };

    // Update image if new file uploaded
    if (req.imageUrl) {
      updateData.image = req.imageUrl;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      error: "Product update failed",
      message: error.message,
    });
  }
};

productCtrl.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: "Error getting products" });
  }
};

productCtrl.getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: "Error getting product" });
  }
};

productCtrl.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting product" });
  }
};

export default productCtrl;
