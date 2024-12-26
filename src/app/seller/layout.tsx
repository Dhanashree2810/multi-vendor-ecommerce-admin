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
import React, { useState } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false)

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

  return (
    <SidebarProvider>
      <div className="userDashboard flex">
        {/* Sidebar Section */}
        <aside

        >
          <AppSidebar />
        </aside>

        {/* Main Section */}
        <main
          className={`mainsection w-[calc(100%-20vw)] ${
            

            isSidebarMinimized ? "w-[calc(100vw-5vw)]" : "w-[calc(100vw-20vw)]"

          } flex flex-col p-4 transition-all duration-300`}
        >
          <header className="flex h-16 items-center gap-2 px-4 bg-white dark:bg-[#EFEFEF]">
            <div className="flex items-center gap-2">
              <SidebarTrigger
                className="-ml-1"
                onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
              />
              <Separator orientation="vertical" className="mr-2 h-4" />
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
