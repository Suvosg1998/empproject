import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, Button, Divider } from '@mui/material';
import { employeesendUrl } from '../../api/baseUrl';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosinstance';

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axiosInstance.get(`${employeesendUrl.getemployeebyid}/${id}`);
        setEmployee(res.data.data);
      } catch (err) {
        console.error('Error fetching employee:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!employee) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        Employee not found.
      </Typography>
    );
  }

  return (
    <Box
          sx={{
            width: '100vw',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#f0f2f5',
            px: 2,
            overflowX: 'hidden', // Prevent horizontal scroll
            boxSizing: 'border-box',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: '100%',
              maxWidth: '1200px',
              borderRadius: 3,
              p: 4,
              bgcolor: '#ffffff',
              overflowX: 'auto', // optional safety for inner elements
            }}
          >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5" fontWeight="bold" color="primary">
            Employee Details
          </Typography>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Typography><strong>Employee ID:</strong> {employee.empID}</Typography>
        <Typography><strong>Name:</strong> {employee.name}</Typography>
        <Typography><strong>Department:</strong> {employee.departmentName || 'N/A'}</Typography>
        <Typography><strong>Experience:</strong> {employee.experience}</Typography>
        <Typography><strong>Salary:</strong> ${employee.salary.toLocaleString()}</Typography>
        <Typography><strong>Hire Date:</strong> {new Date(employee.hireDate).toLocaleDateString()}</Typography>

        <Box sx={{ mt: 2 }}>
          <Typography fontWeight="bold">Performance Scores:</Typography>
          {employee.performanceScore && employee.performanceScore.length > 0 ? (
            <ul>
              {employee.performanceScore.map((score, index) => (
                <li key={index}>
                  Year: {score.year}, Score: {score.score}
                </li>
              ))}
            </ul>
          ) : (
            <Typography>No scores available.</Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ViewEmployee;
