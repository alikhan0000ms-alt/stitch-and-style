// import { useState, useEffect, useContext } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useCart } from "../contexts/CartContext";
// import TryOnModal from "../components/TryOnModal";
// import CheckoutModal from "../components/CheckOutModal";

// // --- PRODUCT IMAGES ---
// import women from "../assets/pro1.webp";
// import men from "../assets/men2.webp";
// import men2 from "../assets/men.webp";
// import women2 from "../assets/pro2.webp";
// import wallet from "../assets/wallet.webp";
// import sunglasses from "../assets/sunglasses.jpg";
// import scrunch from "../assets/scrunch.jpeg";
// import bag from "../assets/acc.webp";
// import tote from "../assets/tote.webp";

// // --- CATEGORY BANNERS ---
// import womenBanner from "../assets/womenbanner.png";
// import menBanner from "../assets/m.webp";
// import accessoriesBanner from "../assets/Accessoriesbann.jpg";

// export default function Shop() {
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const categoryParam = params.get("category");

//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [tryOnProduct, setTryOnProduct] = useState(null);
//   const [checkoutProduct, setCheckoutProduct] = useState(null);

//   const navigate = useNavigate();
//   const { addToCart } = useCart();

//   useEffect(() => {
//     if (categoryParam) setSelectedCategory(categoryParam);
//   }, [categoryParam]);

//   // --- Products List ---
//   const allProducts = [
//     { id: 1, name: "Elegant Floral Dress", price: 3200, category: "women", img: women },
//     { id: 2, name: "Classic Shalwar kameez", price: 4200, category: "men", img: men },
//     { id: 3, name: "Premium Dress for men", price: 3800, category: "men", img: men2 },
//     { id: 4, name: "Designer Suit", price: 3400, category: "women", img: women2 },
//     { id: 5, name: "Silk Hair Scrunchie", price: 650, category: "accessories", img: scrunch },
//     { id: 6, name: "Genuine Leather Wallet", price: 1800, category: "accessories", img: wallet },
//     { id: 7, name: "UV-Protect Sunglasses", price: 2200, category: "accessories", img: sunglasses },
//     { id: 8, name: "Eco Tote Bag", price: 1500, category: "accessories", img: tote },
//     { id: 9, name: "Premium Handbag", price: 3500, category: "accessories", img: bag },
//   ];

//   const categoryBanners = {
//     women: womenBanner,
//     men: menBanner,
//     accessories: accessoriesBanner,
//   };

//   const filteredProducts =
//     selectedCategory === "all"
//       ? allProducts
//       : allProducts.filter((p) => p.category === selectedCategory);

//   return (
//     <section className="bg-[#FAF7F2] min-h-screen pb-10">
//       {/* CATEGORY BANNER */}
//       {selectedCategory !== "all" && (
//         <div className="w-full h-130 mb-10 overflow-hidden relative shadow-md">
//           <img
//             src={categoryBanners[selectedCategory]}
//             alt={`${selectedCategory} banner`}
//             className="w-full  h-135 object-cover brightness-70"
//           />
//           <h2 className="absolute bottom-5 left-10 text-4xl font-bold text-white capitalize drop-shadow-lg">
//             {selectedCategory} Collection
//           </h2>
//         </div>
//       )}

//       <div className="container mx-auto px-6">
//         <h2 className="text-4xl font-bold text-center mb-6 text-[#bb6464]">Shop Collection</h2>

//         {/* CATEGORY BUTTONS */}
//         <div className="flex justify-center gap-4 mb-10 flex-wrap">
//           {["all", "women", "men", "accessories"].map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setSelectedCategory(cat)}
//               className={`px-5 py-2 capitalize rounded-full border transition-all duration-300 ${
//                 selectedCategory === cat
//                   ? "bg-[#C97C7C] text-[#FAF7F2] border-[#C97C7C]"
//                   : "border-[#C97C7C] text-[#C97C7C] hover:bg-[#C97C7C] hover:text-[#FAF7F2]"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* PRODUCT GRID */}
//         <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-8">
//           {filteredProducts.map((p) => (
//             <div
//               key={p.id}
//               className="border border-[#E6D8C4] p-4 rounded-2xl shadow-sm hover:shadow-lg bg-white transition-all duration-300"
//             >
//               <img
//                 src={p.img}
//                 alt={p.name}
//                 className="rounded-lg w-full h-100 object-cover hover:scale-105 transition-transform duration-300"
//               />

//               <div className="mt-4 text-center">
//                 <h3 className="font-semibold text-lg text-[#2E2E2E]">{p.name}</h3>
//                 <p className="text-[#6B6B6B] mt-1">PKR {p.price}</p>

//                 {/* ADD TO CART BUTTON */}
//                 <button
//                   onClick={() => {
//                     addToCart(p);
//                     navigate("/cart");
//                   }}
//                   className="mt-4 bg-[#C97C7C] text-[#FAF7F2] px-5 py-2 rounded-full hover:bg-[#f9ebd5] hover:text-[#C97C7C] hover:border-2 hover:border-[#C97C7C] transition-all duration-300"
//                 >
//                   Add to Cart
//                 </button>

//                 {/* TRY ON BUTTON - Only for men/women */}
//                 {(p.category === "women" || p.category === "men") && (
//                   <button
//                     onClick={() => setTryOnProduct(p)}
//                     className="mt-4 ml-2 bg-[#C97C7C] text-[#FAF7F2] px-5 py-2 rounded-full hover:bg-[#f9ebd5] hover:text-[#C97C7C] hover:border-2 hover:border-[#C97C7C] transition-all duration-300"
//                   >
//                     Try On
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* TRY ON MODAL */}
//       {tryOnProduct && (
//         <TryOnModal
//           product={tryOnProduct}
//           onClose={() => setTryOnProduct(null)}
//           onBuy={(product) => setCheckoutProduct(product)} // Opens Checkout modal
//         />
//       )}

//       {/* CHECKOUT MODAL */}
//       {checkoutProduct && (
//         <CheckoutModal
//           product={checkoutProduct}
//           onClose={() => setCheckoutProduct(null)}
//         />
//       )}
//     </section>
//   );
// }



import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import TryOnModal from "../components/TryOnModal";
import CheckoutModal from "../components/CheckOutModal";

// --- FALLBACK IMAGES (for products without backend images) ---
import women from "../assets/n.jpg";
import men from "../assets/men3.webp";
import Asunglasses from "../assets/new5.webp";
import purse from "../assets/new3.webp";
import men2 from "../assets/men.webp";
import men3 from "../assets/wed_men.webp";

import women2 from "../assets/ne.webp";
import women3 from "../assets/women3.webp";
import women4 from "../assets/women1.webp";
import womenP from "../assets/party_women.webp";
import watch from "../assets/new4.webp";

import wallet from "../assets/wallet.webp";
import sunglasses from "../assets/sunglasses.jpg";
import scrunch from "../assets/new7.jpg";
import bag from "../assets/acc.webp";
import tote from "../assets/tote.webp";

// --- CATEGORY BANNERS ---
import womenBanner from "../assets/womenbanner.png";
import menBanner from "../assets/m.webp";
import accessoriesBanner from "../assets/Accessoriesbann.jpg";

// API Base URL
const API_URL = "http://localhost:5000/api";

export default function Shop() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryParam = params.get("category");

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [tryOnProduct, setTryOnProduct] = useState(null);
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Fallback products (if backend is not available)
  const fallbackProducts = [
    { id: 1, name: "Elegant Floral Dress", price: 3200, category: "women", img: women },
    { id: 2, name: "Classic Shalwar kameez", price: 4200, category: "men", img: men },
    { id: 3, name: "branded Leather bag", price: 3000, category: "accessories", img: purse },
    { id: 4, name: "stylish dress for women", price: 5000, category: "women", img: women4 },
    { id: 5, name: "wedding sherwani", price: 8000, category: "men", img: men3 },
    { id: 6, name: "Elegant Part wear Dress", price: 3200, category: "women", img: womenP },
    { id: 7, name: "Premium Dress for men", price: 3800, category: "men", img: men2 },
    { id: 8, name: "Aviator Sunglasses", price: 1500, category: "accessories", img: Asunglasses },
    { id: 9, name: "Designer Suit", price: 3400, category: "women", img: women2 },
    { id: 10, name: "Stylish Handbag", price: 2200, category: "accessories", img: bag },    
    { id: 11, name: "Silk Hair Scrunchie", price: 650, category: "accessories", img: scrunch },
    { id: 12, name: "Eco Tote Bag", price: 1500, category: "accessories", img: tote },
    { id: 13, name: "premium suit for women", price: 2800, category: "women", img: women3 },
    { id: 14, name: "Pretty women watch", price: 1200, category: "accessories", img: watch },
    { id: 15, name: "Genuine Leather Wallet", price: 1800, category: "accessories", img: wallet },





  ];

  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [categoryParam]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/products`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        
        // Transform backend data to match frontend format
        const transformedProducts = data.map(product => ({
          id: product.id,
          name: product.name,
          price: product.price / 100, // Convert from cents to rupees
          category: product.category.toLowerCase(),
          img: product.img_url ? `http://localhost:5000${product.img_url}` : women, // Use backend image or fallback
          description: product.description,
          in_stock: product.in_stock
        }));

        setProducts(transformedProducts);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
        // Use fallback products if backend is not available
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categoryBanners = {
    women: womenBanner,
    men: menBanner,
    accessories: accessoriesBanner,
    traditional: womenBanner,
    casual: menBanner,
    formal: accessoriesBanner,
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  if (loading) {
    return (
      <section className="bg-[#FAF7F2] min-h-screen pb-10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#C97C7C] mx-auto mb-4"></div>
          <p className="text-[#C97C7C] text-xl">Loading products...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#FAF7F2] min-h-screen pb-10">
      {/* Error Message */}
      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p className="font-bold">Notice</p>
          <p>Using local products. Backend: {error}</p>
        </div>
      )}

      {/* CATEGORY BANNER */}
      {selectedCategory !== "all" && categoryBanners[selectedCategory] && (
        <div className="w-full h-130 mb-10 overflow-hidden relative shadow-md">
          <img
            src={categoryBanners[selectedCategory]}
            alt={`${selectedCategory} banner`}
            className="w-full h-135 object-cover brightness-70"
          />
          <h2 className="absolute bottom-5 left-10 text-4xl font-bold text-white capitalize drop-shadow-lg">
            {selectedCategory} Collection
          </h2>
        </div>
      )}

      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-6 text-[#bb6464]">Shop Collection</h2>

        {/* CATEGORY BUTTONS */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {["all", "women", "men", "accessories", "traditional", "casual", "formal"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 capitalize rounded-full border transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-[#C97C7C] text-[#FAF7F2] border-[#C97C7C]"
                  : "border-[#C97C7C] text-[#C97C7C] hover:bg-[#C97C7C] hover:text-[#FAF7F2]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PRODUCT GRID */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-8">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-2xl text-[#6B6B6B]">No products found in this category</p>
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                className="border border-[#E6D8C4] p-4 rounded-2xl shadow-sm hover:shadow-lg bg-white transition-all duration-300"
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="rounded-lg w-full h-125 object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.target.src = women;
                  }}
                />

                <div className="mt-4 text-center">
                  <h3 className="font-semibold text-lg text-[#2E2E2E]">{p.name}</h3>
                  <p className="text-[#6B6B6B] mt-1">PKR {p.price}</p>

                  {/* ADD TO CART BUTTON */}
                  <button
                    onClick={() => {
                      addToCart(p);
                      navigate("/cart");
                    }}
                    className="mt-4 bg-[#C97C7C] text-[#FAF7F2] px-5 py-2 rounded-full hover:bg-[#f9ebd5] hover:text-[#C97C7C] hover:border-2 hover:border-[#C97C7C] transition-all duration-300"
                  >
                    Add to Cart
                  </button>

                  {/* TRY ON BUTTON - Only for clothing categories */}
                  {(p.category === "women" || p.category === "men" || p.category === "traditional" || p.category === "casual" || p.category === "formal") && (
                    <button
                      onClick={() => setTryOnProduct(p)}
                      className="mt-4 ml-2 bg-[#C97C7C] text-[#FAF7F2] px-5 py-2 rounded-full hover:bg-[#f9ebd5] hover:text-[#C97C7C] hover:border-2 hover:border-[#C97C7C] transition-all duration-300"
                    >
                      Try On
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* TRY ON MODAL */}
      {tryOnProduct && (
        <TryOnModal
          product={tryOnProduct}
          onClose={() => setTryOnProduct(null)}
          onBuy={(product) => setCheckoutProduct(product)}
        />
      )}

      {/* CHECKOUT MODAL */}
      {checkoutProduct && (
        <CheckoutModal
          product={checkoutProduct}
          onClose={() => setCheckoutProduct(null)}
        />
      )}
    </section>
  );
}