'use client'

import { useEffect, useRef, useState } from "react"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Toast } from "primereact/toast"
import Tooltip from "@/components/custom/Tooltipcustom"
import { FilterMatchMode } from "primereact/api"
import Image from 'next/image'
import moment from 'moment'
import { MdCurrencyExchange, MdProductionQuantityLimits } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'
import Link from "next/link"
import seller from '@/assets/images/seller.png'
import * as echarts from 'echarts'
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"


const dashboardDemoData = {
    "totalProduct": 27,
    "totalOrder": 4,
    "totalSeller": 2,
    "messages": [
        {
            "id": "675d0bdbc12e898f62d9d42b",
            "senderName": "FlashFusion Finds",
            "senderId": "675bec5357ed9d277e55b7c3",
            "receverId": "",
            "message": "Hello,",
            "status": "unseen",
            "createdAt": "2024-12-14T04:38:51.813Z",
            "updatedAt": "2024-12-14T04:38:51.813Z",
            "__v": 0
        },
        {
            "id": "675d0c16c12e898f62d9daeb",
            "senderName": "Admin Support",
            "senderId": "",
            "receverId": "675bec5357ed9d277e55b7c3",
            "message": "How can I help You?",
            "status": "unseen",
            "createdAt": "2024-12-14T04:39:50.194Z",
            "updatedAt": "2024-12-14T04:39:50.194Z",
            "__v": 0
        }
    ],
    "recentOrders": [
        {
            "id": "675c386957ed9d277e55ba4c",
            "customerId": "675c381357ed9d277e55b9a4",
            "products": [
                {
                    "id": "675c368457ed9d277e55b976",
                    "sellerId": "675bec5357ed9d277e55b7c3",
                    "name": "Women Chanderi Kurta Pant Dupatta Set",
                    "slug": "Women-Chanderi-Kurta-Pant-Dupatta-Set",
                    "category": "Fashion",
                    "brand": "DISHWA FASHION",
                    "price": 709,
                    "stock": 20,
                    "discount": 66,
                    "description": "Kurta Fabric: Chanderi Silk Bottomwear Fabric: Chanderi Silk Fabric: Chanderi Silk Sleeve Length: Three-Quarter Sleeves Set Type: Kurta With Dupatta And Bottomwear Bottom Type: Pants Pattern: Printed Sizes: S (Bust Size: 36 in, Shoulder Size: 14.5 in, Kurta Waist Size: 34 in, Kurta Hip Size: 40 in, Kurta Length Size: 42 in, Bottom Waist Size: 27 in, Bottom Length Size: 37 in, Duppatta Length Size: 2.1 m) XL (Bust Size: 42 in, Shoulder Size: 16 in, Kurta Waist Size: 40 in, Kurta Hip Size: 46 in, Kurta Length Size: 42 in, Bottom Waist Size: 32 in, Bottom Length Size: 37 in, Duppatta Length Size: 2.1 m) L (Bust Size: 40 in, Shoulder Size: 15.5 in, Kurta Waist Size: 38 in, Kurta Hip Size: 44 in, Kurta Length Size: 42 in, Bottom Waist Size: 30 in, Bottom Length Size: 37 in, Duppatta Length Size: 2.1 m) M (Bust Size: 38 in, Shoulder Size: 15 in, Kurta Waist Size: 36 in, Kurta Hip Size: 42 in, Kurta Length Size: 42 in, Bottom Waist Size: 28 in, Bottom Length Size: 37 in, Duppatta Length Size: 2.1 m) XXL (Bust Size: 44 in, Shoulder Size: 16.5 in, Kurta Waist Size: 42 in, Kurta Hip Size: 48 in, Kurta Length Size: 42 in, Bottom Waist Size: 34 in, Bottom Length Size: 37 in, Duppatta Length Size: 2.1 m)",
                    "shopName": "EasyShop",
                    "images": [
                        "http://res.cloudinary.com/dbxtifnah/image/upload/v1734096515/products/afontmzqrko2wewcy0pw.jpg"
                    ],
                    "rating": 0,
                    "createdAt": "2024-12-13T13:28:36.967Z",
                    "updatedAt": "2024-12-13T13:28:36.967Z",
                    "__v": 0,
                    "quantity": 1
                }
            ],
            "price": 262,
            "payment_status": "unpaid",
            "shippingInfo": {
                "name": "Supriya",
                "address": "Nashik",
                "phone": "9985625987",
                "post": "422005",
                "province": "Velit voluptatem ob",
                "city": "Nashik",
                "area": "Nashik"
            },
            "delivery_status": "cancelled",
            "date": "December 13, 2024 7:06 PM",
            "createdAt": "2024-12-13T13:36:41.217Z",
            "updatedAt": "2024-12-13T13:36:56.268Z",
            "__v": 0
        },
        {
            "id": "675c38ce57ed9d277e55ba96",
            "customerId": "675c388c57ed9d277e55ba62",
            "products": [
                {
                    "id": "675c364657ed9d277e55b96a",
                    "sellerId": "675bec5357ed9d277e55b7c3",
                    "name": "Woven, Self Design Bollywood Cotton Silk Saree  (Green, Gold)",
                    "slug": "Woven,-Self-Design-Bollywood-Cotton-Silk-Saree--(Green,-Gold)",
                    "category": "Fashion",
                    "brand": "Fashion Club Collection",
                    "price": 459,
                    "stock": 5,
                    "discount": 81,
                    "description": "jacquard weaving border saree is made from heavy cotton silk fabric which is highlighted with beautiful Weaving work. Comes along unstitched jacquard blouse piece which you can customize as per your design/style. Occasion - You can wear this saree for festive, special occasions, ideal for any fashionista. Style it up - Look glamorous in this traditional saree Pair this saree with Ethnic Gold Jewellery, beautiful clutch to complete the look!!",
                    "shopName": "EasyShop",
                    "images": [
                        "http://res.cloudinary.com/dbxtifnah/image/upload/v1734096453/products/ydavtepfxovndut6v7om.jpg"
                    ],
                    "rating": 0,
                    "createdAt": "2024-12-13T13:27:34.069Z",
                    "updatedAt": "2024-12-13T13:27:34.069Z",
                    "__v": 0,
                    "quantity": 2
                }
            ],
            "price": 196,
            "payment_status": "unpaid",
            "shippingInfo": {
                "name": "Dhanashree K",
                "address": "Pune",
                "phone": "9514786321",
                "post": "422005",
                "province": "Velit voluptatem ob",
                "city": "Pune",
                "area": "Pune"
            },
            "delivery_status": "cancelled",
            "date": "December 13, 2024 7:08 PM",
            "createdAt": "2024-12-13T13:38:22.355Z",
            "updatedAt": "2024-12-13T13:38:37.377Z",
            "__v": 0
        },
        {
            "id": "675d0a79c12e898f62d9d3f6",
            "customerId": "675c388c57ed9d277e55ba62",
            "products": [
                {
                    "id": "675c368457ed9d277e55b976",
                    "sellerId": "675bec5357ed9d277e55b7c3",
                    "name": "Women Chanderi Kurta Pant Dupatta Set",
                    "slug": "Women-Chanderi-Kurta-Pant-Dupatta-Set",
                    "category": "Fashion",
                    "brand": "DISHWA FASHION",
                    "price": 709,
                    "stock": 20,
                    "discount": 66,
                    "description": "Kurta Fabric: Chanderi Silk Bottomwear Fabric: Chanderi Silk Fabric: Chanderi Silk Sleeve Length: Three-Quarter Sleeves Set Type: Kurta With Dupatta And Bottomwear Bottom Type: Pants Pattern: Printed Sizes: S (Bust Size: 36 in, Shoulder Size: 14.5 in, Kurta Waist Size: 34 in, Kurta Hip Size: 40 in, Kurta Length Size: 42 in, Bottom Waist Size: 27 in, Bottom Length Size: 37 in, Duppatta Length Size: 2.1 m) XL (Bust Size: 42 in, Shoulder Size: 16 in, Kurta Waist Size: 40 in, Kurta Hip Size: 46 in, Kurta Length Size: 42 in, Bottom Waist Size: 32 in, Bottom Length Size: 37 in, Duppatta Length Size: 2.1 m) L (Bust Size: 40 in, Shoulder Size: 15.5 in, Kurta Waist Size: 38 in, Kurta Hip Size: 44 in, Kurta Length Size: 42 in, Bottom Waist Size: 30 in, Bottom Length Size: 37 in, Duppatta Length Size: 2.1 m) M (Bust Size: 38 in, Shoulder Size: 15 in, Kurta Waist Size: 36 in, Kurta Hip Size: 42 in, Kurta Length Size: 42 in, Bottom Waist Size: 28 in, Bottom Length Size: 37 in, Duppatta Length Size: 2.1 m) XXL (Bust Size: 44 in, Shoulder Size: 16.5 in, Kurta Waist Size: 42 in, Kurta Hip Size: 48 in, Kurta Length Size: 42 in, Bottom Waist Size: 34 in, Bottom Length Size: 37 in, Duppatta Length Size: 2.1 m)",
                    "shopName": "EasyShop",
                    "images": [
                        "http://res.cloudinary.com/dbxtifnah/image/upload/v1734096515/products/afontmzqrko2wewcy0pw.jpg"
                    ],
                    "rating": 5,
                    "createdAt": "2024-12-13T13:28:36.967Z",
                    "updatedAt": "2024-12-14T04:24:49.301Z",
                    "__v": 0,
                    "quantity": 1
                }
            ],
            "price": 262,
            "payment_status": "unpaid",
            "shippingInfo": {
                "name": "Dhanashree K",
                "address": "Pune",
                "phone": "9985625987",
                "post": "422005",
                "province": "Velit voluptatem ob",
                "city": "Pune",
                "area": "Pune"
            },
            "delivery_status": "cancelled",
            "date": "December 14, 2024 10:02 AM",
            "createdAt": "2024-12-14T04:32:57.379Z",
            "updatedAt": "2024-12-14T04:33:12.514Z",
            "__v": 0
        },
        {
            "id": "675d166ac12e898f62dda26b",
            "customerId": "675c381357ed9d277e55b9a4",
            "products": [
                {
                    "id": "675c368457ed9d277e55b976",
                    "sellerId": "675bec5357ed9d277e55b7c3",
                    "name": "Women Chanderi Kurta Pant Dupatta Set",
                    "slug": "Women-Chanderi-Kurta-Pant-Dupatta-Set",
                    "category": "Fashion",
                    "brand": "DISHWA FASHION",
                    "price": 709,
                    "stock": 20,
                    "discount": 66,
                    "description": "Kurta Fabric: Chanderi Silk Bottomwear Fabric: Chanderi Silk Fabric: Chanderi Silk Sleeve Length: Three-Quarter Sleeves Set Type: Kurta With Dupatta And Bottomwear Bottom Type: Pants Pattern: Printed Sizes: S (Bust Size: 36 in, Shoulder Size: 14.5 in, Kurta Waist Size: 34 in, Kurta Hip Size: 40 in, Kurta Length Size: 42 in, Bottom Waist Size: 27 in, Bottom Length Size: 37 in, Duppatta Length Size: 2.1 m) XL (Bust Size: 42 in, Shoulder Size: 16 in, Kurta Waist Size: 40 in, Kurta Hip Size: 46 in, Kurta Length Size: 42 in, Bottom Waist Size: 32 in, Bottom Length Size: 37 in, Duppatta Length Size: 2.1 m) L (Bust Size: 40 in, Shoulder Size: 15.5 in, Kurta Waist Size: 38 in, Kurta Hip Size: 44 in, Kurta Length Size: 42 in, Bottom Waist Size: 30 in, Bottom Length Size: 37 in, Duppatta Length Size: 2.1 m) M (Bust Size: 38 in, Shoulder Size: 15 in, Kurta Waist Size: 36 in, Kurta Hip Size: 42 in, Kurta Length Size: 42 in, Bottom Waist Size: 28 in, Bottom Length Size: 37 in, Duppatta Length Size: 2.1 m) XXL (Bust Size: 44 in, Shoulder Size: 16.5 in, Kurta Waist Size: 42 in, Kurta Hip Size: 48 in, Kurta Length Size: 42 in, Bottom Waist Size: 34 in, Bottom Length Size: 37 in, Duppatta Length Size: 2.1 m)",
                    "shopName": "EasyShop",
                    "images": [
                        "http://res.cloudinary.com/dbxtifnah/image/upload/v1734096515/products/afontmzqrko2wewcy0pw.jpg"
                    ],
                    "rating": 4,
                    "createdAt": "2024-12-13T13:28:36.967Z",
                    "updatedAt": "2024-12-14T05:22:55.195Z",
                    "__v": 0,
                    "quantity": 1
                }
            ],
            "price": 292,
            "payment_status": "paid",
            "shippingInfo": {
                "name": "Supriya",
                "address": "Nashik",
                "phone": "9514786321",
                "post": "422003",
                "province": "Velit voluptatem ob",
                "city": "Nashik",
                "area": "Nashik"
            },
            "delivery_status": "cancelled",
            "date": "December 14, 2024 10:53 AM",
            "createdAt": "2024-12-14T05:23:54.338Z",
            "updatedAt": "2024-12-14T05:24:09.363Z",
            "__v": 0
        }
    ],
    "totalSale": 0
}

const userinfo = {
    "id": "675bec78a4489cd6293c8c40",
    "name": "admin",
    "email": "admin@gmail.com",
    "password": "$2b$10$Dwlkn8QCQPCP5OiYPqXnk.r7f/k1WR7dBKXYWrkZCR/lIDlXn73sq",
    "role": "admin",
    "image": "",
    "createdAt": "2024-12-13T08:11:07.185Z",
    "updatedAt": "2024-12-13T08:11:07.185Z",
    "__v": 0
}

export default function AdminDashboard() {
    const [dashboardData, setDashboardData] = useState(dashboardDemoData)
    const [userInfo, setUserInfo] = useState(userinfo)
    const [filters, setFilters] = useState({
        global: { value: "", matchMode: FilterMatchMode.CONTAINS },
        name: { value: "", matchMode: FilterMatchMode.CONTAINS },
        price: { value: "", matchMode: FilterMatchMode.CONTAINS },
        payment_status: { value: "", matchMode: FilterMatchMode.CONTAINS },
        delivery_status: { value: "", matchMode: FilterMatchMode.CONTAINS },
        id: { value: "", matchMode: FilterMatchMode.CONTAINS },
    })
    const [first, setFirst] = useState(0)
    const [rows, setRows] = useState(5)
    const chartRef = useRef(null)

    useEffect(() => {
        if (chartRef.current) {
            const chart = echarts.init(chartRef.current)
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['Orders', 'Revenue', 'Sellers']
                },
                xAxis: {
                    type: 'category',
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: 'Orders',
                        type: 'bar',
                        data: [23, 34, 45, 56, 76, 34, 23, 76, 87, 78, 34, 45]
                    },
                    {
                        name: 'Revenue',
                        type: 'bar',
                        data: [67, 39, 45, 56, 90, 56, 23, 56, 87, 78, 67, 78]
                    },
                    {
                        name: 'Sellers',
                        type: 'bar',
                        data: [34, 39, 56, 56, 80, 67, 23, 56, 98, 78, 45, 56]
                    }
                ]
            }
            chart.setOption(option)

            const handleResize = () => {
                chart.resize()
            }
            window.addEventListener('resize', handleResize)

            return () => {
                chart.dispose()
                window.removeEventListener('resize', handleResize)
            }
        }
    }, [])

    const renderHeader = () => (
        <div className="flex flex-col sm:flex-row justify-between items-center bg-[#EFEFEF] p-4 rounded-md border border-gray-300 shadow-sm">
            <h2 className="text-lg font-semibold mb-2 sm:mb-0">Recent Orders</h2>
            <span className="p-input-icon-left w-full sm:w-auto">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    onInput={(e) =>
                        setFilters({
                            ...filters,
                            global: { value: e.currentTarget.value, matchMode: FilterMatchMode.CONTAINS },
                        })
                    }
                    placeholder="Search Sellers"
                    className="p-inputtext-sm h-10 w-full sm:w-[300px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0097A7]"
                />
            </span>
        </div>
    )

    const onPageChange = (e: any) => {
        setFirst(e.first)
        setRows(e.rows)
    }

    const actionTemplate = (rowData: any) => (
        <div className="flex gap-2">
            <Link href={`/admin/orders/${rowData.id}`}>
                <Tooltip message="View">
                    <Button className='bg-transparent'>
                        View
                    </Button>
                </Tooltip>
            </Link>
        </div>
    )

    return (
        <div className="min-h-screen bg-white rounded-md border-gray-300 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        { title: 'Total Sales', value: dashboardData.totalSale, icon: <MdCurrencyExchange />, color: 'bg-red-100' },
                        { title: 'Products', value: dashboardData.totalProduct, icon: <MdProductionQuantityLimits />, color: 'bg-pink-100' },
                        { title: 'Sellers', value: dashboardData.totalSeller, icon: <FaUsers />, color: 'bg-green-100' },
                        { title: 'Orders', value: dashboardData.totalOrder, icon: <FaCartShopping />, color: 'bg-blue-100' },
                    ].map((item, index) => (
                        <div key={index} className={`flex justify-between items-center p-5 ${item.color} rounded-lg shadow-md`}>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold">{item.value}</h2>
                                <span className="text-sm sm:text-md font-medium">{item.title}</span>
                            </div>
                            <div className={`w-10 h-10 rounded-full ${item.color.replace('100', '600')} flex justify-center items-center text-white`}>
                                {item.icon}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <div ref={chartRef} style={{ height: '400px' }} />
                        </div>
                    </div>
                    <div>
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <div className="bg-[#EFEFEF] p-2">
                                <h2 className="font-semibold text-lg">Recent Seller Messages</h2>
                            </div>
                            <ul className="space-y-4">
                                {dashboardData.messages.map((message, index) => (
                                    <li key={index} className="flex items-start space-x-3">
                                        <div className="p-3">
                                            <Image
                                                className="w-10 h-10 rounded-full"
                                                src={message.senderId === userInfo?.id ? userInfo.image : seller}
                                                alt="User"
                                                width={40}
                                                height={40}
                                            />
                                        </div>
                                        <div className="p-3 bg-white rounded-lg">
                                            <div className="flex justify-between gap-10 items-center mb-1">
                                                <span className="text-sm font-semibold">{message.senderName}</span>
                                                <time className="text-xs text-gray-500 text-end">
                                                    {moment(message.createdAt).fromNow()}
                                                </time>
                                            </div>
                                            <p className="text-sm text-gray-600">{message.message}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4">
                    <Toast />
                    <div className="mb-4">{renderHeader()}</div>
                    <DataTable
                        value={dashboardData.recentOrders}
                        paginator
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        rows={rows}
                        first={first}
                        onPage={onPageChange}
                        filters={filters}
                        showGridlines
                        emptyMessage="No sellers found."
                        className="p-datatable-sm"
                        responsiveLayout="scroll"
                    >
                        <Column field="id" header="Order ID" headerStyle={{ background: "#0097A7", color: "white" }} />
                        <Column field="price" header="Price" sortable headerStyle={{ background: "#0097A7", color: "white" }} />
                        <Column field="payment_status" header="Payment Status" sortable headerStyle={{ background: "#0097A7", color: "white" }} />
                        <Column field="delivery_status" header="Order Status" sortable headerStyle={{ background: "#0097A7", color: "white" }} />
                        <Column header="Actions" body={actionTemplate} headerStyle={{ background: "#0097A7", color: "white" }} />
                    </DataTable>
                </div>
            </div>
        </div>
    )
}

