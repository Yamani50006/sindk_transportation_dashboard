import React, { useState, useEffect } from 'react';
import { Card, Badge, Button, Modal } from '../../components/ui';
import { 
  AlertTriangle, 
  Bell, 
  ShieldAlert, 
  ShieldCheck, 
  Clock, 
  CheckCircle2,
  Trash2,
  Filter,
  MoreVertical,
  Truck
} from 'lucide-react';
import { alertsApi } from '../../api/services/alerts.api';
import { motion, AnimatePresence } from 'framer-motion';

const AlertsPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const data = await alertsApi.getAlerts();
      setAlerts(data);
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (id) => {
    try {
      await alertsApi.resolveAlert(id);
      fetchAlerts(); // Refresh list
    } catch (error) {
      console.error('Error resolving alert:', error);
    }
  };

  const severityMap = {
    high: { icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-50', badge: 'danger' },
    medium: { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50', badge: 'warning' },
    low: { icon: Bell, color: 'text-blue-500', bg: 'bg-blue-50', badge: 'info' },
  };

  const filteredAlerts = alerts.filter(a => filter === 'all' || a.status === filter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">التنبيهات النظام</h1>
          <p className="text-slate-500 font-medium mt-1">مراقبة التجاوزات الفنية والأمنية للأسطول بشكل لحظي</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">تصدير السجل</Button>
          <Button variant="primary">إعدادات الإشعارات</Button>
        </div>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="flex items-center gap-5 p-6 border-l-4 border-l-red-500">
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center">
               <ShieldAlert size={28} />
            </div>
            <div>
               <p className="text-xs font-bold text-slate-400 uppercase">تنبيهات حرجة</p>
               <h3 className="text-2xl font-black text-slate-800">{alerts.filter(a => a.severity === 'high' && a.status === 'pending').length}</h3>
            </div>
         </Card>
         <Card className="flex items-center gap-5 p-6 border-l-4 border-l-amber-500">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
               <AlertTriangle size={28} />
            </div>
            <div>
               <p className="text-xs font-bold text-slate-400 uppercase">تنبيهات متوسطة</p>
               <h3 className="text-2xl font-black text-slate-800">{alerts.filter(a => a.severity === 'medium' && a.status === 'pending').length}</h3>
            </div>
         </Card>
         <Card className="flex items-center gap-5 p-6 border-l-4 border-l-emerald-500">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
               <ShieldCheck size={28} />
            </div>
            <div>
               <p className="text-xs font-bold text-slate-400 uppercase">تمت معالجتها اليوم</p>
               <h3 className="text-2xl font-black text-slate-800">{alerts.filter(a => a.status === 'resolved').length}</h3>
            </div>
         </Card>
      </div>

      {/* Filters Bar */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {['all', 'pending', 'resolved'].map((t) => (
              <button 
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === t ? 'bg-primary-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                {t === 'all' ? 'الكل' : t === 'pending' ? 'قيد الانتظار' : 'تم الحل'}
              </button>
            ))}
          </div>
          <Button variant="secondary" size="sm">
            <Filter size={16} />
            فلترة متقدمة
          </Button>
        </div>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        <AnimatePresence mode='popLayout'>
          {loading ? (
            [1, 2].map(i => <div key={i} className="h-24 bg-slate-100 rounded-2xl animate-pulse" />)
          ) : (
            filteredAlerts.map((alert, idx) => {
              const SevIcon = severityMap[alert.severity].icon;
              return (
                <motion.div
                  key={alert.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className={`p-5 flex items-center justify-between border-r-4 ${alert.status === 'resolved' ? 'border-r-emerald-500 opacity-70' : 'border-r-primary-500 shadow-md'}`}>
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-xl ${severityMap[alert.severity].bg} ${severityMap[alert.severity].color} flex items-center justify-center`}>
                        <SevIcon size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-bold text-slate-800">{alert.message}</h4>
                          <Badge variant={severityMap[alert.severity].badge}>
                            {alert.severity === 'high' ? 'حرج' : alert.severity === 'medium' ? 'متوسط' : 'عادي'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-tighter">
                          <div className="flex items-center gap-1">
                            <Truck size={14} />
                            {alert.vehicle}
                          </div>
                          <div className="flex items-center gap-1 text-slate-300">
                             <Clock size={12} />
                             {alert.time}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                       {alert.status === 'pending' ? (
                         <Button variant="primary" size="sm" onClick={() => handleResolve(alert.id)}>
                            <CheckCircle2 size={16} />
                            معالجة التنبيه
                         </Button>
                       ) : (
                         <div className="flex items-center gap-1.5 text-emerald-500 font-bold text-sm bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                            <CheckCircle2 size={16} />
                            تم الحل
                         </div>
                       )}
                       <button className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                         <Trash2 size={20} />
                       </button>
                    </div>
                  </Card>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AlertsPage;
