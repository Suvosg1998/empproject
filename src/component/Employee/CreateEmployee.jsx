import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  MenuItem,
  IconButton,
  Grid,
} from '@mui/material';
import axiosInstance from '../../api/axiosinstance';
import { departmentsendUrl } from '../../api/baseUrl';
import { employeesendUrl } from '../../api/baseUrl';
import { useNavigate } from 'react-router-dom';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

const CreateEmployee = () => {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    empID: '',
    name: '',
    department: '',
    experience: '',
    salary: '',
    hireDate: '',
    performanceScore: [
      { year: new Date().getFullYear(), score: '' },
    ],
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axiosInstance.get(departmentsendUrl.getdepartment);
        setDepartments(res.data.data || res.data); // adjust based on response
      } catch (err) {
        console.error('Error fetching departments:', err);
      }
    };
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePerformanceChange = (index, field, value) => {
    const updatedScores = [...formData.performanceScore];
    updatedScores[index][field] = value;
    setFormData(prev => ({ ...prev, performanceScore: updatedScores }));
  };

  const addScore = () => {
    setFormData(prev => ({
      ...prev,
      performanceScore: [...prev.performanceScore, { year: '', score: '' }],
    }));
  };

  const removeScore = (index) => {
    const updated = formData.performanceScore.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, performanceScore: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(employeesendUrl.postemployee, formData); // Adjust your backend URL
      console.log('Employee created successfully:', formData);
      
    navigate('/employees'); // Redirect after success
    } catch (err) {
      console.error('Error creating employee:', err);
      alert('Failed to create employee.');
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
        <Typography variant="h5" gutterBottom>
          Create Employee
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            select
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          >
            {departments.map((dept) => (
              <MenuItem key={dept._id} value={dept._id}>
                {dept.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Salary"
            name="salary"
            type="number"
            value={formData.salary}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Hire Date"
            name="hireDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.hireDate}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
          />
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            Performance Scores
          </Typography>
          {formData.performanceScore.map((score, index) => (
            <Grid container spacing={2} alignItems="center" key={index} sx={{ mb: 1 }}>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Year"
                  type="number"
                  value={score.year}
                  onChange={(e) =>
                    handlePerformanceChange(index, 'year', e.target.value)
                  }
                  required
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Score"
                  type="number"
                  value={score.score}
                  onChange={(e) =>
                    handlePerformanceChange(index, 'score', e.target.value)
                  }
                  required
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  onClick={() => removeScore(index)}
                  disabled={formData.performanceScore.length === 1}
                >
                  <RemoveCircleOutline />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button
            startIcon={<AddCircleOutline />}
            onClick={addScore}
            sx={{ mb: 2 }}
          >
            Add Score
          </Button>
          <Box sx={{ mt: 3 }}>
            <Button type="submit" variant="contained" color="primary">
              Create Employee
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateEmployee;
