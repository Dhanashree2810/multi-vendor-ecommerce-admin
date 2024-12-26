"use client"
import * as React from "react"
import { LayoutDashboard, ShoppingCart, CreditCard, MessageCircle, Gauge, Users, UserX, FilePlus, GalleryVerticalEnd, AudioWaveform, Command } from 'lucide-react'
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
import { NavProjects } from "./nav-projects"
import { TeamSwitcher } from "./team-switcher"


const data = {
  user: {
    name: "admin",
    email: "admin@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
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
  projects: [

  ],
}

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    // <Sidebar collapsible="icon" {...props} className=" ">
    //   <SidebarHeader className="p-4">
    //     <div className="flex items-center gap-2">
    //       {/* <Image src={logo} alt="Easy Shop" className="h-12" /> */}
    //       <h1 className="text-lg lg:text-2xl font-semibold italic">EasyShop</h1>
    //     </div>
    //   </SidebarHeader>
    //   <SidebarContent className="">
        // <NavMain items={data.navMain} />
    //   </SidebarContent>
    //   <SidebarFooter className="">
    //     <NavUser user={data.user} />
    //   </SidebarFooter>
    //   <SidebarRail />
    // </Sidebar>
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

