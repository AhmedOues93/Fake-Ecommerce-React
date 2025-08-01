import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";

const ProductCategory = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart, setCart } = useOutletContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/category/${category}`
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart[product.id];
      const quantity = existing ? existing.quantity + 1 : 1;
      return { ...prevCart, [product.id]: { product, quantity } };
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const existing = prevCart[productId];
      if (!existing) return prevCart;

      if (existing.quantity === 1) {
        const newCart = { ...prevCart };
        delete newCart[productId];
        return newCart;
      } else {
        return { ...prevCart, [productId]: { ...existing, quantity: existing.quantity - 1 } };
      }
    });
  };

  const getQuantity = (id) => (cart[id]?.quantity || 0);

  const formatPrice = (price) =>
    new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(price);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 capitalize">{category} Products</h1>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => {
            const quantity = getQuantity(product.id);
            return (
              <div key={product.id} className="card bg-base-100 shadow-md p-4 flex flex-col">
                <h3 className="font-bold">{product.title}</h3>
                <p className="text-lg text-primary mb-2">{formatPrice(product.price)}</p>

                {quantity === 0 ? (
                  <button
                    onClick={() => addToCart(product)}
                    className="btn btn-primary mt-auto"
                  >
                    Add to cart
                  </button>
                ) : (
                  <div className="flex items-center gap-2 mt-auto">
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="btn btn-sm btn-outline"
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="btn btn-sm btn-outline"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductCategory;

