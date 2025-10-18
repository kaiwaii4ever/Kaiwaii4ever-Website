import React from 'react';
import { Box, Typography, Container, Paper, Grid, Chip, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Code as CodeIcon,
  Brush as BrushIcon,
  Videocam as VideocamIcon,
  Api as ApiIcon,
  Favorite as FavoriteIcon,
  MusicNote as MusicNoteIcon,
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

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
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

const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius: 8,
  fontWeight: 500,
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(56, 189, 248, 0.3)'
    : `1px solid ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.mode === 'dark'
    ? 'rgba(56, 189, 248, 0.1)'
    : 'rgba(37, 99, 235, 0.08)',
  color: theme.palette.primary.main,
}));

const AboutPage: React.FC = () => {
  const skills = [
    {
      icon: <CodeIcon sx={{ color: 'white' }} />,
      title: 'Programming',
      description: 'Lua, HTML/CSS, JavaScript - Most work in Luau (Roblox Studio)',
    },
    {
      icon: <BrushIcon sx={{ color: 'white' }} />,
      title: 'Animation & Rigging',
      description: 'Learning since mid/late 2024, still fairly new to the concept',
    },
    {
      icon: <VideocamIcon sx={{ color: 'white' }} />,
      title: 'Video Editing',
      description: 'Basic editing for TikTok & Instagram using After Effects 2023',
    },
    {
      icon: <ApiIcon sx={{ color: 'white' }} />,
      title: 'API Development',
      description: 'Exploring APIs and API calls - this website also uses them!',
    },
  ];

  const favoriteGames = ['Roblox', 'Limbus Company', 'Minecraft', 'Honkai Star Rail'];
  const interests = ['Long talks', 'Music', 'Hanging out with friends', 'Sleeping'];
  
  const artists = [
    'Billie Eilish', 'Mili', 'Gracie Abrams', 'Halsey', 'Sydney Rose',
    'Charli XCX', 'Wisp', 'The Marías', 'Penelope Scott',
    'Genshin Impact OST', 'Limbus Company OST', 'Forsaken OST',
  ];

  return (
    <PageContainer>
      <Container maxWidth="lg">
        <GradientText variant="h2">Get To Know Me</GradientText>
        <Divider />

        {/* Introduction */}
        <StyledPaper sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: 'primary.main' }}>
            Introduction
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 1 }}>
            Hello! I'm <strong>Kaiwaii4ever</strong>, also known as <strong>Kai</strong>.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            I'm a Roblox developer and have been learning animation and modeling.
          </Typography>
        </StyledPaper>

        {/* Skills */}
        <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
          Current Skills
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {skills.map((skill, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <StyledPaper sx={{ height: '100%' }}>
                <IconWrapper>{skill.icon}</IconWrapper>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {skill.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {skill.description}
                </Typography>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>

        {/* Likes */}
        <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
          Likes & Interests
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <StyledPaper>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <FavoriteIcon sx={{ color: 'primary.main' }} />
                <Typography variant="h6" fontWeight={600}>
                  Favorite Games
                </Typography>
              </Box>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {favoriteGames.map((game, idx) => (
                  <StyledChip key={idx} label={game} size="small" />
                ))}
              </Stack>
            </StyledPaper>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledPaper>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <FavoriteIcon sx={{ color: 'primary.main' }} />
                <Typography variant="h6" fontWeight={600}>
                  Interests
                </Typography>
              </Box>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {interests.map((interest, idx) => (
                  <StyledChip key={idx} label={interest} size="small" />
                ))}
              </Stack>
            </StyledPaper>
          </Grid>
        </Grid>

        <StyledPaper sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <MusicNoteIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Favorite Artists
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {artists.map((artist, idx) => (
              <StyledChip key={idx} label={artist} size="small" />
            ))}
          </Stack>
        </StyledPaper>

        <StyledPaper sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: 'primary.main' }}>
            Favorite People
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Jackie/Miyuki, P/Y, S/R, and most of my classmates (initials only for privacy)
          </Typography>
        </StyledPaper>

        {/* Dislikes */}
        <StyledPaper sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: 'error.main' }}>
            Dislikes
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Rude people, homophobes, and individuals who force their opinions onto others.
          </Typography>
        </StyledPaper>

        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          More will probably be added later! :D
        </Typography>
      </Container>
    </PageContainer>
  );
};

export default AboutPage;