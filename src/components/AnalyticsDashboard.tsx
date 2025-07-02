import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Typography } from '@mui/material';


const AnalyticsDashboard = () => {
    const [data, setData] = useState([]);
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/expenses/analytics', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setData(res.data);
            } catch (error) {
                console.error('Failed to fetch analytics', error);
            }
        };

        if (token) {
            fetchAnalytics();
        }
    }, [token]);

    return (
        <div>
            <Typography variant="h5" sx={{mb: 2}}>Expense Analytics</Typography>
            <BarChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="categoryName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalAmount" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default AnalyticsDashboard;