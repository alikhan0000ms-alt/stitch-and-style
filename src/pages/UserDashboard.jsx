import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = localStorage.getItem("jwt_token");
        if (!token) {
          navigate("/");
          return;
        }

        // Get user info
        const userResponse = await fetch("http://localhost:5000/api/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!userResponse.ok) {
          localStorage.removeItem("jwt_token");
          navigate("/");
          return;
        }

        const userData = await userResponse.json();
        setUserInfo(userData);

        // Get user's orders
        const ordersResponse = await fetch(
          `http://localhost:5000/api/orders/${userData.user_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json();
          setOrders(ordersData);
        } else {
          setOrders([]);
        }

        setError(null);
      } catch (err) {
        setError("Failed to load user data: " + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    navigate("/");
  };

  if (loading) {
    return (
      <section className="p-8 text-center">
        <p>Loading dashboard...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-8 text-center">
        <p className="text-red-600">{error}</p>
      </section>
    );
  }

  return (
    <section className="bg-[#FAF7F2] min-h-screen py-10">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-[#C97C7C] mb-4">User Dashboard</h2>

        {/* User Profile */}
        {userInfo && (
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h3 className="text-2xl font-semibold mb-4">Profile Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Name</label>
                <p className="text-lg font-semibold">{userInfo.user_email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <p className="text-lg font-semibold">{userInfo.user_email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        )}

        {/* Order History */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-2xl font-semibold mb-4">Order History</h3>

          {orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No orders yet</p>
              <a
                href="/shop"
                className="px-6 py-2 bg-[#C97C7C] text-white rounded-lg hover:bg-[#b75d5d]"
              >
                Start Shopping
              </a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-4 font-semibold">Order ID</th>
                    <th className="text-left p-4 font-semibold">Date</th>
                    <th className="text-left p-4 font-semibold">Status</th>
                    <th className="text-left p-4 font-semibold">Amount</th>
                    <th className="text-left p-4 font-semibold">Items</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-semibold">#{order.id}</td>
                      <td className="p-4">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded text-sm font-semibold ${
                            order.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "confirmed"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "shipped"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4">PKR {order.total_amount}</td>
                      <td className="p-4">{order.items.length} item(s)</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default UserDashboard;