"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatBox() {
  const [messages, setMessages] = useState<{ text: string; type: string }[]>([]);
  const [message, setMessage] = useState<string>("");

  const handleSend = () => {
    if (message.trim() === "") return;

    // Add user message to the state
    setMessages([...messages, { text: message, type: "user" }]);
    setMessage("");

    // Simulate support reply after 1 second
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Support Reply", type: "support" },
      ]);
    }, 1000);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#EFEFEF] ">
      <div className="w-[600px] bg-white rounded-lg p-4 shadow-lg  dark-light">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
            <span className="text-black font-bold">Q</span>
          </div>
          <h1 className="text-black dark:text-white font-bold">Support</h1>
        </div>

        {/* Chat Area */}
        <div className="bg-[#3a3f4b] rounded-lg p-4 h-[400px] overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.type === "user" ? "justify-start" : "justify-end"
              } items-center mb-2`}
            >
              {/* User or Support Message */}
              {msg.type === "user" && (
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-2 flex items-center justify-center">
                    <span className="text-sm">🌟</span>
                  </div>
                  <div className="bg-blue-500 text-white px-3 py-1 rounded-lg">
                    {msg.text}
                  </div>
                </div>
              )}
              {msg.type === "support" && (
                <div className="flex items-center">
                  <div className="bg-red-500 text-white px-3 py-1 rounded-lg mr-2">
                    {msg.text}
                  </div>
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm">🛠️</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="flex items-center gap-2 mt-4">
          <Input
            type="text"
            placeholder="Input Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-[#e2e8f0] text-gray-700"
          />
          <Button onClick={handleSend} className="bg-[#0097A7] hover:bg-[#0078a7] text-white">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
