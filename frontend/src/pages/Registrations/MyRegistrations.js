import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Chip, CircularProgress } from '@mui/material';
import { registrationService } from '../../services/registrationService';

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await registrationService.getMyRegistrations();
      setRegistrations(response.data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Registrations
      </Typography>
      <Grid container spacing={3}>
        {registrations.map((reg) => (
          <Grid item xs={12} md={6} key={reg.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{reg.event.title}</Typography>
                <Chip label={reg.event.status} size="small" sx={{ mt: 1 }} />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {new Date(reg.event.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Venue: {reg.event.venue}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyRegistrations;
