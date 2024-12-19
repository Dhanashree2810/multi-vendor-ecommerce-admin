'use client'
import "primeflex/primeflex.css";
import 'primereact/resources/themes/saga-blue/theme.css';
import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import Image, { StaticImageData } from "next/image";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import Tooltip from "@/components/custom/Tooltipcustom";
import { FilterMatchMode } from "primereact/api";
import { FaEdit, FaTrash, FaImage } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import HomeFurniture from '@/assets/images/Home&Furniture.jpg'
import Electronics from '@/assets/images/electronics.png'
import Fashion from '@/assets/images/fashion.png'
import Appliances from '@/assets/images/appliances.jpg'
import Mobile from '@/assets/images/mobile.png'
import { Button } from "primereact/button";

interface Category {
    id: string;
    name: string;
    image: StaticImageData | string;
}

const demoCategories: Category[] = [
    { id: "1", name: "HomeFurniture", image: HomeFurniture },
    { id: "2", name: "Electronics", image: Electronics },
    { id: "3", name: "Fashion", image: Fashion },
    { id: "4", name: "Appliances", image: Appliances },
    { id: "5", name: "Mobile", image: Mobile },
];

const Category = () => {
    const [categories, setCategories] = useState<Category[]>(demoCategories);
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [formState, setFormState] = useState<{ name: string; image: File | null }>({
        name: "",
        image: null,
    });
    const [filters, setFilters] = useState({
        global: { value: "", matchMode: FilterMatchMode.CONTAINS },
        id: { value: "", matchMode: FilterMatchMode.CONTAINS },
        name: { value: "", matchMode: FilterMatchMode.CONTAINS },
    });
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setImagePreview(URL.createObjectURL(file));
            setFormState((prevState) => ({ ...prevState, image: file }));
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && editId) {
            setCategories((prev) =>
                prev.map((cat) =>
                    cat.id === editId
                        ? { ...cat, name: formState.name, image: imagePreview || cat.image }
                        : cat
                )
            );
            toast({
                title: "Success!",
                description: "Category updated successfully!",
                type: "foreground",
                action: (
                    <ToastAction altText="Dismiss">
                        Dismiss
                    </ToastAction>
                ),
            });


        } else {
            const newCategory = {
                id: Math.random().toString(36).substr(2, 9),
                name: formState.name,
                image: imagePreview || "/placeholder.png",
            };
            setCategories((prev) => [newCategory, ...prev]);
            toast({
                title: "Success!",
                description: "Category added successfully!",
                type: "foreground",
                action: (
                    <ToastAction altText="Dismiss">
                        Dismiss
                    </ToastAction>
                ),
            });
        }

        resetForm();
    };

    const handleEdit = (category: Category) => {
        setFormState({ name: category.name, image: null });
        if (typeof category.image === "string") {
            setImagePreview(category.image);
        } else {
            setImagePreview(category.image.src);
        }

        setEditId(category.id);
        setIsEdit(true);
        setShowSidebar(true);
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this category?")) {
            setCategories((prev) => prev.filter((cat) => cat.id !== id));
            toast({
                title: "Success!",
                description: "Category deleted successfully!",
                type: "foreground",
                action: (
                    <ToastAction altText="Dismiss">
                        Dismiss
                    </ToastAction>
                ),
            });
        }
    };

    const renderHeader = () => (
        <div className="flex justify-between items-center bg-[#EFEFEF] p-4 rounded-md border border-gray-300 shadow-sm">
            <h2 className="text-lg font-semibold">Categories</h2>
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
                    placeholder="Search Category"
                    className="p-inputtext-sm h-10 w-[300px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0097A7]"
                />
            </span>
        </div>
    );

    const imageTemplate = (rowData: Category) => (
        <Image
            src={rowData.image}
            alt={rowData.name}
            width={40}
            height={40}
            className="rounded"
        />
    );

    const actionTemplate = (rowData: Category) => (
        <div className="flex gap-2">
            <div className="flex gap-2">
                <Tooltip message="Edit">
                    <Button icon={<FaEdit onClick={() => handleEdit(rowData)} />} severity="warning" size="small" />
                </Tooltip>
                <Tooltip message="Upload Image">
                    <Button icon={<FaImage onClick={() => handleDelete(rowData.id)} />} severity="success" size="small" />
                </Tooltip>
            </div>
        </div>
    );

    const onPageChange = (e: any) => {
        setFirst(e.first);
        setRows(e.rows);
    };

    const resetForm = () => {
        setFormState({ name: "", image: null });
        setImagePreview("");
        setEditId(null);
        setIsEdit(false);
        setShowSidebar(false);
    };

    return (
        <div className="relative h-screen flex flex-col p-4">
            <Toast />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6  rounded-md shadow-md ">
                <div className="flex flex-col lg:col-span-2 bg-white rounded-md shadow-md p-4">
                    <div className=" pb-4 ">{renderHeader()}</div>
                    <DataTable
                        value={categories}
                        paginator
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        rows={rows}
                        first={first}
                        onPage={onPageChange}
                        filters={filters}
                        emptyMessage="No categories found."
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

                <div className="flex flex-col bg-white rounded-md shadow-md p-4">
                    <div className="flex justify-between items-center mb-4 p-2 bg-[#EFEFEF] rounded-md border border-gray-300 shadow-sm">
                        <h2 className="text-lg font-semibold text-black text-center">
                            {isEdit ? "Edit Category" : "Add Category"}
                        </h2>
                        <Button
                            className="lg:hidden text-2xl text-gray-400 hover:text-gray-200"
                            onClick={resetForm}
                        >
                            <IoMdCloseCircle />
                        </Button>
                    </div>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-4 bg-[#EFEFEF]  rounded-md border border-gray-300 shadow-sm p-2">
                            <Label htmlFor="name" className="block text-black mb-1 text-[16px]">
                                Category Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                value={formState.name}
                                onChange={(e) =>
                                    setFormState((prev) => ({ ...prev, name: e.target.value }))
                                }
                                className="w-full px-4 py-2 bg-white text-black rounded-md focus:outline-none"
                                placeholder="Category Name"
                            />
                        </div>

                        <div className="mb-4">
                            <Label
                                htmlFor="image"
                                className="flex items-center justify-center border border-dashed border-gray-600 rounded-md h-56 cursor-pointer hover:border-gray-400"
                            >
                                <div className="  flex justify-center items-center">
                                    {imagePreview ? (
                                        <Image
                                            src={imagePreview}
                                            alt="Preview"
                                            width={100}
                                            height={100}
                                            className="w-full h-full object-cover rounded-md text-center"
                                            objectFit="cover"
                                        />
                                    ) : (
                                        <div className="text-center text-gray-400">
                                            <FaImage size={30} />
                                            <p>Select Image</p>
                                        </div>
                                    )}
                                </div>
                            </Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-fit  bg-[#0097A7] text-white p-2 text-[16px] rounded-md text-center"
                        >
                            {isEdit ? "Update Category" : "Add Category"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Category;
