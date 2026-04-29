import { MOCK_DATA } from '../mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fleetApi = {
  getVehicles: async () => {
    await delay(500);
    return MOCK_DATA.vehicles;
  },
  getVehicleById: async (id) => {
    await delay(300);
    return MOCK_DATA.vehicles.find(v => v.id === id);
  },
  addVehicle: async (data) => {
    await delay(800);
    const newVehicle = { ...data, id: `V${MOCK_DATA.vehicles.length + 1}` };
    MOCK_DATA.vehicles.push(newVehicle);
    return newVehicle;
  }
};
