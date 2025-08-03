import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ cart = {} }) => {
  const [categories, setCategories] = useState([]);
  const totalItems = Object.values(cart).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  return (
    <nav className="navbar bg-green-200 shadow-md px-6 py-3 flex justify-between items-center">
       <h1 className="text-4xl font-extrabold text-gray-700 hover:text-green-900">
    🛒 Ahmed Store
  </h1>
      <div className="flex items-center gap-4">
       <Link to="/Home" className="btn bg-green-700 text-white text-xl hover:bg-white hover:text-green-700">
  Home
</Link>

     
        <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="btn bg-green-700   text-white text-xl btn-h
        hover:bg-white  hover:text-green-700">
            Categories
          </label>
         <ul
  tabIndex={0}
  className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52"
>
  {categories.map((cat) => (
    <li key={cat}>
      <Link
        to={`/category/${cat}`}
        className="hover:bg-green-300 hover:text-black"
      >
        {cat}
      </Link>
    </li>
  ))}
</ul>

        </div>

      

        <Link to="/cart" className="btn btn-ghost btn-circle relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 2.3a1 1 0 00.7 1.7H17a2 2 0 100 4 2 2 0 000-4h-1"
            />
          </svg>
          {totalItems > 0 && (
            <span className="badge badge-sm indicator-item absolute top-0 right-0">
              {totalItems}
            </span>
          )}
        </Link>

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full overflow-hidden">
              <img src="/280 (1).jpg" alt="profile" />
            </div>
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

