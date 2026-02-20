import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Customize from "./pages/Customize";
import ProceedtoCustomize from "./pages/ProceedtoCustomize";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import TryOn from "./pages/TryOn";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { CartProvider } from "./contexts/CartContext";
import { authAPI } from "./services/api";

// Protected Route Component
function ProtectedRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("jwt_token");
    if (token) {
      authAPI
        .verify()
        .then(() => {
          setIsAuthenticated(true);
        })
        .catch(() => {
          localStorage.removeItem("jwt_token");
          setIsAuthenticated(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/customize" element={<Customize />} />
              <Route path="/customize" element={<ProceedtoCustomize />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/tryon" element={<TryOn />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Protected Routes */}
              <Route
                path="/user-dashboard"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
