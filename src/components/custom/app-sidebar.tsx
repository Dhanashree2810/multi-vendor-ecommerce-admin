"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
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

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
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
      url: "#",
      icon: SquareTerminal,
      isActive: true,
     
    },
    {
      title: "Add Product",
      url: "#",
      icon: Bot,
     
    },
    {
      title: "All Product",
      url: "#",
      icon: BookOpen,
     
    },
    {
      title: "Discount Product",
      url: "#",
      icon: Settings2,
      
    },
    {
      title: "Orders",
      url: "#",
      icon: Settings2,
    
    },
    {
      title: "Payments",
      url: "#",
      icon: Settings2,
      
    },
    {
      title: "Chat-Customer",
      url: "#",
      icon: Settings2,
     
    },
    {
      title: "Chat-Support",
      url: "#",
      icon: Settings2,
     
    },
    {
      title: "Profile",
      url: "#",
      icon: Settings2,
      
    },
  ],
  projects: [

  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
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
