import React from "react";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import MainLayouts from "./layouts/MainLayouts";
import Category from "./pages/ProductCategory";

import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
;

const App = () => {
  return (
    <BrowserRouter>
<Routes>
  <Route path="/" element={<MainLayouts />}>
    <Route index element={<Home />} />
    <Route path="cart" element={<Cart />} />
    <Route path="category/:name" element={<Category />} />
  </Route>
</Routes>
    </BrowserRouter>
  );
};

export default App;