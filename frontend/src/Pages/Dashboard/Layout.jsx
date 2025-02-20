import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AdminSidebar from './admin/AdminSidebar';
import { Outlet } from 'react-router-dom';
import { AdminProvider } from '@/contexts/AdminContext';
import DashboardNavbar from './DashboardNavbar';
import { DoctorProvider } from '@/contexts/DoctorContext';
import DoctorSidebar from './doctor/DoctorSidebar';

function DashboardLayout({ role }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once to set initial state
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // console.log(user.role);


  return (
    <AdminProvider>
      <DoctorProvider>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <aside
            className={`fixed inset-y-0 left-0 z-50 w-80 sm:w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
          >
            <div className="h-full flex flex-col">
              {user.role === 'doctor' ? <DoctorSidebar /> : <AdminSidebar />}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex w-full flex-col overflow-hidden">
            {/* Top Bar */}
            <header className="bg-white border-b border-gray-200 z-10">
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                  <button
                    className="text-gray-500 focus:outline-none focus:text-gray-600 lg:hidden"
                    onClick={toggleSidebar}
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                  <DashboardNavbar role={user.role} />
                </div>
              </div>
            </header>

            {/* Page Content */}
            <main className="overflow-x-hidden overflow-y-auto">
              <div className="px-4 sm:px-6 lg:px-8 py-8">
                {/* Your main content goes here */}
                {role === 'doctor' ? <Outlet /> : <Outlet />}
                {/* <Outlet /> */}
              </div>
            </main>
          </div>

          {/* Overlay for Mobile */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
              onClick={toggleSidebar}
            ></div>
          )}
        </div>
      </DoctorProvider>
    </AdminProvider>
  );
}

export default DashboardLayout;
