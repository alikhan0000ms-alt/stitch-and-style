import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { FiShoppingCart, FiEdit } from "react-icons/fi";
import { BsShop } from "react-icons/bs";
import { MdOutlineContactMail } from "react-icons/md";
import { RiFilePaper2Line } from "react-icons/ri";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    setShowSignInForm(false);
    navigate("/");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setShowSignUpForm(false);
    navigate("/");
  };

  return (
    <nav className="bg-[#F2E6DA] shadow-md border-b border-[#E6D8C4] sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4">
          <img src={logo} alt="Logo" className="w-12 md:w-16" />
          <h1 className="text-2xl font-bold text-[#C97C7C] tracking-wide">
            Stitch & Style
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 font-medium items-center">
          <li>
            <Link
              to="/"
              className="flex items-center gap-1 relative hover:text-[#C97C7C] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-[#C97C7C] after:w-0 hover:after:w-full after:transition-all"
            >
              <AiOutlineHome /> Home
            </Link>
          </li>
          <li>
            <Link
              to="/shop"
              className="flex items-center gap-1 relative hover:text-[#C97C7C] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-[#C97C7C] after:w-0 hover:after:w-full after:transition-all"
            >
              <BsShop /> Shop
            </Link>
          </li>
          <li>
            <Link
              to="/customize"
              className="flex items-center gap-1 relative hover:text-[#C97C7C] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-[#C97C7C] after:w-0 hover:after:w-full after:transition-all"
            >
              <FiEdit /> Customize
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="flex items-center gap-1 relative hover:text-[#C97C7C] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-[#C97C7C] after:w-0 hover:after:w-full after:transition-all"
            >
              <RiFilePaper2Line /> About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="flex items-center gap-1 relative hover:text-[#C97C7C] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-[#C97C7C] after:w-0 hover:after:w-full after:transition-all"
            >
              <MdOutlineContactMail /> Contact
            </Link>
          </li>
          <li className="relative">
            <Link
              to="/cart"
              className="flex items-center gap-1 hover:text-[#C97C7C]"
            >
              <FiShoppingCart /> Cart
              <span className="absolute -top-2 -right-3 bg-[#C97C7C] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                3
              </span>
            </Link>
          </li>

          {/* Sign In / Sign Up */}
          <li>
            <button
              onClick={() => setShowSignInForm(true)}
              className="px-4 py-2 rounded-full bg-[#C97C7C] text-white hover:bg-[#f9ebd5] hover:text-[#C97C7C] shadow-md hover:shadow-lg transition transform hover:scale-105 border-2 border-[#C97C7C]"
            >
              Sign In
            </button>
          </li>
          <li>
            <button
              onClick={() => setShowSignUpForm(true)}
              className="px-4 py-2 rounded-full bg-[#C97C7C] text-white hover:bg-[#f9ebd5] hover:text-[#C97C7C] shadow-md hover:shadow-lg transition transform hover:scale-105 border-2 border-[#C97C7C]"
            >
              Log In
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-[#8B4B62] focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-[#FAF7F2] border-t border-[#E6D8C4] overflow-hidden transition-max-h duration-300 ${
          menuOpen ? "max-h-96 py-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-4">
          <li>
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-[#C97C7C]"
              onClick={() => setMenuOpen(false)}
            >
              <AiOutlineHome /> Home
            </Link>
          </li>
          <li>
            <Link
              to="/shop"
              className="flex items-center gap-1 hover:text-[#C97C7C]"
              onClick={() => setMenuOpen(false)}
            >
              <BsShop /> Shop
            </Link>
          </li>
          <li>
            <Link
              to="/customize"
              className="flex items-center gap-1 hover:text-[#C97C7C]"
              onClick={() => setMenuOpen(false)}
            >
              <FiEdit /> Customize
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="flex items-center gap-1 hover:text-[#C97C7C]"
              onClick={() => setMenuOpen(false)}
            >
              <RiFilePaper2Line /> About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="flex items-center gap-1 hover:text-[#C97C7C]"
              onClick={() => setMenuOpen(false)}
            >
              <MdOutlineContactMail /> Contact
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="flex items-center gap-1 hover:text-[#C97C7C] relative"
              onClick={() => setMenuOpen(false)}
            >
              <FiShoppingCart /> Cart
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                3
              </span>
            </Link>
          </li>

          <li>
            <button
              onClick={() => {
                setShowSignInForm(true);
                setMenuOpen(false);
              }}
              className="mt-2 px-4 py-2 rounded-full bg-[#C97C7C] text-white hover:bg-[#b05d5d] shadow-md hover:shadow-lg transition transform hover:scale-105 border-2 border-[#C97C7C]"
            >
              Sign In
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setShowSignUpForm(true);
                setMenuOpen(false);
              }}
              className="mt-2 px-4 py-2 rounded-full bg-[#8B4B62] text-white hover:bg-[#C97C7C] shadow-md hover:shadow-lg transition transform hover:scale-105 border-2 border-[#C97C7C]"
            >
              Log In
            </button>
          </li>
        </ul>
      </div>

      {/* Sign In Form Modal */}
      {showSignInForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-[#FAF7F2] shadow-lg p-6 rounded-xl w-80">
            <h2 className="text-xl font-bold mb-4 text-[#C97C7C] text-center">
              Sign In
            </h2>

            {/* Social Login Buttons */}
            <div className="flex flex-col gap-3 mb-4">
              <button className="flex items-center justify-center gap-2 border border-gray-300 bg-white py-2 rounded hover:bg-gray-100 transition">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>

              <button className="flex items-center justify-center gap-2 bg-[#1877F2] text-white py-2 rounded hover:bg-[#145dbf] transition">
                <img
                  src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                  alt="Facebook"
                  className="w-5 h-5 bg-white rounded-full"
                />
                Continue with Facebook
              </button>
            </div>

            <form onSubmit={handleSignIn}>
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full mb-3 p-2 border rounded outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full mb-4 p-2 border rounded outline-none"
              />
              <button
                type="submit"
                className="w-full py-2 rounded bg-[#C97C7C] text-white hover:bg-[#b05d5d] transition"
              >
                Sign In
              </button>
            </form>

            <button
              onClick={() => setShowSignInForm(false)}
              className="mt-4 text-sm text-[#8B4B62] hover:text-[#C97C7C] block mx-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Sign Up Form Modal */}
      {showSignUpForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-[#FAF7F2] shadow-xl p-6 rounded-xl w-80">
            <h2 className="text-xl font-bold mb-4 text-[#C97C7C] text-center">
              Create Account
            </h2>

            {/* Social Sign Up */}
            <div className="flex flex-col gap-3 mb-4">
              <button className="flex items-center justify-center gap-2 border border-gray-300 bg-white py-2 rounded hover:bg-gray-100 transition">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign up with Google
              </button>

              <button className="flex items-center justify-center gap-2 bg-[#1877F2] text-white py-2 rounded hover:bg-[#145dbf] transition">
                <img
                  src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                  alt="Facebook"
                  className="w-5 h-5 bg-white rounded-full"
                />
                Sign up with Facebook
              </button>
            </div>

            <form onSubmit={handleSignUp}>
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full mb-3 p-2 border rounded outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full mb-3 p-2 border rounded outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full mb-4 p-2 border rounded outline-none"
              />

              <button
                type="submit"
                className="w-full py-2 rounded bg-[#C97C7C] text-white hover:bg-[#b05d5d] transition"
              >
                Sign Up
              </button>
            </form>

            <button
              onClick={() => setShowSignUpForm(false)}
              className="mt-4 text-sm text-[#8B4B62] hover:text-[#C97C7C] block mx-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
