import React, { useState } from "react";
import PropertyList from "../property/PropertyList";
import { useAuth } from '../../context/AuthContext';
import { Button, Box, TextField, MenuItem, Grid, Typography, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const propertyTypes = [
  '', 'House', 'Apartment', 'Condo', 'Townhouse', 'Land', 'Other'
];

const Properties = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    location: ''
  });

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilters(f => ({
      ...f,
      location: params.get('location') || '',
      type: params.get('type') || '',
      maxPrice: params.get('maxPrice') || '',
      minPrice: params.get('minPrice') || '',
      search: params.get('search') || ''
    }));
    // eslint-disable-next-line
  }, [location.search]);

  const handleChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ background: '#f7f9fb', minHeight: '100vh', py: { xs: 2, sm: 6 } }}>
      <Box maxWidth="lg" mx="auto" px={{ xs: 1, sm: 2, md: 0 }}>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} mb={4} gap={2}>
          <Typography variant="h4" fontWeight={700} textAlign={{ xs: 'left', sm: 'center' }} flex={1}>
            Browse Properties
          </Typography>
          {user && (
            <Button variant="contained" color="primary" size="large" sx={{ fontWeight: 600, width: { xs: '100%', sm: 'auto' } }} onClick={() => navigate('/property/add')}>
              Add Property
              </Button>
          )}
        </Box>
        <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, mb: 5, borderRadius: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Search by title or location"
                name="search"
                value={filters.search}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                select
                label="Type"
                name="type"
                value={filters.type}
                onChange={handleChange}
                fullWidth
                size="small"
              >
                {propertyTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type || 'All Types'}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={2}>
              <TextField
                label="Min Price"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleChange}
                type="number"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6} sm={2}>
              <TextField
                label="Max Price"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleChange}
                type="number"
                fullWidth
                size="small"
              />
        </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Location"
                name="location"
                value={filters.location}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
        </Paper>
        <Box mt={4}>
          <PropertyList filters={filters} />
          </Box>
    </Box>
    </Box>
  );
};

export default Properties;
