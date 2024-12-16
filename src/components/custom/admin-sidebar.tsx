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
      url: "/admin/paymentsrequest",
      icon: CreditCard,
    },
    {
      title: "Deactivate Sellers",
      url: "/admin/payments",
      icon: UserX,
    },
    {
      title: "Seller Request",
      url: "/admin/sellerrequest",
      icon: FilePlus,
    },
    {
      title: "Live Chat",
      url: "/admin/chatsupport",
      icon: MessageCircle,
    },
  ],
}

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar collapsible="icon" {...props} className=" ">
      <SidebarHeader className="p-4 bg-[#E6E7FB]">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="Easy Shop" className="h-12" />
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-[#E6E7FB]">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-[#E6E7FB]">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

