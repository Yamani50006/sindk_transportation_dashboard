import React from 'react';
import { 
  Bell, 
  Search, 
  User, 
  ChevronDown,
  Menu
} from 'lucide-react';
import { useAuth } from '../features/auth/AuthContext';

const Topbar = () => {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-6 flex-1">
        <button className="lg:hidden text-slate-600 hover:bg-slate-100 p-2 rounded-lg">
          <Menu size={24} />
        </button>

        <div className="relative w-full max-w-md group">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="البحث عن المركبات، السائقين، أو الرحلات..."
            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pr-12 pl-4 text-sm focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-all">
          <Bell size={20} />
          <span className="absolute top-2.5 left-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-4 cursor-pointer hover:bg-slate-50 p-1.5 pr-4 rounded-2xl transition-all border border-transparent hover:border-slate-100 group">
          <div className="text-left hidden md:block text-right">
            <h4 className="text-sm font-bold text-slate-800 leading-none mb-1">{user?.name}</h4>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">مسؤول النظام</p>
          </div>
          <div className="relative">
            <img 
              src={user?.avatar} 
              alt={user?.name} 
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-100 group-hover:ring-primary-500/20 transition-all"
            />
            <div className="absolute -bottom-0.5 -left-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
          </div>
          <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
