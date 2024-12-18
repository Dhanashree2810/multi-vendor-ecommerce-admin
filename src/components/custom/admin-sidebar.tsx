"use client"
import * as React from "react"
import {  LayoutDashboard,  ShoppingCart, CreditCard, MessageCircle, Gauge, Users, UserX, FilePlus } from 'lucide-react'
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import logo from '@/assets/images/logo.png'
import Image from "next/image"


const data = {
  user: {
    name: "admin",
    email: "admin@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: Gauge,
      isActive: true,
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      title: "Category",
      url: "/admin/category",
      icon: LayoutDashboard,
    },
    {
      title: "Sellers",
      url: "/admin/sellers",
      icon: Users,
    },
    {
      title: "Payment Request",
      url: "/admin/paymentrequest",
      icon: CreditCard,
    },
    {
      title: "Deactivate Sellers",
      url: "/admin/deactivesellers",
      icon: UserX,
    },
    {
      title: "Seller Request",
      url: "/admin/sellersrequest",
      icon: FilePlus,
    },
    {
      title: "Live Chat",
      url: "/admin/chatsellers",
      icon: MessageCircle,
    },
  ],
}

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar collapsible="icon" {...props} className=" ">
      <SidebarHeader className="p-4 bg-[#EFF6FF]">
        <div className="flex items-center gap-2">
          {/* <Image src={logo} alt="Easy Shop" className="h-12" /> */}
          <h1 className="text-xl lg:text-3xl font-semibold italic">Easy Shop</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-[#EFF6FF]">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-[#EFF6FF]">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

