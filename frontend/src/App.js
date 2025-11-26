import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAuth } from './context/AuthContext';

// Layout
import Layout from './components/Layout/Layout';

// Public Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home/Home';
import Events from './pages/Events/Events';
import EventDetails from './pages/Events/EventDetails';
import Clubs from './pages/Clubs/Clubs';
import ClubDetails from './pages/Clubs/ClubDetails';

// Protected Pages
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import MyRegistrations from './pages/Registrations/MyRegistrations';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageClubs from './pages/Admin/ManageClubs';
import ManageUsers from './pages/Admin/ManageUsers';

// Core Member Pages
import ClubManagement from './pages/ClubManagement/ClubManagement';
import CreateEvent from './pages/ClubManagement/CreateEvent';
import ManageEvents from './pages/ClubManagement/ManageEvents';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Box>Loading...</Box>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:id" element={<EventDetails />} />
        <Route path="clubs" element={<Clubs />} />
        <Route path="clubs/:id" element={<ClubDetails />} />

        {/* Protected Routes */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-registrations"
          element={
            <ProtectedRoute>
              <MyRegistrations />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="admin"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/clubs"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <ManageClubs />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/users"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        {/* Core Member Routes */}
        <Route
          path="club-management"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'CORE']}>
              <ClubManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="club-management/create-event"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'CORE']}>
              <CreateEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="club-management/events"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'CORE']}>
              <ManageEvents />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
