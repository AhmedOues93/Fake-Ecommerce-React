import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useOutletContext();

  const catUrl = "https://fakestoreapi.com/products/categories";
  const productUrl = "https://fakestoreapi.com/products";

  useEffect(() => {
    fetch(catUrl)
      .then(res => res.json())
      .then(setCategories);

    fetch(productUrl)
      .then(res => res.json())
      .then(setProducts);
  }, []);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart[product.id];
      const quantity = existing ? existing.quantity + 1 : 1;
      return { ...prevCart, [product.id]: { product, quantity } };
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
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
      <h1 className="text-3xl font-bold mb-6">All Categories</h1>
      <div className="flex gap-4 mb-8">
        {categories.map(cat => (
          <Link
            key={cat}
            to={`/category/${cat}`}
            className="btn btn-outline capitalize"
          >
            {cat}
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => {
          const quantity = getQuantity(product.id);
          return (
            <div key={product.id} className="card bg-base-100 shadow-md p-4 flex flex-col">
              <h3 className="font-bold">{product.title}</h3>
              <p className="text-lg text-primary mb-2">{formatPrice(product.price)}</p>
              <Link
                to={`/category/${product.category}`}
                className="text-blue-500 hover:underline capitalize mb-4"
              >
                {product.category}
              </Link>

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
    </div>
  );
};

export default Home;

