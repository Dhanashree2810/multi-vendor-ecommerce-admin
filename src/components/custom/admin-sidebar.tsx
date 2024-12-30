"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  CreditCard,
  FilePlus,
  GalleryVerticalEnd,
  Gauge,
  LayoutDashboard,
  MessageCircle,
  Settings2,
  ShoppingCart,
  SquareTerminal,
  Users,
  UserX,
} from "lucide-react"

import { NavMain } from "@/components/custom/nav-main"
import { NavProjects } from "@/components/custom/nav-projects"
import { NavUser } from "@/components/custom/nav-user"
import { TeamSwitcher } from "@/components/custom/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react"

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
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <Sidebar collapsible="icon" className="lg:w-64 w-20" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>

      <SidebarFooter>
        <div className="flex flex-col sm:flex-row justify-between items-center w-full space-y-2 sm:space-y-0 sm:space-x-3">
          {/* <NavUser user={data.user} /> */}
          {/* Theme Toggle Sliding Button */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={darkMode}
              onChange={toggleTheme}
            />
            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {darkMode ? "Dark Mode" : "Light Mode"}
            </span>
          </label>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
