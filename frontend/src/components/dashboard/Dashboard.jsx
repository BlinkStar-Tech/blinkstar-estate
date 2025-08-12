import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Card,
  CardContent,
  Grid,
  useTheme,
  useMediaQuery,
  Button,
  Paper
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Message as MessageIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../context/AuthContext';
import PropertyCard from '../property/PropertyCard';
import Loader from '../ui/Loader';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    }),
  })
);

const StyledAppBar = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  })
);

const StatsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Properties', icon: <HomeIcon />, path: '/properties' },
  { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
  { text: 'Messages', icon: <MessageIcon />, path: '/messages' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeListings: 0,
    totalViews: 0,
    newInquiries: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        
        // Fetch user profile
        const userRes = await fetch('/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();
        setUser(userData);
        
        // Fetch user's properties
        const propRes = await fetch(`/api/property/user/${userData._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const propData = await propRes.json();
        setProperties(propData.properties || []);
        
        // Fetch dashboard statistics
        const statsRes = await fetch(`/api/property/stats/${userData._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const statsData = await statsRes.json();
        setStats(statsData);
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
      setLoading(false);
    };
    
    if (authUser) {
      fetchDashboardData();
    }
  }, [authUser]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    // Add logout logic here
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    if (isMobile) {
      setOpen(false);
    }
  };

  const drawer = (
    <Box>
      <Toolbar sx={{ justifyContent: 'center', py: 2 }}>
        <Typography variant="h6" noWrap component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
          BlinkStar Properties
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleMenuItemClick(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const statsData = [
    { title: 'Total Properties', value: stats.totalProperties.toString(), color: '#2196f3' },
    { title: 'Active Listings', value: stats.activeListings.toString(), color: '#4caf50' },
    { title: 'Total Views', value: stats.totalViews.toLocaleString(), color: '#ff9800' },
    { title: 'New Inquiries', value: stats.newInquiries.toString(), color: '#f44336' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <StyledAppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={2} color="error">
                <MessageIcon />
              </Badge>
            </IconButton>
            <IconButton
              onClick={handleProfileMenuOpen}
              size="small"
              sx={{ ml: 2 }}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                U
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </StyledAppBar>

      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawer}
      </Drawer>

      <Main open={open}>
        <Toolbar /> {/* Spacing for AppBar */}
        {loading ? (
          <Loader size="large" />
        ) : (
          <>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Welcome back, {user?.name || user?.email?.split('@')[0] || 'User'}!
              </Typography>
              <Grid container spacing={3}>
                {statsData.map((stat) => (
                  <Grid item xs={12} sm={6} md={3} key={stat.title}>
                    <StatsCard>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {stat.title}
                        </Typography>
                        <Typography
                          variant="h3"
                          sx={{ color: stat.color, fontWeight: 'bold' }}
                        >
                          {stat.value}
                        </Typography>
                      </CardContent>
                    </StatsCard>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Recent Properties Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Your Properties
              </Typography>
              <Grid container spacing={3}>
                {properties.length === 0 ? (
                  <Grid item xs={12}>
                    <Typography sx={{ textAlign: 'center', color: '#999' }}>
                      No properties listed yet.
                    </Typography>
                  </Grid>
                ) : (
                  properties.map((property) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={property._id}>
                      <PropertyCard property={property} />
                    </Grid>
                  ))
                )}
              </Grid>
            </Box>
          </>
        )}
      </Main>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
      >
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
} 