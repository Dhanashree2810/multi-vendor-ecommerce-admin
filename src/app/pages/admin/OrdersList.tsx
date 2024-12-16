'use client'
import { useState, useEffect } from 'react';
import { BsArrowDownSquareFill } from "react-icons/bs";
import Link from 'next/link';
import Pagination from '@/components/custom/Pagination';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from '@/components/ui/button';
  

const demoOrders = [
    {
        id: "1",
        price: 120,
        payment_status: "Paid",
        delivery_status: "Delivered",
        suborder: [
            { id: "1-1", price: 60, payment_status: "Paid", delivery_status: "Delivered" },
            { id: "1-2", price: 60, payment_status: "Paid", delivery_status: "Delivered" }
        ]
    },
    {
        id: "2",
        price: 200,
        payment_status: "Pending",
        delivery_status: "Processing",
        suborder: [
            { id: "2-1", price: 100, payment_status: "Pending", delivery_status: "Processing" },
            { id: "2-2", price: 100, payment_status: "Pending", delivery_status: "Processing" }
        ]
    }
];

const OrdersList = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchValue, setSearchValue] = useState<string>('');
    const [parPage, setParPage] = useState<number>(5);
    const [show, setShow] = useState<string | null>(null);

    const [filteredOrders, setFilteredOrders] = useState(demoOrders);

    useEffect(() => {
        const filtered = demoOrders.filter(order =>
            order.id.includes(searchValue) ||
            order.payment_status.toLowerCase().includes(searchValue.toLowerCase()) ||
            order.delivery_status.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredOrders(filtered);
    }, [searchValue]);

    return (
        <div className="px-4 lg:px-8 pt-6">
            <div className="w-full p-4 bg-[#6A5FDF] text-white rounded-md">
                <div className="flex justify-between items-center">
                    <select 
                        onChange={(e) => setParPage(parseInt(e.target.value))} 
                        className="px-4 py-2  bg-[#6A5FDF] border border-gray-700 rounded-md text-white hover:bg-[#6A5FDF]"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                    <Input 
                        onChange={(e) => setSearchValue(e.target.value)} 
                        value={searchValue} 
                        className="px-4 py-2 bg-[#6A5FDF] border border-gray-700 text-white rounded-md" 
                        placeholder="Search..."
                    />
                </div>

                <div className="relative mt-5 overflow-x-auto">
                    <Table className="w-full text-sm text-left text-white">
                    <TableHeader className=' text-[#D0C9D9]'>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Payment Status</TableHead>
                                <TableHead>Order Status</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead><BsArrowDownSquareFill /></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders.slice((currentPage - 1) * parPage, currentPage * parPage).map((order) => (
                                <>
                                    <TableRow key={order.id} className="border-b border-gray-700 text-[#D0C9D9]">
                                        <TableCell>#{order.id}</TableCell>
                                        <TableCell>${order.price}</TableCell>
                                        <TableCell>{order.payment_status}</TableCell>
                                        <TableCell>{order.delivery_status}</TableCell>
                                        <TableCell>
                                            <Link href={`/admin/dashboard/order/${order.id}`}>
                                                <h1>View</h1>
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <div onClick={() => setShow(show === order.id ? null : order.id)}>
                                                <BsArrowDownSquareFill />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    {show === order.id && (
                                        <TableRow className="bg-indigo-600 border-b border-gray-700">
                                            <TableCell colSpan={6}>
                                                <div>
                                                    {order.suborder.map((sub, i) => (
                                                        <div key={i} className="flex justify-start items-start border-b border-gray-700">
                                                            <div className="py-2 w-1/4 pl-3">#{sub.id}</div>
                                                            <div className="py-2 w-1/4">${sub.price}</div>
                                                            <div className="py-2 w-1/4">{sub.payment_status}</div>
                                                            <div className="py-2 w-1/4">{sub.delivery_status}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {filteredOrders.length > parPage && (
                    <div className="w-full flex justify-end mt-4">
                        <Pagination
                            pageNumber={currentPage}
                            setPageNumber={setCurrentPage}
                            totalItem={filteredOrders.length}
                            parPage={parPage}
                            showItem={4}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersList;
