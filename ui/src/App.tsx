import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Navbar } from './components/layout/Navbar';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { SettingsPage } from './pages/SettingsPage';
import { TasksPage } from './pages/TasksPage';
import { useAuthCheck } from './hooks/useAuthCheck';

function App() {
  useAuthCheck();
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

        <Router>
          <div className="min-h-screen text-gray-900 bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <main className="pt-16">
                        <DashboardPage />
                      </main>
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <main className="pt-16">
                        <SettingsPage />
                      </main>
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <main className="pt-16">
                        <TasksPage />
                      </main>
                    </>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
    </>
  );
}

export default App;