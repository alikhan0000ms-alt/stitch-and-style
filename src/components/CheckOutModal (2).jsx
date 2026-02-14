import { useState } from "react";

export default function CheckOutModal({ product, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "Cash on Delivery",
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderConfirmed(true);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-20">
      <div className="bg-[#FAF7F2] p-6 rounded-lg w-96 shadow-lg relative">
        {!orderConfirmed ? (
          <>
            <h2 className="text-xl font-bold mb-4 text-[#C97C7C]">Checkout: {product.name}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="p-2 border rounded"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="p-2 border rounded"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="p-2 border rounded"
              />
              <textarea
                name="address"
                placeholder="Shipping Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="p-2 border rounded"
              />
              <select
                name="payment"
                value={formData.payment}
                onChange={handleChange}
                className="p-2 border rounded"
              >
                <option>Cash on Delivery</option>
                <option>Card Payment</option>
              </select>
              <button
                type="submit"
                className="mt-3 py-2 rounded-full bg-[#C97C7C] text-[#FAF7F2] hover:bg-[#f9ebd5] hover:text-[#C97C7C] transition"
              >
                Confirm Order
              </button>
            </form>
            <button
              onClick={onClose}
              className="mt-2 text-sm text-[#8B4B62] hover:text-[#C97C7C]"
            >
              Cancel
            </button>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4 text-[#C97C7C]">Order Confirmed!</h2>
            <p className="mb-2">Thank you, {formData.name}.</p>
            <p className="mb-2">Your order for <strong>{product.name}</strong> is confirmed.</p>
            <p className="mb-2">Payment Method: {formData.payment}</p>
            <p className="mb-2">Shipping Address: {formData.address}</p>
            <p className="mt-4 font-bold">Total: PKR {product.price}</p>
            <button
              onClick={onClose}
              className="mt-4 py-2 px-4 rounded-full bg-[#8B4B62] text-white hover:bg-[#C97C7C] hover:text-[#FAF7F2] transition"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
