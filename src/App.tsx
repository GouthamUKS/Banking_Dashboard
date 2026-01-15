/**
 * App.tsx
 * Root component with providers and routing setup
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Dashboard } from './features/Dashboard';
import { LoginPage } from './features/LoginPage';
import { SignUpPage } from './features/SignUpPage';
import { VerifyEmailPage } from './features/VerifyEmailPage';
import { CurrenciesPage } from './features/CurrenciesPage';
import './index.css';

/**
 * Protected Route Component
 * Redirects unauthenticated users to login page
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

/**
 * App Routes Component
 * Handles all application routing
 */
function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/currencies"
        element={
          <ProtectedRoute>
            <CurrenciesPage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AccessibilityProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </AccessibilityProvider>
    </BrowserRouter>
  );
}

export default App;
