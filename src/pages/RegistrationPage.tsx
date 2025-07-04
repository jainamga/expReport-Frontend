import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, MenuItem } from '@mui/material';
import apiClient from '../api/apiClient';

const roles = [
  { value: 'Employee', label: 'Employee' },
  { value: 'Manager', label: 'Manager' },
];

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Employee');
  const [message, setMessage] = useState('');

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
      setMessage(res.data.message || 'Registration successful!');
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
          />
          <TextField
            margin="normal"
            required
            select
            fullWidth
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          {message && (
            <Typography color="primary" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default RegistrationPage;