import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = (item) => {
    navigate("/checkout", { state: { item } });
  };

  return (
    <section className="p-8 text-center">
      <h2 className="text-4xl font-bold text-[#C97C7C]">Your Cart</h2>

      {cartItems.length === 0 ? (
        <>
          <p className="mt-4 text-gray-600">
            No items in your cart yet. Start shopping now!
          </p>
          <Link to="/shop">
            <button className="mt-6 bg-[#C97C7C] text-white px-6 py-3 rounded-full hover:bg-[#b75d5d] transition">
              Go to Shop
            </button>
          </Link>
        </>
      ) : (
        <div className="mt-8 flex flex-col gap-6 items-center">
          {/* Cart Items */}
          {cartItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-6 border p-4 rounded-xl bg-white shadow w-full max-w-2xl"
            >
              {/* Product Info */}
              <div className="flex items-center gap-6">
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

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleBuyNow(item)}
                  className="bg-[#C97C7C] text-white px-4 py-2 rounded-full hover:bg-[#b75d5d] transition"
                >
                  Buy Now
                </button>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-black text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="w-full max-w-2xl text-right font-bold text-xl">
            Total: PKR{" "}
            {cartItems.reduce((sum, item) => sum + item.price, 0)}
          </div>

          {/* Clear Cart */}
          <button
            onClick={clearCart}
            className="mt-4 text-black hover:underline text-sm"
          >
            Clear Cart
          </button>
        </div>
      )}
    </section>
  );
}

export default Cart;
