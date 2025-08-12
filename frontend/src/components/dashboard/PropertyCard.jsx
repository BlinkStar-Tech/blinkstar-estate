import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Stack,
} from '@mui/material';
import {
  LocationOn,
  Hotel,
  Bathtub,
  DirectionsCar,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const PropertyImage = styled(CardMedia)(({ theme }) => ({
  paddingTop: '56.25%', // 16:9 aspect ratio
  position: 'relative',
}));

const PropertyStatus = styled(Chip)(({ theme, status }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(2),
  zIndex: 1,
  backgroundColor: status === 'For Sale' ? theme.palette.success.main : theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const FavoriteButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
  },
}));

const PropertyInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
}));

export default function PropertyCard({ property }) {
  const [isFavorite, setIsFavorite] = React.useState(property.isFavorite);

  const toggleFavorite = (event) => {
    event.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <StyledCard>
      <Box sx={{ position: 'relative' }}>
        <PropertyStatus
          label={property.status}
          status={property.status}
          size="small"
        />
        <FavoriteButton
          size="small"
          onClick={toggleFavorite}
          aria-label="add to favorites"
        >
          {isFavorite ? (
            <Favorite sx={{ color: 'error.main' }} />
          ) : (
            <FavoriteBorder />
          )}
        </FavoriteButton>
        <PropertyImage
          image={property.imageUrl}
          title={property.title}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom component="div" noWrap>
          {property.title}
        </Typography>
        <Stack spacing={1}>
          <PropertyInfo>
            <LocationOn fontSize="small" />
            <Typography variant="body2" noWrap>
              {property.location}
            </Typography>
          </PropertyInfo>
          <Typography
            variant="h6"
            color="primary"
            sx={{ fontWeight: 'bold' }}
          >
            ${property.price.toLocaleString()}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2,
            }}
          >
            <PropertyInfo>
              <Hotel fontSize="small" />
              <span>{property.beds} Beds</span>
            </PropertyInfo>
            <PropertyInfo>
              <Bathtub fontSize="small" />
              <span>{property.baths} Baths</span>
            </PropertyInfo>
            <PropertyInfo>
              <DirectionsCar fontSize="small" />
              <span>{property.parking} Park</span>
            </PropertyInfo>
          </Box>
        </Stack>
      </CardContent>
    </StyledCard>
  );
} 