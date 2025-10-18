import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  Stack,
  Card,
  Checkbox,
  FormControlLabel,
  Link,
  CircularProgress,
  InputAdornment,
  IconButton,
  Fade,
  Alert,
} from '@mui/material';
import {
  HomeRounded,
  Visibility,
  VisibilityOff,
  PersonOutline,
  Key,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import ForgotPassword from '../../components/Login/ForgotPassword';

const LoginContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  background: theme.palette.mode === 'dark'
    ? '#0a0e1a'
    : 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #bae6fd 100%)',
  padding: theme.spacing(2),
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: '480px',
  padding: theme.spacing(5),
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.mode === 'dark' ? '#0f1419' : '#ffffff',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 20px 25px -5px rgb(0 0 0 / 0.9), 0 8px 10px -6px rgb(0 0 0 / 0.9)'
    : '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(56, 189, 248, 0.1)'
    : '1px solid rgba(226, 232, 240, 0.8)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 25px 50px -12px rgb(0 0 0 / 1), 0 0 30px -5px rgba(56, 189, 248, 0.15)'
      : '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    border: theme.palette.mode === 'dark'
      ? '1px solid rgba(56, 189, 248, 0.2)'
      : '1px solid rgba(226, 232, 240, 0.8)',
  },
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  gap: theme.spacing(1.5),
}));

interface LoginProps {
  mode?: 'light' | 'dark';
}

interface FormErrors {
  username: string;
  password: string;
  general: string;
}

const SignIn: React.FC<LoginProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({
    username: '',
    password: '',
    general: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      if (!token) {
        setCheckingSession(false);
        return;
      }

      try {
        const response = await fetch('https://api.kaiwaii4ever.win/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const data = await response.json();
        
        if (data.success) {
          window.location.href = '/dashboard';
        } else {
          setCheckingSession(false);
        }
      } catch {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        setCheckingSession(false);
      }
    };

    checkSession();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      username: '',
      password: '',
      general: '',
    };
    let isValid = true;

    if (!username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({ username: '', password: '', general: '' });

    try {
      const response = await fetch('https://api.kaiwaii4ever.win/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (result.success) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('token', result.token);
        
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 500);
      } else {
        setErrors((prev) => ({
          ...prev,
          general: result.message || 'Invalid credentials',
        }));
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrors((prev) => ({
        ...prev,
        general: 'Unable to connect to server. Please try again later.',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <LoginContainer>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={48} />
          <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
            Checking session...
          </Typography>
        </Box>
      </LoginContainer>
    );
  }

  return (
    <LoginContainer>
      <Fade in timeout={600}>
        <StyledCard elevation={0}>
          <HeaderBox>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <HomeRounded sx={{ fontSize: 22, color: 'primary.main' }} />
              <Typography variant="body2" color="text.secondary" fontWeight={600}>
                YATB Dashboard
              </Typography>
            </Box>
            
            <Typography variant="body2" color="text.secondary">
              Sign in to continue to YATB dashboard
            </Typography>
          </HeaderBox>

          {errors.general && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {errors.general}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2.5}>
              <FormControl fullWidth>
                <FormLabel htmlFor="username">Username</FormLabel>
                <TextField
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  error={!!errors.username}
                  helperText={errors.username}
                  disabled={isLoading}
                  autoComplete="username"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutline sx={{ color: 'text.disabled', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password}
                  disabled={isLoading}
                  autoComplete="current-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Key sx={{ color: 'text.disabled', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          disabled={isLoading}
                          sx={{ 
                            color: 'text.disabled',
                            opacity: 0.6,
                            '&:hover': { 
                              opacity: 1,
                              backgroundColor: 'transparent' 
                            }
                          }}
                        >
                          {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={isLoading}
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
                <Link
                  component="button"
                  type="button"
                  onClick={() => setForgotPasswordOpen(true)}
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                  disabled={isLoading}
                >
                  Forgot password?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{
                  mt: 1,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1rem',
                  boxShadow: (theme) =>
                    theme.palette.mode === 'dark'
                      ? '0 10px 25px -5px rgba(56, 189, 248, 0.3)'
                      : '0 10px 25px -5px rgba(37, 99, 235, 0.3)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: (theme) =>
                      theme.palette.mode === 'dark'
                        ? '0 15px 30px -5px rgba(56, 189, 248, 0.4)'
                        : '0 15px 30px -5px rgba(37, 99, 235, 0.4)',
                  },
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Sign In'
                )}
              </Button>
            </Stack>
          </Box>
        </StyledCard>
      </Fade>

      <ForgotPassword
        open={forgotPasswordOpen}
        handleClose={() => setForgotPasswordOpen(false)}
      />
    </LoginContainer>
  );
};

export default SignIn;