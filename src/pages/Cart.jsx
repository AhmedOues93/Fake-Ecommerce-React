import React from "react";
import { useOutletContext } from "react-router-dom";

const Cart = () => {
  const { cart, setCart } = useOutletContext();

  const handleAdd = (product) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: {
        ...product,
        quantity: product.quantity + 1,
      },
    }));
  };

  const handleRemove = (product) => {
    setCart((prev) => {
      const current = prev[product.id];
      if (!current) return prev;

      if (current.quantity === 1) {
        const updated = { ...prev };
        delete updated[product.id];
        return updated;
      }

      return {
        ...prev,
        [product.id]: {
          ...current,
          quantity: current.quantity - 1,
        },
      };
    });
  };

  const total = Object.values(cart).reduce((sum, p) => {
    return sum + p.price * p.quantity;
  }, 0);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

      {Object.keys(cart).length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(cart).map((product) => (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>{product.price.toFixed(2)} €</td>
                  <td>{product.quantity}</td>
                  <td>{(product.price * product.quantity).toFixed(2)} €</td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm bg-green-700 text-white hover:bg-white hover:text-green-700 border border-green-700"
                      onClick={() => handleAdd(product)}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-sm bg-red-700 text-white hover:bg-white hover:text-red-700 border border-red-700"
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
                <td colSpan="3" className="text-right font-bold">Total</td>
                <td colSpan="2" className="text-lg font-bold">
                  {total.toFixed(2)} €
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default Cart;

