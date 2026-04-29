import { MOCK_DATA } from '../mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const tripsApi = {
  getTrips: async () => {
    await delay(600);
    return MOCK_DATA.trips;
  },
  getRecentActivity: async () => {
    await delay(400);
    return MOCK_DATA.trips.slice(0, 5);
  },
  createTrip: async (data) => {
    await delay(1000);
    const newTrip = { ...data, id: `T${MOCK_DATA.trips.length + 1}` };
    MOCK_DATA.trips.push(newTrip);
    return newTrip;
  }
};
