
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Analytics from './pages/Analytics';
import Users from './pages/Users';
import Settings from './pages/Settings';
import MapView from './pages/MapView';

function App() {
  // Simple mock auth for now
  const isAuthenticated = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}>
          <Route index element={<Dashboard />} />
          <Route path="map" element={<MapView />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          {/* Add more routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
