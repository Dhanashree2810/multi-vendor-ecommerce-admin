'use client'
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/router";
import Link from "next/link";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/custom/Pagination";
import Search from "@/components/custom/Search";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


interface Seller {
    _id: string;
    name: string;
    shopInfo?: {
        shopName: string;
        district: string;
    };
    email: string;
    image: string;
    payment: string;
    status: string;
}

const DeactiveSellers = () => {
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [parPage, setParPage] = useState(5);
    const [searchValue, setSearchValue] = useState("");

    const fetchSellers = async () => {
        try {
            const res = await fetch(
                `/api/sellers/deactive?page=${currentPage}&parPage=${parPage}&searchValue=${searchValue}`
            );
            const data = await res.json();
            setSellers(data.sellers);
        } catch (error) {
            console.error("Failed to fetch sellers:", error);
        }
    };

    useEffect(() => {
        fetchSellers();
    }, [currentPage, parPage, searchValue]);

    return (
        <div className="px-2 lg:px-7 pt-5">
            <h1 className="text-[20px] font-bold mb-3">Deactive Sellers</h1>

            <div className="w-full p-4 bg-[#FFF7E6] text-[#4B5563] rounded-md">
                <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue} />
            
                <div className="relative overflow-x-auto mt-4">
                    <Table className="w-full text-sm text-left text-[#d0d2d6]">
                        <TableHeader className="text-sm uppercase">
                            <TableRow>
                                {["No", "Image", "Name", "Shop Name", "Payment Status", "Email", "Status", "District", "Action"].map((header) => (
                                    <TableHead key={header} className="py-3 px-4 text-[#4B5563]">
                                        {header}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {sellers.map((seller, i) => (
                                <TableRow key={seller._id}>
                                    <TableCell className="py-1 px-4">{i + 1}</TableCell>
                                    <TableCell className="py-1 px-4">
                                        <img src={seller.image} alt="Seller" className="w-[45px] h-[45px] rounded" />
                                    </TableCell>
                                    <TableCell className="py-1 px-4 text-[#4B5563]">{seller.name}</TableCell>
                                    <TableCell className="py-1 px-4 text-[#4B5563]">{seller.shopInfo?.shopName}</TableCell>
                                    <TableCell className="py-1 px-4 text-[#4B5563]">{seller.payment}</TableCell>
                                    <TableCell className="py-1 px-4 text-[#4B5563]">{seller.email}</TableCell>
                                    <TableCell className="py-1 px-4 text-[#4B5563]">{seller.status}</TableCell>
                                    <TableCell className="py-1 px-4 text-[#4B5563]">{seller.shopInfo?.district}</TableCell>
                                    <TableCell className="py-1 px-4 text-[#4B5563]">
                                        <Link
                                            href={`/admin/dashboard/seller/details/${seller._id}`}
                                            className="p-[6px] bg-green-500 rounded hover:shadow-lg"
                                        >
                                            <FaEye />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex justify-end mt-4">
                    <Pagination
                        pageNumber={currentPage}
                        setPageNumber={setCurrentPage}
                        totalItem={50}
                        parPage={parPage}
                        showItem={3}
                    />
                </div>
            </div>
        </div>
    );
};

export default DeactiveSellers;
