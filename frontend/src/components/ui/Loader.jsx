import React from 'react';
import { Box, keyframes } from '@mui/material';

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const dotAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const outlineAnimation = keyframes`
  0% {
    transform: scale(0);
    outline: solid 20px #e0e0e0;
    outline-offset: 0;
    opacity: 1;
  }
  100% {
    transform: scale(1);
    outline: solid 0 transparent;
    outline-offset: 20px;
    opacity: 0;
  }
`;

const Loader = ({ size = 'medium', color = '#e0e0e0' }) => {
  const circleSize = size === 'small' ? 16 : size === 'large' ? 24 : 20;
  const dotSize = size === 'small' ? 12 : size === 'large' ? 20 : 16;
  
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        py: 2
      }}
    >
      {[0, 1, 2, 3].map((index) => (
        <Box
          key={index}
          sx={{
            position: 'relative',
            width: circleSize,
            height: circleSize,
            border: `2px solid ${color}`,
            borderRadius: '50%',
            animation: `${pulseAnimation} 2s ease-in-out infinite`,
            animationDelay: `${index * 0.3}s`,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: dotSize,
              height: dotSize,
              borderRadius: '50%',
              backgroundColor: color,
              animation: `${dotAnimation} 2s ease-in-out infinite`,
              animationDelay: `${index * 0.3}s`,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: circleSize,
              height: circleSize,
              borderRadius: '50%',
              animation: `${outlineAnimation} 2s ease-in-out infinite`,
              animationDelay: `${(index + 3) * 0.3}s`,
            }
          }}
        />
      ))}
    </Box>
  );
};

export default Loader; 