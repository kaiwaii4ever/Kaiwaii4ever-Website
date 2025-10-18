import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
  Chip,
  Skeleton,
  alpha,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Cake as CakeIcon,
  PersonOutline as PersonIcon,
  Shield as ShieldIcon,
  CalendarMonth as CalendarIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface UserProfile {
  displayName: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  pronouns: string;
  DOB: string;
  role: string;
  bio: string;
  joined: string;
}

const ProfileContainer = styled(Box)(({ theme }) => ({
  marginLeft: 260,
  marginTop: 64,
  padding: theme.spacing(4),
  minHeight: 'calc(100vh - 64px)',
  backgroundColor: theme.palette.mode === 'dark' ? '#0a0e1a' : theme.palette.background.default,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
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
  width: 150,
  height: 150,
  border: theme.palette.mode === 'dark'
    ? '4px solid rgba(56, 189, 248, 0.3)'
    : '4px solid rgba(37, 99, 235, 0.3)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 24px rgba(56, 189, 248, 0.3)'
    : '0 8px 24px rgba(37, 99, 235, 0.3)',
}));

const InfoChip = styled(Chip)(({ theme }) => ({
  borderRadius: 8,
  fontWeight: 500,
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(56, 189, 248, 0.2)'
    : `1px solid ${theme.palette.divider}`,
  background: theme.palette.mode === 'dark'
    ? alpha(theme.palette.primary.main, 0.1)
    : alpha(theme.palette.primary.main, 0.05),
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  padding: theme.spacing(1.5, 0),
  borderBottom: theme.palette.mode === 'dark'
    ? '1px solid rgba(56, 189, 248, 0.05)'
    : `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const ProfileViewPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<UserProfile>({
    displayName: '',
    username: '',
    email: '',
    phone: '',
    avatar: '',
    pronouns: '',
    DOB: '',
    role: '',
    bio: '',
    joined: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const url = username
          ? `https://api.kaiwaii4ever.win/api/userdata/${username}`
          : 'https://api.kaiwaii4ever.win/api/userdata';

        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (data.success && data.user) {
          const u = data.user;
          setUser({
            displayName: u.displayName || 'No Name',
            username: u.username || 'N/A',
            email: u.email || 'N/A',
            phone: u.phone || 'N/A',
            avatar: u.PFP || 'https://wallpapers-clan.com/wp-content/uploads/2022/08/default-pfp-1.jpg',
            pronouns: u.pronouns || 'N/A',
            DOB: u.DOB || 'N/A',
            role: u.role || 'User',
            bio: u.bio || 'No bio available',
            joined: u.joined || 'Unknown',
          });
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <ProfileContainer>
        <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
          <Skeleton variant="circular" width={120} height={120} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" height={60} />
            <Skeleton variant="text" width="40%" height={40} />
          </Box>
        </Box>
        <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 2 }} />
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      {/* Header */}
      <StyledPaper sx={{ mb: 3 }}>
        <ProfileHeader>
          <StyledAvatar src={user.avatar} alt={user.displayName} />
          <Box sx={{ flex: 1 }}>
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
                mb: 1,
              }}
            >
              {user.displayName}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              @{user.username}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <InfoChip
                icon={<ShieldIcon fontSize="small" />}
                label={user.role}
                size="small"
                color="primary"
              />
              {user.pronouns !== 'N/A' && (
                <InfoChip
                  icon={<PersonIcon fontSize="small" />}
                  label={user.pronouns}
                  size="small"
                />
              )}
              {user.DOB !== 'N/A' && (
                <InfoChip
                  icon={<CakeIcon fontSize="small" />}
                  label={user.DOB}
                  size="small"
                />
              )}
              <InfoChip
                icon={<CalendarIcon fontSize="small" />}
                label={`Joined ${user.joined}`}
                size="small"
              />
            </Box>
          </Box>
        </ProfileHeader>
      </StyledPaper>

      {/* Bio Section */}
      <StyledPaper sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
          About
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
          {user.bio !== "No bio available" ? user.bio : "This user hasn't written a bio yet."}
        </Typography>
      </StyledPaper>

      {/* Contact Info */}
      <StyledPaper>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
          Contact Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <InfoRow>
              <EmailIcon sx={{ color: 'primary.main', fontSize: 24 }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary" display="block">
                  Email
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {user.email}
                </Typography>
              </Box>
            </InfoRow>
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoRow>
              <PhoneIcon sx={{ color: 'primary.main', fontSize: 24 }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary" display="block">
                  Phone
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {user.phone}
                </Typography>
              </Box>
            </InfoRow>
          </Grid>
        </Grid>
      </StyledPaper>
    </ProfileContainer>
  );
};

export default ProfileViewPage;