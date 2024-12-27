"use client";
import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import Image from "next/image";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import Link from "next/link";
import { FilterMatchMode } from 'primereact/api';
import { FaEye } from "react-icons/fa";

// Demo Categories Data
const demoCategories = [
  {
    id: "#675d143198f4ae7d19703b9e",
    price: "$1544",
    paymentStatus: "Unpaid",
    orderStatus: "Cancelled",
    date: "December 14, 2024 10:44 AM",
  },
  {
    id: "#675d143198f4ae7d19703b9e",
    price: "$1540",
    paymentStatus: "Unpaid",
    orderStatus: "Cancelled",
    date: "December 14, 2024 10:44 AM",
  },
  {
    id: "#675d143198f4ae7d19703b9e",
    price: "$1540",
    paymentStatus: "Unpaid",
    orderStatus: "Cancelled",
    date: "December 14, 2024 10:44 AM",
  },  {
    id: "#675d143198f4ae7d19703b9e",
    price: "$1540",
    paymentStatus: "Unpaid",
    orderStatus: "Cancelled",
    date: "December 14, 2024 10:44 AM",
  },  {
    id: "#675d143198f4ae7d19703b9e",
    price: "$1540",
    paymentStatus: "Unpaid",
    orderStatus: "Cancelled",
    date: "December 14, 2024 10:44 AM",
  },  {
    id: "#675d143198f4ae7d19703b9e",
    price: "$1540",
    paymentStatus: "Unpaid",
    orderStatus: "Cancelled",
    date: "December 14, 2024 10:44 AM",
  },  {
    id: "#675d143198f4ae7d19703b9e",
    price: "$1540",
    paymentStatus: "Unpaid",
    orderStatus: "Cancelled",
    date: "December 14, 2024 10:44 AM",
  },
  // Add more categories here if needed
];

const Orders = () => {
  const [orders, setOrders] = useState(demoCategories);
  const [globalFilter, setGlobalFilter] = useState("");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  // Handle Delete Action
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter((order) => order.id !== id));
    }
  };

  // Header with Search
  const renderHeader = () => (
    <div className="flex flex-col md:flex-row justify-between items-center bg-[#EFEFEF] p-2 rounded-md border border-gray-300 shadow-sm">
      <h2 className="text-base font-semibold">Orders</h2>
      <span className="p-input-icon-left flex items-center mt-2 md:mt-0">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.currentTarget.value)}
          placeholder="Search orders"
          className="p-inputtext-sm h-8 w-full md:w-[300px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0097A7]"
        />
      </span>
    </div>
  );

  // Pagination Handler
  const onPageChange = (e: any) => {
    setFirst(e.first);
    setRows(e.rows);
  };

  return (
    <div>
      <Toast />
      <div className="bg-white shadow-md rounded-md p-2 dark:bg-[#18181a] text-black dark:text-white">
        <div className="pb-2 mb-2">{renderHeader()}</div>
        <div className="tableContainer">
          <div className="tableResponsive">
            <DataTable
              value={orders}
              paginator
              rowsPerPageOptions={[10, 25, 50, 75]}
              rows={rows}
              first={first}
              onPage={onPageChange}
              globalFilter={globalFilter}
              emptyMessage="No orders found."
              scrollable
              scrollHeight="370px"
              filters={filters}
              filterDisplay="row"
              paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              style={{ overflowX: "auto", width: "100%" }}
            >
              <Column
                header="Actions"
                frozen
                alignFrozen="left"
                headerStyle={{
                  zIndex: 2,
                  position: "sticky",
                  left: 0,
                  background: "#0097A7",
                  fontWeight: "bold",
                  color: "white",
                }}
                body={(rowData) => (
                  <div className="flex gap-2">
                    <Link href={`allproduct/view/${rowData.id}`} passHref>
                      <FaEye className="text-black dark:text-white cursor-pointer text-xs" />
                    </Link>
                  </div>
                )}
              />

              <Column
                field="id"
                header="Order ID"
                sortable
                headerStyle={{
                  background: "#0097A7",
                  fontWeight: "bold",
                  color: "white",
                }}
                filter style={{ minWidth: '10rem' }}
                />

              <Column
                field="price"
                header="Price"
                sortable
                headerStyle={{
                  background: "#0097A7",
                  fontWeight: "bold",
                  color: "white",
                }}
                filter style={{ minWidth: '10rem' }}
                />
 <Column
            field="paymentStatus"
            header="Payment Status"
            sortable


            headerStyle={{
              background: "#0097A7",
              fontWeight: "bold",
              color: "white",

            }}
            filter style={{ minWidth: '10rem' }}

          />
              <Column
                field="orderStatus"
                header="Order Status"
                sortable
                headerStyle={{
                  background: "#0097A7",
                  fontWeight: "bold",
                  color: "white",
                }}
                filter style={{ minWidth: '10rem' }}
                />

              <Column
                field="date"
                header="Date"
                sortable
                headerStyle={{
                  background: "#0097A7",
                  fontWeight: "bold",
                  color: "white",
                }}
                filter style={{ minWidth: '10rem' }}
                />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
