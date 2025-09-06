import React, { useRef, useState } from 'react';
import { Box, Paper, Typography, Button, Alert, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SecurityIcon from '@mui/icons-material/Security';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from 'react-router-dom';

const PageWrap = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
  background: '#f7f7fb',
});

const Card = styled(Paper)({
  maxWidth: 820,
  width: '100%',
  padding: '32px',
  borderRadius: 16,
  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
});

const StartButton = styled(Button)({
  backgroundColor: '#462872',
  color: '#fff',
  padding: '12px 20px',
  borderRadius: 24,
  textTransform: 'none',
  fontSize: '0.95rem',
  fontWeight: 600,
  '&:hover': { backgroundColor: '#3b2260' },
});

const AssessmentInstructions: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const camStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);

  const cleanup = async () => {
    try { camStreamRef.current?.getTracks().forEach(t => t.stop()); } catch {}
    try { screenStreamRef.current?.getTracks().forEach(t => t.stop()); } catch {}
    camStreamRef.current = null;
    screenStreamRef.current = null;
    try { if (document.fullscreenElement) await document.exitFullscreen(); } catch {}
  };

  const preflightAndStart = async () => {
    setError(null);
    try {
      await document.documentElement.requestFullscreen();
    } catch {
      setError('Failed to enter fullscreen. Please allow fullscreen to proceed.');
      return;
    }

    try {
      camStreamRef.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    } catch {
      setError('Camera and microphone permission is required to start the test.');
      return;
    }

    // Request screen share here as part of start flow
    try {
      // @ts-ignore
      screenStreamRef.current = await (navigator.mediaDevices as any).getDisplayMedia?.({ video: true, audio: false });
    } catch {
      setError('Screen sharing permission is required to start the test.');
      return;
    }

    // Keep streams for the quiz page to adopt; store globally
    try {
      (window as any).__cg_camStream = camStreamRef.current;
      (window as any).__cg_screenStream = screenStreamRef.current;
    } catch {}
    try { localStorage.setItem('cg_proctor_preflight_ok', '1'); } catch {}
    navigate('/dashboard/assessment', { replace: true });
  };

  return (
    <PageWrap>
      <Card>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <SecurityIcon sx={{ color: '#462872' }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#424446' }}>
            Assessment Instructions
          </Typography>
        </Box>

        <Alert icon={<InfoOutlinedIcon />} severity="info" sx={{ mb: 2 }}>
          This assessment is proctored. You must follow the rules below to continue.
        </Alert>

        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#424446' }}>Proctoring Rules</Typography>
        <List dense>
          <ListItem><ListItemText primary="You must remain in fullscreen for the entire assessment." /></ListItem>
          <ListItem><ListItemText primary="Do not switch tabs or applications. Each violation will be recorded." /></ListItem>
          <ListItem><ListItemText primary="Your camera and microphone must remain on. You will be asked to share your screen when starting." /></ListItem>
          <ListItem><ListItemText primary="After 3 violations, your test will be auto-submitted." /></ListItem>
          <ListItem><ListItemText primary="Do not use external devices or assistance." /></ListItem>
        </List>

        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2, mb: 1, color: '#424446' }}>Test Guidelines</Typography>
        <List dense>
          <ListItem><ListItemText primary="Check your internet connection and power before starting." /></ListItem>
          <ListItem><ListItemText primary="Each question may have one correct answer unless specified." /></ListItem>
          <ListItem><ListItemText primary="You can review and submit when you are done." /></ListItem>
        </List>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button onClick={() => navigate('/dashboard/overview')} sx={{ color: '#424446' }}>Cancel</Button>
          <StartButton endIcon={<ArrowForwardIcon />} onClick={preflightAndStart}>
            I Understand, Start Quiz
          </StartButton>
        </Box>
      </Card>
    </PageWrap>
  );
};

export default AssessmentInstructions;
