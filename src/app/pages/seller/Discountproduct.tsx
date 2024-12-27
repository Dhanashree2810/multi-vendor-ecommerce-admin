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
  category: string;
  brand: string;
  price: number;
  discount: number;
  stock: number;
}

const demoCategories: Category[] = [
  {
    id: "1",
    name: "Home & Furniture",
    image: HomeFurniture.src,
    category: "Furniture",
    brand: "IKEA",
    price: 1200,
    discount: 10,
    stock: 50,
  },
  {
    id: "2",
    name: "Electronics",
    image: Electronics.src,
    category: "Gadgets",
    brand: "Sony",
    price: 2500,
    discount: 15,
    stock: 30,
  },
  {
    id: "3",
    name: "Fashion",
    image: Fashion.src,
    category: "Clothing",
    brand: "Zara",
    price: 80,
    discount: 20,
    stock: 100,
  },
  {
    id: "4",
    name: "Appliances",
    image: Appliances.src,
    category: "Home Appliances",
    brand: "LG",
    price: 400,
    discount: 5,
    stock: 25,
  },
  {
    id: "5",
    name: "Mobile",
    image: Mobile.src,
    category: "Gadgets",
    brand: "Samsung",
    price: 1000,
    discount: 12,
    stock: 60,
  },
  {
    id: "6",
    name: "Appliances",
    image: Appliances.src,
    category: "Home Appliances",
    brand: "LG",
    price: 400,
    discount: 5,
    stock: 25,
  },
  {
    id: "7",
    name: "Mobile",
    image: Mobile.src,
    category: "Gadgets",
    brand: "Samsung",
    price: 1000,
    discount: 12,
    stock: 60,
  },
  {
    id: "8",
    name: "Appliances",
    image: Appliances.src,
    category: "Home Appliances",
    brand: "LG",
    price: 400,
    discount: 5,
    stock: 25,
  },
  {
    id: "8",
    name: "Appliances",
    image: Appliances.src,
    category: "Home Appliances",
    brand: "LG",
    price: 400,
    discount: 5,
    stock: 25,
  }, {
    id: "8",
    name: "Appliances",
    image: Appliances.src,
    category: "Home Appliances",
    brand: "LG",
    price: 400,
    discount: 5,
    stock: 25,
  },
  {
    id: "8",
    name: "Appliances",
    image: Appliances.src,
    category: "Home Appliances",
    brand: "LG",
    price: 400,
    discount: 5,
    stock: 25,
  }, {
    id: "8",
    name: "Appliances",
    image: Appliances.src,
    category: "Home Appliances",
    brand: "LG",
    price: 400,
    discount: 5,
    stock: 25,
  }, {
    id: "8",
    name: "Appliances",
    image: Appliances.src,
    category: "Home Appliances",
    brand: "LG",
    price: 400,
    discount: 5,
    stock: 25,
  }, {
    id: "8",
    name: "Appliances",
    image: Appliances.src,
    category: "Home Appliances",
    brand: "LG",
    price: 400,
    discount: 5,
    stock: 25,
  },
];

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>(demoCategories);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  // Handle Delete Action
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  // Header with Search
  const renderHeader = () => (
    <div className="flex flex-col md:flex-row justify-between items-center bg-[#EFEFEF] p-2 rounded-md border border-gray-300 shadow-sm">
      <h2 className="text-base font-semibold">Discount Product</h2>
      <span className="p-input-icon-left flex items-center mt-2 md:mt-0">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.currentTarget.value)}
          placeholder="Search All Products"
          className="p-inputtext-sm h-8 w-full md:w-[300px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0097A7]"
        />
      </span>
    </div>

  );

  // Action Buttons
  // const actionTemplate = (rowData: Category) => (
  //   <div className="flex gap-2">
  //     <Tooltip message="Edit">
  //       <Link href={`allproduct/edit/${rowData.id}`} passHref>
  //         <Button icon={<FaEdit />} severity="warning" size="small" />
  //       </Link>
  //     </Tooltip>
  //     <Tooltip message="View">
  //       <Link href={`allproduct/view/${rowData.id}`} passHref>
  //         <Button icon={<FaEye />} severity="info" size="small" />
  //       </Link>
  //     </Tooltip>
  //     <Tooltip message="Upload Image">
  //       <Link href={`/seller/allproduct/uploadimage/${rowData.id}`} passHref>
  //         <Button icon={<FaImage />} severity="success" size="small" />
  //       </Link>
  //     </Tooltip>
  //     <Tooltip message="Delete">
  //       <Button
  //         icon={<FaTrash />}
  //         severity="danger"
  //         size="small"
  //         onClick={() => handleDelete(rowData.id)}
  //       />
  //     </Tooltip>
  //   </div>
  // );

  // Image Column
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
    category: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
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
              {/* Actions Column */}
              {/* <Column
    header="Actions"
    frozen
    alignFrozen="left"
    headerStyle={{
      background: "#0097A7", // Header background color
      color: "#fff", // Header text color
      textAlign: "center",
      padding: "0.5rem",
      zIndex: 2,
      position: "sticky",
      left: 0,
      fontWeight: "bold",
    }}
    style={{ width: "200px" }}
    bodyStyle={{
      backgroundColor: "#ffffff", 
    }}
    body={(rowData) => (
      <div className="flex justify-center space-x-2 bg-white">
        <Link href={`allproduct/view/${rowData.id}`}>
          <HiEye className="h-6 w-6 p-1 cursor-pointer text-black border border-transparent rounded-md hover:border-black hover:bg-black hover:text-white transition-all" />
        </Link>
        <Link href={`allproduct/edit/${rowData.id}`}>
          <FaEdit className="h-6 w-6 p-1 cursor-pointer text-black border border-transparent rounded-md hover:border-black hover:bg-black hover:text-white transition-all" />
        </Link>
        <Link href={`/admin/cropdisease_hi/edit/${rowData.id}`}>
          <FaTrash className="h-6 w-6 p-1 cursor-pointer text-black border border-transparent rounded-md hover:border-black hover:bg-black hover:text-white transition-all" />
        </Link>
        <Link href={`/seller/allproduct/uploadimage/${rowData.id}`}>
          <FaImage className="h-6 w-6 p-1 cursor-pointer text-black border border-transparent rounded-md hover:border-black hover:bg-black hover:text-white transition-all" />
        </Link>
      </div>
    )}
  /> */}

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
                    <Link href={`allproduct/edit/${rowData.id}`} passHref>
                      <FaEdit className="text-black dark:text-white cursor-pointer text-xs" />
                    </Link>
                    <Link href={`allproduct/view/${rowData.id}`} passHref>
                      <FaEye className="text-black dark:text-white cursor-pointer text-xs" />
                    </Link>
                    <Link href={`/seller/allproduct/uploadimage/${rowData.id}`} passHref>
                      <FaImage className="text-black dark:text-white cursor-pointer text-xs" />
                    </Link>
                    <FaTrash
                      className="text-black dark:text-white cursor-pointer text-xs"
                      onClick={() => handleDelete(rowData.id)}
                    />
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

              {/* Image Column */}
              <Column
                header="Image"
                body={imageTemplate}
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

              {/* Category Column */}
              <Column
                field="category"
                filter
                style={{ minWidth: "10rem" }}
                header="Category"
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
                header="Brand"
                sortable
                headerStyle={{
                  background: "#0097A7",
                  fontWeight: "bold",
                  color: "white",
                }}
              />

              {/* Price Column */}
              <Column
                field="price"
                filter
                style={{ minWidth: "10rem" }}
                header="Price"
                body={(data) => `$${data.price}`}
                sortable
                headerStyle={{
                  background: "#0097A7",
                  fontWeight: "bold",
                  color: "white",
                }}
              />

              {/* Discount Column */}
              <Column
                field="discount"
                filter
                style={{ minWidth: "10rem" }}
                header="Discount"
                body={(data) => `${data.discount}%`}
                sortable
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
                header="Stock"
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

export default CategoryPage;
