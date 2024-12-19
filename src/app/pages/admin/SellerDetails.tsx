'use client'

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

interface ShopInfo {
  shopName: string
  division: string
  district: string
  sub_district: string
}

interface Seller {
  name: string
  email: string
  status: string
  role: string
  payment: string
  image?: string
  shopInfo: ShopInfo
}

const mockSellerData: Seller = {
  name: "FlashFusion Finds",
  email: "flashfusion@gmail.com",
  status: "active",
  role: "seller",
  payment: "active",
  shopInfo: {
    shopName: "Top Sellers",
    division: "Retail",
    district: "Mumbai",
    sub_district: "Andheri East",
  },
}

export default function SellerDetails({ sellerId }: { sellerId?: string }) {
  const [seller, setSeller] = useState<Seller>(mockSellerData)
  const [status, setStatus] = useState<string>("active")
  const [loading, setLoading] = useState(true)

  const fetchSellerDetails = async () => {
    try {
      const res = await fetch(`/api/seller/${sellerId}`)
      const data = await res.json()
      setSeller(data)
      setStatus(data?.status)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch seller details.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    if (sellerId) {
      fetchSellerDetails()
    } else {
      setLoading(false)
    }
  }, [sellerId])

  const submitStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch(`/api/seller/${sellerId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (res.ok) {
        toast({
          title: "Success",
          description: "Seller status updated.",
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        })
        fetchSellerDetails()
      } else {
        throw new Error("Failed to update status")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status.",
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
      })
    }
  }

  if (loading) {
    return <div className="p-5">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-white shadow-md rounded-md p-4 md:p-6 lg:p-4">
      <h1 className="text-2xl font-bold mb-6">Seller Details</h1>

      <Card className="bg-white text-black p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Image Section */}
          <div className="flex flex-col justify-center items-center p-6 bg-[#EFEFEF] rounded-lg">
            <div className="w-full aspect-square flex items-center justify-center text-center">
              {seller?.image ? (
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={seller.image}
                  alt="Seller"
                />
              ) : (
                <span className="text-lg">Image Not Uploaded</span>
              )}
            </div>
          </div>

          {/* Basic Info Section */}
          <div className="bg-[#EFEFEF] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Basic Info</h2>
            <div className="space-y-3">
              <p><span className="font-semibold">Name : </span>{seller.name}</p>
              <p><span className="font-semibold">Email : </span>{seller.email}</p>
              <p><span className="font-semibold">Role : </span>{seller.role}</p>
              <p><span className="font-semibold">Status : </span>{seller.status}</p>
              <p><span className="font-semibold">Payment Status : </span>{seller.payment}</p>
            </div>
          </div>

          {/* Address Section */}
          <div className="bg-[#EFEFEF] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Address</h2>
            <div className="space-y-3">
              <p><span className="font-semibold">Shop Name : </span>{seller.shopInfo.shopName}</p>
              <p><span className="font-semibold">Division : </span>{seller.shopInfo.division}</p>
              <p><span className="font-semibold">District : </span>{seller.shopInfo.district}</p>
              <p><span className="font-semibold">State : </span>{seller.shopInfo.sub_district}</p>
            </div>
          </div>
        </div>

        {/* Status Update Form */}
        <form onSubmit={submitStatusUpdate} className="mt-6">
          <div className="flex flex-col sm:flex-row gap-4 max-w-md">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="bg-[#0097A7] border-none text-white">
                <SelectValue placeholder="Active" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="deactive">Deactive</SelectItem>
              </SelectContent>
            </Select>

            <Button type="submit" className="bg-[#0097A7]  text-white">
              Submit
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

