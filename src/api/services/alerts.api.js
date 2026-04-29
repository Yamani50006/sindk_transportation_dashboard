import { MOCK_DATA } from '../mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const alertsApi = {
  getAlerts: async () => {
    await delay(500);
    return MOCK_DATA.alerts;
  },
  resolveAlert: async (id) => {
    await delay(400);
    const alert = MOCK_DATA.alerts.find(a => a.id === id);
    if (alert) {
      alert.status = 'resolved';
    }
    return alert;
  }
};
