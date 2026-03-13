import API from './api';

// Adjust endpoint as needed
export const getProgress = () => API.get('/progress');
export const updateProgress = (data) => API.post('/progress', data);