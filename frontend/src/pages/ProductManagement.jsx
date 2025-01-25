import { useState, useEffect } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: null,
  });

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  // Handle Image Upload
  const handleImageUpload = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  // Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(newProduct).forEach((key) => {
      formData.append(key, newProduct[key]);
    });

    try {
      const response = await axiosInstance.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProducts([...products, response.data]);
      setNewProduct({ name: "", price: "", image: null });
      toast("Item added successfully!", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  // Edit Product
  const handleEditProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(editProduct).forEach((key) => {
      formData.append(key, editProduct[key]);
    });

    try {
      const response = await axiosInstance.put(
        `/products/${editProduct._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProducts(
        products.map((p) => (p._id === editProduct._id ? response.data : p))
      );
      setEditProduct(null);
    } catch (error) {
      console.error("Error editing product", error);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (productId) => {
    try {
      await axiosInstance.delete(`/products/${productId}`);
      setProducts(products.filter((p) => p._id !== productId));
      toast('Deleted!', {
        icon: '🗑️',
      });
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product List */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Product List</h2>
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-gray-500">₹{product.price}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditProduct(product)}
                    className="text-blue-500 hover:bg-blue-100 p-2 rounded"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="text-red-500 hover:bg-red-100 p-2 rounded"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Form */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {editProduct ? "Edit Product" : "Add New Product"}
          </h2>
          <form
            onSubmit={editProduct ? handleEditProduct : handleAddProduct}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Product Name"
              value={editProduct ? editProduct.name : newProduct.name}
              onChange={(e) =>
                editProduct
                  ? setEditProduct({ ...editProduct, name: e.target.value })
                  : setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={editProduct ? editProduct.price : newProduct.price}
              onChange={(e) =>
                editProduct
                  ? setEditProduct({ ...editProduct, price: e.target.value })
                  : setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full border p-2 rounded"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded flex items-center justify-center hover:bg-blue-600"
            >
              <Plus className="mr-2" />
              {editProduct ? "Update Product" : "Add Product"}
            </button>
            {editProduct && (
              <button
                type="button"
                onClick={() => setEditProduct(null)}
                className="w-full bg-gray-200 text-gray-800 p-2 rounded mt-2"
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
