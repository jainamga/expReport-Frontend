import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { Button, List, ListItem, ListItemText, Box, TextField, MenuItem } from '@mui/material';
import apiClient from '../api/apiClient';

const categories = [
  { id: 1, name: 'Food' },
  { id: 2, name: 'Transport' },
  { id: 3, name: 'Utilities' },
  { id: 4, name: 'Entertainment' },
  { id: 5, name: 'Shopping' },
  { id: 6, name: 'Health' },
];

const ExpenseList = () => {
  const [expenses, setExpenses] = useState<any[]>([]);
  const { token, user } = useSelector((state: RootState) => state.auth);

  // Filter state
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchExpenses = useCallback(async () => {
    if (!token) return;
    try {
      const params: any = {};
      if (categoryId) params.category_id = categoryId;
      if (startDate) params.start_date = startDate;
      if (endDate) params.end_date = endDate;

      const res = await apiClient.get('/expenses', {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setExpenses(res.data);
    } catch (error) {
      console.error('Failed to fetch expenses', error);
    }
  }, [token, categoryId, startDate, endDate]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleStatusUpdate = async (id: number, status: 'approved' | 'rejected') => {
    try {
      await apiClient.patch(
        `/expenses/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchExpenses();
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <h2>{user?.role === 'Admin' ? 'All Expenses' : 'My Expenses'}</h2>
      {/* Filter Controls */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <TextField
          select
          label="Category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value === '' ? '' : Number(e.target.value))}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="outlined" onClick={fetchExpenses}>
          Filter
        </Button>
        <Button
          variant="text"
          onClick={() => {
            setCategoryId('');
            setStartDate('');
            setEndDate('');
          }}
        >
          Clear
        </Button>
      </Box>
      <List>
        {expenses.map((exp) => (
          <ListItem key={exp.id} divider>
            <ListItemText
              primary={`${exp.description}: $${exp.amount}`}
              secondary={`Status: ${exp.status} | Date: ${exp.expense_date} | Category: ${categories.find(c => c.id === exp.category_id)?.name || ''}`}
            />
            {user?.role === 'Admin' && exp.status === 'pending' && (
              <Box>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  sx={{ mr: 1 }}
                  onClick={() => handleStatusUpdate(exp.id, 'approved')}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleStatusUpdate(exp.id, 'rejected')}
                >
                  Reject
                </Button>
              </Box>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ExpenseList;