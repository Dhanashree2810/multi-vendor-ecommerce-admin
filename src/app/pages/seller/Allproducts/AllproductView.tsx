import React from "react";

const OrderDetails = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      

      {/* Main Content */}
      <div className="flex-1 p-10 bg-gray-100">
        <div className="bg-[#EFEFEF] dark-light text-black p-6 rounded-lg">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-xl font-bold">Order Details</h2>
              <p><strong>Order ID:</strong> #675d143198f4ae7d19703b9e</p>
              <p><strong>Date:</strong> December 14, 2024, 10:44 AM</p>
              <p><strong>Deliver To:</strong> Easy Main Warehouse</p>
            </div>
            <select className="bg-white text-indigo-500 p-2 rounded border">
              <option>Cancelled</option>
              <option>Processing</option>
              <option>Completed</option>
            </select>
          </div>
          <p><strong>Payment Status:</strong> Unpaid</p>
          <p><strong>Price:</strong> $1544</p>

          <div className="bg-white bg-opacity-20 p-4 rounded-lg mt-4">
            <p><strong>Product:</strong> Women Chanderi Kurta Pant Dupatta Set</p>
            <p><strong>Brand:</strong> DISHWA FASHION</p>
            <p><strong>Quantity:</strong> 1</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
