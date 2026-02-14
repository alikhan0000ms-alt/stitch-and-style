import { useState } from "react";

export default function TryOnModal({ product, onClose, onBuy }) {
  const [selfie, setSelfie] = useState(null);

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      setSelfie(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-20">
      <div className="bg-[#FAF7F2] p-6 rounded-lg w-96 relative shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-[#C97C7C]">Try On: {product.name}</h2>

        {!selfie ? (
          <div className="flex flex-col items-center">
            <input type="file" accept="image/*" onChange={handleUpload} />
            <p className="mt-2 text-sm text-gray-600">Upload a selfie to try this outfit</p>
          </div>
        ) : (
          <div className="relative w-full h-96 border rounded overflow-hidden">
            <img src={selfie} alt="User selfie" className="w-full h-full object-cover" />
            <img
              src={product.img}
              alt="Outfit overlay"
              className="absolute top-20 left-20 w-48 pointer-events-none"
            />
          </div>
        )}

        <div className="mt-4 flex justify-between">
          {/* BUY NOW opens CheckoutModal */}
          <button
            onClick={() => onBuy(product)}
            className="px-4 py-2 rounded-full bg-[#C97C7C] text-[#FAF7F2] hover:bg-[#f9ebd5] hover:text-[#C97C7C] transition"
          >
            Buy Now
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-[#8B4B62] text-white hover:bg-[#C97C7C] hover:text-[#FAF7F2] transition"
          >
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
}
