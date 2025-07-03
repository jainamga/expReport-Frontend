import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { Button, TextField, Box } from '@mui/material';
import apiClient from '../api/apiClient'; // 1. Import the new api client

const AddExpenseForm = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const token = useSelector((state: RootState) => state.auth.token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 2. Use the apiClient for the API call
      await apiClient.post(
        '/expenses', // The base URL is now handled automatically
        {
          description,
          amount: parseFloat(amount),
          category_id: 1, // Hardcoding category 1 for now
          expense_date: new Date().toISOString().split('T')[0],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      alert('Expense submitted!');
      setDescription('');
      setAmount('');
    } catch (error) {
      console.error('Failed to submit expense', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <h2>Add New Expense</h2>
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <Button type="submit" variant="contained">Submit</Button>
    </Box>
  );
};

export default AddExpenseForm;