import React from 'react';
import { Box, Typography, Container, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Gamepad as GamepadIcon,
  Build as BuildIcon,
  Groups as GroupsIcon,
  Science as ScienceIcon,
} from '@mui/icons-material';

const PageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  background: theme.palette.mode === 'dark' ? '#0a0e1a' : theme.palette.background.default,
  paddingTop: 120,
  paddingBottom: theme.spacing(8),
}));

const GradientText = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)'
    : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(2),
  textAlign: 'center',
}));

const Divider = styled(Box)(({ theme }) => ({
  width: 350,
  height: 3,
  borderRadius: 2,
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(90deg, #38bdf8 0%, #0ea5e9 100%)'
    : 'linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)',
  margin: '0 auto',
  marginBottom: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
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
    border: theme.palette.mode === 'dark'
      ? '1px solid rgba(56, 189, 248, 0.2)'
      : `1px solid ${theme.palette.divider}`,
  },
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
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
  height: '100%',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 12px 32px rgba(0, 0, 0, 0.8), 0 0 30px rgba(56, 189, 248, 0.15)'
      : '0 12px 32px rgba(0, 0, 0, 0.15)',
    border: theme.palette.mode === 'dark'
      ? '1px solid rgba(56, 189, 248, 0.3)'
      : `1px solid ${theme.palette.primary.main}`,
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
    ? 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)'
    : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 12px rgba(56, 189, 248, 0.3)'
    : '0 4px 12px rgba(37, 99, 235, 0.3)',
  marginBottom: theme.spacing(2),
}));

const YATBPage: React.FC = () => {
  const features = [
    {
      icon: <GamepadIcon sx={{ color: 'white', fontSize: 28 }} />,
      title: 'Gameplay',
      description: 'You spawn as a bench and wait for players to interact with you - sitting, spilling coffee, and more!',
    },
    {
      icon: <BuildIcon sx={{ color: 'white', fontSize: 28 }} />,
      title: 'Customization',
      description: 'Buy new benches with custom models. Switch between your bench perspective and character view.',
    },
    {
      icon: <GroupsIcon sx={{ color: 'white', fontSize: 28 }} />,
      title: 'Game Modes',
      description: 'Multiplayer, large servers, and event servers to keep gameplay engaging and fresh.',
    },
    {
      icon: <ScienceIcon sx={{ color: 'white', fontSize: 28 }} />,
      title: 'In-Game Items',
      description: 'Buy potions to help yourself or others - or be a menace to the server! Coming soon.',
    },
  ];

  return (
    <PageContainer>
      <Container maxWidth="lg">
        <GradientText variant="h2">YATB: You Are the Bench</GradientText>
        <Divider />

        {/* What is YATB */}
        <StyledPaper sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: 'primary.main' }}>
            What is YATB?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
            YATB, or <strong>You Are the Bench</strong>, is a Roblox game I started developing in early June 2025. 
            Alongside HOM (Half of Me), it is one of my main projects.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
            YATB is a project where I can experiment with game mechanics I never thought I would try, such as:
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
            • Pathfinding<br />
            • Using Roblox/Discord/My own APIs<br />
            • Experimenting with innovative features
          </Typography>
          <Box
            sx={{
              mt: 3,
              p: 2,
              borderRadius: 2,
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(56, 189, 248, 0.1)'
                  : 'rgba(37, 99, 235, 0.05)',
              border: (theme) =>
                theme.palette.mode === 'dark'
                  ? '1px solid rgba(56, 189, 248, 0.2)'
                  : '1px solid rgba(37, 99, 235, 0.2)',
            }}
          >
            <Typography variant="body2" color="primary.main" fontWeight={600}>
              Currently recoding the game, especially anything related to server code and game mechanics.
            </Typography>
          </Box>
        </StyledPaper>

        {/* Features Grid */}
        <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
          Key Features
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard>
                <IconWrapper>{feature.icon}</IconWrapper>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {feature.description}
                </Typography>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>

        {/* Gameplay Details */}
        <StyledPaper sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: 'primary.main' }}>
            Gameplay Experience
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
            In YATB, you spawn as a bench (yes, a bench!) and wait for players to interact with you, 
            such as sitting, spilling coffee, and more.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
            You can also buy new benches. This is where my modeling comes into play. I also made it so 
            you can switch between your bench's perspective and your character.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
            To keep the game engaging, there are several game modes, such as multiplayer, a large server, 
            and an event server.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            There are also potions you can buy to help yourself or others—or be a menace to the server. 
            This feature is still in progress but will be implemented soon!
          </Typography>
        </StyledPaper>

        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          More will probably be added later! :D
        </Typography>
      </Container>
    </PageContainer>
  );
};

export default YATBPage;