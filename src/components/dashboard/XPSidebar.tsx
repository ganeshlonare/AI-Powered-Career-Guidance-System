import React, { useEffect } from 'react';
import { Box, Typography, IconButton, styled, Backdrop } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import xpIcon from '../../assets/xp-icon.svg';

interface XPSidebarProps {
  open: boolean;
  onClose: () => void;
}

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: 1100,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
}));

const SidebarContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open'
})<{ open: boolean }>(({ theme, open }) => ({
  position: 'fixed',
  right: open ? 0 : '-500px',
  top: 0,
  height: '100vh',
  width: '500px',
  backgroundColor: '#fff',
  transition: theme.transitions.create('right', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowY: 'auto',
  overflowX: 'hidden',
  zIndex: 1200,
  boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)',
  '&::-webkit-scrollbar': {
    display: 'none', // Hide scrollbar for Chrome, Safari, and newer Edge
  },
  '-ms-overflow-style': 'none', // Hide scrollbar for IE and older Edge
  'scrollbar-width': 'none', // Hide scrollbar for Firefox
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '400px',
    background: `linear-gradient(180deg, rgba(108, 92, 231, 0.1) 0%, rgba(108, 92, 231, 0) 100%)`,
    zIndex: 0,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '100px',
    left: '-10%',
    width: '120%',
    height: '400px',
    background: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,100 C150,200 250,0 400,100 L400,00 L0,0 Z' fill='%236C5CE710'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    transform: 'rotate(180deg)',
    zIndex: 0,
    opacity: 0.5,
  }
}));

const Header = styled(Box)({
  padding: '24px',
  borderBottom: '1px solid rgba(108, 92, 231, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  zIndex: 1,
  background: 'rgba(255, 255, 255, 0.9)',
});

const Content = styled(Box)({
  padding: '24px',
  position: 'relative',
  zIndex: 1,
  minHeight: 'calc(100vh - 85px)',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

const XPSection = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '16px',
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '20px',
  borderRadius: '16px',
  boxShadow: '0 4px 12px rgba(108, 92, 231, 0.05)',
});

const XPIconWrapper = styled(Box)({
  width: '80px',
  height: '80px',
  borderRadius: '20px',
  backgroundColor: '#F3F0FF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 12px rgba(108, 92, 231, 0.1)',
  flexShrink: 0,
});

const LeaderboardSection = styled(Box)({
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '24px',
  borderRadius: '16px',
  boxShadow: '0 4px 12px rgba(108, 92, 231, 0.05)',
});

const LeaderboardInfo = styled(Box)({
  backgroundColor: '#F8F9FA',
  borderRadius: '12px',
  padding: '20px',
  marginTop: '16px',
  border: '1px solid rgba(108, 92, 231, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ReshuffleSection = styled(Box)({
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '24px',
  borderRadius: '16px',
  boxShadow: '0 4px 12px rgba(108, 92, 231, 0.05)',
  marginTop: 'auto',
});

const CloseButton = styled(IconButton)({
  color: '#636E72',
  '&:hover': {
    backgroundColor: 'rgba(108, 92, 231, 0.1)',
  },
});

const XPSidebar: React.FC<XPSidebarProps> = ({ open, onClose }) => {
  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (open) {
      // Store current padding to prevent content shift
      const currentPadding = window.getComputedStyle(document.body).paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Add padding equal to scrollbar width to prevent content shift
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore original padding and overflow
        document.body.style.paddingRight = currentPadding;
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  return (
    <>
      <StyledBackdrop open={open} onClick={onClose} />
      <SidebarContainer open={open}>
        <Header>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#2D3436' }}>
            Leaderboard
          </Typography>
          <CloseButton onClick={onClose} size="medium">
            <CloseIcon />
          </CloseButton>
        </Header>

        <Content>
          <XPSection>
            <XPIconWrapper>
              <img src={xpIcon} alt="XP" style={{ width: '40px', height: '40px' }} />
            </XPIconWrapper>
            <Box>
              <Typography variant="h6" sx={{ color: '#2D3436', mb: 1, fontWeight: 600 }}>
                XP or Experience Points
              </Typography>
              <Typography variant="body1" sx={{ color: '#636E72', lineHeight: 1.6 }}>
                It is like a special currency you earn by doing different activities like watching a video, attempting DPPs and Tests.
              </Typography>
            </Box>
          </XPSection>

          <LeaderboardSection>
            <Typography variant="h6" sx={{ color: '#2D3436', mb: 1, fontWeight: 600 }}>
              How it works
            </Typography>
            <Typography variant="body1" sx={{ color: '#636E72', mb: 2, lineHeight: 1.6 }}>
              Your batch is divided into multiple groups of 30 students each, and you are ranked within one of these groups based on the XPs you earn
            </Typography>
            <LeaderboardInfo>
              <Typography variant="body1" sx={{ color: '#636E72', fontWeight: 500 }}>
                Collect <strong style={{ color: '#6C5CE7' }}>10 XP</strong> to unlock leaderboard!
              </Typography>
            </LeaderboardInfo>
          </LeaderboardSection>

          <ReshuffleSection>
            <Typography variant="h6" sx={{ color: '#2D3436', mb: 1, fontWeight: 600 }}>
              Reshuffling
            </Typography>
            <Typography variant="body1" sx={{ color: '#636E72', lineHeight: 1.6 }}>
              The Leaderboard resets every 14 days. Your leaderboard rank at the end of this period decides if you get promoted, stay, or get demoted.
            </Typography>
          </ReshuffleSection>
        </Content>
      </SidebarContainer>
    </>
  );
};

export default XPSidebar; 