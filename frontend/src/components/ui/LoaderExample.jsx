import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import Loader from './Loader';

const LoaderExample = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Loader Examples
      </Typography>
      
      <Grid container spacing={4}>
        {/* Small Loader */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Small Loader
            </Typography>
            <Loader size="small" />
            <Typography variant="body2" color="text.secondary">
              Use for inline loading states
            </Typography>
          </Paper>
        </Grid>

        {/* Medium Loader (Default) */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Medium Loader
            </Typography>
            <Loader size="medium" />
            <Typography variant="body2" color="text.secondary">
              Default size for most use cases
            </Typography>
          </Paper>
        </Grid>

        {/* Large Loader */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Large Loader
            </Typography>
            <Loader size="large" />
            <Typography variant="body2" color="text.secondary">
              Use for full-page loading states
            </Typography>
          </Paper>
        </Grid>

        {/* Custom Color Loader */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Custom Color Loader
            </Typography>
            <Loader size="medium" color="#1976d2" />
            <Typography variant="body2" color="text.secondary">
              Primary blue color
            </Typography>
          </Paper>
        </Grid>

        {/* Custom Color Loader 2 */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Custom Color Loader
            </Typography>
            <Loader size="medium" color="#2e7d32" />
            <Typography variant="body2" color="text.secondary">
              Success green color
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Usage Examples
        </Typography>
        
        <Paper sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Basic Usage
          </Typography>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '4px' }}>
{`import Loader from './components/ui/Loader';

// Default usage
<Loader />

// With custom size
<Loader size="large" />

// With custom color
<Loader size="medium" color="#1976d2" />

// In a loading state
{loading ? <Loader size="large" /> : <YourContent />}`}
          </pre>
        </Paper>
      </Box>
    </Box>
  );
};

export default LoaderExample; 