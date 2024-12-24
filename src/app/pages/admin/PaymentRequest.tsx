'use client';
import "primeflex/primeflex.css";
import 'primereact/resources/themes/saga-blue/theme.css';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from '@/components/ui/button';
import Tooltip from "@/components/custom/Tooltipcustom";
import { Toast } from "primereact/toast";

const PaymentRequest = () => {
  const [paymentId, setPaymentId] = useState<string>('');
  const [pendingWithdrawals, setPendingWithdrawals] = useState<any[]>([]);
  const [loader, setLoader] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);

  useEffect(() => {
    const fetchPaymentRequests = async () => {
      try {
        const response = await Promise.resolve([
          { id: '1', amount: 100, status: 'Pending', createdAt: new Date().toISOString() },
          { id: '2', amount: 200, status: 'Pending', createdAt: new Date().toISOString() },
        ]);
        setPendingWithdrawals(response);
      } catch (error) {
        console.error('Failed to fetch payment requests', error);
      }
    };
    fetchPaymentRequests();
  }, []);

  const confirmRequest = async (id: string) => {
    setPaymentId(id);
    setLoader(true);
    try {
      await Promise.resolve();
      setSuccessMessage('Payment request confirmed successfully!');
      setPendingWithdrawals(prev => prev.filter(request => request.id !== id));
    } catch (error) {
      setErrorMessage('Failed to confirm payment request.');
    } finally {
      setLoader(false);
      setPaymentId('');
    }
  };

  useEffect(() => {
    if (successMessage) {
      alert(successMessage);
      setSuccessMessage(null);
    }
    if (errorMessage) {
      alert(errorMessage);
      setErrorMessage(null);
    }
  }, [successMessage, errorMessage]);

  const renderHeader = () => (
    <div className="flex justify-between items-center bg-[#EFEFEF] p-4 rounded-md border border-gray-300 shadow-sm">
      <h2 className="text-lg font-semibold">Withdrawal Request</h2>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <input
          type="search"
          onInput={(e) => setGlobalFilter(e.currentTarget.value)}
          placeholder="Search Withdrawals"
          className="p-inputtext-sm h-10 w-[300px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0097A7]"
        />
      </span>
    </div>
  );

  const actionTemplate = (rowData: any) => (
    <Tooltip message="Confirm Request">
      <Button
        onClick={() => confirmRequest(rowData.id)}
        disabled={loader && paymentId === rowData.id}
        className="bg-[#0097A7] text-white"
      >
        Confirm
      </Button>
    </Tooltip>
  );

  const statusTemplate = (rowData: any) => (
    <span
      className={`py-1 px-2 rounded-md text-sm ${rowData.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'
        }`}
    >
      {rowData.status}
    </span>
  );

  const dateTemplate = (rowData: any) => moment(rowData.createdAt).format('LL');

  const onPageChange = (e: any) => {
    setFirst(e.first);
    setRows(e.rows);
  };

  return (
    <div className="p-4">
      <Toast />
      <div className="bg-white shadow-md rounded-md p-4">
        <div className="pb-4 mb-4">{renderHeader()}</div>
        <div className="overflow-x-auto">
          <DataTable
            value={pendingWithdrawals}
            paginator
            rows={rows}
            first={first}
            onPage={onPageChange}
            globalFilter={globalFilter}
            emptyMessage="No payment requests found."
            responsiveLayout="scroll"
            rowsPerPageOptions={[5, 10, 25]}
          >
            <Column
              header="No"
              body={(data, options) => options.rowIndex + 1}
              headerStyle={{ background: "#0097A7", fontWeight: "bold", color: "white" }}
            />
            <Column
              field="amount"
              header="Amount"
              body={(data) => `₹${data.amount}`}
              sortable
              headerStyle={{ background: "#0097A7", fontWeight: "bold", color: "white" }}
            />
            <Column
              field="status"
              header="Status"
              body={statusTemplate}
              sortable
              headerStyle={{ background: "#0097A7", fontWeight: "bold", color: "white" }}
            />
            <Column
              field="createdAt"
              header="Date"
              body={dateTemplate}
              sortable
              headerStyle={{ background: "#0097A7", fontWeight: "bold", color: "white" }}
            />
            <Column
              header="Action"
              body={actionTemplate}
              headerStyle={{ background: "#0097A7", fontWeight: "bold", color: "white" }}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default PaymentRequest;
