import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  alpha,
  Skeleton,
  useTheme,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
  AttachMoney as MoneyIcon,
  Schedule as ScheduleIcon,
  Code as CodeIcon,
  BugReport as BugIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface UserData {
  displayName: string;
  role: string;
}

interface Stats {
  activePlayers: string | number;
  totalVisits: string | number;
  totalRevenue: string | number;
}

interface StatCardData {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const DashboardContainer = styled(Box)(({ theme }) => ({
  marginLeft: 260,
  marginTop: 64,
  padding: theme.spacing(6),
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
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 24px rgba(0, 0, 0, 0.7), 0 0 20px rgba(56, 189, 248, 0.1)'
      : '0 8px 24px rgba(0, 0, 0, 0.12)',
    border: theme.palette.mode === 'dark'
      ? '1px solid rgba(56, 189, 248, 0.2)'
      : `1px solid ${theme.palette.divider}`,
  },
}));

const StatCard = styled(Paper)<{ cardcolor: string }>(({ theme, cardcolor }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  background: theme.palette.mode === 'dark'
    ? `linear-gradient(135deg, ${alpha(cardcolor, 0.1)} 0%, ${alpha(cardcolor, 0.05)} 100%)`
    : '#ffffff',
  border: theme.palette.mode === 'dark'
    ? `1px solid ${alpha(cardcolor, 0.2)}`
    : `1px solid ${theme.palette.divider}`,
  boxShadow: theme.palette.mode === 'dark'
    ? `0 4px 12px ${alpha(cardcolor, 0.15)}`
    : '0 4px 12px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'dark'
      ? `0 8px 24px ${alpha(cardcolor, 0.3)}`
      : '0 8px 24px rgba(0, 0, 0, 0.12)',
    border: theme.palette.mode === 'dark'
      ? `1px solid ${alpha(cardcolor, 0.4)}`
      : `1px solid ${theme.palette.divider}`,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100px',
    height: '100px',
    background: `radial-gradient(circle, ${alpha(cardcolor, 0.2)} 0%, transparent 70%)`,
    transform: 'translate(30%, -30%)',
  },
}));

const IconWrapper = styled(Box)<{ iconcolor: string }>(({ iconcolor }) => ({
  width: 56,
  height: 56,
  borderRadius: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${iconcolor} 0%, ${alpha(iconcolor, 0.7)} 100%)`,
  boxShadow: `0 4px 12px ${alpha(iconcolor, 0.3)}`,
}));

const WelcomeHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& h3': {
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)'
      : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 700,
  },
}));

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState<Stats>({
    activePlayers: 'Loading...',
    totalVisits: 'Loading...',
    totalRevenue: '0',
  });
  const [user, setUser] = useState<UserData>({ displayName: '', role: '' });
  const [loading, setLoading] = useState(true);

  const versions = [
    { title: 'Game Version', value: '1.0.0', icon: <CodeIcon />, color: '#38bdf8' },
    { title: 'IN-DEV Version', value: '1.2-beta', icon: <BugIcon />, color: '#0ea5e9' },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    const fetchDashboard = async () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://api.kaiwaii4ever.win/api/userdata', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        if (data.success) {
          setUser(data.user);
          setStats({
            activePlayers: data.stats.activePlayers,
            totalVisits: data.stats.totalVisits,
            totalRevenue: data.stats.totalRevenue,
          });
        }
      } catch (err) {
        console.error('Error fetching dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = currentTime.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const statCards: StatCardData[] = [
    {
      title: 'Active Players',
      value: stats.activePlayers,
      icon: <TrendingUpIcon />,
      color: '#22c55e',
    },
    {
      title: 'Total Visits',
      value: stats.totalVisits,
      icon: <VisibilityIcon />,
      color: '#38bdf8',
    },
    {
      title: 'Total Revenue',
      value: `R$${stats.totalRevenue}`,
      icon: <MoneyIcon />,
      color: '#f59e0b',
    },
  ];

  if (loading) {
    return (
      <DashboardContainer>
        <Skeleton variant="text" width={300} height={60} />
        <Skeleton variant="rectangular" width="100%" height={200} sx={{ mt: 2, borderRadius: 2 }} />
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <WelcomeHeader>
        <Typography variant="h3" gutterBottom>
          Welcome back, {user.displayName || 'User'}!
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
          {user.role || 'No Role'}
        </Typography>
      </WelcomeHeader>

      {/* Time Card */}
      <StyledPaper sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
        <IconWrapper iconcolor="#38bdf8">
          <ScheduleIcon sx={{ fontSize: 28, color: 'white' }} />
        </IconWrapper>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" fontWeight={600}>
            {formattedDate}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 0.5 }}>
            {formattedTime}
          </Typography>
        </Box>
      </StyledPaper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {statCards.map((stat) => (
          <Grid item xs={12} sm={6} md={4} key={stat.title}>
            <StatCard cardcolor={stat.color}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <IconWrapper iconcolor={stat.color}>
                  {React.cloneElement(stat.icon as React.ReactElement, {
                    sx: { fontSize: 28, color: 'white' },
                  })}
                </IconWrapper>
                <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                  {stat.title}
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight={700} sx={{ position: 'relative', zIndex: 1 }}>
                {stat.value}
              </Typography>
            </StatCard>
          </Grid>
        ))}
      </Grid>

      {/* Version Cards */}
      <Grid container spacing={3}>
        {versions.map((ver) => (
          <Grid item xs={12} sm={6} key={ver.title}>
            <StatCard cardcolor={ver.color}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <IconWrapper iconcolor={ver.color}>
                  {React.cloneElement(ver.icon as React.ReactElement, {
                    sx: { fontSize: 28, color: 'white' },
                  })}
                </IconWrapper>
                <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                  {ver.title}
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight={700} sx={{ position: 'relative', zIndex: 1 }}>
                {ver.value}
              </Typography>
            </StatCard>
          </Grid>
        ))}
      </Grid>
    </DashboardContainer>
  );
};

export default Dashboard;