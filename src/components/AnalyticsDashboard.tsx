import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Typography, Box } from '@mui/material';
import apiClient from '../api/apiClient';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AnalyticsDashboard = () => {
    const [data, setData] = useState<any[]>([]);
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        const fetchAnalytics = async () => {
            if (!token) return;
            try {
                const res = await apiClient.get('/expenses/analytics', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Convert totalAmount from a string to a number for the charts
                const numericData = res.data.map((d: any) => ({
                    ...d,
                    totalAmount: parseFloat(d.totalAmount)
                }));
                setData(numericData || []);
            } catch (error) {
                console.error('Failed to fetch analytics', error);
                setData([]);
            }
        };

        fetchAnalytics();
    }, [token]);

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Expense Analytics</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {/* Bar Chart */}
                <BarChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="categoryName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalAmount" fill="#8884d8" />
                </BarChart>

                {/* Pie Chart */}
                <PieChart width={400} height={300}>
                    <Pie
                        data={data}
                        dataKey="totalAmount"
                        nameKey="categoryName"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        {data.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </Box>
        </Box>
    );
};

export default AnalyticsDashboard;