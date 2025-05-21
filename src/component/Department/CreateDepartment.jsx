import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import axiosInstance from '../../api/axiosinstance';
import { departmentsendUrl } from '../../api/baseUrl';
import { useNavigate } from 'react-router-dom';

const CreateDepartment = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const departmentData = {
      name: data.departmentName,
      location: data.departmentLocation,
      budget: data.departmentBudget,
    };
    try {
      const response = await axiosInstance.post(departmentsendUrl.postdepartment, departmentData);
      alert('Department created successfully!');
      console.log(response.data);
      navigate('/departments'); 
      reset();
    } catch (error) {
        console.error('Error creating department:', error);
      alert('Failed to create department.');
    }
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
        <Typography variant="h4" align="center" gutterBottom>
          Create Department
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Department Name"
            fullWidth
            margin="normal"
            {...register("departmentName", { required: "Department Name is required" })}
            error={!!errors.departmentName}
            helperText={errors.departmentName?.message}
          />
          <TextField
            label="Department Location"
            fullWidth
            margin="normal"
            {...register("departmentLocation", { required: "Department Location is required" })}
            error={!!errors.departmentLocation}
            helperText={errors.departmentLocation?.message}
          />
          <TextField
            label="Department Budget"
            type="number"
            fullWidth
            margin="normal"
            {...register("departmentBudget", { required: "Department Budget is required" })}
            error={!!errors.departmentBudget}
            helperText={errors.departmentBudget?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Create Department
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateDepartment;