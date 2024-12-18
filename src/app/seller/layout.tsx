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
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import React from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

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
      <AppSidebar />
      <SidebarInset className="bg-[#EFEFEF]">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbItems.map((item, index) => (
                  <React.Fragment key={item.href}>
                    <BreadcrumbItem>
                      {item.isLast ? (
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

