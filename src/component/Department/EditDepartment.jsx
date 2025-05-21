import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosinstance';
import { departmentsendUrl } from '../../api/baseUrl';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', location: '', budget: '' });

  useEffect(() => {
    const fetchDepartment = async () => {
      const res = await axiosInstance.get(`${departmentsendUrl.getdepartment}/${id}`);
      setFormData({
        name: res.data.data.name,
        location: res.data.data.location,
        budget: res.data.data.budget,
      });
    };
    fetchDepartment();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await axiosInstance.put(`${departmentsendUrl.updatedepartment}/${id}`, formData);
    navigate('/getdepartment');
  };

  return (
    <Box
          sx={{
            minHeight: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#f5f5f5',
          }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 5,
              minWidth: 400,
              maxWidth: 500,
              width: '100%',
              borderRadius: 3,
            }}
          >
        <Typography variant="h5" mb={3}>Edit Department</Typography>
        <TextField
          fullWidth
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="location"
          label="Location"
          value={formData.location}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="budget"
          label="Budget"
          value={formData.budget}
          onChange={handleChange}
          type="number"
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleUpdate}>
          Update Department
        </Button>
      </Paper>
    </Box>
  );
};

export default EditDepartment;
