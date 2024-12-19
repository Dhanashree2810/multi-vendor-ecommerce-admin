'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { DataTable, DataTableExpandedRows, DataTableRowToggleEvent } from "primereact/datatable"
import { Column } from "primereact/column"
import { Toast } from "primereact/toast"
import { FilterMatchMode } from "primereact/api"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"

type Suborder = {
    id: string
    price: number
    payment_status: string
    delivery_status: string
}

type Order = {
    id: string
    price: number
    payment_status: string
    delivery_status: string
    suborder?: Suborder[]
}

const demoOrders: Order[] = [
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
]

const OrdersList = () => {
    const [filters, setFilters] = useState({
        global: { value: "", matchMode: FilterMatchMode.CONTAINS },
        name: { value: "", matchMode: FilterMatchMode.CONTAINS },
        payment: { value: "", matchMode: FilterMatchMode.CONTAINS },
        shopName: { value: "", matchMode: FilterMatchMode.CONTAINS },
        district: { value: "", matchMode: FilterMatchMode.CONTAINS },
        email: { value: "", matchMode: FilterMatchMode.CONTAINS },
    })
    const [first, setFirst] = useState(0)
    const [rows, setRows] = useState(5)
    const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows>({})

    const onRowToggle = (e: DataTableRowToggleEvent) => {
        setExpandedRows(e.data)
    }

    const renderHeader = () => (
        <div className="flex flex-col sm:flex-row justify-between items-center bg-[#EFEFEF] p-4 rounded-md border border-gray-300 shadow-sm">
            <h2 className="text-lg font-semibold mb-2 sm:mb-0">All Orders</h2>
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
                    placeholder="Search Orders"
                    className="p-inputtext-sm h-10 w-full sm:w-[300px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0097A7]"
                />
            </span>
        </div>
    )

    const rowExpansionTemplate = (data: Order) => (
        <div className="p-4 overflow-x-auto">
            <h4 className="mb-4">Suborders for Order #{data.id}</h4>
            <table className="w-full text-left border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-200 p-2">Suborder ID</th>
                        <th className="border border-gray-200 p-2">Price</th>
                        <th className="border border-gray-200 p-2">Payment Status</th>
                        <th className="border border-gray-200 p-2">Delivery Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.suborder?.map((sub) => (
                        <tr key={sub.id} className="border-b border-gray-200">
                            <td className="border border-gray-200 p-2">{sub.id}</td>
                            <td className="border border-gray-200 p-2">₹{sub.price}</td>
                            <td className="border border-gray-200 p-2">{sub.payment_status}</td>
                            <td className="border border-gray-200 p-2">{sub.delivery_status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

    const actionTemplate = (rowData: Order) => (
        <div className="flex gap-2">
            <Link href={`/admin/orders/${rowData.id}`}>
                <Button label="View" className="p-button-text" />
            </Link>
        </div>
    )

    const onPageChange = (e: { first: number; rows: number }) => {
        setFirst(e.first)
        setRows(e.rows)
    }

    return (
        <div className="p-4">
            <Toast />
            <div className="bg-white shadow-md rounded-md p-4">
                <div className="pb-4 mb-4">{renderHeader()}</div>
                <div className="overflow-x-auto">
                    <DataTable
                        value={demoOrders}
                        paginator
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        rows={rows}
                        first={first}
                        onPage={onPageChange}
                        globalFilterFields={["id", "price", "payment_status", "delivery_status"]}
                        filters={filters}
                        emptyMessage="No orders found."
                        expandedRows={expandedRows}
                        onRowToggle={onRowToggle}
                        rowExpansionTemplate={rowExpansionTemplate}
                        dataKey="id"
                        className="min-w-full"
                        responsiveLayout="scroll"
                    >
                        <Column expander style={{ width: '3em' }} />
                        <Column
                            field="id"
                            header="Order ID"
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
                            sortable
                            headerStyle={{
                                background: "#0097A7",
                                fontWeight: "bold",
                                color: "white",
                            }}
                        />
                        <Column
                            field="payment_status"
                            header="Payment Status"
                            sortable
                            headerStyle={{
                                background: "#0097A7",
                                fontWeight: "bold",
                                color: "white",
                            }}
                        />
                        <Column
                            field="delivery_status"
                            header="Order Status"
                            sortable
                            headerStyle={{
                                background: "#0097A7",
                                fontWeight: "bold",
                                color: "white",
                            }}
                        />
                        <Column
                            header="Action"
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
        </div>
    )
}

export default OrdersList

