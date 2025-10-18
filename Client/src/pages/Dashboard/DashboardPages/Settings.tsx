import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Divider,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Button,
  Skeleton,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Logout as LogoutIcon,
  Security as SecurityIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  displayName: string;
  email: string;
  avatar: string;
  pronouns: string;
  DOB: string;
  username: string;
  phone: string;
}

const ProfileContainer = styled(Box)(({ theme }) => ({
  marginLeft: 260,
  marginTop: 64,
  padding: theme.spacing(4),
  minHeight: 'calc(100vh - 64px)',
  backgroundColor: theme.palette.mode === 'dark' ? '#0a0e1a' : theme.palette.background.default,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 6,
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #0f1419 0%, #1a1f2e 100%)'
    : '#ffffff',
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(56, 189, 248, 0.1)'
    : `1px solid ${theme.palette.divider}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 12px rgba(0, 0, 0, 0.5)'
    : '0 4px 12px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 24px rgba(0, 0, 0, 0.7), 0 0 20px rgba(56, 189, 248, 0.1)'
      : '0 8px 24px rgba(0, 0, 0, 0.12)',
  },
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    textAlign: 'center',
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 125,
  height: 125,
  border: theme.palette.mode === 'dark'
    ? '3px solid rgba(56, 189, 248, 0.3)'
    : '3px solid rgba(37, 99, 235, 0.3)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 24px rgba(56, 189, 248, 0.2)'
    : '0 8px 24px rgba(37, 99, 235, 0.2)',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: 8,
  padding: '8px 20px',
}));

const LinkButton = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  cursor: 'pointer',
  fontSize: '0.875rem',
  fontWeight: 500,
  transition: 'all 0.2s ease',
  '&:hover': {
    textDecoration: 'underline',
    color: theme.palette.primary.light,
  },
}));

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile>({
    displayName: '',
    email: '',
    avatar: '',
    pronouns: '',
    DOB: '',
    username: '',
    phone: '',
  });

  const [pronouns, setPronouns] = useState('');
  const [dobYear, setDobYear] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobDay, setDobDay] = useState('');
  const [loading, setLoading] = useState(true);
  const [hidePersonalInfo, setHidePersonalInfo] = useState(false);

  const years = Array.from({ length: 50 }, (_, i) => 1975 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const response = await fetch('https://api.kaiwaii4ever.win/api/userdata', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (data.success && data.user) {
          const u = data.user;
          setUser({
            displayName: u.displayName || '',
            email: u.email || '',
            avatar: u.PFP || 'https://wallpapers-clan.com/wp-content/uploads/2022/08/default-pfp-1.jpg',
            pronouns: u.pronouns || '',
            DOB: u.DOB || '',
            username: u.username || (Array.isArray(u.auth) ? u.auth[0] : 'N/A'),
            phone: u.phone || u.Phone_Number || 'N/A',
          });

          setPronouns(u.pronouns || '');

          if (u.DOB) {
            const parts = u.DOB.split('/');
            if (parts.length === 3) {
              setDobYear(parts[0]);
              setDobMonth(parts[1]);
              setDobDay(parts[2]);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (!confirmed) return;

    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  const handleSaveChanges = () => {
    // TODO: Implement save functionality
    console.log('Save changes:', { pronouns, dobYear, dobMonth, dobDay });
  };

  if (loading) {
    return (
      <ProfileContainer>
        <Skeleton variant="circular" width={100} height={100} />
        <Skeleton variant="rectangular" width="100%" height={400} sx={{ mt: 3, borderRadius: 2 }} />
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <ProfileHeader>
          <StyledAvatar src={user.avatar} alt={user.displayName} />
          <Box>
            <Typography
              variant="h3"
              fontWeight={700}
              sx={{
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)'
                    : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {user.displayName || 'No Name'}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mt: 0.5 }}>
              {user.email || 'No Email'}
            </Typography>
          </Box>
        </ProfileHeader>

        <ActionButton
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Log out
        </ActionButton>
      </Box>

      <Divider sx={{ mb: 4, opacity: 0.1 }} />

      {/* Public Profile */}
      <StyledPaper sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" fontWeight={700}>
            Public Profile
          </Typography>
          <ActionButton variant="outlined" startIcon={<EditIcon />} size="small">
            Edit
          </ActionButton>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Display Name
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {user.displayName || 'N/A'}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Username
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              @{user.username || 'N/A'}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Pronouns</InputLabel>
              <Select
                value={pronouns}
                onChange={(e: SelectChangeEvent) => setPronouns(e.target.value)}
                label="Pronouns"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="He/Him">He/Him</MenuItem>
                <MenuItem value="She/Her">She/Her</MenuItem>
                <MenuItem value="They/Them">They/Them</MenuItem>
                <MenuItem value="Any/Others">Any/Others</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
              Date of Birth
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Year</InputLabel>
                  <Select value={dobYear} onChange={(e) => setDobYear(e.target.value)}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Month</InputLabel>
                  <Select value={dobMonth} onChange={(e) => setDobMonth(e.target.value)}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {months.map((month) => (
                      <MenuItem key={month} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Day</InputLabel>
                  <Select value={dobDay} onChange={(e) => setDobDay(e.target.value)}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {days.map((day) => (
                      <MenuItem key={day} value={day}>
                        {day}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, opacity: 0.1 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <LinkButton>Forgot or want to change username?</LinkButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LinkButton onClick={() => setHidePersonalInfo(!hidePersonalInfo)}>
              {hidePersonalInfo ? 'Show' : 'Hide'} your Date of Birth and Phone Number
            </LinkButton>
            {hidePersonalInfo ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          <ActionButton variant="contained" startIcon={<SaveIcon />} onClick={handleSaveChanges}>
            Save Changes
          </ActionButton>
        </Box>
      </StyledPaper>

      {/* Account Info */}
      <StyledPaper sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
          Account Info
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Email
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {user.email || 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Phone Number
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {hidePersonalInfo ? '••••••••••' : user.phone || 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Password
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              ••••••••
            </Typography>
          </Grid>
        </Grid>
      </StyledPaper>

      {/* Miscellaneous */}
      <StyledPaper>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
          Miscellaneous
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <LinkButton>
            <SecurityIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
            Add 2FA to your account
          </LinkButton>
          <LinkButton>Forgot your email?</LinkButton>
          <LinkButton>Forgot your password?</LinkButton>

          <Divider sx={{ my: 2, opacity: 0.1 }} />

          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Legal & Rules
          </Typography>
          <LinkButton>Policy</LinkButton>
          <LinkButton>Rules</LinkButton>
          <LinkButton>In-Game Rules</LinkButton>
        </Box>
      </StyledPaper>
    </ProfileContainer>
  );
};

export default SettingsPage;