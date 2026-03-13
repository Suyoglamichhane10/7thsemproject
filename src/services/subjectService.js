import API from './api';

export const getSubjects = () => API.get('/subjects');
export const createSubject = (subject) => API.post('/subjects', subject);
export const updateSubject = (id, subject) => API.put(`/subjects/${id}`, subject);
export const deleteSubject = (id) => API.delete(`/subjects/${id}`);