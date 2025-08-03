import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const [showProducts, setShowProducts] = useState(false);
  const [products, setProducts] = useState([]);
   const { cart, setCart } = useOutletContext();
  const getQuantity = (id) => (cart[id]?.quantity || 0);
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const existing = prevCart[productId];
      if (!existing) return prevCart;
      if (existing.quantity === 1) {
        const newCart = { ...prevCart };
        delete newCart[productId];
        return newCart;
      }
      return {

        ...prevCart,
        [productId]: { ...existing, quantity: existing.quantity - 1 },
      };
    });
  };
  const quantity = (id) => getQuantity(id);
  

  useEffect(() => {
    if (showProducts) {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then(setProducts);
    }
  }, [showProducts]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(price);
  

  const addToCart = (product) => {
    const updatedCart = { ...cart };
    if (updatedCart[product.id]) {
      updatedCart[product.id].quantity += 1;
    } else {
      updatedCart[product.id] = {
        ...product,
        quantity: 1,
      };
    }
    setCart(updatedCart);
  };


  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('/hero-ecom.png')`, 
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: showProducts ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.4)",
          transition: "background-color 0.5s ease",
          zIndex: 0,
        }}
      ></div>

      <div className="relative z-10 flex flex-col items-center justify-items-end-safe min-h-screen text-center text-neutral-content p-6">
        {!showProducts ? (
          <div className="max-w-md">
           
            <button
              className="btn bg-green-700 text-white text-xl btn-h hover:bg-white hover:text-green-700 transition-colors duration-300 px-6 py-3 rounded"
              onClick={() => setShowProducts(true)}
            >
              Go to Shopping 
            </button>
          </div>
        ) : (
          <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => {
  const productQuantity = quantity(product.id); 
  return (
    <div
      key={product.id}
      className="card bg-base-100 shadow-md p-4 flex flex-col text-black"
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-40 h-40 object-contain mx-auto mb-4"
      />
      <h3 className="font-bold text-md mb-2">{product.title}</h3>
      <p className="text-lg text-primary mb-1">
        {formatPrice(product.price)}
      </p>

      {productQuantity === 0 ? (
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
            className=" bg-green-700 text-xl text-white hover:bg-white hover:text-green-700 border border-green-700 transition-colors duration-300 px-4 py-2 rounded"
          >
            -
          </button>
          <span>{productQuantity}</span>
          <button
            onClick={() => addToCart(product)}
            className=" bg-green-700 text-xl text-white hover:bg-white hover:text-green-700 border border-green-700 transition-colors duration-300 px-4 py-2 rounded"
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
    </div>
  );
};

export default Home;
