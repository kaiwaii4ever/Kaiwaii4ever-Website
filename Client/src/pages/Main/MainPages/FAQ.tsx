import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface FAQItem {
  question: string;
  answer: string;
}


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

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #0f1419 0%, #1a1f2e 100%)'
    : '#ffffff',
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(56, 189, 248, 0.1)'
    : `1px solid ${theme.palette.divider}`,
  borderRadius: '12px !important',
  marginBottom: theme.spacing(2),
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 12px rgba(0, 0, 0, 0.5)'
    : '0 4px 12px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: `0 0 ${theme.spacing(2)} 0`,
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 24px rgba(0, 0, 0, 0.7), 0 0 20px rgba(56, 189, 248, 0.15)'
      : '0 8px 24px rgba(0, 0, 0, 0.12)',
    border: theme.palette.mode === 'dark'
      ? '1px solid rgba(56, 189, 248, 0.3)'
      : `1px solid ${theme.palette.primary.main}`,
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  '& .MuiAccordionSummary-content': {
    margin: 0,
  },
  '&.Mui-expanded': {
    minHeight: 48,
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2, 3, 3),
  borderTop: theme.palette.mode === 'dark'
    ? '1px solid rgba(56, 189, 248, 0.1)'
    : `1px solid ${theme.palette.divider}`,
}));

const faqData: FAQItem[] = [
  {
    question: 'What inspired you to start YATB (You Are the Bench)?',
    answer:
      'Nothing really... it just came to me one day and I was like, "hey, that sounds really freaking weird," and I started to develop it.',
  },
  {
    question: 'How long have you been developing Roblox games?',
    answer:
      'Since... late 2023 or early 2024, I think? I remember using a lot of free models and stuff back then.',
  },
  {
    question: 'Can I play YATB/HOM right now?',
    answer:
      'Nope, sadly not yet. Both games are still in development and will be released when they are ready. YATB will be available for testers first, then a public release. HOM will take longer since it\'s a more serious, story-driven game, and I want the story to really stick with the players.',
  },
  {
    question: 'Do you plan to add more features to YATB in the future?',
    answer:
      'Yes! Absolutely. I have a lot of ideas for new features. I\'m planning to add pets... like strays that hang around the bench, just like in real life.',
  },
  {
    question: 'How can I contact you or follow your work?',
    answer:
      'You can reach me via email at business@kaiwaii4ever.win or my socials. My social tags are Kaiwaii4ever on most platforms expect for Discord where its cravesforpizza.',
  },
  {
    question: 'Is this website regularly updated with new content?',
    answer:
      'Yes! Definitely. I plan to post updates on my projects here, and this will be my main website for all future content.',
  },
];

const FAQPage: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <PageContainer>
      <Container maxWidth="md">
        <GradientText variant="h2">
          Frequently Asked Questions
        </GradientText>
        <Divider />

        <Box>
          {faqData.map((faq, index) => (
            <StyledAccordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
            >
              <StyledAccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
              >
                <Typography variant="h6" fontWeight={600}>
                  {faq.question}
                </Typography>
              </StyledAccordionSummary>
              <StyledAccordionDetails>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ lineHeight: 1.8 }}
                >
                  {faq.answer}
                </Typography>
              </StyledAccordionDetails>
            </StyledAccordion>
          ))}
        </Box>
      </Container>
    </PageContainer>
  );
};

export default FAQPage;