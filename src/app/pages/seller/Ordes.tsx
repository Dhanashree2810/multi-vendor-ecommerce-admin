"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaEye } from "react-icons/fa6";
import Search from "@/components/custom/Search";

const OrdersTable = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [parPage, setParPage] = useState<number>(5);

  const orders = [
    {
      id: "#675d143198f4ae7d19703b9e",
      price: "$1544",
      paymentStatus: "unpaid",
      orderStatus: "cancelled",
      date: "December 14, 2024 10:44 AM",
    },
    {
      id: "#675d140298f4ae7d19703440",
      price: "$1544",
      paymentStatus: "unpaid",
      orderStatus: "cancelled",
      date: "December 14, 2024 10:43 AM",
    },
    {
      id: "#675ace9ead866f6025725a02",
      price: "$64125",
      paymentStatus: "unpaid",
      orderStatus: "cancelled",
      date: "December 12, 2024 5:23 PM",
    },
  ];

  return (
    <div className="w-full mx-auto mt-4 p-6 bg-indigo-100 rounded-lg ">
      {/* Heading */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Orders</h2>

      {/* Search Component */}
      <div className="bg-indigo-100p-4 rounded-md mb-6 shadow-sm">
        <Search setSearchValue={setSearchValue} setParPage={setParPage} searchValue={searchValue} />
      </div>

      {/* Table Section */}
      <div className="overflow-auto rounded-lg shadow-lg">
        <Table className="min-w-full bg-indigo-100 text-gray-800">
          <TableHeader>
            <TableRow className="bg-indigo-600 text-white">
              <TableHead className="p-4">Order ID</TableHead>
              <TableHead className="p-4">Price</TableHead>
              <TableHead className="p-4">Payment Status</TableHead>
              <TableHead className="p-4">Order Status</TableHead>
              <TableHead className="p-4">Date</TableHead>
              <TableHead className="p-4 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="border-b border-gray-200 hover:bg-indigo-100">
                <TableCell className="p-4">{order.id}</TableCell>
                <TableCell className="p-4">{order.price}</TableCell>
                <TableCell className="p-4">{order.paymentStatus}</TableCell>
                <TableCell className="p-4">{order.orderStatus}</TableCell>
                <TableCell className="p-4">{order.date}</TableCell>
                <TableCell className="p-4 text-center">
                  <button className="bg-green-600 hover:bg-green-500 text-white p-2 rounded-full">
                    <FaEye size={20} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrdersTable;
