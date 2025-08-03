import React, { useEffect, useState } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";

const Category = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useOutletContext();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/category/${name}`)
      .then(res => res.json())
      .then(setProducts);
  }, [name]);

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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 capitalize">{name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => {
          const quantity = getQuantity(product.id);
          return (
            <div key={product.id} className="card bg-base-100 shadow-md p-4 flex flex-col">
              <img
                src={product.image}
                alt={product.title}
                className="w-40 h-40 object-contain mx-auto mb-4"
              />
              <h3 className="font-bold text-md mb-2">{product.title}</h3>
              <p className="text-lg text-primary mb-1">{product.price} €</p>

              {quantity === 0 ? (
                <button
                  onClick={() => addToCart(product)}
                  className="mt-auto bg-green-700 text-xl text-white hover:bg-white hover:text-green-700 border border-green-700 transition-colors duration-300 px-4 py-2 rounded"
                >
                  Add to cart
                </button>
              ) : (
                <div className="flex items-center gap-2 mt-auto">
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="mt-auto bg-green-700 text-xl text-white hover:bg-white hover:text-green-700 border border-green-700 transition-colors duration-300 px-4 py-2 rounded"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-auto bg-green-700 text-xl text-white hover:bg-white hover:text-green-700 border border-green-700 transition-colors duration-300 px-4 py-2 rounded"
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

export default Category;
