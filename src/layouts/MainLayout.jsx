import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex" dir="rtl">
      {/* Sidebar - Fixed on the right for RTL */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 mr-72 transition-all duration-300">
        <Topbar />
        
        <div className="p-8">
          <Outlet />
        </div>

        {/* Footer */}
        <footer className="px-8 py-6 text-center text-xs text-slate-400 font-medium border-t border-slate-100 bg-white/50 backdrop-blur-sm">
          جميع الحقوق محفوظة © {new Date().getFullYear()} شركة سندك للنقل والخدمات اللوجستية
        </footer>
      </main>
    </div>
  );
};

export default MainLayout;
