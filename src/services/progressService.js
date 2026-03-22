import API from './api';

// Get overall progress stats
export const getProgress = () => API.get('/progress/stats').catch(() => ({ data: null }));

// Get weekly study hours
export const getWeeklyStudyData = () => API.get('/progress/weekly').catch(() => ({ data: [] }));

// Get performance/quiz data over time
export const getPerformanceData = () => API.get('/progress/performance').catch(() => ({ data: [] }));

// Get recent user activities
export const getActivities = () => API.get('/progress/activities').catch(() => ({ data: [] }));

// Get study streak
export const getStudyStreak = () => API.get('/progress/streak').catch(() => ({ data: { streak: 0 } }));

// Update progress after study session
export const updateProgress = (data) => API.post('/progress', data);