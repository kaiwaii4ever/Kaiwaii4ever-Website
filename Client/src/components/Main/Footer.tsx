import React, { useState } from 'react';
import {
  Box,
  Typography,
  Link,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Container,
  alpha,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  YouTube as YouTubeIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

type DialogType = 'policy' | 'rules' | 'inGameRules' | null;

interface FooterLink {
  label: string;
  dialogType: Exclude<DialogType, null>;
}

const FooterContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.mode === 'dark' ? '#0f172a' : theme.palette.background.default,
  borderTop: theme.palette.mode === 'dark'
    ? '1px solid rgba(56, 189, 248, 0.1)'
    : `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(6, 0),
})) as typeof Box;

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  cursor: 'pointer',
  fontSize: '0.875rem',
  fontWeight: 500,
  transition: 'all 0.2s ease',
  '&:hover': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
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
    transform: 'translateY(-2px)',
  },
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    backgroundImage: 'none',
    backgroundColor: theme.palette.mode === 'dark' ? '#0f1419' : theme.palette.background.paper,
    border: theme.palette.mode === 'dark'
      ? '1px solid rgba(56, 189, 248, 0.2)'
      : `1px solid ${theme.palette.divider}`,
    boxShadow: theme.palette.mode === 'dark'
      ? '0 24px 48px rgba(0, 0, 0, 0.8)'
      : '0 24px 48px rgba(0, 0, 0, 0.12)',
    maxWidth: 600,
  },
}));

const DialogHeader = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: theme.palette.mode === 'dark'
    ? '1px solid rgba(56, 189, 248, 0.1)'
    : `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2, 3),
}));

const POLICY_TEXT = `Privacy Policy

Effective Date: 9/23/2025

Your privacy is important. This Privacy Policy explains how we collect, use, and protect information on this website.

1. Information We Collect
We only collect personal information from individuals who act as moderators, testers, or administrators for our game. This information may include:

Name, Email address, Game account information, Extra information provided by the user

No information is collected from general visitors.

2. How We Use Your Information
The information we collect is used solely to:

Manage game moderation and testing, Communicate important updates or instructions regarding the game, Ensure proper access to administrative or testing features

3. Information Sharing
We do not sell, rent, or share your personal information with third parties, except as required by law.

4. Data Security
We implement reasonable security measures to protect your information from unauthorized access, alteration, or disclosure.

5. Your Rights
You may request access to, correction of, or deletion of your personal information by contacting us at Kai@kaiwaii4ever.win or Kaiwaii4ever@gmail.com

6. Changes to This Policy
We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Effective Date."

Contact
If you have questions or concerns about this Privacy Policy, contact us at: Support@kaiwaii4ever.win or via Discord server.`;

const RULES_TEXT = `General Rules for YATB/HOM community

1. Be Respectful
Treat everyone with respect. Harassment, hate speech, threats, or discriminatory behavior will not be tolerated.

2. No Spamming or Advertising
Do not spam messages, links, or advertisements. Self-promotion without permission is not allowed.

3. Appropriate Content Only
Keep content suitable for the community. Explicit, illegal, or offensive material is prohibited.

4. Follow Moderator Instructions
Moderators, admins, and website staff have the final say. Follow their instructions respectfully.

5. Account Security
Do not share your account credentials or attempt to access others' accounts without permission.

6. Privacy and Data
Do not share personal information of yourself or others. Any data collected on this website or Discord is used solely for game administration and testing purposes.

7. No Exploits or Cheating
Do not use hacks, exploits, or cheats in the game or any related platform.

8. Respect Community Spaces
Keep discussions relevant to the channel or forum. Off-topic conversations should go to designated areas.

9. Reporting Issues
If you see rule-breaking behavior or have concerns, report it to a moderator or admin.

10. Consequences
Violation of these rules may result in warnings, temporary suspension, or permanent bans from the website, Discord server, or game, depending on the severity of the offense.`;

const IN_GAME_RULES_TEXT = `YATB – In-Game Rules

Be Respectful: No harassment, hate speech, or offensive behavior toward other players.

No Cheating or Exploits: Do not use hacks, bugs, or exploits to gain an unfair advantage.

Keep Content Appropriate: All usernames, chat messages, and shared content must be suitable for all players.

Follow Staff Instructions: Moderators and admins have the final say; follow their guidance respectfully.

Protect Privacy: Do not share personal information of yourself or others.

Consequences: Breaking these rules may result in warnings, temp ban, or permanent bans from the game.`;

const footerLinks: FooterLink[] = [
  { label: 'Policy', dialogType: 'policy' },
  { label: 'Rules', dialogType: 'rules' },
  { label: 'In-Game Rules', dialogType: 'inGameRules' },
];

const Footer: React.FC = () => {
  const [openDialog, setOpenDialog] = useState<DialogType>(null);

  const handleOpenDialog = (dialogType: Exclude<DialogType, null>) => {
    setOpenDialog(dialogType);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
  };

  const getDialogContent = () => {
    switch (openDialog) {
      case 'policy':
        return { title: 'Privacy Policy', content: POLICY_TEXT };
      case 'rules':
        return { title: 'Community Rules', content: RULES_TEXT };
      case 'inGameRules':
        return { title: 'In-Game Rules', content: IN_GAME_RULES_TEXT };
      default:
        return { title: '', content: '' };
    }
  };

  const dialogData = getDialogContent();

  return (
    <>
      <FooterContainer component="footer">
        <Container maxWidth="lg">
          {/* Top Section */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', md: 'center' },
              mb: 4,
              gap: 4,
            }}
          >
            {/* Brand */}
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  background: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)'
                      : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Kaiwaii4ever
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Insipried version of MUI blog 
              </Typography>
            </Box>

            {/* Links */}
            <Stack direction="row" spacing={3}>
              {footerLinks.map((link) => (
                <FooterLink
                  key={link.dialogType}
                  onClick={() => handleOpenDialog(link.dialogType)}
                >
                  {link.label}
                </FooterLink>
              ))}
            </Stack>
          </Box>

          {/* Bottom Section */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
              pt: 3,
              borderTop: (theme) =>
                theme.palette.mode === 'dark'
                  ? '1px solid rgba(56, 189, 248, 0.1)'
                  : `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Kaiwaii4ever. All rights reserved.
            </Typography>

            {/* Social Icons */}
            <Stack direction="row" spacing={1.5}>
              <a
                href="https://github.com/kaiwaii4ever"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <SocialIconButton size="small">
                  <GitHubIcon fontSize="small" />
                </SocialIconButton>
              </a>

              <a
                href="https://www.youtube.com/@Kaiwaii4ever"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <SocialIconButton size="small">
                  <YouTubeIcon fontSize="small" />
                </SocialIconButton>
              </a>
            </Stack>
          </Box>
        </Container>
      </FooterContainer>

      {/* Dialog */}
      <StyledDialog
        open={openDialog !== null}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogHeader>
          <Typography variant="h6" fontWeight={700}>
            {dialogData.title}
          </Typography>
          <IconButton onClick={handleCloseDialog} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogHeader>

        <DialogContent sx={{ py: 3 }}>
          {dialogData.content.split('\n\n').map((paragraph, idx) => (
            <Typography
              key={idx}
              paragraph
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.7 }}
            >
              {paragraph}
            </Typography>
          ))}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Close
          </Button>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default Footer;