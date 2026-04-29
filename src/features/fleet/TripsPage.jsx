import React, { useState, useEffect } from 'react';
import { Card, Badge, Button, Input } from '../../components/ui';
import { 
  MapPin, 
  Clock, 
  TrendingUp, 
  Filter, 
  Search, 
  ArrowRight,
  Truck,
  User,
  Fuel,
  ArrowUpRight
} from 'lucide-react';
import { tripsApi } from '../../api/services/trips.api';
import { motion } from 'framer-motion';

const TripsPage = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const data = await tripsApi.getTrips();
      setTrips(data);
    } catch (error) {
      console.error('Failed to fetch trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusMap = {
    completed: { label: 'مكتملة', variant: 'success' },
    in_progress: { label: 'في الطريق', variant: 'info' },
    cancelled: { label: 'ملغاة', variant: 'danger' },
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">سجل الرحلات</h1>
          <p className="text-slate-500 font-medium mt-1">تتبع وتحليل مسارات الأسطول وكفاءة النقل</p>
        </div>
        <Button variant="primary">
          <Truck size={20} />
          إنشاء رحلة جديدة
        </Button>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'إجمالي الرحلات', value: '450', icon: TrendingUp, color: 'text-primary-600', bg: 'bg-primary-50' },
          { label: 'المسافة الكلية', value: '12,450 كم', icon: MapPin, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'معدل التأخير', value: '2.4%', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'توفير التكاليف', value: '15,200 رس', icon: ArrowUpRight, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        ].map((item, idx) => (
          <Card key={idx} className="flex items-center gap-4 py-4 px-6 border-none shadow-sm">
            <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center`}>
              <item.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{item.label}</p>
              <h4 className="text-xl font-black text-slate-800">{item.value}</h4>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="البحث برقم الرحلة، السائق، أو الوجهة..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pr-12 pl-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="secondary" className="flex-1 md:flex-none">
              <Filter size={18} />
              تصفية
            </Button>
            <Button variant="secondary">آخر 7 أيام</Button>
          </div>
        </div>
      </Card>

      {/* Trips Timeline/Table */}
      <Card className="overflow-hidden p-0 border-none shadow-sm">
        <div className="overflow-x-auto text-right">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400">المرجع</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400">المسار (من - إلى)</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400">التفاصيل</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400">الحالة</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 text-left">التاريخ والوقت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                [1, 2, 3].map(i => <tr key={i} className="animate-pulse"><td colSpan={5} className="h-16 bg-slate-50/50" /></tr>)
              ) : (
                trips.map((trip) => (
                  <tr key={trip.id} className="group hover:bg-slate-50 transition-all cursor-pointer">
                    <td className="px-6 py-5">
                      <span className="text-xs font-black text-primary-600 bg-primary-50 px-2 py-1 rounded-md">#{trip.id}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-bold text-slate-800">{trip.origin}</div>
                        <ArrowRight size={14} className="text-slate-300 transform rotate-180" />
                        <div className="text-sm font-bold text-slate-800">{trip.destination}</div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-6">
                         <div className="flex items-center gap-1.5 text-slate-400">
                            <MapPin size={14} />
                            <span className="text-xs font-bold">{trip.distance} كم</span>
                         </div>
                         <div className="flex items-center gap-1.5 text-slate-400">
                            <Fuel size={14} />
                            <span className="text-xs font-bold">{trip.fuelConsumed} لتر</span>
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <Badge variant={statusMap[trip.status].variant}>
                        {statusMap[trip.status].label}
                      </Badge>
                    </td>
                    <td className="px-6 py-5 text-left text-xs font-bold text-slate-500">
                      <div className="flex items-center justify-end gap-2 text-slate-400">
                         <Clock size={14} />
                         {trip.startTime}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default TripsPage;
