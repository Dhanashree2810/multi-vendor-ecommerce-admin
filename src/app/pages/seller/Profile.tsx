"use client";

import React, { useState } from "react";

export default function ProfileSettings() {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImage(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-[#d9d6f2] p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="bg-[#6d51e8] rounded-lg p-6 shadow-md">
          {/* Image Upload */}
          <div className="flex flex-col items-center mb-4">
            <label className="w-32 h-32 flex justify-center items-center border-2 border-dashed border-white rounded-lg cursor-pointer">
              <span className="text-white text-sm">Select Image</span>
              <input type="file" className="hidden" onChange={handleImageChange} />
            </label>
            {image && <p className="text-white mt-2 text-sm">{image.name}</p>}
          </div>

          {/* User Information */}
          <div className="bg-[#1e1f29] rounded-lg p-4 text-white relative">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">Name: Priyanka Pardeshi</p>
                <p>Email: piyapardeshi111@gmail.com</p>
                <p>Role: Seller</p>
                <p>Status: <span className="font-bold">active</span></p>
                <p>
                  Payment Account:{" "}
                  <span className="bg-red-500 text-xs px-2 py-1 rounded text-white">
                    active
                  </span>
                </p>
              </div>
              <button className="absolute top-2 right-2 text-yellow-400 text-xl">
                ✎
              </button>
            </div>
          </div>

          {/* Input Fields */}
          <div className="mt-6 space-y-4">
            {["Shop Name", "Division Name", "District Name", "Sub District Name"].map(
              (label) => (
                <div key={label}>
                  <label className="block text-white mb-1">{label}</label>
                  <input
                    type="text"
                    placeholder={label}
                    className="w-full bg-[#f4f4f4] text-gray-700 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-purple-300"
                  />
                </div>
              )
            )}
          </div>

          <button className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
            Save Changes
          </button>
        </div>

        {/* Right Section */}
        <div className="bg-[#6d51e8] rounded-lg p-6 shadow-md">
          <h2 className="text-white text-xl font-semibold mb-4">Change Password</h2>

          {["Email", "Old Password", "New Password"].map((label) => (
            <div key={label} className="mb-4">
              <label className="block text-white mb-1">{label}</label>
              <input
                type={label.includes("Password") ? "password" : "email"}
                placeholder={label}
                className="w-full bg-[#f4f4f4] text-gray-700 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>
          ))}

          <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
