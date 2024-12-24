'use client'
import "primeflex/primeflex.css";
import 'primereact/resources/themes/saga-blue/theme.css';
import "primereact/resources/primereact.min.css";
import { useState, useEffect } from 'react';
import { FaEye } from "react-icons/fa";
import { InputText } from "primereact/inputtext";
import Image from "next/image";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import Tooltip from "@/components/custom/Tooltipcustom";
import Link from 'next/link';
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";

interface Seller {
  id: string;
  name: string;
  email: string;
  payment: string;
  status: string;
}

const mockSellers: Seller[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    payment: 'Paid',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    payment: 'Pending',
    status: 'Inactive',
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    payment: 'Pending',
    status: 'Inactive',
  },
];


const SellerRequest = () => {
  const [sellers, setSellers] = useState<Seller[]>(mockSellers);
  const [currentPage, setCurrentPage] = useState(1);
  const [parPage, setParPage] = useState(5);
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({
    global: { value: "", matchMode: FilterMatchMode.CONTAINS },
    name: { value: "", matchMode: FilterMatchMode.CONTAINS },
    payment: { value: "", matchMode: FilterMatchMode.CONTAINS },
    shopName: { value: "", matchMode: FilterMatchMode.CONTAINS },
    district: { value: "", matchMode: FilterMatchMode.CONTAINS },
    email: { value: "", matchMode: FilterMatchMode.CONTAINS },
  });
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);

  const renderHeader = () => (
    <div className="flex justify-between items-center bg-[#EFEFEF] p-4 rounded-md border border-gray-300 shadow-sm">
      <h2 className="text-lg font-semibold">Seller Request</h2>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) =>
            setFilters({
              ...filters,
              global: { value: e.currentTarget.value, matchMode: FilterMatchMode.CONTAINS },
            })
          }
          placeholder="Search Sellers"
          className="p-inputtext-sm h-10 w-[300px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0097A7]"
        />
      </span>
    </div>
  );

  const actionTemplate = (rowData: Seller) => (
    <div className="flex gap-2">
      <div className="flex gap-2">
        <Link href={`/admin/sellers/${rowData.id}`}>
          <Tooltip message="View">
            <Button className='bg-transparent'>
              <FaEye />
            </Button>
          </Tooltip>
        </Link>
      </div>
    </div>
  );

  const onPageChange = (e: any) => {
    setFirst(e.first);
    setRows(e.rows);
  };

  return (
    <div className="p-4">
      <Toast />
      <div className="bg-white shadow-md rounded-md p-4">
        <div className=" pb-4 mb-4">{renderHeader()}</div>
        <div className="overflow-x-auto">
          <DataTable
            value={sellers}
            paginator
            rowsPerPageOptions={[5, 10, 25, 50]}
            rows={rows}
            first={first}
            onPage={onPageChange}
            filters={filters}
            showGridlines
            emptyMessage="No sellers found."
          >
            <Column
              header="No"
              body={(data, options) => options.rowIndex + 1}
              headerStyle={{
                background: "#0097A7",
                fontWeight: "bold",
                color: "white",
              }}
            />
            <Column
              field="name"
              header="Name"
              sortable
              headerStyle={{
                background: "#0097A7",
                fontWeight: "bold",
                color: "white",
              }}
            />
            <Column
              field="email"
              header="Email"
              sortable
              headerStyle={{
                background: "#0097A7",
                fontWeight: "bold",
                color: "white",
              }}
            />
            <Column
              field="payment"
              header="Payment"
              sortable
              headerStyle={{
                background: "#0097A7",
                fontWeight: "bold",
                color: "white",
              }}
            />
            <Column
              field="status"
              header="Status"
              sortable
              headerStyle={{
                background: "#0097A7",
                fontWeight: "bold",
                color: "white",
              }}
            />
            <Column
              header="Actions"
              body={actionTemplate}
              headerStyle={{
                background: "#0097A7",
                fontWeight: "bold",
                color: "white",
              }}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default SellerRequest;
