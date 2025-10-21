'use client';

import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Home, List, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FormBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
        <Sidebar>
            <SidebarContent className="p-4">
                <SidebarHeader>
                    <h2 className="text-2xl font-bold text-primary">Form Builder</h2>
                </SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === '/form-builder'}>
                            <Link href="/form-builder">
                                <Home />
                                <span>Builder</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === '/forms'}>
                            <Link href="/forms">
                                <List />
                                <span>All Forms</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-4 md:p-8">
            {children}
        </main>
    </SidebarProvider>
  );
}
