import React from 'react';
import { Box, Typography, Container, Button, alpha } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HeroContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #0a0e1a 0%, #0f172a 50%, #1a2332 100%)'
    : 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)',
  paddingTop: 100,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'dark'
      ? 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)'
      : 'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.05) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  zIndex: 1,
  position: 'relative',
}));

const GradientText = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)'
    : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(3),
  letterSpacing: '-0.02em',
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  borderRadius: 12,
  overflow: 'hidden',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 50px rgba(56, 189, 248, 0.2)'
    : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(56, 189, 248, 0.2)'
    : `1px solid ${theme.palette.divider}`,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 35px 60px -12px rgba(0, 0, 0, 0.9), 0 0 70px rgba(56, 189, 248, 0.3)'
      : '0 35px 60px -12px rgba(0, 0, 0, 0.3)',
  },
  '& img': {
    width: '100%',
    maxWidth: 1500,
    display: 'block',
  },
}));

const CTAButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1.125rem',
  padding: '12px 32px',
  borderRadius: 12,
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)'
    : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
  color: 'white',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 24px rgba(56, 189, 248, 0.3)'
    : '0 8px 24px rgba(37, 99, 235, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 12px 32px rgba(56, 189, 248, 0.4)'
      : '0 12px 32px rgba(37, 99, 235, 0.4)',
  },
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

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <HeroContainer>
      <Container maxWidth="lg">
        <ContentBox>
          <GradientText variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' } }}>
            Welcome
          </GradientText>

          <Divider />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 6 }}>
            <CTAButton
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/yatb')}
            >
              Explore YATB
            </CTAButton>
            <CTAButton
              variant="outlined"
              onClick={() => navigate('/about')}
              sx={{
                background: 'transparent',
                border: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '2px solid rgba(56, 189, 248, 0.5)'
                    : '2px solid #2563eb',
                color: 'primary.main',
                boxShadow: 'none',
                '&:hover': {
                  background: (theme) =>
                    theme.palette.mode === 'dark'
                      ? alpha('#38bdf8', 0.1)
                      : alpha('#2563eb', 0.08),
                  border: (theme) =>
                    theme.palette.mode === 'dark'
                      ? '2px solid rgba(56, 189, 248, 0.8)'
                      : '2px solid #1d4ed8',
                },
              }}
            >
              Get to Know Me
            </CTAButton>
          </Box>

          <ImageContainer>
            <img
              src="https://i.pinimg.com/originals/03/07/1a/03071a2c56dc599d55a715173e648920.gif"
              alt="Welcome"
              loading="lazy"
            />
          </ImageContainer>
        </ContentBox>
      </Container>
    </HeroContainer>
  );
};

export default MainPage;