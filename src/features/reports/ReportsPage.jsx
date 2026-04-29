import React from 'react';
import { Card, Button } from '../../components/ui';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Download, Calendar, Filter } from 'lucide-react';

const distanceData = [
  { name: 'السبت', distance: 4000 },
  { name: 'الأحد', distance: 3000 },
  { name: 'الاثنين', distance: 2000 },
  { name: 'الثلاثاء', distance: 2780 },
  { name: 'الأربعاء', distance: 1890 },
  { name: 'الخميس', distance: 2390 },
  { name: 'الجمعة', distance: 3490 },
];

const fuelConsumption = [
  { name: 'يناير', value: 400 },
  { name: 'فبراير', value: 300 },
  { name: 'مارس', value: 500 },
  { name: 'أبريل', value: 450 },
];

const statusData = [
  { name: 'نشط', value: 400, color: '#2563EB' },
  { name: 'خامل', value: 300, color: '#94A3B8' },
  { name: 'صيانة', value: 300, color: '#EF4444' },
];

const ReportsPage = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">التقارير والتحليلات</h1>
          <p className="text-slate-500 font-medium mt-1">متابعة أداء الأسطول والموارد بشكل مرئي</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">
            <Calendar size={18} />
            آخر 30 يوم
          </Button>
          <Button variant="primary">
            <Download size={18} />
            تصدير PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Distance Chart */}
        <Card title="إجمالي المسافة المقطوعة (كم)" subtitle="توزيع المسافات على مدار الأسبوع الحالي">
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={distanceData}>
                <defs>
                  <linearGradient id="colorDist" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 700 }}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    direction: 'rtl',
                    textAlign: 'right'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="distance" 
                  stroke="#2563EB" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorDist)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Fuel Consumption */}
        <Card title="استهلاك الوقود (لتر)" subtitle="معدل الاستهلاك الشهري للأسطول">
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fuelConsumption}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 700 }}
                />
                <Tooltip 
                   cursor={{ fill: '#F1F5F9' }}
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" fill="#2563EB" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Fleet Status Distribution */}
        <Card title="توزيع حالة الأسطول" subtitle="نسبة المركبات النشطة والمعطلة حالياً" className="lg:col-span-1">
          <div className="h-[300px] w-full flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
             </ResponsiveContainer>
             <div className="flex flex-col gap-3 pr-8">
               {statusData.map((item) => (
                 <div key={item.name} className="flex items-center gap-3">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                   <span className="text-sm font-bold text-slate-600">{item.name}</span>
                 </div>
               ))}
             </div>
          </div>
        </Card>

        {/* Detailed Stats Panel */}
        <div className="grid grid-cols-2 gap-6">
           <Card className="flex flex-col items-center justify-center text-center p-8 bg-primary-50 border-primary-100">
              <h4 className="text-sm font-bold text-primary-600 uppercase mb-2">أعلى كفاءة سائق</h4>
              <h3 className="text-2xl font-black text-primary-900">سعيد القحطاني</h3>
              <p className="text-xs font-bold text-primary-400 mt-2">تقييم: 4.9/5.0</p>
           </Card>
           <Card className="flex flex-col items-center justify-center text-center p-8 bg-emerald-50 border-emerald-100">
              <h4 className="text-sm font-bold text-emerald-600 uppercase mb-2">توفير الوقود</h4>
              <h3 className="text-2xl font-black text-emerald-900">1,240 لتر</h3>
              <p className="text-xs font-bold text-emerald-400 mt-2">هذا الشهر</p>
           </Card>
           <Card className="flex flex-col items-center justify-center text-center p-8 bg-amber-50 border-amber-100">
              <h4 className="text-sm font-bold text-amber-600 uppercase mb-2">تنبيهات حرجة</h4>
              <h3 className="text-2xl font-black text-amber-900">03</h3>
              <p className="text-xs font-bold text-amber-400 mt-2">تحتاج مراجعة</p>
           </Card>
           <Card className="flex flex-col items-center justify-center text-center p-8 bg-slate-900 text-white border-none">
              <h4 className="text-sm font-bold text-slate-400 uppercase mb-2">إجمالي الرحلات</h4>
              <h3 className="text-2xl font-black text-white">1,540</h3>
              <p className="text-xs font-bold text-primary-400 mt-2">+12% سنوي</p>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
