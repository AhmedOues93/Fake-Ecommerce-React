

import React from "react";
import { addToCart, removeFromCart } from "../utils/cartUtils";

const ProductCard = ({ product, cart, setCart }) => {
  const quantity = cart[product.id]?.quantity || 0;

  const handleAdd = () => {
    const updatedCart = addToCart(cart, product);
    setCart(updatedCart);
  };

  const handleRemove = () => {
    const updatedCart = removeFromCart(cart, product.id);
    setCart(updatedCart);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={product.image} alt={product.title} className="h-52 w-auto p-4 object-contain" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg">{product.title}</h2>
        <p className="text-primary font-bold">
          {new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
          }).format(product.price)}
        </p>
        <div className="card-actions justify-between mt-4">
          {quantity > 0 ? (
            <div className="flex items-center gap-2">
              <button className="btn btn-sm btn-error" onClick={handleRemove}>
                -
              </button>
              <span className="font-bold">{quantity}</span>
              <button className="btn btn-sm btn-success" onClick={handleAdd}>
                +
              </button>
            </div>
          ) : (
            <button className="btn btn-outline btn-primary" onClick={handleAdd}>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
