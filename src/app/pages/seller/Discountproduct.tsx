'use client'
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "@/components/custom/Pagination";
import { toast } from "@/hooks/use-toast";
import Search from "@/components/custom/Search";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";

// Import demo images
import HomeFurniture from '@/assets/images/Home&Furniture.jpg';
import Electronics from '@/assets/images/electronics.png';
import Fashion from '@/assets/images/fashion.png';
import Appliances from '@/assets/images/appliances.jpg';
import Mobile from '@/assets/images/mobile.png';
import { FaEye, FaImage } from "react-icons/fa6";

// Category Interface
interface Discountproduct {
    id: string;
    name: string;
    image: StaticImageData | string;
}

const demoCategories: Discountproduct[] = [
    { id: "1", name: "Home & Furniture", image: HomeFurniture, category: "Furniture", brand: "IKEA", price: 1200, discount: 10, stock: 50 },
    { id: "2", name: "Electronics", image: Electronics, category: "Gadgets", brand: "Sony", price: 2500, discount: 15, stock: 30 },
    { id: "3", name: "Fashion", image: Fashion, category: "Clothing", brand: "Zara", price: 80, discount: 20, stock: 100 },
    { id: "4", name: "Appliances", image: Appliances, category: "Home Appliances", brand: "LG", price: 400, discount: 5, stock: 25 },
    { id: "5", name: "Mobile", image: Mobile, category: "Gadgets", brand: "Samsung", price: 1000, discount: 12, stock: 60 },
];

const Discountproduct = () => {
    const [categories, setCategories] = useState<Discountproduct[]>(demoCategories);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchValue, setSearchValue] = useState<string>("");
    const [parPage, setParPage] = useState<number>(5);

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this Discountproduct?")) {
            setCategories((prev) => prev.filter((cat) => cat.id !== id));
            toast({ title: "Success!", description: "Discountproduct deleted successfully!" });
        }
    };

    return (
        <div className="p-6 w-full">
            {/* Header Section */}
            <div className="bg-[#6A5FDF] p-3 rounded-md">
                {/* Search Component */}
                <Search
                    setSearchValue={setSearchValue}
                    setParPage={setParPage}
                    searchValue={searchValue}
                />

                {/* Table */}
                <div className="overflow-x-auto mt-4">
                    <Table className="w-full text-sm bg-[#6A5FDF] text-white">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-white">No</TableHead>
                                <TableHead className="text-white">Image</TableHead>
                                <TableHead className="text-white">Name</TableHead>
                                <TableHead className="text-white">Category</TableHead>
                                <TableHead className="text-white">Brand</TableHead>
                                <TableHead className="text-white">Price</TableHead>

                                <TableHead className="text-white">Discount</TableHead>
                                <TableHead className="text-white">Stock</TableHead>
                                <TableHead className="text-white">Actions</TableHead>


                                

                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((Discountproduct, index) => (
                                <TableRow key={Discountproduct.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <Image
                                            src={
                                                typeof Discountproduct.image === "string"
                                                    ? Discountproduct.image
                                                    : Discountproduct.image.src
                                            }
                                            alt={Discountproduct.name}
                                            width={40}
                                            height={40}
                                            className="rounded"
                                        />
                                    </TableCell>
                                    <TableCell>{Discountproduct.name}</TableCell>
                                    <TableCell>{Discountproduct.category}</TableCell>
                                    <TableCell>{Discountproduct.brand}</TableCell>
                                    <TableCell>${Discountproduct.price}</TableCell>
                                    <TableCell>{Discountproduct.discount}%</TableCell>
                                    <TableCell>{Discountproduct.stock}</TableCell>                                    <TableCell className="flex gap-3">
                                        <Button className="bg-yellow-500 hover:bg-yellow-600">
                                            <FaEdit />
                                        </Button>
                                      
                                        <Button className="bg-blue-500 hover:bg-blue-600">
                                            <FaEye />
                                            
                                        </Button>
                                        <Button className="bg-green-500 hover:bg-green-600">
                                        <FaImage />

                                        </Button>
                                        <Button
                                            className="bg-red-500 hover:bg-red-600"
                                            onClick={() => handleDelete(Discountproduct.id)}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
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
    );
};

export default Discountproduct;
