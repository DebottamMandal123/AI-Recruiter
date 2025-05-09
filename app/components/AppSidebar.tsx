"use client"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SidebarOptions } from "@/services/SidebarOptions"
import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
  
  const AppSidebar = () => {

    const path = usePathname();

    return (
      <Sidebar>
        <SidebarHeader className="flex items-center">
          <Image src={"/logo.png"} 
            alt="Logo" 
            width={200} 
            height={100}
            className='w-[170px] h-[30px] bg-white'
          />
          <Button className="bg-blue-700 hover:bg-blue-600 cursor-pointer w-full mt-2">
            <Plus />
            Create New Interview
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarContent>
              <SidebarMenu>
                {SidebarOptions.map((option, index) => {
                  return (
                    <SidebarMenuItem key={index} className="p-1">
                      <SidebarMenuButton asChild className={`p-5 hover:text-blue-700 hover:bg-blue-100 ${path == option.path && "bg-blue-50 hover:bg-blue-100"}`}>
                        <Link href={option.path} className={`${ path == option.path && 'text-blue-700'}`}>
                          <option.icon />
                          <span className="text-[16px]">{option.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
}
  
export default AppSidebar