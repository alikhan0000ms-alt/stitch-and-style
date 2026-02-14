import { useState } from "react";
import fabric1 from "../assets/f1.jpg";
import fabric2 from "../assets/f2.jpg";
import fabric3 from "../assets/f3.jpeg";
import colorRed from "../assets/red.jpg";
import colorBlue from "../assets/purple.jpeg";
import colorGreen from "../assets/green.jpeg";
import customizeImage from "../assets/custom.webp";

export default function Customize() {
  const [step, setStep] = useState(0); // 0 = fabric+color, 1 = dress type, 2 = measurements, 3 = confirm
  const [selectedFabric, setSelectedFabric] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const [dressType, setDressType] = useState("");
  const [measurements, setMeasurements] = useState({});

  const fabrics = [
    { id: 1, name: "Silk", img: fabric1 },
    { id: 2, name: "Cotton", img: fabric2 },
    { id: 3, name: "Chiffon", img: fabric3 },
  ];

  const colors = [
    { id: 1, name: "Red", img: colorRed },
    { id: 2, name: "Blue", img: colorBlue },
    { id: 3, name: "Green", img: colorGreen },
  ];

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

  const handleOrderConfirm = () => {
    // validation: user must fill measurements
    const emptyFields = measurementFields.filter((field) => !measurements[field]);

    if (emptyFields.length > 0) {
      alert("Please enter all measurements before confirming the order.");
      return;
    }

    // Build a simple order payload (could be sent to API)
    const order = {
      fabric: selectedFabric?.name || "-",
      color: selectedColor?.name || "-",
      dressType: dressType || "-",
      measurements,
      date: new Date().toISOString(),
    };

    // For now, just show a confirmation alert and log the order
    console.log("Order confirmed:", order);
    alert("Order Confirmed! Your measurements have been saved.");

    // Optionally reset or navigate away
    setStep(0);
    setSelectedColor(null);
    setSelectedFabric(null);
    setDressType("");
    setMeasurements({});
  };

  return (
    <section className="bg-[#FAF7F2] min-h-screen py-16 px-6 md:px-20">
      {/* STEP 0 — FABRIC + COLOR */}
      {step === 0 && (
        <>
          <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold text-[#C97C7C] mb-4">Customize Your Outfit</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                At Stitch & Style, we believe every outfit should be unique. Choose your fabric,
                color, and design to reflect your personality, style, and comfort.
              </p>
            </div>

            <div className="md:w-1/2">
              <img src={customizeImage} alt="Customize" className="rounded-2xl w-lg object-cover shadow-lg" />
            </div>
          </div>

          {/* Fabric Selection */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-[#8B4B62]">Select Fabric</h3>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
              {fabrics.map((fabric) => (
                <div
                  key={fabric.id}
                  className={`border rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedFabric?.id === fabric.id ? "border-[#C97C7C] shadow-lg" : "border-[#E6D8C4]"
                  }`}
                  onClick={() => setSelectedFabric(fabric)}
                >
                  <img src={fabric.img} alt={fabric.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                  <h4 className="text-center font-semibold text-gray-700">{fabric.name}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-[#8B4B62]">Select Color</h3>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
              {colors.map((color) => (
                <div
                  key={color.id}
                  className={`border rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedColor?.id === color.id ? "border-[#C97C7C] shadow-lg" : "border-[#E6D8C4]"
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  <img src={color.img} alt={color.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                  <h4 className="text-center font-semibold text-gray-700">{color.name}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4 text-[#C97C7C]">Your Selection</h3>
            <p className="text-gray-700 mb-6">
              Fabric: {selectedFabric ? selectedFabric.name : "None"} <br />
              Color: {selectedColor ? selectedColor.name : "None"}
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  // Reset selections
                  setSelectedFabric(null);
                  setSelectedColor(null);
                }}
                className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-full hover:shadow-md"
              >
                Reset
              </button>

              <button
                onClick={() => setStep(1)}
                disabled={!selectedFabric || !selectedColor}
                className="bg-[#C97C7C] text-white px-8 py-3 rounded-full hover:bg-[#8B4B62] disabled:opacity-40"
              >
                Proceed to Customize
              </button>
            </div>
          </div>
        </>
      )}

      {/* STEP 1 — SELECT DRESS TYPE */}
      {step === 1 && (
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl mx-auto mt-10">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Select Dress Type</h3>

          <select
            value={dressType}
            onChange={(e) => setDressType(e.target.value)}
            className="w-full border p-3 rounded-lg mb-6"
          >
            <option value="">-- Choose Dress --</option>
            {dressOptions.map((dress) => (
              <option key={dress} value={dress}>{dress}</option>
            ))}
          </select>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(0)}
              className="w-1/2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Back
            </button>

            <button
              disabled={!dressType}
              onClick={() => setStep(2)}
              className="w-1/2 bg-[#C97C7C] text-white px-6 py-3 rounded-xl hover:bg-[#8B4B62] disabled:opacity-50"
            >
              Next: Add Measurements
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 — MEASUREMENTS */}
      {step === 2 && (
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl mx-auto mt-10">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">Enter Your Measurements</h3>

          {measurementFields.map((field) => (
            <div key={field} className="mb-4">
              <label className="block font-medium mb-1">{field}</label>
              <input
                type="number"
                placeholder="In inches"
                className="w-full border p-2 rounded-lg"
                value={measurements[field] || ""}
                onChange={(e) => setMeasurements({ ...measurements, [field]: e.target.value })}
              />
            </div>
          ))}

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setStep(1)}
              className="w-1/2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Back
            </button>

            <button
              onClick={() => setStep(3)}
              className="w-half bg-[#C97C7C] text-white px-6 py-3 rounded-xl w-full hover:bg-[#8B4B62] disabled:opacity-50"
            >
              Next: Confirm Order
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 — CONFIRMATION (Virtual Try-On removed) */}
      {step === 3 && (
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl mx-auto mt-10">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Confirm Your Order</h3>

          <div className="mb-4">
            <h4 className="font-medium">Fabric</h4>
            <p className="text-gray-700">{selectedFabric ? selectedFabric.name : "None"}</p>
          </div>

          <div className="mb-4">
            <h4 className="font-medium">Color</h4>
            <p className="text-gray-700">{selectedColor ? selectedColor.name : "None"}</p>
          </div>

          <div className="mb-4">
            <h4 className="font-medium">Dress Type</h4>
            <p className="text-gray-700">{dressType || "None"}</p>
          </div>

          <div className="mb-4">
            <h4 className="font-medium">Measurements</h4>
            <ul className="list-disc list-inside text-gray-700">
              {measurementFields.map((field) => (
                <li key={field}>{field}: {measurements[field] || "-"}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setStep(2)}
              className="w-1/2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Back
            </button>

            <button
              onClick={handleOrderConfirm}
              className="w-1/2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
