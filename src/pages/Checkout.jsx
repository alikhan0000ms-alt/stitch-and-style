import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const item = location.state?.item;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "Cash on Delivery",
  });

  // Safety check (if user opens checkout directly)
  if (!item) {
    return (
      <div className="p-10 text-center">
        <p className="text-lg text-gray-600">No product selected.</p>
        <button
          onClick={() => navigate("/shop")}
          className="mt-4 bg-[#C97C7C] text-white px-6 py-2 rounded-full"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Order Placed:", {
      product: item,
      customer: formData,
    });

    alert("Order confirmed!");
    navigate("/");
  };

  return (
    <section className="h-170 flex items-center justify-center bg-[#f7e9e9]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#fffaf5] p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-[#C97C7C] text-center mb-6">
          Checkout: {item.name}
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded-lg outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded-lg outline-none"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded-lg outline-none"
        />

        <textarea
          name="address"
          placeholder="Shipping Address"
          value={formData.address}
          onChange={handleChange}
          required
          rows="3"
          className="w-full p-3 mb-4 border rounded-lg outline-none"
        />

        <select
          name="payment"
          value={formData.payment}
          onChange={handleChange}
          className="w-full p-3 mb-6 border rounded-lg"
        >
          <option>Cash on Delivery</option>
          
        </select>

        <button
          type="submit"
          className="w-full bg-[#C97C7C] text-white py-3 rounded-full hover:bg-[#b75d5d] transition"
        >
          Confirm Order
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-4 text-sm text-[#C97C7C]"
        >
          Cancel
        </button>
      </form>
    </section>
  );
}

export default Checkout;
