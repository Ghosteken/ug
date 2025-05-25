import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './authContext.jsx'; // Added useAuth import
import Layout from './Layout.jsx';
import Home from './home.jsx';
import Login from './login.jsx';
import Register from './Register.jsx';
import UploadWaste from './waste.jsx';
import Dashboard from './dashboard.jsx';

function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth(); // Added isLoading check
  
  if (isLoading) {
    return <div className="loading-screen">Loading...</div>; // Add proper loading UI
  }

  return user ? children : <Navigate to="/login" replace />;
}

function AppRouter() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { 
          path: "/upload", 
          element: (
            <ProtectedRoute>
              <UploadWaste />
            </ProtectedRoute>
          ) 
        },
        { 
          path: "/dashboard", 
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ) 
        },
        { path: "/login", element: <Login /> }, // Removed .jsx extension
        { path: "/register", element: <Register /> }, // Lowercase and removed .jsx
        { path: "*", element: <Navigate to="/" replace /> } // 404 handling
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}