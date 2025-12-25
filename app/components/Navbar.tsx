import { NavLink } from "react-router";
import { FaLaptopCode, FaTimes, FaBars } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const base = "transition hover:text-blue-400";
  const active = "text-white font-semibold decoration underline text-lg";

  return (
    <nav className="bg-gray-800 border-b border-gray-700 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-bold text-blue-300"
        >
          <FaLaptopCode className="text-blue-400 text-xl" />
          <span>The friendly developer</span>
        </NavLink>

        {/* Descktop Navigation links */}
        <div className="hidden md:flex items-center gap-6">
          <div className="space-x-4 text-sm text-gray-300">
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to="/projects"
            >
              Projects
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to="/blog"
            >
              Blog
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to="/contact"
            >
              Contact
            </NavLink>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-6 md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            title="menu"
            className="text-blue-400 text-xl cursor-pointer"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="bg-gray-800 border-t border-gray-700 px-6 py-4 space-y-2 space-x-4 text-center">
          <NavLink
            onClick={() => {
              setMenuOpen(false);
            }}
            className={({ isActive }) => (isActive ? active : base)}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => {
              setMenuOpen(false);
            }}
            className={({ isActive }) => (isActive ? active : base)}
            to="/projects"
          >
            Projects
          </NavLink>
          <NavLink
            onClick={() => {
              setMenuOpen(false);
            }}
            className={({ isActive }) => (isActive ? active : base)}
            to="/blog"
          >
            Blog
          </NavLink>
          <NavLink
            onClick={() => {
              setMenuOpen(false);
            }}
            className={({ isActive }) => (isActive ? active : base)}
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => {
              setMenuOpen(false);
            }}
            className={({ isActive }) => (isActive ? active : base)}
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
