import React from "react";
import { useOutletContext } from "react-router-dom";
import { addToCart, removeFromCart } from "../utils/cartStorage";

const Cart = () => {
  const { cart, setCart } = useOutletContext();

  const handleAdd = (item) => {
    const updated = addToCart(cart, item);
    setCart(updated);
  };

  const handleRemove = (item) => {
    const updated = removeFromCart(cart, item.id);
    setCart(updated);
  };

  const cartItems = Object.values(cart);
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🛍️ Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Line Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(({ product, quantity }) => (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>{product.price.toFixed(2)} €</td>
                  <td>{quantity}</td>
                  <td>{(product.price * quantity).toFixed(2)} €</td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleAdd(product)}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleRemove(product)}
                    >
                      -
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan="3">Total</th>
                <th>{total.toFixed(2)} €</th>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default Cart;
