// Mock Database for Sndak Fleet Management
export const MOCK_DATA = {
  vehicles: [
    { id: 'V1', model: 'مرسيدس أكتروس', plate: 'أ ب ج 1234', status: 'active', driver: 'أحمد محمود', location: 'الرياض', fuel: 85, mileage: 12500, type: 'Heavy Truck' },
    { id: 'V2', model: 'فولفو FM', plate: 'س ص ع 5678', status: 'maintenance', driver: 'خالد علي', location: 'جدة', fuel: 40, mileage: 8200, type: 'Medium Truck' },
    { id: 'V3', model: 'مان TGX', plate: 'و ر ز 9012', status: 'stopped', driver: 'محمد سعيد', location: 'الدمام', fuel: 100, mileage: 5100, type: 'Heavy Truck' },
    { id: 'V4', model: 'سكانيا R', plate: 'ق ك ل 3456', status: 'active', driver: 'ياسر فهد', location: 'مكة المكرمة', fuel: 15, mileage: 15000, type: 'Heavy Truck' },
  ],
  drivers: [
    { id: 'D1', name: 'أحمد محمود', license: '1029384756', phone: '+966 50 123 4567', rating: 4.8, status: 'on_duty', experience: '5 سنوات', avatar: 'https://ui-avatars.com/api/?name=Ahmed&background=2563EB&color=fff' },
    { id: 'D2', name: 'خالد علي', license: '9876543210', phone: '+966 55 987 6543', rating: 4.2, status: 'off_duty', experience: '3 سنوات', avatar: 'https://ui-avatars.com/api/?name=Khaled&background=64748B&color=fff' },
    { id: 'D3', name: 'محمد سعيد', license: '5544332211', phone: '+966 54 443 2211', rating: 4.5, status: 'resting', experience: '7 سنوات', avatar: 'https://ui-avatars.com/api/?name=Mohamed&background=10B981&color=fff' },
    { id: 'D4', name: 'ياسر فهد', license: '6677889900', phone: '+966 56 667 8899', rating: 3.9, status: 'on_duty', experience: '2 سنة', avatar: 'https://ui-avatars.com/api/?name=Yasser&background=F59E0B&color=fff' },
  ],
  trips: [
    { id: 'T1', vehicleId: 'V1', driverId: 'D1', origin: 'الرياض', destination: 'مكة المكرمة', distance: 880, startTime: '2026-04-20 08:30', status: 'completed', fuelConsumed: 120 },
    { id: 'T2', vehicleId: 'V4', driverId: 'D4', origin: 'جدة', destination: 'المدينة', distance: 420, startTime: '2026-04-20 10:15', status: 'in_progress', fuelConsumed: 45 },
    { id: 'T3', vehicleId: 'V2', driverId: 'D2', origin: 'الدمام', destination: 'الجبيل', distance: 95, startTime: '2026-04-19 14:00', status: 'cancelled', fuelConsumed: 0 },
  ],
  alerts: [
    { id: 'A1', type: 'speeding', severity: 'high', vehicle: 'مرسيدس - 4521', message: 'تجاوز السرعة المسموحة (120 كم/س)', time: 'منذ 5 دقائق', status: 'pending' },
    { id: 'A2', type: 'fuel', severity: 'medium', vehicle: 'سكانيا - 1104', message: 'انخفاض مستوى الوقود تحت 15%', time: 'منذ 15 دقيقة', status: 'pending' },
    { id: 'A3', type: 'maintenance', severity: 'low', vehicle: 'فولفو - 9022', message: 'موعد الصيانة الدورية بعد 200 كم', time: 'منذ ساعة', status: 'resolved' },
  ],
  stats: {
    totalVehicles: 124,
    activeDrivers: 86,
    totalDistance: '12,450',
    activeAlerts: 7,
    fuelTrend: 72,
  }
};
