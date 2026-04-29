import React, { useState, useEffect } from 'react';
import { Card, Badge, Button } from '../../components/ui';
import { 
  Truck, 
  Users, 
  Navigation, 
  AlertTriangle,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { driversApi } from '../../api/services/drivers.api';
import { tripsApi } from '../../api/services/trips.api';
import { fleetApi } from '../../api/services/fleet.api';
import { alertsApi } from '../../api/services/alerts.api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentTrips, setRecentTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsData, tripsData] = await Promise.all([
        driversApi.getStats(),
        tripsApi.getRecentActivity()
      ]);
      setStats(statsData);
      setRecentTrips(tripsData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statConfig = stats ? [
    { 
      title: 'إجمالي الشاحنات', 
      value: stats.totalVehicles, 
      change: '+12%', 
      icon: Truck, 
      color: 'bg-primary-500',
      trend: 'up'
    },
    { 
      title: 'السائقين النشطين', 
      value: stats.activeDrivers, 
      change: '+5%', 
      icon: Users, 
      color: 'bg-emerald-500',
      trend: 'up'
    },
    { 
      title: 'المسافة المقطوعة (كم)', 
      value: stats.totalDistance, 
      change: '+18%', 
      icon: Navigation, 
      color: 'bg-indigo-500',
      trend: 'up'
    },
    { 
      title: 'تنبيهات الصيانة', 
      value: stats.activeAlerts, 
      change: '-2', 
      icon: AlertTriangle, 
      color: 'bg-amber-500',
      trend: 'down'
    },
  ] : [];

  if (loading) return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Loader2 className="animate-spin text-primary-600" size={40} />
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">نظرة عامة</h1>
          <p className="text-slate-500 font-medium mt-1">أهلاً بك مجدداً، إليك ملخص عمليات الأسطول اليوم.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">تصدير التقرير</Button>
          <Button variant="primary">إضافة رحلة جديدة</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statConfig.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="hover:border-primary-500/20 group">
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-xl ${stat.color} text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}>
                  <stat.icon size={24} />
                </div>
                <Badge variant={stat.trend === 'up' ? 'success' : 'warning'}>
                  {stat.change}
                </Badge>
              </div>
              <div className="mt-4">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-tighter">{stat.title}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
                  <span className="text-[10px] font-bold text-slate-400">اليوم</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Real-time Tracking Small Map (Preview) */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="موقع الأسطول المباشر" subtitle="متابعة لحظية لجميع المركبات النشطة">
            <div className="aspect-[21/9] bg-slate-100 rounded-xl overflow-hidden relative border border-slate-200 shadow-inner">
               <div className="absolute inset-0 flex items-center justify-center bg-slate-100 italic text-slate-400">
                 [ سيتم دمج خريطة Leaflet هنا في صفحة الخريطة الكاملة ]
               </div>
               <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg animate-bounce" />
               <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-emerald-600 rounded-full border-4 border-white shadow-lg animate-pulse" />
            </div>
          </Card>

          <Card title="أحدث الرحلات" subtitle="جدول متابعة العمليات الأخيرة" action={<Button variant="ghost" size="sm">عرض الكل</Button>}>
             <div className="overflow-x-auto">
               <table className="w-full text-right">
                 <thead className="text-xs text-slate-400 uppercase border-b border-slate-50">
                   <tr>
                     <th className="pb-4 font-bold">المرجع</th>
                     <th className="pb-4 font-bold">المسار</th>
                     <th className="pb-4 font-bold">وقت البدء</th>
                     <th className="pb-4 font-bold text-left">الحالة</th>
                   </tr>
                 </thead>
                 <tbody className="text-sm">
                   {recentTrips.map((row) => (
                     <tr key={row.id} className="group hover:bg-slate-50 transition-colors">
                       <td className="py-4 font-bold text-slate-800">#{row.id}</td>
                       <td className="py-4 text-slate-600 font-medium">
                         <div className="flex items-center gap-2">
                           {row.origin} 
                           <span className="text-slate-300">→</span> 
                           {row.destination}
                         </div>
                       </td>
                       <td className="py-4">
                         <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                           <Clock size={14} />
                           {row.startTime}
                         </div>
                       </td>
                       <td className="py-4 text-left">
                         <Badge variant={row.status === 'completed' ? 'success' : row.status === 'in_progress' ? 'info' : 'danger'}>
                           {row.status === 'completed' ? 'مكتملة' : row.status === 'in_progress' ? 'في الطريق' : 'ملغاة'}
                         </Badge>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </Card>
        </div>

        {/* Sidebar Info Panels */}
        <div className="space-y-6">
          <Card className="bg-[#0F172A] text-white border-none shadow-xl shadow-slate-900/20 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-1">تقرير استهلاك الوقود</h3>
              <p className="text-slate-400 text-xs font-medium">مقارنة بالشهر الماضي</p>
              
              <div className="mt-6 flex items-end gap-3">
                <h4 className="text-4xl font-black text-primary-400">{stats?.fuelTrend}%</h4>
                <div className="flex items-center text-emerald-400 text-xs font-bold mb-2">
                  <TrendingUp size={14} className="ml-1" />
                  تحسن بنسبة 4%
                </div>
              </div>
              
              <div className="mt-6 bg-white/10 w-full h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-primary-500 h-full rounded-full shadow-[0_0_12px_rgba(37,99,235,0.5)]" 
                  style={{ width: `${stats?.fuelTrend}%` }}
                />
              </div>
            </div>
            <ArrowUpRight className="absolute -top-4 -left-4 text-white/5" size={160} strokeWidth={1} />
          </Card>

          <Card title="إحصائيات الموارد">
            <div className="space-y-5">
              {[
                { label: 'مركبات نشطة', value: '110', color: 'bg-primary-500' },
                { label: 'سائقين متاحين', value: '24', color: 'bg-emerald-500' },
                { label: 'رحلات مجدولة', value: '15', color: 'bg-indigo-500' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-sm font-bold text-slate-600">{item.label}</span>
                  </div>
                  <span className="text-sm font-black text-slate-800">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
