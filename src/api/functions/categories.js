import api from "../http-service";

export const getAllCategories = () => api.get(`categories`);

export const createCategory = (data) => api.post(`categories`, data);
