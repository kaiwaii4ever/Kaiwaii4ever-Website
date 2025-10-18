import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Login as LoginIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface MenuItem {
  label: string;
  path: string;
}

interface AppBarProps {
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
  logo?: string;
}
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  marginTop: 24,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: 12,
  backdropFilter: 'blur(2.5px)',
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(56, 189, 248, 0.2)'
    : `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.mode === 'dark'
    ? alpha('#0f1419', 0.8)
    : alpha(theme.palette.background.default, 0.8),
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(0, 0, 0, 0.6)'
    : '0 8px 32px rgba(0, 0, 0, 0.08)',
  padding: '10px 20px',
  transition: 'all 0.3s ease',
}));

const Logo = styled('img')({
  height: 50,
  cursor: 'pointer',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const NavButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 400,
  fontSize: '1rem',
  color: theme.palette.text.primary,
  padding: '8px 16px',
  borderRadius: 8,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.primary.main, 0.1)
      : alpha(theme.palette.primary.main, 0.08),
    color: theme.palette.primary.main,
  },
}));

const SignInButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: 8,
  padding: '8px 24px',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)'
    : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
  color: 'white',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 12px rgba(56, 189, 248, 0.3)'
    : '0 4px 12px rgba(37, 99, 235, 0.3)',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 6px 16px rgba(56, 189, 248, 0.4)'
      : '0 6px 16px rgba(37, 99, 235, 0.4)',
  },
}));

const ThemeToggleButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(56, 189, 248, 0.2)'
    : `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  padding: 8,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.primary.main, 0.1)
      : alpha(theme.palette.action.hover, 0.5),
    color: theme.palette.primary.main,
    border: theme.palette.mode === 'dark'
      ? '1px solid rgba(56, 189, 248, 0.4)'
      : `1px solid ${theme.palette.primary.main}`,
  },
}));

const MobileDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '100%',
    backgroundColor: theme.palette.mode === 'dark' ? '#0f1419' : theme.palette.background.default,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
  },
}));

const menuItems: MenuItem[] = [
  { label: 'Main Page', path: '/' },
  { label: 'Get to know me', path: '/about' },
  { label: 'YATB Project', path: '/yatb' },
  { label: 'FAQ', path: '/faq' },
];

const AppBarComponent: React.FC<AppBarProps> = ({ onThemeToggle, isDarkMode, logo }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const handleSignIn = () => {
    navigate('/login');
    setDrawerOpen(false);
  };

  return (
    <StyledAppBar>
      <Container maxWidth="lg">
        <StyledToolbar>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {logo && (
              <Logo
                src={logo}
                alt="Logo"
                onClick={() => navigate('/')}
              />
            )}

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {menuItems.map((item) => (
                <NavButton
                  key={item.path}
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </NavButton>
              ))}
            </Box>
          </Box>

          {/* Desktop Actions */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
            <SignInButton
              startIcon={<LoginIcon />}
              onClick={handleSignIn}
            >
              Sign in
            </SignInButton>

            {onThemeToggle && (
              <ThemeToggleButton onClick={onThemeToggle} size="small">
                {isDarkMode ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
              </ThemeToggleButton>
            )}
          </Box>

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            {onThemeToggle && (
              <ThemeToggleButton onClick={onThemeToggle} size="small">
                {isDarkMode ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
              </ThemeToggleButton>
            )}
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                color: 'text.primary',
                border: theme.palette.mode === 'dark'
                  ? '1px solid rgba(56, 189, 248, 0.2)'
                  : `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </StyledToolbar>
      </Container>

      {/* Mobile Drawer */}
      <MobileDrawer
        anchor="top"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, mb: 2 }}>
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'text.primary' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ px: 2 }}>
          {menuItems.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleNavigate(item.path)}
                sx={{
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.primary.main, 0.1)
                      : alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '1.125rem',
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ px: 3, mt: 3 }}>
          <SignInButton
            fullWidth
            startIcon={<LoginIcon />}
            onClick={handleSignIn}
          >
            Sign in
          </SignInButton>
        </Box>
      </MobileDrawer>
    </StyledAppBar>
  );
};

export default AppBarComponent;