"use client"
import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import Image from "next/image";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
// Import demo images
import HomeFurniture from "@/assets/images/Home&Furniture.jpg";
import Electronics from "@/assets/images/electronics.png";
import Fashion from "@/assets/images/fashion.png";
import Appliances from "@/assets/images/appliances.jpg";
import Mobile from "@/assets/images/mobile.png";
import { Toast } from "primereact/toast";
import { FaEdit, FaEye, FaTrash, FaImage } from "react-icons/fa";
import Tooltip from "@/components/custom/Tooltipcustom";
import Link from "next/link";
import { FilterMatchMode, FilterService } from 'primereact/api';
import { HiEye } from "react-icons/hi";

interface Category {
  id: string;
  name: string;
  image: string;
  shopname: string;
  brand: string;
  price: number;
  discount: number;
  stock: number;
}

const demoCategories: Category[] = [
 

  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    payment: 'Paid',
    status: 'Active',
  },
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    payment: 'Paid',
    status: 'Active',
  }, {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    payment: 'Paid',
    status: 'Active',
  }, {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    payment: 'Paid',
    status: 'Active',
  }, {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    payment: 'Paid',
    status: 'Active',
  }, {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    payment: 'Paid',
    status: 'Active',
  }, {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    payment: 'Paid',
    status: 'Active',
  }, {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    payment: 'Paid',
    status: 'Active',
  }, {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    payment: 'Paid',
    status: 'Active',
  },
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    payment: 'Paid',
    status: 'Active',
  },{
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    payment: 'Paid',
    status: 'Active',
  },{
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    payment: 'Paid',
    status: 'Active',
  },{
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    payment: 'Paid',
    status: 'Active',
  },{
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    payment: 'Paid',
    status: 'Active',
  },
 
];

const SellersRequest = () => {
  const [categories, setCategories] = useState<Category[]>(demoCategories);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  // Handle Delete Action
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this shopname?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  // Header with Search
  const renderHeader = () => (
    <div className="flex flex-col md:flex-row justify-between items-center bg-[#EFEFEF] p-2 rounded-md border border-gray-300 shadow-sm">
      <h2 className="text-base font-semibold"> Sellers Request</h2>
      <span className="p-input-icon-left flex items-center mt-2 md:mt-0">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.currentTarget.value)}
          placeholder="Search Sellers Request"
          className="p-inputtext-sm h-8 w-full md:w-[300px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0097A7]"
        />
      </span>
    </div>

  );


  const imageTemplate = (rowData: Category) => (
    <Image
      src={rowData.image}
      alt={rowData.name}
      width={20}
      height={20}
      className="rounded"
    />
  );

  // Pagination Handler
  const onPageChange = (e: any) => {
    setFirst(e.first);
    setRows(e.rows);
  };
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    shopname: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    brand: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    price: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    discount: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    stock: { value: null, matchMode: FilterMatchMode.STARTS_WITH }

  });
  return (

    <div >
      <Toast />
      <div className="bg-white shadow-md rounded-md p-2  dark:bg-[#18181a] text-black dark:text-black">
        <div className="pb-2 mb-2">{renderHeader()}</div>
        <div className="tableContainer">
          <div className="tableResponsive">
            <DataTable
              value={categories}
              paginator
              rowsPerPageOptions={[10, 25, 50, 75]}
              rows={rows}
              first={first}
              onPage={onPageChange}
              globalFilter={globalFilter}
              emptyMessage="No categories found."
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
                style={{
                  zIndex: 1,
                }}
                headerStyle={{
                  zIndex: 2,
                  position: "sticky",
                  left: 0,
                  background: "#0097A7",
                  fontWeight: "bold",
                  color: "white",
                }}
                // bodyStyle={{
                //   backgroundColor: "#ffffff", 
                // }}
                body={(rowData) => (
                  <div className="flex bg-white dark:bg-[#18181a] text-black dark:text-white gap-2">
                   
                    <Link href={`allproduct/view/${rowData.id}`} passHref>
                      <FaEye className="text-black dark:text-white cursor-pointer text-xs" />
                    </Link>
                  
                  
                  </div>

                )}
              />

              {/* No Column (Row Number) */}
              <Column
                header="No"
                body={(data, options) => options.rowIndex + 1}
                headerStyle={{
                  background: "#0097A7",
                  fontWeight: "bold",
                  color: "white",
                }}
              />

            

              {/* Name Column */}
              <Column
                field="name"
                header="Name"
                filter
                style={{ minWidth: "10rem" }}
                sortable
                headerStyle={{
                  background: "#0097A7",
                  fontWeight: "bold",
                  color: "white",
                }}
              />

              

              {/* Brand Column */}
              <Column
                field="brand"
                filter
                style={{ minWidth: "10rem" }}
                header="Payment"
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
    filter
    style={{ minWidth: "10rem" }}
    headerStyle={{
      background: "#0097A7",
      fontWeight: "bold",
      color: "white",
    }}
  />

              

              

              {/* Stock Column */}
              <Column
                field="stock"
                filter
                style={{ minWidth: "10rem" }}
                header="Status"
                sortable
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
    </div>
  );
};

export default SellersRequest;
