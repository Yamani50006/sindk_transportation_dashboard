import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from '../../components/ui';

// Fix for default marker icons in Leaflet + React
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const vehicles = [
  { id: 1, name: 'شاحنة مرسيدس - 4521', pos: [24.7136, 46.6753], driver: 'أحمد محمود' },
  { id: 2, name: 'شاحنة فولفو - 9022', pos: [24.7743, 46.7385], driver: 'خالد علي' },
  { id: 3, name: 'شاحنة مان - 1104', pos: [24.6333, 46.7167], driver: 'سعيد القحطاني' },
];

const LiveMap = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">الخريطة الحية</h1>
          <p className="text-slate-500 font-medium mt-1">متابعة لحظية لمواقع الأسطول في مدينة الرياض</p>
        </div>
      </div>

      <Card className="p-0 overflow-hidden h-[calc(100vh-200px)] border-none shadow-xl relative z-0">
        <MapContainer 
          center={[24.7136, 46.6753]} 
          zoom={11} 
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {vehicles.map((v) => (
            <Marker key={v.id} position={v.pos}>
              <Popup>
                <div className="text-right p-1">
                  <h4 className="font-bold text-slate-800">{v.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">السائق: {v.driver}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Card>
    </div>
  );
};

export default LiveMap;
