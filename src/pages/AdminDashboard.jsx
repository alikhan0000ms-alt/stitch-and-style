import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("orders");
  const navigate = useNavigate();

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const token = localStorage.getItem("jwt_token");
        if (!token) {
          navigate("/");
          return;
        }

        // Fetch all orders
        const ordersResponse = await fetch("http://localhost:5000/api/admin/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json();
          setOrders(ordersData);
        } else if (ordersResponse.status === 401 || ordersResponse.status === 403) {
          localStorage.removeItem("jwt_token");
          navigate("/");
          return;
        }

        // Fetch all users
        const usersResponse = await fetch("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          setUsers(usersData);
        }

        setError(null);
      } catch (err) {
        setError("Failed to load admin data: " + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAdminData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    navigate("/");
  };

  if (loading) {
    return (
      <section className="p-8 text-center">
        <p>Loading admin dashboard...</p>
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
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-[#C97C7C]">Admin Dashboard</h2>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === "orders"
                ? "border-b-2 border-[#C97C7C] text-[#C97C7C]"
                : "text-gray-600"
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === "users"
                ? "border-b-2 border-[#C97C7C] text-[#C97C7C]"
                : "text-gray-600"
            }`}
          >
            Users ({users.length})
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-2xl font-semibold mb-6">All Orders</h3>

            {orders.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No orders found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-4 font-semibold">Order ID</th>
                      <th className="text-left p-4 font-semibold">Customer</th>
                      <th className="text-left p-4 font-semibold">Email</th>
                      <th className="text-left p-4 font-semibold">Status</th>
                      <th className="text-left p-4 font-semibold">Amount</th>
                      <th className="text-left p-4 font-semibold">Items</th>
                      <th className="text-left p-4 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-semibold">#{order.id}</td>
                        <td className="p-4">{order.user_name}</td>
                        <td className="p-4">{order.user_email}</td>
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
                        <td className="p-4">{order.item_count}</td>
                        <td className="p-4 text-sm">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-2xl font-semibold mb-6">All Users</h3>

            {users.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No users found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-4 font-semibold">User ID</th>
                      <th className="text-left p-4 font-semibold">Name</th>
                      <th className="text-left p-4 font-semibold">Email</th>
                      <th className="text-left p-4 font-semibold">Role</th>
                      <th className="text-left p-4 font-semibold">Orders</th>
                      <th className="text-left p-4 font-semibold">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-semibold">#{user.id}</td>
                        <td className="p-4">{user.name}</td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded text-sm font-semibold ${
                              user.is_admin
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {user.is_admin ? "Admin" : "User"}
                          </span>
                        </td>
                        <td className="p-4">{user.order_count}</td>
                        <td className="p-4 text-sm">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminDashboard;