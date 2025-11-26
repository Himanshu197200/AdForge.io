import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Profile
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">Name: {user.name}</Typography>
        <Typography variant="body1">Email: {user.email}</Typography>
        <Typography variant="body1">Role: {user.role}</Typography>
        {user.department && <Typography variant="body1">Department: {user.department}</Typography>}
        {user.year && <Typography variant="body1">Year: {user.year}</Typography>}
      </Paper>
    </Box>
  );
};

export default Profile;
