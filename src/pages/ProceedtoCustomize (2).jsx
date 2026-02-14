import { useState } from "react";

function ProceedtoCustomize() {
  const [step, setStep] = useState(1);
  const [dressType, setDressType] = useState("");
  const [measurements, setMeasurements] = useState({});
  const [selfie, setSelfie] = useState(null);

  const dressOptions = [
    "Shalwar Kameez",
    "Kurti",
    "Frock",
    "Abaya",
    "Maxi / Gown",
    "Lehenga",
    "Pant Shirt",
    "2-Piece",
    "3-Piece",
  ];

  const measurementFields = [
    "Bust / Chest",
    "Waist",
    "Hip",
    "Shoulder",
    "Sleeve Length",
    "Shirt Length",
    "Trouser Length",
  ];

  const handleMeasurementChange = (e) => {
    setMeasurements({ ...measurements, [e.target.name]: e.target.value });
  };

  const handleSelfieUpload = (e) => {
    setSelfie(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <section className="p-8">
      <h2 className="text-4xl font-bold text-pink-700 text-center mb-6">
        Customize Your Dress
      </h2>

      {/* ---------------- Step 1: Dress Selection ---------------- */}
      {step === 1 && (
        <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg mx-auto">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">
            Select Dress Type
          </h3>

          <select
            value={dressType}
            onChange={(e) => setDressType(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
          >
            <option value="">-- Choose Dress --</option>
            {dressOptions.map((dress) => (
              <option key={dress} value={dress}>
                {dress}
              </option>
            ))}
          </select>

          <button
            disabled={!dressType}
            onClick={() => setStep(2)}
            className="bg-pink-600 text-white px-5 py-3 rounded-xl w-full hover:bg-pink-700 disabled:opacity-50"
          >
            Next: Add Measurements
          </button>
        </div>
      )}

      {/* ---------------- Step 2: Measurements Form ---------------- */}
      {step === 2 && (
        <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg mx-auto">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">
            Enter Your Measurements
          </h3>

          {measurementFields.map((field) => (
            <div key={field} className="mb-3">
              <label className="block font-medium">{field}</label>
              <input
                type="number"
                name={field}
                placeholder="Enter in inches"
                onChange={handleMeasurementChange}
                className="w-full border p-2 rounded-lg"
              />
            </div>
          ))}

          <button
            onClick={() => setStep(3)}
            className="bg-pink-600 text-white px-5 py-3 mt-4 rounded-xl w-full hover:bg-pink-700"
          >
            Next: Virtual Try-On
          </button>
        </div>
      )}

      {/* ---------------- Step 3: Virtual Try-On ---------------- */}
      {step === 3 && (
        <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg mx-auto">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">
            Virtual Try-On (Beta)
          </h3>

          <p className="text-gray-600 mb-4">
            Upload a selfie to preview how the selected outfit may look on you.
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleSelfieUpload}
            className="mb-4"
          />

          {selfie && (
            <div className="mt-4">
              <img
                src={selfie}
                alt="Selfie Preview"
                className="rounded-xl shadow-lg w-full object-cover"
              />
              <p className="text-center text-sm text-gray-500 mt-2">
                (This is a static preview. AI try-on can be added.)
              </p>
            </div>
          )}

          <button
            onClick={() => alert("Order submitted!")}
            className="bg-green-600 text-white px-5 py-3 mt-6 rounded-xl w-full hover:bg-green-700"
          >
            Submit Custom Order
          </button>
        </div>
      )}
    </section>
  );
}

export default ProceedtoCustomize;
