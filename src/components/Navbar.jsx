import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ cart = {} }) => {
  const totalItems = Object.values(cart).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <nav className="navbar bg-gray-100 shadow-md px-6 py-3 flex justify-between items-center">
      <div>
        <Link to="/" className="text-2xl font-bold text-primary">
          🛒 Ahmed Store
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <Link to="/" className="btn btn-outline btn-neutral">
          Home
        </Link>
        <Link to="/contact" className="btn btn-outline btn-neutral">
         Cart
        </Link>
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
