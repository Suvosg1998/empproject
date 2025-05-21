import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosinstance';
import { departmentsendUrl } from '../../api/baseUrl';
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

const Getdepartment = () => {
  const [departmentData, setDepartmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchDepartmentData = async () => {
    try {
      const response = await axiosInstance.get(departmentsendUrl.getdepartment);
      console.log('Department data:', response.data);
      setDepartmentData(response.data.data || []);
    } catch (error) {
      console.error('Error fetching department data:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchDepartmentData();
}, []);
const handleDelete = async (id) => {
  if (!window.confirm('Are you sure you want to delete this department?')) return;

  try {
    await axiosInstance.delete(`${departmentsendUrl.deletedepartment}/${id}`);
    setDepartmentData(prev => prev.filter(dep => dep._id !== id));
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
            Department List
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
            onClick={() => navigate('/createdep')}
          >
            Add Department
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <CircularProgress size={40} color="primary" />
          </Box>
        ) : departmentData.length === 0 ? (
          <Typography variant="body1" align="center" sx={{ mt: 4 }}>
            No department data found.
          </Typography>
        ) : (
         <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
  <Table>
    <TableHead sx={{ bgcolor: '#f1f1f1' }}>
      <TableRow>
        <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>Budget</TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {departmentData.map((dept) => (
        <TableRow key={dept._id} hover>
          <TableCell>{dept.name}</TableCell>
          <TableCell>{dept.location}</TableCell>
          <TableCell>{dept.budget}</TableCell>
          <TableCell>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              sx={{ mr: 1 }}
              onClick={() => navigate(`/editdep/${dept._id}`)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleDelete(dept._id)}
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

export default Getdepartment;
