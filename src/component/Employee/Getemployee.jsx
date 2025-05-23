import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosinstance';
import { employeesendUrl } from '../../api/baseUrl';

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Getemployee = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchEmployeeData = async () => {
    try {
      const response = await axiosInstance.get(employeesendUrl.getemployee);
      console.log('Employee data:', response.data);
      setEmployeeData(response.data.data || []);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchEmployeeData();
}, []);
const handleDelete = async (id) => {
  if (!window.confirm('Are you sure you want to delete this employee?')) return;

  try {
    await axiosInstance.delete(`${employeesendUrl.deleteemployee}/${id}`);
    setEmployeeData(prev => prev.filter(emp => emp._id !== id));
  } catch (err) {
    console.error('Delete failed:', err);
    alert('Delete failed. Please try again.');
  }
};


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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="primary">
            Employee List
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
            onClick={() => navigate('/createemp')}
          >
            Add Employee
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <CircularProgress size={40} color="primary" />
          </Box>
        ) : employeeData.length === 0 ? (
          <Typography variant="body1" align="center" sx={{ mt: 4 }}>
            No employee data found.
          </Typography>
        ) : (
         <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
  <Table>
    <TableHead sx={{ bgcolor: '#f1f1f1' }}>
      <TableRow>
        <TableCell sx={{ fontWeight: 'bold' }}>EmpID</TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>Department</TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>Salary</TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {employeeData.map((emp) => (
        <TableRow key={emp._id} hover>
        <TableCell>{emp.empID}</TableCell>
          <TableCell>{emp.name}</TableCell>
          <TableCell>{emp.departmentName}</TableCell>
          <TableCell>{emp.salary}</TableCell>
          <TableCell>
            <Button
              variant="outlined"
              color="success"
              size="small"
              sx={{ mr: 1 }}
              onClick={() => navigate(`/viewemp/${emp._id}`)}
            >
              View
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              sx={{ mr: 1 }}
              onClick={() => navigate(`/editemp/${emp._id}`)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleDelete(emp._id)}
            >
              Delete
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

        )}
      </Paper>
    </Box>
  );
};

export default Getemployee;
