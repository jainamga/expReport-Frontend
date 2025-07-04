import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Fade,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import apiClient from '../api/apiClient';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const roles = [
  { value: 'Employee', label: 'Employee' },
  { value: 'Admin', label: 'Admin' },
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  background: theme.palette.background.paper,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  fontWeight: 600,
  textTransform: 'none',
  borderRadius: theme.spacing(1),
  background: theme.palette.primary.main,
  '&:hover': {
    background: theme.palette.primary.dark,
    transform: 'translateY(-1px)',
    transition: 'all 0.2s ease-in-out',
  },
}));

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Employee');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Add this line

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await apiClient.post('/auth/register', {
        username,
        email,
        password,
        role,
      });
      // Show popup and redirect to login
      window.alert(res.data.message || 'Registration successful!');
      navigate('/login');
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

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
        <StyledPaper elevation={3}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{ fontWeight: 600, color: 'text.primary' }}
            >
              Create Account
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Sign up to get started
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
              />
              <TextField
                margin="normal"
                required
                select
                fullWidth
                label="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
              >
                {roles.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <StyledButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </StyledButton>
              <Button
                component={RouterLink}
                to="/login"
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              >
                Already have an account? Login
              </Button>
              {message && (
                <Typography color="primary" sx={{ mt: 2 }}>
                  {message}
                </Typography>
              )}
            </Box>
          </Box>
        </StyledPaper>
      </Fade>
    </Box>
  );
};

export default RegistrationPage;