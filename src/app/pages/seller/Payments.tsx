"use client";
import { FaUsers } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdCurrencyExchange, MdProductionQuantityLimits } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useState } from "react";

export default function Payments() {
  const [amount, setAmount] = useState("");
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [successRequests, setSuccessRequests] = useState<any[]>([]);

  const handleSendRequest = () => {
    if (amount) {
      const newRequest = {
        id: pendingRequests.length + 1,
        amount,
        status: "Pending",
        date: new Date().toLocaleDateString(),
      };

      setPendingRequests([...pendingRequests, newRequest]);
      setAmount(""); // Clear input
    }
  };

  return (
    <>
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 p-6">
        <Card title="Total Sales" value="₹ 0" icon={<MdCurrencyExchange />} color="red" />
        <Card title="Products" value="27" icon={<MdProductionQuantityLimits />} color="pink" />
        <Card title="Orders" value="2" icon={<FaUsers />} color="green" />
        <Card title="Pending Orders" value="4" icon={<FaCartShopping />} color="blue" />
      </div>

      {/* Request Sections */}
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Part 1: Send Request & Pending Requests */}
          <SendRequestSection
            amount={amount}
            setAmount={setAmount}
            handleSendRequest={handleSendRequest}
            pendingRequests={pendingRequests}
          />

          {/* Part 2: Success Withdrawals */}
          <SuccessWithdrawalSection successRequests={successRequests} />
        </div>
      </div>
    </>
  );
}

/* Dashboard Card Component */
function Card({ title, value, icon, color }: { title: string; value: string; icon: JSX.Element; color: string }) {
  return (
    <div className={`flex justify-between items-center p-5 bg-${color}-100 rounded-md gap-3`}>
      <div>
        <h2 className="text-3xl font-bold">{value}</h2>
        <span className="text-md font-medium">{title}</span>
      </div>
      <div className={`w-10 h-10 rounded-full bg-${color}-600 flex justify-center items-center text-white`}>
        {icon}
      </div>
    </div>
  );
}

/* Part 1: Send Request Section */
function SendRequestSection({
  amount,
  setAmount,
  handleSendRequest,
  pendingRequests,
}: {
  amount: string;
  setAmount: (value: string) => void;
  handleSendRequest: () => void;
  pendingRequests: any[];
}) {
  return (
    <div className="bg-indigo-300 rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Send Request</h2>
      <div className="flex items-center gap-4 mb-6">
        <Input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full"
        />
        <Button onClick={handleSendRequest} className="bg-red-500 hover:bg-red-600">
          Submit
        </Button>
      </div>

      <h2 className="text-lg font-semibold mb-2 text-gray-700">Pending Requests</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/12">No</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingRequests.length > 0 ? (
            pendingRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.id}</TableCell>
                <TableCell>{request.amount}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>{request.date}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                No pending requests
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

/* Part 2: Success Withdrawal Section */
function SuccessWithdrawalSection({ successRequests }: { successRequests: any[] }) {
  return (
    <div className="bg-indigo-300 rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">Success Withdrawals</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/12">No</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {successRequests.length > 0 ? (
            successRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.id}</TableCell>
                <TableCell>{request.amount}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>{request.date}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                No success withdrawals
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
