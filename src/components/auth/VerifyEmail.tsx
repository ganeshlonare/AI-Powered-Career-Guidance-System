import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, CircularProgress, Button, Alert, TextField } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { authApi } from '../../api/auth';
import { useAuth } from '../../hooks/useAuth';

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, refresh } = useAuth();
  const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');
  const [emailInput, setEmailInput] = useState<string>('');

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email') || user?.email || undefined;
    if (!email) {
      // Ask user for email if not provided in link and not logged in
      setEmailInput('');
      setStatus('idle');
      setMessage('Please enter your account email to complete verification.');
      return;
    }
    if (!token) {
      setStatus('error');
      setMessage('Missing verification token. Please use the link sent to your email.');
      return;
    }
    (async () => {
      try {
        setStatus('verifying');
        const resp = await authApi.verifyEmail({ token, email });
        setStatus('success');
        setMessage(resp?.message || 'Your email has been verified successfully!');
        // Refresh user to pick up verified=true
        try { await refresh(); } catch {}
        // Redirect to onboarding after a short delay
        setTimeout(() => navigate('/onboarding', { replace: true }), 1500);
      } catch (e: any) {
        setStatus('error');
        const apiMsg = e?.details?.message || e?.message;
        setMessage(apiMsg || 'Verification failed. Your link may be invalid or expired.');
      }
    })();
  }, [navigate, searchParams, user?.email]);

  const handleManualVerify = async () => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Missing verification token.');
      return;
    }
    if (!emailInput) {
      setStatus('error');
      setMessage('Please enter your email.');
      return;
    }
    try {
      setStatus('verifying');
      const resp = await authApi.verifyEmail({ token, email: emailInput });
      setStatus('success');
      setMessage(resp?.message || 'Your email has been verified successfully!');
      try { await refresh(); } catch {}
      setTimeout(() => navigate('/onboarding', { replace: true }), 1500);
    } catch (e: any) {
      setStatus('error');
      const apiMsg = e?.details?.message || e?.message;
      setMessage(apiMsg || 'Verification failed. Please check your email and try again.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Paper sx={{ p: 4, maxWidth: 480, width: '100%', textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Email Verification
        </Typography>

        {status === 'verifying' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <CircularProgress />
            <Typography>Verifying your email...</Typography>
          </Box>
        )}

        {status === 'success' && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        {status === 'error' && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        {/* Manual email entry when needed */}
        {(status === 'idle' || (status === 'error' && message?.toLowerCase().includes('email'))) && (
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <TextField
              label="Email"
              type="email"
              size="small"
              fullWidth
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <Button variant="contained" onClick={handleManualVerify}>Verify</Button>
          </Box>
        )}

        {(status === 'error' || status === 'success') && (
          <Button variant="contained" onClick={() => navigate('/onboarding')} sx={{ mt: 1 }}>
            Continue to Onboarding
          </Button>
        )}
      </Paper>
    </Box>
  );
};

export default VerifyEmail;
