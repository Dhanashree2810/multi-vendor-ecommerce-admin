"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Customer {
  name: string;
  avatar: string;
}

export default function ChatBox() {
  const [customers] = useState<Customer[]>([
    { name: "priyanka pardeshiii", avatar: "/customer-avatar.png" },
  ]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [message, setMessage] = useState<string>("");

  const handleSend = () => {
    if (message.trim() === "") return;
    console.log(`Message sent to ${selectedCustomer?.name}: ${message}`);
    setMessage("");
  };

  return (
    <div className="h-screen bg-[#b5a3ff] flex justify-center items-center">
      <div className="w-[900px] bg-[#6b57ff] rounded-lg shadow-lg p-4 flex">
        {/* Customers List */}
        <div className="w-1/3 bg-[#7b5df8] p-4 rounded-lg text-white">
          <h2 className="text-lg font-bold mb-4">Customers</h2>
          <ul>
            {customers.map((customer, index) => (
              <li
                key={index}
                onClick={() => setSelectedCustomer(customer)}
                className={`flex items-center gap-2 p-2 rounded cursor-pointer mb-2 ${
                  selectedCustomer?.name === customer.name
                    ? "bg-[#4f39c5]"
                    : "hover:bg-[#5c46dd]"
                }`}
              >
                <img
                  src={customer.avatar}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border-2 border-green-400"
                />
                <span className="font-semibold">{customer.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-[#3a3f4b] rounded-lg p-4 flex flex-col justify-between">
          {selectedCustomer ? (
            <>
              {/* Header */}
              <div className="flex items-center gap-2 mb-4 text-white">
                <img
                  src={selectedCustomer.avatar}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border-2 border-green-400"
                />
                <h2 className="font-bold">{selectedCustomer.name}</h2>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 flex justify-center items-center text-gray-300">
                Select Customer
              </div>

              {/* Input Field */}
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Input Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-[#574fcf] text-white border-none"
                />
                <Button
                  onClick={handleSend}
                  className="bg-cyan-500 hover:bg-cyan-600"
                >
                  Send
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex justify-center items-center text-white">
              Select a Customer
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
