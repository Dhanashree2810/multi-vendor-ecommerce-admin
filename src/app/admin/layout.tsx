'use client'

import { usePathname } from 'next/navigation'
import { AppSidebar } from "@/components/custom/seller-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import React, { useEffect, useState } from 'react'
import { AdminSidebar } from '@/components/custom/admin-sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const generateBreadcrumbItems = (path: string) => {
    const parts = path.split('/').filter(Boolean)
    return parts.map((part, index) => {
      const href = `/${parts.slice(0, index + 1).join('/')}`
      const label = part.charAt(0).toUpperCase() + part.slice(1)
      const isLast = index === parts.length - 1

      return {
        href,
        label,
        isLast,
      }
    })
  }

  const breadcrumbItems = generateBreadcrumbItems(pathname)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768) 
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Automatically minimize the sidebar for mobile screens
    if (isMobile) {
      setIsSidebarMinimized(true)
    }

    return () => window.removeEventListener("resize", handleResize)
  }, [isMobile])

  // Conditional rendering for the `/admin/login` route
  if (pathname == '/admin/login') {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        {children}
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="userDashboard flex">
        {/* Sidebar Section */}
        <aside>
          <AdminSidebar />
        </aside>

        {/* Main Section */}
        <main
          className={`mainsection w-[calc(100%-20vw)] ${
            !isMobile
              ? isSidebarMinimized
                ? "w-[calc(100vw-5vw)]"
                : "w-[calc(100vw-20vw)]"
              : "w-[calc(100vw-5vw)]"
          } flex flex-col p-4 transition-all duration-300`}
        >
          <header className="flex h-8 items-center gap-2 px-4 bg-white dark:bg-[#EFEFEF]">
            <div className="flex items-center gap-2">
              <SidebarTrigger
                className="-ml-1"
                onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
              />
              <Separator orientation="vertical" className="mr-2 h-2" />
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbItems.map((item, index) => (
                    <React.Fragment key={item.href}>
                      <BreadcrumbItem>
                        {item.isLast ? (
                          <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={item.href}>
                            {item.label}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {index < breadcrumbItems.length - 1 && (
                        <BreadcrumbSeparator />
                      )}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex-1">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}
