import React, { useState, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Collapse,
  Box,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  alpha,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  Group as GroupIcon,
  PermIdentity as PermIdentityIcon,
  FormatListBulleted as FormatListBulletedIcon,
  Code as CodeIcon,
  Circle as CircleIcon,
  Settings as SettingsIcon,
  SettingsSuggest as SettingsSuggestIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  ExpandLess,
  ExpandMore,
  MoreVert as MoreVertIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: (navigate: any, handleMenuClose: () => void) => void;
  children?: MenuItem[];
}

interface UserProfile {
  username: string;
  displayName: string;
  role: string;
  PFP: string;
}

const drawerWidth = 260;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.mode === 'dark' ? '#0f1419' : theme.palette.background.paper,
    borderRight: theme.palette.mode === 'dark' 
      ? '1px solid rgba(56, 189, 248, 0.1)' 
      : `1px solid ${theme.palette.divider}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  margin: '4px 12px',
  borderRadius: 2,
  transition: 'all 0.2s ease',
  '&.Mui-selected': {
    backgroundColor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.primary.main, 0.15)
      : alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
    borderLeft: `3px solid ${theme.palette.primary.main}`,
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark'
        ? alpha(theme.palette.primary.main, 0.2)
        : alpha(theme.palette.primary.main, 0.15),
    },
  },
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.primary.main, 0.08)
      : alpha(theme.palette.action.hover, 0.5),
  },
}));

const ProfileBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: theme.palette.mode === 'dark'
    ? '1px solid rgba(56, 189, 248, 0.1)'
    : `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.mode === 'dark'
    ? alpha('#000', 0.3)
    : alpha(theme.palette.background.default, 0.5),
}));

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <DashboardIcon fontSize="small" />,
    onClick: (navigate, handleMenuClose) => {
      navigate('/dashboard');
      handleMenuClose();
    },
  },
  {
    id: 'YATB',
    label: 'YATB',
    icon: <GroupIcon fontSize="small" />,
    children: [
      {
        id: 'documented-users',
        label: 'Documented User',
        icon: <PermIdentityIcon fontSize="small" />,
        onClick: (navigate, handleMenuClose) => {
          navigate('/dashboard/YATB/documented-users');
          handleMenuClose();
        },
      },
      {
        id: 'banned-users',
        label: 'Banned Users',
        icon: <PermIdentityIcon fontSize="small" />,
        onClick: (navigate, handleMenuClose) => {
          navigate('/dashboard/YATB/banned-users');
          handleMenuClose();
        },
      },
      {
        id: 'player-store',
        label: 'Player Store',
        icon: <FormatListBulletedIcon fontSize="small" />,
        onClick: (navigate, handleMenuClose) => {
          navigate('/dashboard/YATB/player-store');
          handleMenuClose();
        },
      },
      {
        id: 'dev',
        label: 'Dev',
        icon: <CodeIcon fontSize="small" />,
        onClick: (navigate, handleMenuClose) => {
          navigate('/dashboard/YATB/developer');
          handleMenuClose();
        },
      },
    ],
  },
  {
    id: 'YATB-INDEV',
    label: 'YATB-INDEV',
    icon: <GroupIcon fontSize="small" />,
    children: [
      {
        id: 'indev-documented-users',
        label: 'Documented User',
        icon: <PermIdentityIcon fontSize="small" />,
        onClick: (navigate, handleMenuClose) => {
          navigate('/dashboard/YATB-INDEV/documented-users');
          handleMenuClose();
        },
      },
      {
        id: 'indev-banned-users',
        label: 'Banned Users',
        icon: <PermIdentityIcon fontSize="small" />,
        onClick: (navigate, handleMenuClose) => {
          navigate('/dashboard/YATB-INDEV/banned-users');
          handleMenuClose();
        },
      },
      {
        id: 'indev-player-store',
        label: 'Player Store',
        icon: <FormatListBulletedIcon fontSize="small" />,
        onClick: (navigate, handleMenuClose) => {
          navigate('/dashboard/YATB-INDEV/player-store');
          handleMenuClose();
        },
      },
      {
        id: 'indev-dev',
        label: 'Dev',
        icon: <CodeIcon fontSize="small" />,
        onClick: (navigate, handleMenuClose) => {
          navigate('/dashboard/YATB-INDEV/developer');
          handleMenuClose();
        },
      },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon fontSize="small" />,
    children: [
      {
        id: 'general',
        label: 'General',
        icon: <SettingsSuggestIcon fontSize="small" />,
        onClick: (navigate, handleMenuClose) => {
          navigate('/dashboard/settings/general');
          handleMenuClose();
        },
      },
      {
        id: 'security',
        label: 'Security',
        icon: <SecurityIcon fontSize="small" />,
        onClick: (navigate, handleMenuClose) => {
          navigate('/dashboard/settings/security');
          handleMenuClose();
        },
      },
      {
        id: 'notifications',
        label: 'Notifications',
        icon: <NotificationsIcon fontSize="small" />,
        onClick: (navigate, handleMenuClose) => {
          navigate('/dashboard/settings/notifications');
          handleMenuClose();
        },
      },
    ],
  },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [activeItem, setActiveItem] = useState('dashboard');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  
  const menuOpen = Boolean(anchorEl);

  // Fetch user profile
  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const response = await fetch('https://api.kaiwaii4ever.win/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        
        if (data.success && data.user) {
          setProfile(data.user);
        } else {
          console.warn('Sidebar: no user in response');
        }
      } catch (err) {
        console.error('Sidebar profile fetch failed:', err);
      }
    }
    fetchProfile();
  }, []);

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    if (profile?.username) {
      navigate(`/dashboard/profile/${profile.username}`);
    } else {
      navigate('/dashboard');
    }
    handleMenuClose();
  };

  const handleSettingsClick = () => {
    navigate('/dashboard/settings');
    handleMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/login');
    handleMenuClose();
  };

  return (
    <StyledDrawer variant="permanent">
      <Box>
        <Toolbar />
        <List sx={{ px: 1, py: 2 }}>
          {menuItems.map((item) => (
            <React.Fragment key={item.id}>
              <StyledListItemButton
                onClick={() => {
                  if (item.onClick) {
                    item.onClick(navigate, handleMenuClose);
                    setActiveItem(item.id);
                  } else if (item.children) {
                    toggleMenu(item.id);
                  }
                }}
                selected={activeItem === item.id}
              >
                {item.icon && (
                  <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                )}
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: activeItem === item.id ? 600 : 500,
                  }}
                />
                {item.children && (openMenus[item.id] ? <ExpandLess /> : <ExpandMore />)}
              </StyledListItemButton>

              {item.children && (
                <Collapse in={openMenus[item.id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child) => (
                      <StyledListItemButton
                        key={child.id}
                        sx={{ pl: 5 }}
                        selected={activeItem === child.id}
                        onClick={() => {
                          if (child.onClick) {
                            child.onClick(navigate, handleMenuClose);
                            setActiveItem(child.id);
                          }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 28, color: 'inherit' }}>
                          {child.icon || <CircleIcon sx={{ fontSize: 8 }} />}
                        </ListItemIcon>
                        <ListItemText
                          primary={child.label}
                          primaryTypographyProps={{
                            fontSize: '0.8125rem',
                            fontWeight: activeItem === child.id ? 600 : 500,
                          }}
                        />
                      </StyledListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>

      <ProfileBox>
        {profile ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
              <Avatar
                alt={profile.displayName}
                src={profile.PFP}
                sx={{
                  width: 40,
                  height: 40,
                  mr: 1.5,
                  border: (theme) =>
                    theme.palette.mode === 'dark'
                      ? '2px solid rgba(56, 189, 248, 0.3)'
                      : '2px solid rgba(37, 99, 235, 0.3)',
                }}
              />
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {profile.displayName || 'Unknown'}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'block',
                  }}
                >
                  {profile.role || 'User'}
                </Typography>
              </Box>
            </Box>

            <IconButton
              size="small"
              onClick={handleMenuOpen}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              slotProps={{
                paper: {
                  sx: {
                    mt: -1,
                    minWidth: 180,
                    borderRadius: 2,
                    boxShadow: (theme) =>
                      theme.palette.mode === 'dark'
                        ? '0 8px 16px rgba(0, 0, 0, 0.9)'
                        : '0 8px 16px rgba(0, 0, 0, 0.1)',
                  },
                },
              }}
            >
              <MenuItem onClick={handleProfileClick}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleSettingsClick}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Typography variant="caption" color="text.secondary">
            Loading...
          </Typography>
        )}
      </ProfileBox>
    </StyledDrawer>
  );
};

export default Sidebar;