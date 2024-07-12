import React from "react";
import "./Navbar.css"; // Import the custom CSS

const Navbar = () => {
  return (
    <nav className="bg-zinc-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <a
            href="#"
            className="link-transition text-xl text-white font-medium relative overflow-hidden"
          >
            <span>Home</span>
          </a>
          <a
            href="#features"
            className="link-transition text-xl text-white font-medium relative overflow-hidden"
          >
            <span>Features</span>
          </a>
          <a
            href="#clients"
            className="link-transition text-xl text-white font-medium relative overflow-hidden"
          >
            <span>Clients</span>
          </a>
          <a
            href="#pricing"
            className="link-transition text-xl text-white font-medium relative overflow-hidden"
          >
            <span>Pricing</span>
          </a>
          <a
            href="#contact"
            className="link-transition text-xl text-white font-medium relative overflow-hidden"
          >
            <span>Contact</span>
          </a>
        </div>
        <div className="flex space-x-4">
          <button className="button-transition bg-lime-400 text-xl text-white px-4 py-2 rounded border border-lime-400 relative overflow-hidden">
            <span className="relative z-10">Login</span>
          </button>
          <button className="button-transition text-xl text-white px-4 py-2 rounded border border-lime-400 relative overflow-hidden">
            <span className="relative z-10">Sign Up</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
