import axios from 'axios';

// Base axios instance
const apiClient = axios.create({
  baseURL: '/api', // In a real app, this would be your API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for mock responses (simulating API delay and response)
apiClient.interceptors.request.use((config) => {
  // Logic to handle mock data can go here if needed
  return config;
});

export default apiClient;
