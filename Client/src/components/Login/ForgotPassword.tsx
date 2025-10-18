import React, { useState } from 'react';
import type { FormEvent } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Box,
  InputAdornment,
} from '@mui/material';
import { PersonOutline } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1),
    minWidth: '420px',
    backgroundImage: 'none',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 25px 50px -12px rgb(0 0 0 / 0.8)'
      : '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    border: theme.palette.mode === 'dark'
      ? '1px solid rgba(148, 163, 184, 0.1)'
      : '1px solid rgba(226, 232, 240, 0.8)',
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  paddingBottom: theme.spacing(1),
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)'
    : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ open, handleClose }) => {
  const [discordId, setDiscordId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateDiscordId = (id: string): boolean => {
    const discordIdRegex = /^\d{17,19}$/;
    return discordIdRegex.test(id);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!discordId.trim()) {
      setError('Discord ID is required');
      return;
    }

    if (!validateDiscordId(discordId)) {
      setError('Please enter a valid Discord ID (17-19 digits)');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://api.kaiwaii4ever.win/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discordId }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          handleCloseDialog();
        }, 2500);
      } else {
        setError(result.message || 'Failed to send reset link');
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      setError('Unable to connect to server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setDiscordId('');
    setError('');
    setSuccess(false);
    setIsLoading(false);
    handleClose();
  };

  return (
    <StyledDialog
      open={open}
      onClose={handleCloseDialog}
      maxWidth="sm"
      fullWidth
    >
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <StyledDialogTitle>Reset Password</StyledDialogTitle>
        
        <DialogContent sx={{ pt: 2 }}>
          {success ? (
            <Alert severity="success" sx={{ mb: 2 }}>
              Reset link sent! Check your Discord DMs.
            </Alert>
          ) : (
            <>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              
              <DialogContentText sx={{ mb: 3, color: 'text.secondary' }}>
                Enter your Discord User ID and we'll send you a password reset link via DM.
              </DialogContentText>

              <TextField
                autoFocus
                required
                fullWidth
                id="discord-id"
                name="discordId"
                label="Discord User ID"
                placeholder="123456789012345678"
                value={discordId}
                onChange={(e) => {
                  setDiscordId(e.target.value);
                  setError('');
                }}
                disabled={isLoading || success}
                error={!!error}
                helperText={
                  error ||
                  'Right-click your profile and select "Copy User ID"'
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={handleCloseDialog}
            disabled={isLoading}
            variant="outlined"
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Cancel
          </Button>
          
          {!success && (
            <Button
              type="submit"
              disabled={isLoading}
              variant="contained"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                minWidth: 120,
                boxShadow: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '0 4px 12px rgba(56, 189, 248, 0.3)'
                    : '0 4px 12px rgba(37, 99, 235, 0.3)',
              }}
            >
              {isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                'Send Reset Link'
              )}
            </Button>
          )}
        </DialogActions>
      </Box>
    </StyledDialog>
  );
};

export default ForgotPassword;