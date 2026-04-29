import React, { useState } from 'react';
import { Card, Button, Input } from '../../components/ui';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  LogOut,
  Save,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

const SettingsPage = () => {
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">الإعدادات</h1>
          <p className="text-slate-500 font-medium mt-1">إدارة إعدادات النظام وتفضيلات الحساب</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Nav (Internal) */}
        <div className="lg:col-span-1 space-y-2">
           {[
             { id: 'profile', label: 'الملف الشخصي', icon: User, active: true },
             { id: 'security', label: 'الأمان والخصوصية', icon: Shield },
             { id: 'notifications', label: 'التنبيهات', icon: Bell },
             { id: 'preferences', label: 'تفضيلات العرض', icon: Settings },
           ].map((item) => (
             <button 
               key={item.id}
               className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${item.active ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20' : 'text-slate-500 hover:bg-slate-100'}`}
             >
               <item.icon size={20} />
               {item.label}
             </button>
           ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section 1: User Info */}
          <Card className="p-0 border-none shadow-sm overflow-hidden bg-white">
            <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                  <User size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">المعلومات الشخصية</h3>
              </div>
              {success && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-emerald-600 text-xs font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100"
                >
                  <CheckCircle2 size={14} />
                  تم الحفظ بنجاح
                </motion.div>
              )}
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-6 mb-8">
                 <div className="relative group">
                    <img 
                      src="https://ui-avatars.com/api/?name=Admin&background=2563EB&color=fff" 
                      alt="Profile" 
                      className="w-24 h-24 rounded-3xl object-cover ring-4 ring-slate-100 transition-all group-hover:ring-primary-500/20"
                    />
                    <button className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-slate-100 text-slate-500 hover:text-primary-600 transition-all">
                       <Settings size={16} />
                    </button>
                 </div>
                 <div>
                    <h4 className="text-lg font-bold text-slate-800">مدير النظام</h4>
                    <p className="text-sm text-slate-500 font-medium">يمكنك تغيير صورتك الشخصية وإعدادات حسابك هنا</p>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Input label="الاسم الكامل" defaultValue="مدير النظام" />
                <Input label="البريد الإلكتروني" defaultValue="admin@sndak.com" type="email" />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <Input label="رقم الهاتف" defaultValue="+966 50 123 4567" />
                <Input label="المسمى الوظيفي" defaultValue="مدير عمليات الأسطول" />
              </div>

              <div className="pt-4 flex justify-end">
                <Button variant="primary" onClick={handleSave} className="min-w-[140px]">
                  <Save size={18} />
                  حفظ التغييرات
                </Button>
              </div>
            </div>
          </Card>

          {/* Section 2: Notifications */}
          <Card className="p-0 border-none shadow-sm overflow-hidden bg-white">
            <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Bell size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">إعدادات التنبيهات</h3>
            </div>
            
            <div className="p-8 space-y-6">
              {[
                { id: 'speeding', label: 'تنبيهات تجاوز السرعة', desc: 'إشعار فوري عند تجاوز المركبة لسرعة 120 كم/س', enabled: true },
                { id: 'fuel', label: 'تنبيهات الوقود', desc: 'إشعار عند انخفاض مستوى الوقود تحت 15%', enabled: true },
                { id: 'connection', label: 'تنبيهات فقدان الاتصال', desc: 'إشعار عند فقدان إشارة GPS لأكثر من 5 دقائق', enabled: false },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 group">
                  <div>
                    <h4 className="text-sm font-bold text-slate-700 group-hover:text-primary-600 transition-colors">{item.label}</h4>
                    <p className="text-xs text-slate-400 font-medium mt-1">{item.desc}</p>
                  </div>
                  <button className={`w-12 h-6 rounded-full relative transition-all ${item.enabled ? 'bg-primary-600' : 'bg-slate-200'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${item.enabled ? 'left-1' : 'right-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
