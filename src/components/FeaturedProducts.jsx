import { Link } from "react-router-dom";
import coll_1 from "../assets/mmm.webp";
import coll_2 from "../assets/ff.webp";
import coll_3 from "../assets/access.avif";


export default function FeaturedProducts() {
  const featuredProducts = [
    { id: 1, name: "Men's Collection", img: coll_1, category: "men" },
    { id: 2, name: "Women's Collection",img:coll_2, category: "women" },
    { id: 3, name: "Accessories", img: coll_3, category: "accessories" },
  ];

  return (
    <section className="py-16 px-6 md:px-20 border-t border-[#F1E3D3]">
      <h2 className="text-4xl font-bold text-center mb-10 text-[#C97C7C]">Featured Collection</h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-[#F1E3D3] rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-72 object-cover"
            />
            <div className="p-5 text-center">
              <h3 className="text-xl font-semibold text-gray-700">
                {product.name}
              </h3>

              {/* ⭐ Link goes with category */}
              <Link
                to={`/Shop?category=${product.category}`}
                className="mt-4 bg-[#C97C7C] text-white px-5 py-2 rounded-full hover:bg-[#C38D94] transition inline-block"
              >
                Go to Products
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
