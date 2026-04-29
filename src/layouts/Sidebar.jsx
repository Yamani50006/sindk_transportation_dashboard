import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Truck, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Map,
  ChevronRight,
  Bell
} from 'lucide-react';
import { useAuth } from '../features/auth/AuthContext';
import { clsx } from 'clsx';

const navItems = [
  { name: 'لوحة التحكم', path: '/', icon: LayoutDashboard },
  { name: 'الخريطة الحية', path: '/map', icon: Map },
  { name: 'الرحلات', path: '/trips', icon: Map }, // Using Map icon for Trips
  { name: 'إدارة الأسطول', path: '/vehicles', icon: Truck },
  { name: 'السائقين', path: '/drivers', icon: Users },
  { name: 'التنبيهات', path: '/alerts', icon: Bell },
  { name: 'التقارير', path: '/reports', icon: BarChart3 },
  { name: 'الإعدادات', path: '/settings', icon: Settings },
];

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className="w-72 h-screen bg-[#0F172A] text-slate-300 flex flex-col fixed right-0 top-0 border-l border-slate-800 z-50">
      {/* Brand Header */}
      <div className="p-8 flex items-center gap-3 border-b border-white/5">
        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-600/20">
          <Truck size={24} />
        </div>
        <div>
          <h1 className="text-xl font-black text-white tracking-tight">سندك</h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-1">نظام إدارة الأسطول</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto mt-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => clsx(
              'flex items-center justify-between px-4 py-3.5 rounded-xl transition-all group font-bold text-sm',
              isActive 
                ? 'bg-primary-600/10 text-primary-400' 
                : 'hover:bg-slate-800 hover:text-white'
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon size={20} className={clsx(
                'transition-colors',
                'group-hover:text-primary-400'
              )} />
              <span>{item.name}</span>
            </div>
            <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </NavLink>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all font-bold text-sm text-slate-400"
        >
          <LogOut size={20} />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
