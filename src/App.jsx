import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Resources from './pages/Resources';
import Dashboard from './pages/Dashboard';
import Studyplanner from './pages/Studyplanner';
import Schedule from './pages/Schedule';
import Progress from './pages/Progress';
import FocusTimer from './pages/FocusTimer';
import Flashcards from './pages/Flashcards';
import Quiz from './pages/Quize';
import TakeQuiz from './pages/TakeQuiz';
import CreateQuiz from './pages/CreateQuiz';
import TeacherQuizzes from './pages/TeacherQuizzes';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherMaterials from './pages/TeacherMaterials';
import TeacherStudents from './pages/TeacherStudents';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminReports from './pages/AdminReports';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
        <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
        <Route path="/resources" element={<PublicLayout><Resources /></PublicLayout>} />

        {/* Student Routes - No role restriction, but ProtectedRoute will handle redirects */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout><Dashboard /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/planner" element={
          <ProtectedRoute>
            <DashboardLayout><Studyplanner /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/schedule" element={
          <ProtectedRoute>
            <DashboardLayout><Schedule /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/progress" element={
          <ProtectedRoute>
            <DashboardLayout><Progress /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/focus" element={
          <ProtectedRoute>
            <DashboardLayout><FocusTimer /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/flashcards" element={
          <ProtectedRoute>
            <DashboardLayout><Flashcards /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/quiz" element={
          <ProtectedRoute>
            <DashboardLayout><Quiz /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/quiz/:id" element={
          <ProtectedRoute>
            <DashboardLayout><TakeQuiz /></DashboardLayout>
          </ProtectedRoute>
        } />

        {/* Teacher Routes */}
        <Route path="/teacher/dashboard" element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <DashboardLayout><TeacherDashboard /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/teacher/materials" element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <DashboardLayout><TeacherMaterials /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/teacher/students" element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <DashboardLayout><TeacherStudents /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/create-quiz" element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <DashboardLayout><CreateQuiz /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/teacher/quizzes" element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <DashboardLayout><TeacherQuizzes /></DashboardLayout>
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout><AdminDashboard /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout><AdminUsers /></DashboardLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/reports" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout><AdminReports /></DashboardLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;