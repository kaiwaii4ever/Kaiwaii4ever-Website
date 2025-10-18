import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  Card,
  CardContent,
  alpha,
  Chip,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  Code as CodeIcon,
  Terminal as TerminalIcon,
  Refresh as RefreshIcon,
  Send as SendIcon,
  Storage as StorageIcon,
  BugReport as BugReportIcon,
  Speed as SpeedIcon,
  Memory as MemoryIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const PageContainer = styled(Box)(({ theme }) => ({
  marginLeft: 260,
  marginTop: 64,
  padding: theme.spacing(4),
  minHeight: 'calc(100vh - 64px)',
  backgroundColor: theme.palette.mode === 'dark' ? '#0a0e1a' : theme.palette.background.default,
}));

const GradientText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%)'
    : 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #0f1419 0%, #1a1f2e 100%)'
    : '#ffffff',
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(168, 85, 247, 0.2)'
    : `1px solid ${theme.palette.divider}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 12px rgba(0, 0, 0, 0.5)'
    : '0 4px 12px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 24px rgba(0, 0, 0, 0.7), 0 0 20px rgba(168, 85, 247, 0.2)'
      : '0 8px 24px rgba(0, 0, 0, 0.12)',
  },
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #0f1419 0%, #1a1f2e 100%)'
    : '#ffffff',
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(168, 85, 247, 0.2)'
    : `1px solid ${theme.palette.divider}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 12px rgba(0, 0, 0, 0.5)'
    : '0 4px 12px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 12px 32px rgba(0, 0, 0, 0.8), 0 0 30px rgba(168, 85, 247, 0.3)'
      : '0 12px 32px rgba(0, 0, 0, 0.15)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 56,
  height: 56,
  borderRadius: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%)'
    : 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 12px rgba(168, 85, 247, 0.4)'
    : '0 4px 12px rgba(139, 92, 246, 0.4)',
  marginBottom: theme.spacing(2),
}));

const ConsoleBox = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#0a0e1a' : '#1e293b',
  color: '#22c55e',
  padding: theme.spacing(2),
  borderRadius: 8,
  fontFamily: 'monospace',
  fontSize: '0.875rem',
  maxHeight: 400,
  overflow: 'auto',
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(168, 85, 247, 0.3)'
    : '1px solid #334155',
}));

const DeveloperDashboard: React.FC = () => {
  const [apiCommand, setApiCommand] = useState('');
  const [consoleOutput, setConsoleOutput] = useState<string[]>([
    '> System initialized...',
    '> Connected to YATB API',
    '> Ready for commands',
  ]);
  const [stats, setStats] = useState({
    apiCalls: 1247,
    activeUsers: 342,
    serverLoad: 45,
    memoryUsage: 62,
  });

  const handleSendCommand = () => {
    if (!apiCommand.trim()) return;

    const timestamp = new Date().toLocaleTimeString();
    setConsoleOutput((prev) => [
      ...prev,
      `[${timestamp}] > ${apiCommand}`,
      `[${timestamp}] Command executed successfully`,
    ]);
    setApiCommand('');
  };

  const handleRefreshStats = () => {
    setStats({
      apiCalls: Math.floor(Math.random() * 2000) + 1000,
      activeUsers: Math.floor(Math.random() * 500) + 200,
      serverLoad: Math.floor(Math.random() * 100),
      memoryUsage: Math.floor(Math.random() * 100),
    });
    setConsoleOutput((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Stats refreshed`,
    ]);
  };

  const statsData = [
    {
      icon: <CodeIcon sx={{ color: 'white', fontSize: 28 }} />,
      label: 'API Calls',
      value: stats.apiCalls.toLocaleString(),
      color: '#a855f7',
    },
    {
      icon: <StorageIcon sx={{ color: 'white', fontSize: 28 }} />,
      label: 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      color: '#3b82f6',
    },
    {
      icon: <SpeedIcon sx={{ color: 'white', fontSize: 28 }} />,
      label: 'Server Load',
      value: `${stats.serverLoad}%`,
      color: stats.serverLoad > 70 ? '#ef4444' : '#22c55e',
    },
    {
      icon: <MemoryIcon sx={{ color: 'white', fontSize: 28 }} />,
      label: 'Memory Usage',
      value: `${stats.memoryUsage}%`,
      color: stats.memoryUsage > 80 ? '#ef4444' : '#f59e0b',
    },
  ];

  const quickActions = [
    { label: 'Clear Cache', command: 'cache.clear()', color: '#3b82f6' },
    { label: 'Restart Server', command: 'server.restart()', color: '#ef4444' },
    { label: 'Backup Data', command: 'data.backup()', color: '#22c55e' },
    { label: 'Test API', command: 'api.test()', color: '#f59e0b' },
  ];

  return (
    <PageContainer>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <BugReportIcon sx={{ fontSize: 40, color: '#a855f7' }} />
        <GradientText variant="h4">Developer Dashboard</GradientText>
        <Chip
          label="Admin Access (This is purely here just for now, theres no functionality attached)"
          size="small"
          sx={{
            ml: 2,
            background: 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%)',
            color: 'white',
            fontWeight: 600,
          }}
        />
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard>
              <IconWrapper sx={{ background: `linear-gradient(135deg, ${stat.color} 0%, ${alpha(stat.color, 0.7)} 100%)` }}>
                {stat.icon}
              </IconWrapper>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {stat.label}
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                {stat.value}
              </Typography>
            </StatCard>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* API Console */}
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TerminalIcon sx={{ color: 'primary.main' }} />
                  <Typography variant="h6" fontWeight={700}>
                    API Console
                  </Typography>
                </Box>
                <Tooltip title="Refresh Stats">
                  <IconButton onClick={handleRefreshStats} size="small">
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              <ConsoleBox>
                {consoleOutput.map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </ConsoleBox>

              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Enter API command..."
                  value={apiCommand}
                  onChange={(e) => setApiCommand(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendCommand()}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontFamily: 'monospace',
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? alpha('#0a0e1a', 0.5) : '#f8fafc',
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleSendCommand}
                  endIcon={<SendIcon />}
                  sx={{
                    background: 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%)',
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Send
                </Button>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Quick Actions
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {quickActions.map((action, idx) => (
                  <Button
                    key={idx}
                    variant="outlined"
                    fullWidth
                    onClick={() => {
                      setApiCommand(action.command);
                      handleSendCommand();
                    }}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      borderColor: action.color,
                      color: action.color,
                      '&:hover': {
                        borderColor: action.color,
                        backgroundColor: alpha(action.color, 0.1),
                      },
                    }}
                  >
                    {action.label}
                  </Button>
                ))}
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                System Status
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Chip label="API: Online" size="small" color="success" />
                <Chip label="Database: Connected" size="small" color="success" />
                <Chip label="Cache: Active" size="small" color="info" />
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default DeveloperDashboard;