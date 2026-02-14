import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    setShowSignInForm(false);
    navigate('/');
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setShowSignUpForm(false);
    navigate('/');
  };

  return (
    <nav className="bg-[#FAF7F2] shadow-md border-b border-[#E6D8C4]">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/"><div className="flex items-center gap-4">
          <img src={logo} alt="Logo" className="w-12 md:w-16" />
          <h1 className="text-2xl font-bold text-[#C97C7C] tracking-wide">Stitch & Style</h1>
        </div></Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 font-medium items-center">
          <li><Link to="/" className="hover:text-[#C97C7C] transition">Home</Link></li>
          <li><Link to="/shop" className="hover:text-[#C97C7C] transition">Shop</Link></li>
          <li><Link to="/customize" className="hover:text-[#C97C7C] transition">Customize</Link></li>
          <li><Link to="/cart" className="hover:text-[#C97C7C] transition">Cart</Link></li>

          <li><Link to="/about" className="hover:text-[#C97C7C] transition">About</Link></li>
          <li><Link to="/contact" className="hover:text-[#C97C7C] transition">Contact</Link></li>
          <li>
            <button
              onClick={() => setShowSignInForm(true)}
              className="px-4 py-2 rounded-full bg-[#C97C7C] text-[#FAF7F2] hover:bg-[#f9ebd5] hover:text-[#C97C7C] border-2 border-[#C97C7C] transition"
            >
              Sign In
            </button>
          </li>
          <li>
            <button
              onClick={() => setShowSignUpForm(true)}
              className="px-4 py-2 rounded-full bg-[#C97C7C] text-white hover:bg-[#f9ebd5] hover:text-[#C97C7C] border-2 border-[#C97C7C] transition"
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-t border-[#E6D8C4]">
          <ul className="flex flex-col items-center gap-4 py-4">
            <li><Link to="/" className="block py-2 hover:text-[#C97C7C]" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/shop" className="block py-2 hover:text-[#C97C7C]" onClick={() => setMenuOpen(false)}>Shop</Link></li>
            <li><Link to="/customize" className="block py-2 hover:text-[#C97C7C]" onClick={() => setMenuOpen(false)}>Customize</Link></li>
            <li><Link to="/about" className="block py-2 hover:text-[#C97C7C]" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link to="/contact" className="block py-2 hover:text-[#C97C7C]" onClick={() => setMenuOpen(false)}>Contact</Link></li>
            <li><Link to="/cart" className="block py-2 hover:text-[#C97C7C]" onClick={() => setMenuOpen(false)}>Cart</Link></li>
            <li>
              <button
                onClick={() => { setShowSignInForm(true); setMenuOpen(false); }}
                className="mt-2 px-4 py-2 rounded-full bg-[#C97C7C] text-[#FAF7F2] hover:bg-[#f9ebd5] hover:text-[#C97C7C] border-2 border-[#C97C7C] transition"
              >
                Sign In
              </button>
            </li>
            <li>
              <button
                onClick={() => { setShowSignUpForm(true); setMenuOpen(false); }}
                className="mt-2 px-4 py-2 rounded-full bg-[#8B4B62] text-white hover:bg-[#C97C7C] hover:text-[#FAF7F2] border-2 border-[#C97C7C] transition"
              >
                Log In
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Sign In Form Modal */}
      {showSignInForm && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="bg-[#FAF7F2] shadow-lg p-6 rounded-lg w-80">
            <h2 className="text-xl font-bold mb-4 text-[#C97C7C]">Sign In</h2>
            <form onSubmit={handleSignIn}>
              <input type="email" placeholder="Email" className="w-full mb-3 p-2 border rounded" />
              <input type="password" placeholder="Password" className="w-full mb-3 p-2 border rounded" />
              <button type="submit" className="w-full py-2 rounded bg-[#C97C7C] text-white hover:bg-[#f9ebd5] hover:text-[#C97C7C] transition">Sign In</button>
            </form>
            <button onClick={() => setShowSignInForm(false)} className="mt-3 text-sm text-[#8B4B62] hover:text-[#C97C7C]">Close</button>
          </div>
        </div>
      )}

      {/* Sign Up Form Modal */}
      {showSignUpForm && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="bg-[#FAF7F2] shadow-lg p-6 rounded-lg w-80">
            <h2 className="text-xl font-bold mb-4 text-[#8B4B62]">Sign Up</h2>
            <form onSubmit={handleSignUp}>
              <input type="text" placeholder="Full Name" className="w-full mb-3 p-2 border rounded" />
              <input type="email" placeholder="Email" className="w-full mb-3 p-2 border rounded" />
              <input type="password" placeholder="Password" className="w-full mb-3 p-2 border rounded" />
              <button type="submit" className="w-full py-2 rounded bg-[#8B4B62] text-white hover:bg-[#C97C7C] hover:text-[#FAF7F2] transition">Sign Up</button>
            </form>
            <button onClick={() => setShowSignUpForm(false)} className="mt-3 text-sm text-[#8B4B62] hover:text-[#C97C7C]">Close</button>
          </div>
        </div>
      )}
    </nav>
  );
}