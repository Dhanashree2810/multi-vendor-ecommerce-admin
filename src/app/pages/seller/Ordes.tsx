"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "@/components/custom/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define the structure of an Order
type Order = {
  _id: string;
  price: string;
  shopName: string;
  payment: string;
  date: string;
};

const Orders = () => {
  // States for pagination, search, and data management
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [totalOrders, setTotalOrders] = useState<number>(0);

  // Mock order data
  const mockOrders: Order[] = [
    {
      _id: "#675d143198f4ae7d19703b9e",
      price: "$1544",
      shopName: "John's Shop",
      payment: "Cancelled",
      date: "December 14, 2024 10:44 AM",
    },
    {
      _id: "#675d143198f4ae7d19703b9f",
      price: "$2000",
      shopName: "Emily's Store",
      payment: "Paid",
      date: "December 15, 2024 11:30 AM",
    },
    {
      _id: "#675d143198f4ae7d19703b9g",
      price: "$1799",
      shopName: "Smith Mart",
      payment: "Pending",
      date: "December 16, 2024 09:15 AM",
    },
  ];

  // Filter orders based on search input
  useEffect(() => {
    const filtered = mockOrders.filter((order) =>
      order.shopName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredOrders(filtered);
    setTotalOrders(filtered.length);
  }, [searchValue, currentPage, itemsPerPage]);

  return (
    <div className="px-4 lg:px-8 py-6">
      <h1 className="text-xl font-bold mb-4">Orders</h1>

      {/* Top Bar: Items Per Page and Search */}
      <div className="w-full p-4 bg-indigo-600 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <Select
            value={String(itemsPerPage)}
            onValueChange={(value) => setItemsPerPage(Number(value))}
          >
            <SelectTrigger className="bg-indigo-600 text-[#D0D2D6] border border-slate-700 rounded-md">
              <SelectValue placeholder="Items per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Items per page</SelectLabel>
                <SelectItem value="5" className="text-[#D0D2D6]">
                  5
                </SelectItem>
                <SelectItem value="10" className="text-[#D0D2D6]">
                  10
                </SelectItem>
                <SelectItem value="20" className="text-[#D0D2D6]">
                  20
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search by shop name..."
            className="bg-indigo-600 text-[#D0D2D6] border border-slate-700 rounded-md"
          />
        </div>

        {/* Orders Table */}
        <div className="relative overflow-x-auto">
          <Table className="w-full text-sm text-left text-[#D0D2D6]">
            <TableHeader className="text-sm uppercase border-b border-slate-700">
              <TableRow>
                <TableHead className="py-3 px-4">Order ID</TableHead>
                <TableHead className="py-3 px-4">Price</TableHead>
                <TableHead className="py-3 px-4">Shop Name</TableHead>
                <TableHead className="py-3 px-4">Payment Status</TableHead>
                <TableHead className="py-3 px-4">Date</TableHead>
                <TableHead className="py-3 px-4">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="py-1 px-4">{order._id}</TableCell>
                  <TableCell className="py-1 px-4">{order.price}</TableCell>
                  <TableCell className="py-1 px-4">{order.shopName}</TableCell>
                  <TableCell className="py-1 px-4">{order.payment}</TableCell>
                  <TableCell className="py-1 px-4">{order.date}</TableCell>
                  <TableCell className="py-1 px-4">
                    <Link href={`/admin/dashboard/seller/details/${order._id}`}>
                      <Button className="bg-green-500 hover:shadow-lg hover:shadow-green-500/50">
                        <FaEye />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalOrders > itemsPerPage && (
          <div className="flex justify-end mt-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalOrders}
              parPage={itemsPerPage}
              showItem={4}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
