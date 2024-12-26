"use client";
import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { FaEye } from "react-icons/fa";
import Tooltip from "@/components/custom/Tooltipcustom";
import { FilterMatchMode } from "primereact/api";

// Demo data
const demoCategories = [
  {
    Id: "#675d143198f4ae7d19703b9e",
    Price: "$1544",
    PaymentStatus: "Unpaid",
    OrderStatus: "Cancelled",
    Date: "December 14, 2024 10:44 AM",
  },
  {
    Id: "#675d143198f4ae7d19703b9e",
    Price: "$1544",
    PaymentStatus: "Unpaid",
    OrderStatus: "Cancelled",
    Date: "December 14, 2024 10:44 AM",
  },
  {
    Id: "#675d143198f4ae7d19703b9e",
    Price: "$1540",
    PaymentStatus: "Unpaid",
    OrderStatus: "Cancelled",
    Date: "December 14, 2024 10:44 AM",
  },
];

const CategoryPage = () => {
  const [categories] = useState(demoCategories);
  const [globalFilter, setGlobalFilter] = useState("");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);

  // Header with Search
  const renderHeader = () => (
    <div className="flex justify-between items-center bg-[#EFEFEF]  p-4 rounded-md border border-gray-300 shadow-sm">
      <h2 className="text-lg font-semibold dark:text-black" >Orders</h2>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.currentTarget.value)}
          placeholder="Search Orders"
          className="p-inputtext-sm h-10 w-[300px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0097A7]"
        />
      </span>
    </div>
  );

  // Action Buttons
  const actionTemplate = () => (
    <div className="flex gap-2">
      <Tooltip message="View">
        <Button icon={<FaEye />} severity="info" size="small" />
      </Tooltip>
    </div>
  );

  // Pagination Handler
  const onPageChange = (e:any) => {
    setFirst(e.first);
    setRows(e.rows);
  };
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    category: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    Date: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    Price: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    PaymentStatus: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    OrderStatus: { value: null, matchMode: FilterMatchMode.STARTS_WITH }

  });
  return (
    <div className="p-4 " >
      <Toast />
      <div className="bg-white shadow-md rounded-md p-4  dark-light" >
        <div className="pb-4 mb-4">{renderHeader()}</div>
        <DataTable
          value={categories}
          paginator
          rowsPerPageOptions={[5, 10, 25, 50]}
          rows={rows}
          first={first}
          onPage={onPageChange}
          globalFilter={globalFilter}
          emptyMessage="No categories found."
          responsiveLayout="scroll"
          filters={filters} 
          filterDisplay="row" 
        >
     
     <Column
            header="Actions"
            body={actionTemplate}
            headerStyle={{
              background: "#0097A7",
              fontWeight: "bold",
              color: "white",
            }}
          />
             {/* Price Column */}
             <Column
            field="Id"
            header="Order ID"
            sortable
            headerStyle={{
              background: "#0097A7",
              fontWeight: "bold",
              color: "white",
            }}
            
          />

          {/* Price Column */}
          <Column
            field="Price"
            header="Price"
            sortable
            headerStyle={{
              background: "#0097A7",
              fontWeight: "bold",
              color: "white",
            }}
            filter  style={{ minWidth: '12rem' }}

          />

          {/* Payment Status Column */}
          <Column
            field="PaymentStatus"
            header="Payment Status"
            sortable


            headerStyle={{
              background: "#0097A7",
              fontWeight: "bold",
              color: "white",
              
            }}
            filter  style={{ minWidth: '12rem' }}

          />

          {/* Order Status Column */}
          <Column
            field="OrderStatus"
            header="Order Status"
            sortable
            headerStyle={{
              background: "#0097A7",
              fontWeight: "bold",
              color: "white",
            }}
            filter style={{ minWidth: '12rem' }}

          />

          {/* Date Column */}
          <Column
            field="Date"
            header="Date"
            body={(data) => data.Date}
            sortable
            headerStyle={{
              background: "#0097A7",
              fontWeight: "bold",
              color: "white",
            }}
            filter  style={{ minWidth: '12rem' }}

          />

          {/* Actions Column */}
         
        </DataTable>
      </div>
    </div>
  );
};

export default CategoryPage;
