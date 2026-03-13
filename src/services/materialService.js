import API from './api';

export const getMaterials = () => API.get('/materials');
export const createMaterial = (material) => API.post('/materials', material);
export const deleteMaterial = (id) => API.delete(`/materials/${id}`);