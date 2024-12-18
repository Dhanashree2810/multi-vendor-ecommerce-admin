'use client'
import React, { useEffect, useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


interface Order {
    _id: string;
    date: string;
    delivery_status: string;
    payment_status: string;
    price: number;
    shippingInfo: {
        name: string;
        address: string;
        province: string;
        city: string;
        area: string;
    };
    products: Array<{
        images: string[];
        name: string;
        brand: string;
        quantity: number;
    }>;
    suborder: Array<{
        delivery_status: string;
        products: Array<{
            images: string[];
            name: string;
            brand: string;
            quantity: number;
        }>;
    }>;
}

const OrderDetails = (orderId: any) => {
    const [order, setOrder] = useState<Order | null>(null);
    const [status, setStatus] = useState<string>('');

    useEffect(() => {
        if (orderId) {
            fetchOrderDetails(orderId as string);
        }
    }, [orderId]);

    useEffect(() => {
        setStatus(order?.delivery_status || '');
    }, [order]);

    const fetchOrderDetails = async (id: string) => {
        try {
            const data = {
                _id: "ORD12345",
                date: "2024-12-01",
                delivery_status: "processing",
                payment_status: "paid",
                price: 150.99,
                shippingInfo: {
                    name: "John Doe",
                    address: "123 Elm Street",
                    province: "California",
                    city: "Los Angeles",
                    area: "Downtown"
                },
                products: [
                    {
                        images: ["https://via.placeholder.com/150"],
                        name: "Smartphone",
                        brand: "BrandA",
                        quantity: 1
                    },
                    {
                        images: ["https://via.placeholder.com/150"],
                        name: "Wireless Earbuds",
                        brand: "BrandB",
                        quantity: 2
                    }
                ],
                suborder: [
                    {
                        delivery_status: "shipped",
                        products: [
                            {
                                images: ["https://via.placeholder.com/150"],
                                name: "Charging Cable",
                                brand: "BrandC",
                                quantity: 3
                            }
                        ]
                    },
                    {
                        delivery_status: "processing",
                        products: [
                            {
                                images: ["https://via.placeholder.com/150"],
                                name: "Portable Charger",
                                brand: "BrandD",
                                quantity: 1
                            }
                        ]
                    }
                ]
            };
            setOrder(data);
        } catch (error) {
            toast({
                title: "Success!",
                description: "Failed to fetch order details.",
                type: "foreground",
                action: (
                    <ToastAction altText="Dismiss">
                        Dismiss
                    </ToastAction>
                ),
            });
        }
    };

    const updateOrderStatus = async (newStatus: string) => {
        try {
            const response = await fetch(`/api/orders/${orderId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            const data = await response.json();
            if (response.ok) {
                toast({
                    title: "Success!",
                    description: "Order status updated successfully!",
                    type: "foreground",
                    action: (
                        <ToastAction altText="Dismiss">
                            Dismiss
                        </ToastAction>
                    ),
                });
                setStatus(newStatus);
            } else {
                throw new Error(data.message || 'Failed to update status.');
            }
        } catch (error) {
            toast({
                title: "Success!",
                description: "Fail ",
                type: "foreground",
                action: (
                    <ToastAction altText="Dismiss">
                        Dismiss
                    </ToastAction>
                ),
            });
        }
    };

    const handleStatusChange = (value: string) => {
        updateOrderStatus(value);
    };

    return (
        <div className="px-4 lg:px-8 py-6">
            <Card className="bg-[#FFF7E6] text-[#4B5563]">
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-xl">Order Details</h2>
                    <Select
                        value={status}
                        onValueChange={(value) => setStatus(value)}
                    >
                        <SelectTrigger className="w-52">
                            <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="warehouse">Warehouse</SelectItem>
                            <SelectItem value="placed">Placed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="p-4">
                    <div className="flex gap-2 text-lg">
                        <h2>#{order?._id}</h2>
                        <span>{order?.date}</span>
                    </div>

                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/3">
                            <div className="pr-3">
                                <h2 className="font-semibold pb-2">
                                    Deliver To: {order?.shippingInfo?.name}
                                </h2>
                                <p className="text-sm">
                                    {order?.shippingInfo?.address}, {order?.shippingInfo?.province},{' '}
                                    {order?.shippingInfo?.city}, {order?.shippingInfo?.area}
                                </p>
                                <div className="mt-3">
                                    <h2>Payment Status:</h2>
                                    <span>{order?.payment_status}</span>
                                </div>
                                <div className="mt-2">
                                    <span>Price:₹{order?.price}</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-2/3">
                            {order?.products?.map((product, index) => (
                                <div
                                    key={index}
                                    className="flex gap-3 bg-[#FFF7E6] text-[#4B5563] p-4 rounded-md mb-4"
                                >
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-16 h-16 object-cover"
                                    />
                                    <div>
                                        <h2>{product.name}</h2>
                                        <p>
                                            <span>Brand: {product.brand}</span>
                                        </p>
                                        <p>
                                            <span>Quantity: {product.quantity}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6">
                        {order?.suborder?.map((sub, i) => (
                            <div key={i} className="mb-6">
                                <h2>Seller {i + 1} Order:</h2>
                                <span>{sub.delivery_status}</span>
                                {sub.products.map((product, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-3 bg-[#FFF7E6] text-[#4B5563] p-4 rounded-md mt-4"
                                    >
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover"
                                        />
                                        <div>
                                            <h2>{product.name}</h2>
                                            <p>
                                                <span>Brand: {product.brand}</span>
                                            </p>
                                            <p>
                                                <span>Quantity: {product.quantity}</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default OrderDetails;
