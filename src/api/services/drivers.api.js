import { MOCK_DATA } from '../mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const driversApi = {
  getDrivers: async () => {
    await delay(500);
    return MOCK_DATA.drivers;
  },
  addDriver: async (data) => {
    await delay(800);
    const newDriver = { 
      ...data, 
      id: `D${MOCK_DATA.drivers.length + 1}`,
      avatar: `https://ui-avatars.com/api/?name=${data.name}&background=2563EB&color=fff`
    };
    MOCK_DATA.drivers.push(newDriver);
    return newDriver;
  },
  getStats: async () => {
    await delay(300);
    return MOCK_DATA.stats;
  }
};
