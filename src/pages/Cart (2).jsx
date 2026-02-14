import { useContext } from "react";
import { useCart } from "../contexts/cartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems } = useCart();

  return (
    <section className="p-8 text-center">
      <h2 className="text-4xl font-bold text-[#C97C7C] ">Your Cart</h2>

      {cartItems.length === 0 ? (
        <>
          <p className="mt-4 text-gray-600">
            No items in your cart yet. Start shopping now!
          </p>
          <Link to="/Shop">
            <button className="mt-6 bg-[#C97C7C] text-white px-6 py-3 rounded-full hover:bg-[#b75d5d]">
              Go to Shop
            </button>
          </Link>
        </>
      ) : (
        <div className="mt-8 flex flex-col gap-6 items-center">
          {cartItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-6 border p-4 rounded-xl bg-white shadow w-full max-w-2xl"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="text-left">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-[#6B6B6B]">PKR {item.price}</p>
              </div>
            </div>
          ))}
          <div className="text-right font-bold text-xl mt-4">
            Total: PKR {cartItems.reduce((sum, item) => sum + item.price, 0)}
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;
