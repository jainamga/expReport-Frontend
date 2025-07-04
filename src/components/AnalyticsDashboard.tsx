import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Typography, Box } from '@mui/material';
import apiClient from '../api/apiClient'; // 1. Import your central api client

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AnalyticsDashboard = () => {
    const [data, setData] = useState([]);
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                // 2. Use the apiClient for the API call
                const res = await apiClient.get('/expenses/analytics', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setData(res.data || []);
            } catch (error) {
                console.error('Failed to fetch analytics', error);
                setData([]); // Ensure data is reset on error
            }
        };

        if (token) {
            fetchAnalytics();
        }
    }, [token]);

    // Only render pie chart if there’s more than one data point
    const hasMultipleDataPoints = data.length > 1;

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Expense Analytics</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
                <BarChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="categoryName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalAmount" fill="#8884d8" />
                </BarChart>
                {hasMultipleDataPoints && (
                    <PieChart width={400} height={300}>
                        <Pie
                            data={data}
                            dataKey="totalAmount"
                            nameKey="categoryName"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {data.map(( index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                )}
                {!hasMultipleDataPoints && data.length > 0 && (
                    <Typography sx={{ mt: 2 }}>Not enough data for pie chart (requires multiple categories).</Typography>
                )}
            </Box>
        </Box>
    );
};

export default AnalyticsDashboard;