import React from "react";

function UserProfile() {
  const username = localStorage.getItem("username");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));



  if (!userDetails) {
    return <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-md rounded-lg">No user details available.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-orange-600">User Profile</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-600 text-sm font-bold mb-2">First Name</label>
          <input
            type="text"
            value={userDetails[0].first_name}
            readOnly
            className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-gray-600 text-sm font-bold mb-2">Last Name</label>
          <input
            type="text"
            value={userDetails[0].last_name}
            readOnly
            className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-gray-600 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            value={userDetails[0].email}
            readOnly
            className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-gray-600 text-sm font-bold mb-2">Phone Number</label>
          <input
            type="tel"
            value={userDetails[0].phone_number}
            readOnly
            className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-gray-600 text-sm font-bold mb-2">Username</label>
          <input
            type="text"
            value={username}
            readOnly
            className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-gray-600 text-sm font-bold mb-2">City</label>
          <input
            type="text"
            value={userDetails[0].city}
            readOnly
            className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-gray-600 text-sm font-bold mb-2">Premium Customer</label>
          <input
            type="text"
            value={userDetails[0].is_premium_customer ? "Yes" : "No"}
            readOnly
            className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
