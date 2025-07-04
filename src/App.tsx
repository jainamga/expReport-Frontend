import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './redux/store';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage'; // Import the new page
import RegistrationPage from './pages/RegistrationPage';


function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <RegistrationPage /> : <Navigate to="/" />} />
        <Route path="/" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;