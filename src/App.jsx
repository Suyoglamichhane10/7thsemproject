import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StudyPlanner from "./pages/Studyplanner";  // Note: matches your file name
import Schedule from "./pages/Schedule";
import Resources from "./pages/Resources";
import Progress from "./pages/Progress";
import FocusTimer from "./pages/FocusTimer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/planner" element={<StudyPlanner />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/focus" element={<FocusTimer />} />
      </Routes>
    </Router>
  );
}

export default App;