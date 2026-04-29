import React, { useState, useEffect } from 'react';
import { Card, Badge, Button, Input, Modal } from '../../components/ui';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Settings2,
  Trash2,
  Edit2,
  Truck,
  MapPin,
  Fuel,
  Loader2
} from 'lucide-react';
import { fleetApi } from '../../api/services/fleet.api';
import { motion } from 'framer-motion';

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const data = await fleetApi.getVehicles();
      setVehicles(data);
    } catch (error) {
      console.error('Failed to fetch vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusMap = {
    active: { label: 'نشط', variant: 'success' },
    maintenance: { label: 'في الصيانة', variant: 'danger' },
    stopped: { label: 'متوقف', variant: 'neutral' },
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">إدارة الأسطول</h1>
          <p className="text-slate-500 font-medium mt-1">إجمالي المركبات المسجلة: {vehicles.length}</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          إضافة مركبة جديدة
        </Button>
      </div>

      {/* Filters Card */}
      <Card className="p-4 bg-slate-50 border-slate-200">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="البحث برقم اللوحة، الموديل، أو السائق..."
              className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pr-12 pl-4 text-sm focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="secondary" className="flex-1 md:flex-none">
              <Filter size={18} />
              تصفية
            </Button>
            <Button variant="secondary" className="px-3">
              <Settings2 size={18} />
            </Button>
          </div>
        </div>
      </Card>

      {/* Vehicles grid/table */}
      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center bg-white rounded-2xl shadow-sm">
           <Loader2 className="animate-spin text-primary-600 mb-4" size={32} />
           <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">جاري تحميل الأسطول...</p>
        </div>
      ) : (
        <Card className="overflow-hidden p-0 border-none shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">المركبة والمعلومات</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">الحالة</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">السائق الحالي</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">الوقود</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-left">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="group hover:bg-slate-50 transition-all cursor-pointer">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center transition-colors group-hover:bg-primary-50 group-hover:text-primary-600">
                          <Truck size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 leading-none mb-1.5">{vehicle.model}</h4>
                          <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400 uppercase">
                            <span>{vehicle.plate}</span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span className="flex items-center gap-1">
                              <MapPin size={12} />
                              {vehicle.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <Badge variant={statusMap[vehicle.status].variant}>
                        {statusMap[vehicle.status].label}
                      </Badge>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-bold text-slate-600">{vehicle.driver}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col items-center gap-2">
                         <span className="text-xs font-black text-slate-700">{vehicle.fuel}%</span>
                         <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${vehicle.fuel < 20 ? 'bg-red-500' : 'bg-primary-500'}`} 
                              style={{ width: `${vehicle.fuel}%` }} 
                            />
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-left">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all" title="تعديل">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="حذف">
                          <Trash2 size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Add Vehicle Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="إضافة مركبة جديدة للأسطول"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>إلغاء</Button>
            <Button variant="primary">حفظ المركبة</Button>
          </>
        }
      >
        <div className="space-y-5">
           <div className="grid grid-cols-2 gap-4">
              <Input label="موديل المركبة" placeholder="مثلاً: مرسيدس أكتروس" />
              <Input label="رقم اللوحة" placeholder="أ ب ج 1234" />
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 mr-1">نوع المركبة</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500">
                   <option value="heavy">شاحنة ثقيلة</option>
                   <option value="medium">شاحنة متوسطة</option>
                   <option value="light">مركبة خفيفة</option>
                </select>
              </div>
              <Input label="سعة خزان الوقود" type="number" placeholder="باللتر" />
           </div>
           
           <Input label="السائق المخصص" placeholder="اختر سائقاً من القائمة..." />
        </div>
      </Modal>
    </div>
  );
};

export default VehiclesPage;
