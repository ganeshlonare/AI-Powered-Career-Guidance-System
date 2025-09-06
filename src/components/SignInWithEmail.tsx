import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Alert, Divider, InputAdornment, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useAuth } from '../hooks/useAuth';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import AppleIcon from '@mui/icons-material/Apple';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const WaveBackground = styled(Box)({
  position: 'relative',
  background: `linear-gradient(135deg, rgba(0, 0, 0, 0) 0%, rgba(0,0, 0, 0) 100%),
               url('/purple-bg.svg') no-repeat center center`,
  backgroundSize: 'cover',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 20px'
});

const SocialButton = styled(Button)(({ theme }) => ({
  width: '48px',
  height: '48px',
  minWidth: '48px',
  borderRadius: '50%',
  border: '1px solid #e0e0e0',
  color: '#424446',
  padding: 0,
  '&:hover': {
    backgroundColor: '#f5f5f5',
    borderColor: '#d0d0d0'
  }
}));

const SignInCard = styled(Box)({
  backgroundColor: '#fff',
  borderRadius: '16px',
  padding: '32px',
  width: '100%',
  maxWidth: '400px',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)',
  position: 'relative'
});

const BackButton = styled(Button)({
  position: 'absolute',
  top: '24px',
  left: '24px',
  color: '#666',
  textTransform: 'none',
  fontSize: '0.9rem',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#462872'
  }
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '24px',
    backgroundColor: '#fff',
    '& fieldset': {
      borderColor: '#e0e0e0',
    },
    '&:hover fieldset': {
      borderColor: '#d0d0d0',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#462872',
      borderWidth: '1px',
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '14px 20px',
    fontSize: '0.95rem',
  },
});

const ContinueButton = styled(Button)({
  borderRadius: '24px',
  padding: '12px',
  marginTop: '12px',
  marginBottom: '12px',
  textTransform: 'none',
  fontSize: '0.95rem',
  fontWeight: 500,
});

const BackToLoginButton = styled(Button)({
  color: '#462872',
  textTransform: 'none',
  fontSize: '0.9rem',
  fontWeight: 500,
  padding: '8px',
  '&:hover': {
    backgroundColor: 'transparent',
    textDecoration: 'none',
  },
  '& .MuiButton-startIcon': {
    marginRight: '4px',
  }
});

const StyledDivider = styled(Divider)({
  margin: '12px 0 20px',
  '&::before, &::after': {
    borderColor: '#e0e0e0'
  }
});

const SignInWithEmail = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }
    setSubmitting(true);
    try {
      await login({ email, password });
      navigate('/dashboard/overview');
    } catch (err: any) {
      setError(err?.message || 'Invalid credentials. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // If already authenticated, redirect to dashboard
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard/overview', { replace: true });
    }
  }, [user, navigate]);

  return (
    <WaveBackground>
      <BackButton startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>
        Go back
      </BackButton>
      
      <SignInCard>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <img src="/yuja-logo.svg" alt="App Logo" style={{ height: '32px', marginBottom: '24px' }} />
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#424446', mb: 3 }}>
            Sign in with email
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        )}
        <Box component="form" onSubmit={onSubmit} noValidate>
          <StyledTextField
            fullWidth
            placeholder="Enter your email address"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon sx={{ color: '#9e9e9e' }} />
                </InputAdornment>
              ),
            }}
          />
          <StyledTextField
            fullWidth
            placeholder="Enter your password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mt: 1.5 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword((p) => !p)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <ContinueButton
            type="submit"
            variant="contained"
            fullWidth
            disabled={submitting}
            sx={{
              backgroundColor: '#462872',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#3b2260'
              }
            }}
          >
            {submitting ? 'Signing in...' : 'Continue'}
          </ContinueButton>

          {/* Or divider and Google sign-in with matching style */}
          <StyledDivider>or</StyledDivider>
          <Button
            variant="text"
            fullWidth
            startIcon={<GoogleIcon sx={{ color: '#462872' }} />}
            sx={{
              color: '#462872',
              textTransform: 'none',
              fontSize: '0.95rem',
              fontWeight: 600,
              padding: '10px 12px',
              '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' }
            }}
          >
            Continue with Google
          </Button>

          {/* Additional social options matching Sign Up */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3, mt: 1 }}>
            <SocialButton>
              <GitHubIcon />
            </SocialButton>
            <SocialButton>
              <AppleIcon />
            </SocialButton>
            <SocialButton>
              <LinkedInIcon />
            </SocialButton>
            <SocialButton>
              <FacebookIcon />
            </SocialButton>
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <BackToLoginButton
            startIcon={<KeyboardBackspaceIcon />}
            onClick={() => navigate('/signup')}
          >
            If new, sign up
          </BackToLoginButton>
        </Box>

        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block', 
            textAlign: 'center', 
            mt: 2,
            color: '#666',
            fontSize: '0.75rem'
          }}
        >
          By continuing, you agree to our{' '}
          <Box component="span" sx={{ color: '#462872', cursor: 'pointer' }}>
            Terms & Conditions
          </Box>
          {' '}and{' '}
          <Box component="span" sx={{ color: '#462872', cursor: 'pointer' }}>
            Privacy Policy
          </Box>
        </Typography>
      </SignInCard>
    </WaveBackground>
  );
};

export default SignInWithEmail; 