import React, { useState, useEffect } from 'react';
import { Card, Badge, Button, Input, Modal } from '../../components/ui';
import { 
  Plus, 
  Search, 
  Filter, 
  UserPlus, 
  Star, 
  Phone, 
  Briefcase,
  MoreVertical,
  Edit,
  Trash
} from 'lucide-react';
import { driversApi } from '../../api/services/drivers.api';
import { motion } from 'framer-motion';

const DriversPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const data = await driversApi.getDrivers();
      setDrivers(data);
    } catch (error) {
      console.error('Failed to fetch drivers:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusMap = {
    on_duty: { label: 'على رأس العمل', variant: 'success' },
    off_duty: { label: 'خارج العمل', variant: 'neutral' },
    resting: { label: 'في استراحة', variant: 'info' },
  };

  return (
    <div className="space-y-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">إدارة السائقين</h1>
          <p className="text-slate-500 font-medium mt-1">متابعة أداء وتوافر الكادر البشري للأسطول</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          <UserPlus size={20} />
          إضافة سائق جديد
        </Button>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary-600 text-white border-none shadow-lg shadow-primary-600/20">
          <h4 className="text-sm font-bold text-primary-100 uppercase mb-1">إجمالي السائقين</h4>
          <h3 className="text-3xl font-black">{drivers.length}</h3>
          <div className="mt-4 flex items-center text-xs font-bold text-primary-200">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-2" />
            95% من السائقين لديهم تقييم ممتاز
          </div>
        </Card>
        <Card>
          <h4 className="text-sm font-bold text-slate-400 uppercase mb-1">على رأس العمل الآن</h4>
          <h3 className="text-3xl font-black text-slate-800">
            {drivers.filter(d => d.status === 'on_duty').length}
          </h3>
          <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
             <div className="bg-emerald-500 h-full w-[80%]" />
          </div>
        </Card>
        <Card>
          <h4 className="text-sm font-bold text-slate-400 uppercase mb-1">متوسط التقييم</h4>
          <div className="flex items-center gap-2">
            <h3 className="text-3xl font-black text-slate-800">4.5</h3>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={16} className={s <= 4 ? "fill-amber-400 text-amber-400" : "text-slate-300"} />
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="البحث بالاسم، رقم الرخصة، أو رقم الهاتف..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pr-12 pl-4 text-sm focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="secondary">
            <Filter size={18} />
            تصفية
          </Button>
        </div>
      </Card>

      {/* Drivers Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map(i => <div key={i} className="h-48 bg-slate-100 rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drivers.map((driver, idx) => (
            <motion.div
              key={driver.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <img 
                      src={driver.avatar} 
                      alt={driver.name} 
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 transition-all group-hover:ring-primary-500"
                    />
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 mb-1">{driver.name}</h4>
                      <Badge variant={statusMap[driver.status].variant}>
                        {statusMap[driver.status].label}
                      </Badge>
                    </div>
                  </div>
                  <button className="p-2 text-slate-300 hover:text-slate-600 rounded-lg">
                    <MoreVertical size={20} />
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">رقم الرخصة</p>
                    <p className="text-xs font-bold text-slate-600">{driver.license}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">الخبرة</p>
                    <p className="text-xs font-bold text-slate-600">{driver.experience}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-1.5 text-slate-500 font-bold transition-colors group-hover:text-primary-600 cursor-pointer">
                    <Phone size={14} />
                    <span className="text-xs">{driver.phone}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 font-black">
                     <Star size={14} className="fill-amber-500" />
                     <span className="text-sm">{driver.rating}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Driver Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="إضافة سائق جديد للطاقم"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>إلغاء</Button>
            <Button variant="primary">حفظ السائق</Button>
          </>
        }
      >
        <div className="space-y-5">
           <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all">
                 <UserPlus size={32} />
              </div>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <Input label="الاسم الكامل" placeholder="أدخل اسم السائق الثنائي" />
              <Input label="رقم الجوال" placeholder="+966 5x xxx xxxx" />
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <Input label="رقم الرخصة" placeholder="10xxxxxxxx" />
              <Input label="سنوات الخبرة" type="number" placeholder="0" />
           </div>
           
           <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 mr-1">الحالة الأولية</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500">
                 <option value="off_duty">خارج العمل</option>
                 <option value="on_duty">جاهز للعمل</option>
              </select>
           </div>
        </div>
      </Modal>
    </div>
  );
};

export default DriversPage;
