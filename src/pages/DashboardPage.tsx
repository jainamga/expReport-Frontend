import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authslice';
import type { RootState } from '../redux/store';
import {
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Fade,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseList from '../components/ExpenseList';
import AnalyticsDashboard from '../components/AnalyticsDashboard'; // Ensure this import exists

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  background: theme.palette.background.paper,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1),
  fontWeight: 600,
  textTransform: 'none',
  borderRadius: theme.spacing(1),
  '&:hover': {
    transform: 'translateY(-1px)',
    transition: 'all 0.2s ease-in-out',
  },
}));

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #ff9800, #ffeb3b)', // Orange to yellow gradient
      }}
    >
      <Fade in timeout={600}>
        <StyledPaper elevation={3} sx={{ width: '100%', maxWidth: 800 }}>
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Dashboard
              </Typography>
              <StyledButton variant="outlined" onClick={() => dispatch(logout())}>
                Logout
              </StyledButton>
            </Box>
            <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
              Welcome, {user?.role || 'User'}
            </Typography>

            {user?.role === 'Admin' && <AnalyticsDashboard />}

            <AddExpenseForm />
            <ExpenseList />
          </Box>
        </StyledPaper>
      </Fade>
    </Box>
  );
};

export default DashboardPage;