import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const employeeApi = {
  getAll: () => api.get('/employees'),
  getTransactions: (id: string) => api.get(`/employees/${id}/transactions`),
  create: (data: any) => api.post('/employees', data),
};

export const stockApi = {
  getAll: async () => {
    const response = await axios.get("/api/stocks");
    return response.data; // Ensure only the data array is returned
  },
};

export const transactionApi = {
  getAll: async () => {
    const response = await axios.get("/api/transactions");
    return response.data; // Ensure only the data array is returned
  },
};


export default api;