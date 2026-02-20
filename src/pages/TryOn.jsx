import { useState } from "react";
import { getImageURL } from "../services/api";

function TryOn() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);
  const [previewSelfie, setPreviewSelfie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Mock products for try-on demo
  const demoProducts = [
    {
      id: 1,
      name: "Elegant Floral Dress",
      image: "https://via.placeholder.com/300x400?text=Floral+Dress",
    },
    {
      id: 2,
      name: "Classic Shalwar Kameez",
      image: "https://via.placeholder.com/300x400?text=Shalwar",
    },
    {
      id: 3,
      name: "Premium Dress",
      image: "https://via.placeholder.com/300x400?text=Premium",
    },
  ];

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image must be less than 5MB");
        return;
      }

      setSelfieFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewSelfie(event.target.result);
      };
      reader.readAsDataURL(file);

      setError(null);
    }
  };

  const handleTryOn = async () => {
    if (!selectedProduct || !selfieFile) {
      setError("Please select a product and upload a selfie");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("selfie", selfieFile);

      const response = await fetch(
        `http://localhost:5000/api/tryon/${selectedProduct.id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Try-on failed");
      }

      const data = await response.json();
      setResult({
        ...data,
        result_image_url: getImageURL(data.result_url),
      });
    } catch (err) {
      setError(err.message || "Failed to process try-on");
      console.error("Try-on error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedProduct(null);
    setSelfieFile(null);
    setPreviewSelfie(null);
    setResult(null);
    setError(null);
  };

  return (
    <section className="bg-[#FAF7F2] min-h-screen py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-4 text-[#C97C7C]">
          Virtual Try-On
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Upload your selfie and virtually try on any product
        </p>

        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {!result ? (
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Product Selection */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4 text-[#C97C7C]">
                Select Product
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {demoProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className={`border-2 p-4 rounded-lg cursor-pointer transition ${
                      selectedProduct?.id === product.id
                        ? "border-[#C97C7C] bg-[#FAF7F2]"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded mb-2"
                    />
                    <h3 className="font-semibold">{product.name}</h3>
                  </div>
                ))}
              </div>
            </div>

            {/* Selfie Upload */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4 text-[#C97C7C]">
                Upload Your Selfie
              </h2>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {previewSelfie ? (
                  <img
                    src={previewSelfie}
                    alt="Selfie preview"
                    className="w-full h-64 object-cover rounded mb-4"
                  />
                ) : (
                  <div className="text-gray-500">
                    <p className="text-lg mb-2">📸 No image selected</p>
                    <p className="text-sm">Click to upload or drag & drop</p>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="selfie-input"
                />
                <label
                  htmlFor="selfie-input"
                  className="block mt-4 px-4 py-2 bg-[#C97C7C] text-white rounded cursor-pointer hover:bg-[#b75d5d]"
                >
                  {previewSelfie ? "Change Image" : "Select Image"}
                </label>

                {previewSelfie && (
                  <button
                    onClick={() => {
                      setSelfieFile(null);
                      setPreviewSelfie(null);
                    }}
                    className="block mt-2 px-4 py-2 text-red-600 hover:underline"
                  >
                    Remove Image
                  </button>
                )}
              </div>

              {/* Try-On Button */}
              <button
                onClick={handleTryOn}
                disabled={!selectedProduct || !selfieFile || loading}
                className={`w-full mt-6 px-4 py-3 rounded-lg font-semibold text-white transition ${
                  selectedProduct && selfieFile && !loading
                    ? "bg-[#C97C7C] hover:bg-[#b75d5d] cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {loading ? "Processing... Please wait" : "Try On"}
              </button>
            </div>
          </div>
        ) : (
          /* Result Display */
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4 text-[#C97C7C]">
              Try-On Result
            </h2>

            {result.result_image_url && (
              <img
                src={result.result_image_url}
                alt="Try-on result"
                className="w-full rounded-lg mb-6"
              />
            )}

            <div className="bg-[#FAF7F2] p-4 rounded mb-6">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Product:</strong> {selectedProduct.name}
              </p>
              <p className="text-sm text-gray-600">
                {result.message || "Try-on completed successfully"}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-3 bg-[#C97C7C] text-white rounded-lg hover:bg-[#b75d5d] transition"
              >
                Try Another
              </button>
              <button
                onClick={() => {
                  alert("Save feature coming soon!");
                }}
                className="flex-1 px-4 py-3 border-2 border-[#C97C7C] text-[#C97C7C] rounded-lg hover:bg-[#FAF7F2] transition"
              >
                Save Result
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default TryOn;
