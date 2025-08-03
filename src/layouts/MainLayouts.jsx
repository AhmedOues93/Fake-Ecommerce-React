import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getCartFromStorage, saveCartToStorage } from "../utils/cartStorage";
import Footer from "../components/Footer";

const MainLayouts = () => {
  const [cart, setCart] = useState({});

  useEffect(() => {
    const storedCart = getCartFromStorage();
    setCart(storedCart);
  }, []);

  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar cart={cart} />
      <main className="flex-grow p-4">
        <Outlet context={{ cart, setCart }} />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayouts;



