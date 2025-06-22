import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import Dashboard from './components/pages/Dashboard';
import Profile from './components/pages/Profile';
import Settings from './components/pages/Settings';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
    const { isAuthenticated } = useAuthStore();

    return (
        <Routes>
            <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
            />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="/dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
    );
}

export default App;