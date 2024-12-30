'use client'
import { useState } from "react";
import Image from 'next/image';
import moment from 'moment';
import { MdCurrencyExchange, MdProductionQuantityLimits } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import Chart from 'react-apexcharts';
import Link from "next/link";
import Sales from '@/assets/images/seller.png'
import * as echarts from 'echarts';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Toast } from "primereact/toast"


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
            "payment_status": "unpaid",
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
const renderHeader = () => (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-[#EFEFEF] p-4 rounded-md border border-gray-300 shadow-sm dark-light">
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
export default function Page() {
    const [dashboardData, setDashboardData] = useState(dashboardDemoData);
    const [first, setFirst] = useState(0)
    const [rows, setRows] = useState(5)

    const onPageChange = (e: any) => {
        setFirst(e.first)
        setRows(e.rows)
    }
    const [filters, setFilters] = useState({
        global: { value: "", matchMode: FilterMatchMode.CONTAINS },
        name: { value: "", matchMode: FilterMatchMode.CONTAINS },
        price: { value: "", matchMode: FilterMatchMode.CONTAINS },
        payment_status: { value: "", matchMode: FilterMatchMode.CONTAINS },
        delivery_status: { value: "", matchMode: FilterMatchMode.CONTAINS },
        id: { value: "", matchMode: FilterMatchMode.CONTAINS },
    })
    const [userInfo, setUserInfo] = useState(userinfo);

  

    const chartState = {
        series: [
            {
                name: 'Orders',
                data: [23, 34, 45, 56, 76, 34, 23, 76, 87, 78, 34, 45],
            },
            {
                name: 'Revenue',
                data: [67, 39, 45, 56, 90, 56, 23, 56, 87, 78, 67, 78],
            },
            {
                name: 'Sales',
                data: [34, 39, 56, 56, 80, 67, 23, 56, 98, 78, 45, 56],
            },
        ],
        options: {
            colors: ['#181ee8', '#181ee8'],
            plotOptions: { radius: 30 },
            chart: {
                background: 'transparent',
                foreColor: '#d0d2d6',
            },
            dataLabels: { enabled: false },
            stroke: {
                show: true,
                curve: ['smooth', 'straight', 'stepline'],
                lineCap: 'butt',
                colors: '#f0f0f0',
                width: 0.5,
                dashArray: 0,
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
            legend: { position: 'top' },
            responsive: [
                {
                    breakpoint: 565,
                    options: {
                        plotOptions: { bar: { horizontal: true } },
                        chart: { height: '550px' },
                    },
                },
            ],
        },
    };

    return (

        <div >
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0 dark-light">
                <div className="min-h-[100vh] flex-1 rounded-xl  md:min-h-min">
                    <div className="px-2 md:px-7 py-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
                            <div className="flex justify-between items-center p-5 bg-red-100 rounded-md gap-3">
                                <div className="">
                                    <div className=" flex flex-row">
                                        <h2 className="text-3xl font-bold text-black">₹ 0
                                            {/* {dashboardData.totalSale} */}
                                        </h2>
                                    </div>
                                    <span className="text-md font-medium text-black">Total Sales</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-red-600 flex justify-center items-center">
                                    <MdCurrencyExchange className="text-black" />
                                </div>
                            </div>

                            <div className="flex justify-between items-center p-5 bg-pink-100 rounded-md gap-3">
                                <div>
                                    <h2 className="text-3xl font-bold text-black">
                                        27
                                        {/* {dashboardData.totalProduct} */}
                                    </h2>
                                    <span className="text-md font-medium text-black">Products</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-pink-600 flex justify-center items-center">
                                    <MdProductionQuantityLimits className="text-black" />
                                </div>
                            </div>

                            <div className="flex justify-between items-center p-5 bg-green-100 rounded-md gap-3">
                                <div>
                                    <h2 className="text-3xl font-bold text-black">
                                        2
                                        {/* {dashboardData.totalSeller} */}
                                    </h2>
                                    <span className="text-md font-medium text-black">Orders</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-green-600 flex justify-center items-center">
                                    <FaUsers className="text-black" />
                                </div>
                            </div>

                            <div className="flex justify-between items-center p-5 bg-blue-100 rounded-md gap-3">
                                <div>
                                    <h2 className="text-3xl font-bold text-black">
                                        4
                                        {/* {dashboardData.totalOrder} */}
                                    </h2>
                                    <span className="text-md font-medium text-black">Pending Orders</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-blue-600 flex justify-center items-center">
                                    <FaCartShopping className="text-black" />
                                </div>
                            </div>
                        </div>

                        {/* Chart and Recent Messages */}
                        <div className="flex flex-wrap mt-7">
                            <div className="w-full lg:w-7/12 lg:pr-3">
                                <div className="p-4 bg-[#EFEFEF] rounded-md ">
                                    <Chart
                                        options={{
                                            ...chartState.options,
                                            chart: {
                                                ...chartState.options.chart,
                                            },
                                            xaxis: {
                                                ...chartState.options.xaxis,
                                                labels: {
                                                    style: {
                                                        colors: '#000',
                                                    },
                                                },
                                            },
                                            yaxis: {
                                                labels: {
                                                    style: {
                                                        colors: '#000',
                                                    },
                                                },
                                            },
                                            title: {
                                                ...chartState.options.title,
                                                style: {
                                                    color: '#000', 
                                                },
                                            },

                                        }}
                                        series={chartState.series}
                                        type="bar"
                                        height={350}
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
                                <div className="p-4 bg-[#EFEFEF]rounded-md">
                                    <h2 className="font-semibold text-lg text-white pb-3 ">Recent Customer Message</h2>
                                    <ol className="relative border-l border-gray-300">
                                        {dashboardData.messages.map((message, index) => (
                                            <li key={index} className="mb-3 ml-6">
                                                <div className="absolute -left-5 w-10 h-10  bg-blue-500 rounded-full flex items-center justify-center">
                                                    <Image
                                                        className="rounded-full"
                                                        src={message.senderId === userInfo?.id ? userInfo.image : Sales}
                                                        alt="User"
                                                        width={40}
                                                        height={40}
                                                    />
                                                </div>
                                                <div className="p-3 bg-gray-800 rounded-lg">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-sm text-black">{message.senderName}</span>
                                                        <time className="text-xs text-gray-400">
                                                            {moment(message.createdAt).startOf('hour').fromNow()}
                                                        </time>
                                                    </div>
                                                    <p className="text-xs text-gray-300">{message.message}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-[#EFEFEF] rounded-md mt-6">
                            <h2 className="font-semibold text-lg text-black pb-3">Recent Orders</h2>
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
                                    <Column field="id" header="Order ID" bodyStyle={{ color: "black" }}
                                        headerStyle={{ background: "#0097A7", color: "white" }} />
                                    <Column field="price" header="Price" bodyStyle={{ color: "black" }}
                                        sortable headerStyle={{ background: "#0097A7", color: "white" }} />
                                    <Column field="payment_status" header="Payment Status" sortable bodyStyle={{ color: "black" }}
                                        headerStyle={{ background: "#0097A7", color: "white" }} />
                                    <Column field="delivery_status" header="Order Status" bodyStyle={{ color: "black" }}
                                        sortable headerStyle={{ background: "#0097A7", color: "white" }} />
                                    {/* <Column header="Actions" body={actionTemplate} headerStyle={{ background: "#0097A7", color: "white" }} /> */}
                                </DataTable>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
