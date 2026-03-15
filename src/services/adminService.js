import API from './api';

export const getAdminStats = () => API.get('/admin/stats');
export const getAllUsers = (role) => API.get('/admin/users', { params: { role } });
export const getUserById = (id) => API.get(`/admin/users/${id}`);
export const updateUser = (id, userData) => API.put(`/admin/users/${id}`, userData);
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);
export const getReports = () => API.get('/admin/reports');