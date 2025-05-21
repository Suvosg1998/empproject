import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  CircularProgress,
} from '@mui/material';
import axiosInstance from '../../api/axiosinstance';
import { departmentsendUrl, employeesendUrl } from '../../api/baseUrl';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axiosInstance.get(`${employeesendUrl.getemployeebyid}/${id}`);
        setEmployee(res.data.data);
      } catch (err) {
        console.error('Error fetching employee:', err);
      }
    };

    const fetchDepartments = async () => {
      try {
        const res = await axiosInstance.get(departmentsendUrl.getdepartment);
        setDepartments(res.data.data);
      } catch (err) {
        console.error('Error fetching departments:', err);
      }
    };

    Promise.all([fetchEmployee(), fetchDepartments()]).then(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setUpdating(true);
      await axiosInstance.put(`${employeesendUrl.updateemployee}/${id}`, employee);
      navigate('/employees');
    } catch (err) {
      console.error('Error updating employee:', err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading || !employee) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

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
        <Box
          sx={{
            p: 5,
            minWidth: 400,
            maxWidth: 500,
            width: '100%',
            borderRadius: 3,
            bgcolor: '#fff',
          }}
        >
          <Typography variant="h5" mb={3}>
            Edit Employee
          </Typography>

          <TextField
            label="Employee ID"
            name="empID"
            value={employee.empID}
            onChange={handleChange}
            fullWidth
        margin="normal"
      />
      <TextField
        label="Name"
        name="name"
        value={employee.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        select
        label="Department"
        name="department"
        value={employee.department}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        {departments.map((dept) => (
          <MenuItem key={dept._id} value={dept._id}>
            {dept.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Experience"
        name="experience"
        value={employee.experience}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Salary"
        name="salary"
        type="number"
        value={employee.salary}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Hire Date"
        name="hireDate"
        type="date"
        value={employee.hireDate?.substring(0, 10)}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleSubmit}
        disabled={updating}
      >
        {updating ? 'Updating...' : 'Update Employee'}
      </Button>
    </Box>
    </Box>
  );
};

export default EditEmployee;
