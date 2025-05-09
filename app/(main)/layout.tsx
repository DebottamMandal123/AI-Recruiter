import React from 'react'
import AppSidebar from '../components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import WelcomeContainer from './dashboard/components/WelcomeContainer'

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full bg-gray-100'>
        <SidebarTrigger className='cursor-pointer' />
        <div className='p-10'>
          <WelcomeContainer />
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}

export default DashboardLayout