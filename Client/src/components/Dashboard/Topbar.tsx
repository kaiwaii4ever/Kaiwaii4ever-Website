import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Home as HomeIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.mode === 'dark' ? '#0f1419' : theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderBottom: theme.palette.mode === 'dark'
    ? '1px solid rgba(56, 189, 248, 0.1)'
    : `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
  backdropFilter: 'blur(8px)',
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.25rem',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)'
    : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  letterSpacing: '0.5px',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  borderRadius: 8,
  padding: '6px 16px',
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(56, 189, 248, 0.3)'
    : `1px solid ${theme.palette.primary.main}`,
  color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.primary.main, 0.1)
      : alpha(theme.palette.primary.main, 0.08),
    border: theme.palette.mode === 'dark'
      ? '1px solid rgba(56, 189, 248, 0.5)'
      : `1px solid ${theme.palette.primary.dark}`,
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

interface TopbarProps {
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ onThemeToggle, isDarkMode }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleNavigate = () => {
    navigate('/');
  };

  const handleThemeToggle = () => {
    if (onThemeToggle) {
      onThemeToggle();
    }
  };

  return (
    <StyledAppBar position="fixed" elevation={0}>
      <Toolbar>
        <LogoText variant="h6" noWrap sx={{ flexGrow: 1 }}>
          YATB Dashboard
        </LogoText>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <StyledButton
            variant="outlined"
            startIcon={<HomeIcon fontSize="small" />}
            onClick={handleNavigate}
          >
            Main Page
          </StyledButton>

          {onThemeToggle && (
            <ThemeToggleButton
              onClick={handleThemeToggle}
              aria-label="toggle theme"
              size="small"
            >
              {isDarkMode ? (
                <LightModeIcon fontSize="small" />
              ) : (
                <DarkModeIcon fontSize="small" />
              )}
            </ThemeToggleButton>
          )}
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Topbar;