import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authslice';
import { jwtDecode } from 'jwt-decode';
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  Fade,
  CircularProgress,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import apiClient from '../api/apiClient';
import { Link as RouterLink } from 'react-router-dom';

// Styled components for better visual hierarchy
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

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await apiClient.post('/auth/login', {
        email,
        password,
      });

      const token = res.data.token;
      const user = jwtDecode(token);
      dispatch(loginSuccess({ user, token }));
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error('Login failed', error);
    } finally {
      setLoading(false);
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
        backgroundImage: 'url("/bgimg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
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
              Welcome Back
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Sign in to continue to your account
            </Typography>
            {error && (
              <Alert severity="error" sx={{ width: '100%' }}>
                {error}
              </Alert>
            )}
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ width: '100%', maxWidth: 400 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                  },
                }}
              />
              <StyledButton
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Sign In'
                )}
              </StyledButton>
              <Button
                component={RouterLink}
                to="/register"
                fullWidth
                variant="outlined"
                sx={{ mt: 1 }}
              >
                New user? Register
              </Button>
            </Box>
          </Box>
        </StyledPaper>
      </Fade>
    </Box>
  );
};

export default LoginPage;