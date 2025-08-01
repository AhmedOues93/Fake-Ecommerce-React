import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Category = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://fakestoreapi.com/products/category/${encodeURIComponent(name)}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [name]);

  if (loading) {
    return <p className="p-4 text-center">Loading...</p>;
  }

  if (error) {
    return <p className="p-4 text-center text-red-600">Error: {error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Category: {name}</h1>

      {products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded shadow p-2 flex flex-col items-center"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-32 h-32 object-contain mb-2"
              />
              <h2 className="text-sm text-center">{product.title}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;

