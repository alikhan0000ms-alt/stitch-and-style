function UserDashboard(){
    return(
        <>
        <section className="p-8 text-center">
      <h2 className="text-4xl font-bold text-pink-700">User Dashboard</h2>
      <p className="mt-4 text-gray-600">View your orders, track progress, and manage profile settings.</p>
      <div className="mt-10 bg-gray-100 p-6 rounded-lg inline-block">
        <p>Order History | Profile | Wishlist (coming soon)</p>
      </div>
    </section>
        </>
    )
}
export default UserDashboard