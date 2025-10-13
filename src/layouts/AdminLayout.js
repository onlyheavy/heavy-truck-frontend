import React from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { LogOut } from 'lucide-react';

const AdminLayout = ({  children }) => {
  return (
    <SidebarProvider >
      <AppSidebar />
      <SidebarInset>
        <header className="flex bg-gray-50 h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4 " />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block"></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex justify-end w-full">
            <LogOut className="cursor-pointer text-black" />
          </div>
        </header>
        <div className="p-5 flex flex-col gap-5">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
