import API from './api';

// Get all quizzes (for students)
export const getQuizzes = (params) => API.get('/quiz', { params });

// Get single quiz by ID
export const getQuizById = (id) => API.get(`/quiz/${id}`);

// Submit quiz attempt
export const submitQuizAttempt = (id, data) => API.post(`/quiz/${id}/attempt`, data);

// Get user's quiz attempts
export const getUserAttempts = () => API.get('/quiz/attempts');

// Teacher routes
export const createQuiz = (data) => API.post('/quiz', data);
export const updateQuiz = (id, data) => API.put(`/quiz/${id}`, data);
export const deleteQuiz = (id) => API.delete(`/quiz/${id}`);
export const getTeacherQuizzes = () => API.get('/quiz/teacher/quizzes');