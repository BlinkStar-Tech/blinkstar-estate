import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import {
  Security,
  Speed,
  MonetizationOn,
  SupportAgent,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  textAlign: 'center',
  transition: 'transform 0.3s ease-in-out',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  '&:hover': {
    transform: 'translateY(-8px)',
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 64,
  height: 64,
  margin: '0 auto',
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  boxShadow: `0 3px 10px ${theme.palette.primary.main}40`,
  [theme.breakpoints.down('sm')]: {
    width: 56,
    height: 56,
  },
}));

const features = [
  {
    title: 'Trusted Security',
    description: 'Your data and transactions are protected with bank-level security measures.',
    icon: <Security fontSize="large" />,
  },
  {
    title: 'Fast & Efficient',
    description: 'Quick property search and streamlined buying process for your convenience.',
    icon: <Speed fontSize="large" />,
  },
  {
    title: 'Best Market Price',
    description: 'Get the most competitive prices and best value for your investment.',
    icon: <MonetizationOn fontSize="large" />,
  },
  {
    title: '24/7 Support',
    description: 'Our dedicated team is always here to help you with any questions.',
    icon: <SupportAgent fontSize="large" />,
  },
];

export default function WhyChooseUs() {
  return (
    <Box 
      sx={{ 
        py: { xs: 4, sm: 6, md: 8 },
        backgroundColor: 'grey.50',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Box 
          sx={{ 
            mb: { xs: 4, sm: 5, md: 6 },
            textAlign: 'center',
            maxWidth: '800px',
            mx: 'auto'
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
              color: 'text.primary'
            }}
          >
            Why Choose Us
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              mb: { xs: 3, sm: 4 },
              fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' },
              px: { xs: 2, sm: 0 },
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            We provide the best service in the real estate industry
          </Typography>
        </Box>

        <Grid 
          container 
          spacing={{ xs: 2, sm: 3, md: 4 }}
          justifyContent="center"
          alignItems="stretch"
        >
          {features.map((feature, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={3} 
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Box 
                sx={{ 
                  width: '100%',
                  maxWidth: { xs: '340px', sm: '100%' }
                }}
              >
                <StyledCard elevation={2}>
                  <CardContent 
                    sx={{ 
                      p: { xs: 2.5, sm: 3 },
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: { xs: 1, sm: 1.5, md: 2 }
                    }}
                  >
                    <StyledAvatar>
                      {feature.icon}
                    </StyledAvatar>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ 
                        fontWeight: 600,
                        fontSize: { xs: '1.1rem', sm: '1.25rem' },
                        mb: { xs: 0.5, sm: 1 }
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        lineHeight: 1.6
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 