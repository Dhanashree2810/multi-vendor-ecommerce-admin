'use client'
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaImage } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import Pagination from "@/components/custom/Pagination";
import { toast } from "@/hooks/use-toast";
import Search from "@/components/custom/Search";
import { ToastAction } from "@/components/ui/toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image, { StaticImageData } from "next/image";
import HomeFurniture from '@/assets/images/Home&Furniture.jpg'
import Electronics from '@/assets/images/electronics.png'
import Fashion from '@/assets/images/fashion.png'
import Appliances from '@/assets/images/appliances.jpg'
import Mobile from '@/assets/images/mobile.png'

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
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchValue, setSearchValue] = useState<string>("");
    const [parPage, setParPage] = useState<number>(5);
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [formState, setFormState] = useState<{ name: string; image: File | null }>({
        name: "",
        image: null,
    });

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

    const resetForm = () => {
        setFormState({ name: "", image: null });
        setImagePreview("");
        setEditId(null);
        setIsEdit(false);
        setShowSidebar(false);
    };

    return (
        <div className="px-4 py-6">
            {/* <div className="flex justify-between items-center mb-5">
                <h1 className="text-lg font-semibold text-gray-200">Categories</h1>
                <button
                    onClick={() => setShowSidebar(true)}
                    className="bg-red-500 text-[#4B5563] px-4 py-2 rounded-md hover:bg-red-600"
                >
                    Add Category
                </button>
            </div> */}

            <div className="flex flex-wrap gap-5">
                <div className="w-full  lg:w-7/12 ">
                    <div className="bg-[#FFF7E6] p-3 rounded-md">
                        <Search
                            setSearchValue={setSearchValue}
                            setParPage={setParPage}
                            searchValue={searchValue}
                        />

                        <div className="overflow-x-auto mt-4">
                            <Table className="w-full text-sm bg-[#FFF7E6] text-[#4B5563]">
                                <TableHeader className="uppercase border-b border-gray-700">
                                    <TableRow>
                                        <TableHead className="py-2 px-4 text-[#4B5563]">No</TableHead>
                                        <TableHead className="py-2 px-4 text-[#4B5563]">Image</TableHead>
                                        <TableHead className="py-2 px-4 text-[#4B5563]">Name</TableHead>
                                        <TableHead className="py-2 px-4 text-[#4B5563]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {categories.map((category, index) => (
                                        <TableRow key={category.id} className=" border-none">
                                            <TableCell className="py-2 px-4">{index + 1}</TableCell>
                                            <TableCell className="py-1 px-4">
                                                <img
                                                    src={typeof category.image === "string" ? category.image : category.image.src}
                                                    alt={category.name}
                                                    className="w-10 h-10 object-cover rounded"
                                                />
                                            </TableCell>
                                            <TableCell className="py-2 px-4">{category.name}</TableCell>
                                            <TableCell className="py-2 px-4 flex gap-3">
                                                <Button
                                                    className="p-2 bg-yellow-500 rounded hover:bg-yellow-600"
                                                    onClick={() => handleEdit(category)}
                                                >
                                                    <FaEdit />
                                                </Button>
                                                <Button
                                                    className="p-2 bg-red-500 rounded hover:bg-red-600"
                                                    onClick={() => handleDelete(category.id)}
                                                >
                                                    <FaTrash />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <Pagination
                                pageNumber={currentPage}
                                setPageNumber={setCurrentPage}
                                totalItem={categories.length}
                                parPage={parPage}
                                showItem={3}
                            />
                        </div>
                    </div>
                </div>
                
                <div
                    className={`fixed top-0 right-0 w-80 bg-[#FFF7E6] h-full p-4 transition-transform transform ${showSidebar ? "translate-x-0" : "translate-x-full"
                        } lg:translate-x-0 lg:relative lg:w-[40%]`}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-200 text-center">
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
                        <div className="mb-4">
                            <Label htmlFor="name" className="block text-[#FFF7E6] mb-1 text-[16px]">
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
                            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
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
