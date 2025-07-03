import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { Button, List, ListItem, ListItemText, Box } from '@mui/material';
import apiClient from '../api/apiClient'; // 1. Import your central api client

const ExpenseList = () => {
  const [expenses, setExpenses] = useState<any[]>([]);
  const { token, user } = useSelector((state: RootState) => state.auth);

  const fetchExpenses = useCallback(async () => {
    if (!token) return;
    try {
      // 2. Use apiClient for getting expenses
      const res = await apiClient.get('/expenses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(res.data);
    } catch (error) {
      console.error('Failed to fetch expenses', error);
    }
  }, [token]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleStatusUpdate = async (id: number, status: 'approved' | 'rejected') => {
    try {
      // 3. Use apiClient for updating status
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
      <List>
        {expenses.map((exp) => (
          <ListItem key={exp.id} divider>
            <ListItemText
              primary={`${exp.description}: $${exp.amount}`}
              secondary={`Status: ${exp.status}`}
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