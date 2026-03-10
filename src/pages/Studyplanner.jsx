import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./Studyplanner.css";

function StudyPlanner() {  // Component name with capital P
  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Navbar />
        <h1>Study Planner</h1>
        <form className="planner-form">
          <h2>Create New Study Plan</h2>
          <input type="text" placeholder="Subject Name" />
          <input type="date" placeholder="Exam Date" />
          <input type="number" placeholder="Study Hours per day" />
          <select>
            <option>Select Priority</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <button type="submit">Create Plan</button>
        </form>
      </div>
    </div>
  );
}

export default StudyPlanner;