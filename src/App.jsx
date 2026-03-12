import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./components/PublicLayout";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Resources from "./pages/Resources";
import Dashboard from "./pages/Dashboard";
import Studyplanner from "./pages/Studyplanner";
import Schedule from "./pages/Schedule";
import Progress from "./pages/Progress";
import FocusTimer from "./pages/FocusTimer";

// Teacher Pages
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherMaterials from "./pages/TeacherMaterials";
import TeacherStudents from "./pages/TeacherStudents";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes - WITH Navbar */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
        <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
        <Route path="/resources" element={<PublicLayout><Resources /></PublicLayout>} />

        {/* Dashboard Routes - NO Navbar, ONLY Sidebar */}
        {/* Student Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/planner" element={<DashboardLayout><Studyplanner /></DashboardLayout>} />
        <Route path="/schedule" element={<DashboardLayout><Schedule /></DashboardLayout>} />
        <Route path="/progress" element={<DashboardLayout><Progress /></DashboardLayout>} />
        <Route path="/focus" element={<DashboardLayout><FocusTimer /></DashboardLayout>} />

        {/* Teacher Dashboard */}
        <Route path="/teacher/dashboard" element={<DashboardLayout><TeacherDashboard /></DashboardLayout>} />
        <Route path="/teacher/materials" element={<DashboardLayout><TeacherMaterials /></DashboardLayout>} />
        <Route path="/teacher/students" element={<DashboardLayout><TeacherStudents /></DashboardLayout>} />
      </Routes>
    </Router>
  );
}

export default App;