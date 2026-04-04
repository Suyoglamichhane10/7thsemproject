import Sidebar from './Sidebar';

function DashboardLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: '260px', padding: '2rem' }}>
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;