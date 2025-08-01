import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getCartFromStorage, saveCartToStorage } from "../utils/cartStorage";

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
    <>
      <Navbar cart={cart} />
      <main className="p-4">
       <Outlet context={{ cart, setCart }} />
      </main>
    </>
  );
};

export default MainLayouts;


