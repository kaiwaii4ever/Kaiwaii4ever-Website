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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  IconButton,
  InputAdornment,
  Stepper,
  Step,
  StepLabel,
  Chip,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Logout as LogoutIcon,
  Security as SecurityIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Close as CloseIcon,
  Email as EmailIcon,
  Chat as DiscordIcon,
  CheckCircle as CheckCircleIcon,
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
  twoFactorEnabled?: boolean;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
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

const ActionButton = styled(Button)(() => ({
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
  display: 'inline-flex',
  alignItems: 'center',
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
    twoFactorEnabled: false,
  });

  const [displayName, setDisplayName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [dobYear, setDobYear] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobDay, setDobDay] = useState('');
  const [loading, setLoading] = useState(true);
  const [hidePersonalInfo, setHidePersonalInfo] = useState(false);
  const [saving, setSaving] = useState(false);

  // Dialog states
  const [usernameDialog, setUsernameDialog] = useState(false);
  const [emailDialog, setEmailDialog] = useState(false);
  const [phoneDialog, setPhoneDialog] = useState(false);
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [twoFactorDialog, setTwoFactorDialog] = useState(false);
  const [forgotDialog, setForgotDialog] = useState(false);

  // Form states
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Security verification states
  const [verifyPassword, setVerifyPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [twoFactorSecret, setTwoFactorSecret] = useState('');
  const [twoFactorQR, setTwoFactorQR] = useState('');

  // Forgot password/email states
  const [forgotType, setForgotType] = useState<'email' | 'password'>('email');
  const [recoveryMethod, setRecoveryMethod] = useState<'email' | 'discord'>('email');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryStep, setRecoveryStep] = useState(0);

  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success',
  });

  const years = Array.from({ length: 50 }, (_, i) => 1975 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const API_URL = 'https://api.kaiwaii4ever.win';

  const getToken = () => localStorage.getItem('token') || sessionStorage.getItem('token');

  const showSnackbar = (message: string, severity: SnackbarState['severity'] = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = getToken();
        const response = await fetch(`${API_URL}/api/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (data.success && data.user) {
          const u = data.user;
          const profileData = {
            displayName: u.displayName || '',
            email: u.email || '',
            avatar: u.PFP || 'https://wallpapers-clan.com/wp-content/uploads/2022/08/default-pfp-1.jpg',
            pronouns: u.pronouns || '',
            DOB: u.DOB || '',
            username: u.username || (Array.isArray(u.auth) ? u.auth[0] : 'N/A'),
            phone: u.phone || u.Phone_Number || 'N/A',
            twoFactorEnabled: u.twoFactorEnabled || false,
          };
          
          setUser(profileData);
          setDisplayName(profileData.displayName);
          setPronouns(profileData.pronouns);

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
        showSnackbar('Failed to load profile', 'error');
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

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const token = getToken();
      const dob = dobYear && dobMonth && dobDay ? `${dobYear}/${dobMonth}/${dobDay}` : '';
      
      const response = await fetch(`https://api.kaiwaii4ever.win/api/user/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          displayName,
          pronouns,
          DOB: dob,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(prev => ({ ...prev, displayName, pronouns, DOB: dob }));
        showSnackbar('Profile updated successfully!', 'success');
      } else {
        showSnackbar(data.message || 'Failed to update profile', 'error');
      }
    } catch (err) {
      console.error('Error saving profile:', err);
      showSnackbar('Failed to save changes', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateEmail = async () => {
    if (!newEmail.trim() || !newEmail.includes('@')) {
      showSnackbar('Please enter a valid email', 'error');
      return;
    }

    if (!verifyPassword.trim()) {
      showSnackbar('Please enter your password to verify', 'error');
      return;
    }

    setSaving(true);
    try {
      const token = getToken();
      const response = await fetch(`https://api.kaiwaii4ever.win/api/user/email`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          email: newEmail,
          password: verifyPassword 
        }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(prev => ({ ...prev, email: newEmail }));
        showSnackbar('Email updated successfully!', 'success');
        setEmailDialog(false);
        setNewEmail('');
        setVerifyPassword('');
      } else {
        showSnackbar(data.message || 'Failed to update email', 'error');
      }
    } catch (err) {
      console.error('Error updating email:', err);
      showSnackbar('Failed to update email', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePhone = async () => {
    if (!newPhone.trim()) {
      showSnackbar('Phone number cannot be empty', 'error');
      return;
    }

    if (!verifyPassword.trim()) {
      showSnackbar('Please enter your password to verify', 'error');
      return;
    }

    setSaving(true);
    try {
      const token = getToken();
      const response = await fetch(`https://api.kaiwaii4ever.win/api/user/phone`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          phone: newPhone,
          password: verifyPassword 
        }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(prev => ({ ...prev, phone: newPhone }));
        showSnackbar('Phone number updated successfully!', 'success');
        setPhoneDialog(false);
        setNewPhone('');
        setVerifyPassword('');
      } else {
        showSnackbar(data.message || 'Failed to update phone number', 'error');
      }
    } catch (err) {
      console.error('Error updating phone:', err);
      showSnackbar('Failed to update phone number', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showSnackbar('Please fill in all password fields', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showSnackbar('New passwords do not match', 'error');
      return;
    }

    if (newPassword.length < 8) {
      showSnackbar('Password must be at least 8 characters', 'error');
      return;
    }

    setSaving(true);
    try {
      const token = getToken();
      const response = await fetch(`https://api.kaiwaii4ever.win/api/user/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        showSnackbar('Password updated successfully!', 'success');
        setPasswordDialog(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        showSnackbar(data.message || 'Failed to update password', 'error');
      }
    } catch (err) {
      console.error('Error updating password:', err);
      showSnackbar('Failed to update password', 'error');
    } finally {
      setSaving(false);
    }
  };

  // 2FA Functions
  const handleEnable2FA = async () => {
    setSaving(true);
    try {
      const token = getToken();
      const response = await fetch(`https://api.kaiwaii4ever.win/api/user/2fa/enable`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setTwoFactorSecret(data.secret);
        setTwoFactorQR(data.qrCode);
        setTwoFactorDialog(true);
      } else {
        showSnackbar(data.message || 'Failed to enable 2FA', 'error');
      }
    } catch (err) {
      console.error('Error enabling 2FA:', err);
      showSnackbar('Failed to enable 2FA', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleVerify2FA = async () => {
    if (!twoFactorCode.trim()) {
      showSnackbar('Please enter the 6-digit code', 'error');
      return;
    }

    setSaving(true);
    try {
      const token = getToken();
      const response = await fetch(`https://api.kaiwaii4ever.win/api/user/2fa/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          token: twoFactorCode,
          secret: twoFactorSecret 
        }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(prev => ({ ...prev, twoFactorEnabled: true }));
        showSnackbar('2FA enabled successfully!', 'success');
        setTwoFactorDialog(false);
        setTwoFactorCode('');
      } else {
        showSnackbar(data.message || 'Invalid code', 'error');
      }
    } catch (err) {
      console.error('Error verifying 2FA:', err);
      showSnackbar('Failed to verify 2FA', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDisable2FA = async () => {
    const confirmed = window.confirm('Are you sure you want to disable 2FA?');
    if (!confirmed) return;

    setSaving(true);
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/api/user/2fa/disable`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setUser(prev => ({ ...prev, twoFactorEnabled: false }));
        showSnackbar('2FA disabled successfully', 'success');
      } else {
        showSnackbar(data.message || 'Failed to disable 2FA', 'error');
      }
    } catch (err) {
      console.error('Error disabling 2FA:', err);
      showSnackbar('Failed to disable 2FA', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Forgot Password/Email Functions
  const handleSendRecovery = async () => {
    if (recoveryMethod === 'email' && (!recoveryEmail.trim() || !recoveryEmail.includes('@'))) {
      showSnackbar('Please enter a valid email', 'error');
      return;
    }

    setSaving(true);
    try {
      const token = getToken();
      const response = await fetch(`https://api.kaiwaii4ever.win/api/user/forgot/${forgotType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          method: recoveryMethod,
          email: recoveryMethod === 'email' ? recoveryEmail : undefined
        }),
      });

      const data = await response.json();

      if (data.success) {
        if (recoveryMethod === 'email') {
          showSnackbar('Verification code sent to your email!', 'success');
          setRecoveryStep(1);
        } else {
          showSnackbar('Recovery request sent to Discord!', 'info');
          setForgotDialog(false);
        }
      } else {
        showSnackbar(data.message || 'Failed to send recovery', 'error');
      }
    } catch (err) {
      console.error('Error sending recovery:', err);
      showSnackbar('Failed to send recovery', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleVerifyRecovery = async () => {
    if (!verificationCode.trim()) {
      showSnackbar('Please enter the verification code', 'error');
      return;
    }

    setSaving(true);
    try {
      const token = getToken();
      const response = await fetch(`https://api.kaiwaii4ever.win/api/user/verify-recovery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          code: verificationCode,
          type: forgotType
        }),
      });

      const data = await response.json();

      if (data.success) {
        showSnackbar(`Your ${forgotType} has been sent to your email!`, 'success');
        setForgotDialog(false);
        setRecoveryStep(0);
        setVerificationCode('');
      } else {
        showSnackbar(data.message || 'Invalid verification code', 'error');
      }
    } catch (err) {
      console.error('Error verifying recovery:', err);
      showSnackbar('Failed to verify code', 'error');
    } finally {
      setSaving(false);
    }
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
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
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              variant="outlined"
            />
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
                <MenuItem value=""><em>None</em></MenuItem>
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
                  <Select value={dobYear} onChange={(e) => setDobYear(e.target.value)} label="Year">
                    <MenuItem value=""><em>None</em></MenuItem>
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>{year}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Month</InputLabel>
                  <Select value={dobMonth} onChange={(e) => setDobMonth(e.target.value)} label="Month">
                    <MenuItem value=""><em>None</em></MenuItem>
                    {months.map((month) => (
                      <MenuItem key={month} value={month}>{month}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Day</InputLabel>
                  <Select value={dobDay} onChange={(e) => setDobDay(e.target.value)} label="Day">
                    <MenuItem value=""><em>None</em></MenuItem>
                    {days.map((day) => (
                      <MenuItem key={day} value={day}>{day}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, opacity: 0.1 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LinkButton onClick={() => setHidePersonalInfo(!hidePersonalInfo)}>
              {hidePersonalInfo ? 'Show' : 'Hide'} your Date of Birth and Phone Number
            </LinkButton>
            {hidePersonalInfo ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          <ActionButton
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSaveProfile}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1" fontWeight={600}>
                {user.email || 'N/A'}
              </Typography>
              <ActionButton
                variant="text"
                size="small"
                startIcon={<EditIcon />}
                onClick={() => {
                  setNewEmail(user.email);
                  setEmailDialog(true);
                }}
              >
                Edit
              </ActionButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Phone Number
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1" fontWeight={600}>
                {hidePersonalInfo ? '••••••••••' : user.phone || 'N/A'}
              </Typography>
              <ActionButton
                variant="text"
                size="small"
                startIcon={<EditIcon />}
                onClick={() => {
                  setNewPhone(user.phone);
                  setPhoneDialog(true);
                }}
              >
                Edit
              </ActionButton>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Password
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1" fontWeight={600}>
                ••••••••
              </Typography>
              <ActionButton
                variant="text"
                size="small"
                startIcon={<EditIcon />}
                onClick={() => setPasswordDialog(true)}
              >
                Change
              </ActionButton>
            </Box>
          </Grid>
        </Grid>
      </StyledPaper>

      {/* Security & Miscellaneous */}
      <StyledPaper>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
          Security & Recovery
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SecurityIcon fontSize="small" color="primary" />
              <Typography variant="body1">Two-Factor Authentication</Typography>
              {user.twoFactorEnabled && (
                <Chip label="Enabled" color="success" size="small" icon={<CheckCircleIcon />} />
              )}
            </Box>
            {user.twoFactorEnabled ? (
              <ActionButton variant="outlined" color="error" size="small" onClick={handleDisable2FA}>
                Disable
              </ActionButton>
            ) : (
              <ActionButton variant="contained" size="small" onClick={handleEnable2FA}>
                Enable 2FA
              </ActionButton>
            )}
          </Box>

          <Divider sx={{ my: 1, opacity: 0.1 }} />

          <LinkButton onClick={() => { setForgotType('email'); setForgotDialog(true); }}>
            <EmailIcon fontSize="small" sx={{ mr: 1 }} />
            Forgot your email?
          </LinkButton>
          <LinkButton onClick={() => { setForgotType('password'); setForgotDialog(true); }}>
            Forgot your password?
          </LinkButton>

          <Divider sx={{ my: 2, opacity: 0.1 }} />

          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Legal & Rules
          </Typography>
          <LinkButton>Policy</LinkButton>
          <LinkButton>Rules</LinkButton>
          <LinkButton>In-Game Rules</LinkButton>
        </Box>
      </StyledPaper>

      {/* Email Dialog with Password Verification */}
      <Dialog open={emailDialog} onClose={() => setEmailDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Change Email</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            For security, you must verify your password before changing your email.
          </Alert>
          <TextField
            margin="dense"
            label="New Email"
            type="email"
            fullWidth
            variant="outlined"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            margin="dense"
            label="Verify Your Password"
            type="password"
            fullWidth
            variant="outlined"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            sx={{ mt: 2 }}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setEmailDialog(false); setVerifyPassword(''); }}>Cancel</Button>
          <Button onClick={handleUpdateEmail} variant="contained" disabled={saving}>
            {saving ? 'Updating...' : 'Update Email'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Phone Dialog with Password Verification */}
      <Dialog open={phoneDialog} onClose={() => setPhoneDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Change Phone Number</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            For security, you must verify your password before changing your phone number.
          </Alert>
          <TextField
            margin="dense"
            label="New Phone Number"
            type="tel"
            fullWidth
            variant="outlined"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            margin="dense"
            label="Verify Your Password"
            type="password"
            fullWidth
            variant="outlined"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            sx={{ mt: 2 }}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setPhoneDialog(false); setVerifyPassword(''); }}>Cancel</Button>
          <Button onClick={handleUpdatePhone} variant="contained" disabled={saving}>
            {saving ? 'Updating...' : 'Update Phone'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Password Dialog */}
      <Dialog open={passwordDialog} onClose={() => setPasswordDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Current Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            sx={{ mt: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="dense"
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            margin="dense"
            label="Confirm New Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdatePassword} variant="contained" disabled={saving}>
            {saving ? 'Updating...' : 'Update Password'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* 2FA Setup Dialog */}
      <Dialog open={twoFactorDialog} onClose={() => setTwoFactorDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Enable Two-Factor Authentication</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 3 }}>
            Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
          </Alert>
          
          {twoFactorQR && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <img src={twoFactorQR} alt="2FA QR Code" style={{ maxWidth: '200px' }} />
            </Box>
          )}

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
            Or manually enter this secret key:
          </Typography>
          <TextField
            fullWidth
            value={twoFactorSecret}
            InputProps={{ readOnly: true }}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Enter 6-digit Code"
            value={twoFactorCode}
            onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="000000"
            inputProps={{ maxLength: 6 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setTwoFactorDialog(false); setTwoFactorCode(''); }}>Cancel</Button>
          <Button onClick={handleVerify2FA} variant="contained" disabled={saving || twoFactorCode.length !== 6}>
            {saving ? 'Verifying...' : 'Verify & Enable'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Forgot Email/Password Dialog */}
      <Dialog open={forgotDialog} onClose={() => { setForgotDialog(false); setRecoveryStep(0); }} maxWidth="sm" fullWidth>
        <DialogTitle>
          Forgot your {forgotType === 'email' ? 'Email' : 'Password'}?
        </DialogTitle>
        <DialogContent>
          <Stepper activeStep={recoveryStep} sx={{ mb: 3 }}>
            <Step>
              <StepLabel>Choose Recovery Method</StepLabel>
            </Step>
            <Step>
              <StepLabel>Verify Code</StepLabel>
            </Step>
          </Stepper>

          {recoveryStep === 0 ? (
            <>
              <Alert severity="info" sx={{ mb: 3 }}>
                Choose how you'd like to recover your {forgotType}:
              </Alert>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Recovery Method</InputLabel>
                <Select
                  value={recoveryMethod}
                  onChange={(e) => setRecoveryMethod(e.target.value as 'email' | 'discord')}
                  label="Recovery Method"
                >
                  <MenuItem value="email">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon fontSize="small" />
                      Email Verification
                    </Box>
                  </MenuItem>
                  <MenuItem value="discord">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <DiscordIcon fontSize="small" />
                      Discord Support
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>

              {recoveryMethod === 'email' ? (
                <>
                  <TextField
                    fullWidth
                    label="Your Email Address"
                    type="email"
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    placeholder="Enter your email to receive verification code"
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    We'll send a verification code to this email address.
                  </Typography>
                </>
              ) : (
                <Alert severity="warning">
                  A recovery request will be sent to our Discord support team. They will contact you to verify your identity.
                </Alert>
              )}
            </>
          ) : (
            <>
              <Alert severity="success" sx={{ mb: 3 }}>
                A verification code has been sent to your email. Please enter it below.
              </Alert>
              <TextField
                fullWidth
                label="Verification Code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                inputProps={{ maxLength: 6 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Enter the 6-digit code sent to your email.
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setForgotDialog(false); setRecoveryStep(0); }}>Cancel</Button>
          {recoveryStep === 0 ? (
            <Button onClick={handleSendRecovery} variant="contained" disabled={saving}>
              {saving ? 'Sending...' : recoveryMethod === 'discord' ? 'Contact Support' : 'Send Code'}
            </Button>
          ) : (
            <Button onClick={handleVerifyRecovery} variant="contained" disabled={saving || verificationCode.length !== 6}>
              {saving ? 'Verifying...' : 'Verify Code'}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
          action={
            <IconButton size="small" onClick={() => setSnackbar({ ...snackbar, open: false })}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ProfileContainer>
  );
};

export default SettingsPage;