"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Customer {
  name: string;
  avatar: string;
}

interface Message {
  sender: "user" | "customer";
  text: string;
}

export default function ChatBox() {
  const [customers] = useState<Customer[]>([
    { name: "Priyanka Pardeshiii", avatar: "/customer-avatar.png" },
    { name: "John Doe", avatar: "/customer-avatar.png" },
    { name: "Jane Smith", avatar: "/customer-avatar.png" },
  ]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = () => {
    if (message.trim() === "") return;

    // Add user's message
    const newMessages = [
      ...messages,
      { sender: "user", text: message }
    ];

    setMessages(newMessages); // Update the chat messages
    setMessage(""); // Clear the input field

    // Add customer response after a delay (for demo purposes)
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "customer", text: "Hello, how can I assist you?" }
      ]);
    }, 1000);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#EFEFEF]">
      <div className="w-[900px] bg-white rounded-lg shadow-lg p-4 flex h-[450px]  dark-light">
        {/* Customers List */}
        <div className="w-[250px] bg-[#EFEFEF] p-4 rounded-lg text-black flex-none overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">Customers</h2>
          <ul>
            {customers.map((customer, index) => (
              <li
                key={index}
                onClick={() => setSelectedCustomer(customer)}
                className={`flex items-center gap-2 p-2 rounded cursor-pointer mb-2 ${
                  selectedCustomer?.name === customer.name
                    ? "bg-[#0097A7]"
                    : "hover:bg-[#0080a7]"
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
              <div className="flex-1 overflow-y-auto p-2 text-white space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`p-3 rounded-lg max-w-[70%] ${
                        msg.sender === "user"
                          ? "bg-cyan-500 text-white"
                          : "bg-[#6c757d] text-white"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Field */}
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Input Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-[#0097A7] text-white border-none"
                />
                <Button
                  onClick={handleSend}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white"
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
