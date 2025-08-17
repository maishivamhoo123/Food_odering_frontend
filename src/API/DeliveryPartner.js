import axios from "axios";

// Vite env variable (fallback to localhost in dev)
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
});

// Attach JWT automatically to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// API calls
export const getPendingOrders = () => api.get("/order/pending");

export const acceptOrder = (orderId, partnerId) =>
  api.post(`/order/${orderId}/accept`, { partnerId });

export const updatePartnerLocation = (partnerId, latitude, longitude) =>
  api.post(`/order/${partnerId}/location`, { latitude, longitude });

export const getOrderDetails = (orderId) => api.get(`/order/${orderId}`);

export default api;
