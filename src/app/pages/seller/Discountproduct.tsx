"use client";
import React, { useState } from "react";

import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import { InputText } from "primereact/inputtext";
import Image from "next/image";
import { DataTable } from "primereact/datatable";
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
];

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>(demoCategories);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);

  // Handle Delete Action
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  // Header with Search
  const renderHeader = () => (
    <div className="flex justify-between items-center  bg-[#EFEFEF] p-4 rounded-md border border-gray-300 shadow-sm">
      <h2 className="text-lg font-semibold">Discount Product</h2>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.currentTarget.value)}
          placeholder="Search Discount Product"
          className="p-inputtext-sm h-10 w-[300px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0097A7]"
        />
      </span>
    </div>
  );

  // Action Buttons
  const actionTemplate = (rowData: Category) => (
    <div className="flex gap-2">
    

      <div className="flex gap-2">
    <Tooltip message="Edit">
      <Button icon={<FaEdit />} severity="warning" size="small" />
    </Tooltip>
    <Tooltip message="View">
      <Button icon={<FaEye />} severity="info" size="small" />
    </Tooltip>
    <Tooltip message="Upload Image">
      <Button icon={<FaImage />} severity="success" size="small" />
    </Tooltip>
  </div>
  <Tooltip message="delete">

      <Button
        icon={<FaTrash />}
        severity="danger"
        size="small"
        onClick={() => handleDelete(rowData.id)}
      />
          </Tooltip>

    </div>
  );

  // Image Column
  const imageTemplate = (rowData: Category) => (
    <Image
      src={rowData.image}
      alt={rowData.name}
      width={40}
      height={40}
      className="rounded"
    />
  );

  // Pagination Handler
  const onPageChange = (e) => {
    setFirst(e.first);
    setRows(e.rows);
  };

  return (
    <div className="p-4">
      <Toast />
      <div className="bg-white shadow-md rounded-md p-4">
        <div className=" pb-4 mb-4">{renderHeader()}</div>
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
            header="Image"
            body={imageTemplate}
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
            field="category"
            header="Category"
            sortable
            headerStyle={{
              background: "#0097A7",
              fontWeight: "bold",
              color: "white",
            }}
          />
          <Column
            field="brand"
            header="Brand"
            sortable
            headerStyle={{
              background: "#0097A7",
              fontWeight: "bold",
              color: "white",
            }}
          />
          <Column
            field="price"
            header="Price"
            body={(data) => `$${data.price}`}
            sortable
            headerStyle={{
              background: "#0097A7",
              fontWeight: "bold",
              color: "white",
            }}
          />
          <Column
            field="discount"
            header="Discount"
            body={(data) => `${data.discount}%`}
            sortable
            headerStyle={{
              background: "#0097A7",
              fontWeight: "bold",
              color: "white",
            }}
          />
          <Column
            field="stock"
            header="Stock"
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
  );
};

export default CategoryPage;
