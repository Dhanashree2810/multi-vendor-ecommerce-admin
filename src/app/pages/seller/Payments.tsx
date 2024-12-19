"use client";
import { FaUsers } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdCurrencyExchange, MdProductionQuantityLimits } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";

export default function Payments() {
  const [amount, setAmount] = useState("");
  const [pendingRequests, setPendingRequests] = useState<any[]>([
    {
      id: 1,
      amount: "₹ 5000",
      status: "Pending",
      date: "2024-12-18",
    },
    {
      id: 2,
      amount: "₹ 3000",
      status: "Pending",
      date: "2024-12-19",
    },
  ]);
  const [successRequests, setSuccessRequests] = useState<any[]>([
    {
      id: 1,
      amount: "₹ 2000",
      status: "Success",
      date: "2024-12-15",
    },
    {
      id: 2,
      amount: "₹ 1500",
      status: "Success",
      date: "2024-12-17",
    },
  ]);

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
      <div className="min-h-screen bg-white p-6">
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
    <div className="bg-[#EFEFEF] rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Send Request</h2>
      <div className="flex items-center gap-4 mb-6">
        <Input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full"
        />
        <Button onClick={handleSendRequest} className="bg-[#0097A7] hover:bg-[#008ea7] text-white">
          Submit
        </Button>
      </div>

      <h2 className="text-lg font-semibold mb-2 text-gray-700">Pending Requests</h2>
      <DataTable value={pendingRequests} paginator rows={5} rowsPerPageOptions={[5, 10, 25]}>
        <Column field="id" header="No" />
        <Column field="amount" header="Amount" />
        <Column field="status" header="Status" />
        <Column field="date" header="Date" />
      </DataTable>
    </div>
  );
}

/* Part 2: Success Withdrawal Section */
function SuccessWithdrawalSection({ successRequests }: { successRequests: any[] }) {
  return (
    <div className="bg-[#EFEFEF] rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">Success Withdrawals</h2>
      <DataTable value={successRequests} paginator rows={5} rowsPerPageOptions={[5, 10, 25]}>
        <Column field="id" header="No" />
        <Column field="amount" header="Amount" />
        <Column field="status" header="Status" />
        <Column field="date" header="Date" />
      </DataTable>
    </div>
  );
}
