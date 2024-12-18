"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaEye } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Pagination from '@/components/custom/Pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Search from '@/components/custom/Search';

type Seller = {
    _id: string;
    image: string;
    name: string;
    shopInfo?: {
        shopName: string;
        district: string;
    };
    payment: string;
    email: string;
    status: string;
};

const Sellers = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchValue, setSearchValue] = useState<string>('');
    const [parPage, setParPage] = useState<number>(5);

    const [sellers, setSellers] = useState<Seller[]>([]);
    const [totalSeller, setTotalSeller] = useState<number>(0);

    const mockSellers: Seller[] = [
        {
            _id: '1',
            image: 'https://via.placeholder.com/45',
            name: 'John Doe',
            shopInfo: { shopName: "Jane's Store", district: 'District 1' },
            payment: 'Paid',
            email: 'john@example.com',
            status: 'Active',
        },
        {
            _id: '2',
            image: 'https://via.placeholder.com/45',
            name: 'Jane Smith',
            shopInfo: { shopName: "Jane's Store", district: 'District 2' },
            payment: 'Pending',
            email: 'jane@example.com',
            status: 'Inactive',
        },
        {
            _id: '3',
            image: 'https://via.placeholder.com/45',
            name: 'Jane Smith',
            shopInfo: { shopName: "Jane's Store", district: 'District 2' },
            payment: 'Pending',
            email: 'jane@example.com',
            status: 'Inactive',
        },
        {
            _id: '4',
            image: 'https://via.placeholder.com/45',
            name: 'Jane Smith',
            shopInfo: { shopName: "Jane's Store", district: 'District 2' },
            payment: 'Pending',
            email: 'jane@example.com',
            status: 'Inactive',
        },
        {
            _id: '5',
            image: 'https://via.placeholder.com/45',
            name: 'Jane Smith',
            shopInfo: { shopName: "Jane's Store", district: 'District 2' },
            payment: 'Pending',
            email: 'jane@example.com',
            status: 'Inactive',
        },
    ];

    useEffect(() => {
        const filteredSellers = mockSellers.filter(seller =>
            seller.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setSellers(filteredSellers);
        setTotalSeller(filteredSellers.length);
    }, [searchValue, currentPage, parPage]);

    return (
        <div className='px-4 lg:px-8 py-6'>
            <h1 className='text-xl font-bold mb-4'>Sellers</h1>

            <div className='w-full p-4 bg-[#FFF7E6] text-[#4B5563] rounded-md'>
                {/* <div className='flex justify-between items-center mb-4'>
                    <Select
                        value={String(parPage)}
                        onValueChange={(value) => setParPage(Number(value))}
                    >
                        <SelectTrigger className="bg-indigo-600 text-[#4B5563] border border-slate-700 rounded-md">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup >
                                <SelectLabel>Items per page</SelectLabel>
                                <SelectItem value="5" className='text-[#4B5563]' >5</SelectItem>
                                <SelectItem value="10" className='text-[#4B5563]'>10</SelectItem>
                                <SelectItem value="20" className='text-[#4B5563]'>20</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Input
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder='Search...'
                        className='bg-indigo-600 text-[#4B5563] border border-slate-700 rounded-md'
                    />
                </div> */}

                <Search
                    setSearchValue={setSearchValue}
                    setParPage={setParPage}
                    searchValue={searchValue}
                />

                <div className='relative overflow-x-auto'>
                    <Table className='w-full text-sm text-left text-[#4B5563]'>
                        <TableHeader className='text-sm uppercase border-b border-slate-700'>
                            <TableRow>
                                <TableHead className='py-3 px-4 text-[#4B5563]'>No</TableHead>
                                <TableHead className='py-3 px-4 text-[#4B5563]'>Image</TableHead>
                                <TableHead className='py-3 px-4 text-[#4B5563]'>Name</TableHead>
                                <TableHead className='py-3 px-4 text-[#4B5563]'>Shop Name</TableHead>
                                <TableHead className='py-3 px-4 text-[#4B5563]'>Payment Status</TableHead>
                                <TableHead className='py-3 px-4 text-[#4B5563]'>Email</TableHead>
                                <TableHead className='py-3 px-4 text-[#4B5563]'>Status</TableHead>
                                <TableHead className='py-3 px-4 text-[#4B5563]'>District</TableHead>
                                <TableHead className='py-3 px-4 text-[#4B5563]'>Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {sellers.map((seller, index) => (
                                <TableRow key={seller._id}>
                                    <TableCell className='py-1 px-4'>{index + 1}</TableCell>
                                    <TableCell className='py-1 px-4'>
                                        <img src={seller.image} alt={seller.name} className='w-11 h-11 rounded-full' />
                                    </TableCell>
                                    <TableCell className='py-1 px-4'>{seller.name}</TableCell>
                                    <TableCell className='py-1 px-4'>{seller.shopInfo?.shopName}</TableCell>
                                    <TableCell className='py-1 px-4'>{seller.payment}</TableCell>
                                    <TableCell className='py-1 px-4'>{seller.email}</TableCell>
                                    <TableCell className='py-1 px-4'>{seller.status}</TableCell>
                                    <TableCell className='py-1 px-4'>{seller.shopInfo?.district}</TableCell>
                                    <TableCell className='py-1 px-4'>
                                        <Link href={`/admin/sellers/${seller._id}`}>
                                            <Button className='bg-green-500 hover:shadow-lg hover:shadow-green-500/50'>
                                                <FaEye />
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {totalSeller > parPage && (
                    <div className='flex justify-end mt-4'>
                        <Pagination
                            pageNumber={currentPage}
                            setPageNumber={setCurrentPage}
                            totalItem={totalSeller}
                            parPage={parPage}
                            showItem={4}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sellers;
