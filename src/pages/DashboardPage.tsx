// src/pages/DashboardPage.tsx
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authslice';
import type { RootState } from '../redux/store';
import { Button, Container, Typography, Box } from '@mui/material';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseList from '../components/ExpenseList';
import AnalyticsDashboard from '../components/AnalyticsDashboard'; // Make sure this import exists

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 2 }}>
        <Typography variant="h4">Dashboard</Typography>
        <Button variant="outlined" onClick={() => dispatch(logout())}>
          Logout
        </Button>
      </Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Welcome, {user?.role}</Typography>

      {/* This line renders the chart for Admins. Ensure it exists. */}
      {user?.role === 'Admin' && <AnalyticsDashboard />}
      
      <AddExpenseForm />
      <ExpenseList />
    </Container>
  );
};

export default DashboardPage;