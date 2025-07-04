import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { Button, TextField, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import apiClient from '../api/apiClient'; // 1. Import the new api client

const categories = [
  { id: 1, name: 'Food' },
  { id: 2, name: 'Transport' },
  { id: 3, name: 'Utilities' },
  { id: 4, name: 'Entertainment' },
  { id: 5, name: 'Shopping' },
  { id: 6, name: 'Health' },
];

const AddExpenseForm = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const token = useSelector((state: RootState) => state.auth.token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post(
        '/expenses',
        {
          description,
          amount: parseFloat(amount),
          category_id: categoryId,
          expense_date: new Date().toISOString().split('T')[0],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Expense submitted!');
      setDescription('');
      setAmount('');
      setCategoryId(1);
      window.location.reload(); // Refresh the page after submit
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
      <FormControl fullWidth margin="normal" required>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          value={categoryId}
          label="Category"
          onChange={(e) => setCategoryId(Number(e.target.value))}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained">Submit</Button>
    </Box>
  );
};

export default AddExpenseForm;