import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/WomensCategory.css";
import "../styles/Search.css";
import Search from "../components/Search";
import ProductCard from "../components/ProductCard";

const WomensCategory = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchWomenProducts() {
      setLoading(true);
      setError("");
      try {
        const response = await api.get("/admin/products/category/women");
        setProducts(response.data.response || response.data || []);
      } catch (err) {
        setError("Failed to load products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchWomenProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add products to your cart.");
      navigate("/login");
      return;
    }

    try {
      await api.post("/cart/add", { productId, quantity: 1 });
      alert("Product added to cart!");
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="category-page">
      <Search query={searchTerm} onSearch={setSearchTerm} />
      <br />
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={addToCart}
            />
          ))
        ) : (
          <p>No matching products found.</p>
        )}
      </div>
    </div>
  );
};

export default WomensCategory;
