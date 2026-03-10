import Sidebar from "./Sidebar";
// IMPORTANT: No Navbar here!

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        {/* No Navbar component here */}
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;