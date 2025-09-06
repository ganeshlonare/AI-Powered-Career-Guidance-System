import React, { useState } from 'react';
import { Box, Typography, IconButton, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import xpIcon from '../../assets/xp-icon.svg';
import StreakIntroModal from './StreakIntroModal';
import { useNavigate } from 'react-router-dom';

const NavbarContainer = styled(Box)({
  height: '70px',
  width: '100%',
  backgroundColor: '#fff',
  borderBottom: '1px solid #eee',
  display: 'flex',
  alignItems: 'center',
  padding: '0 24px',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1100,
});

const LogoSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  minWidth: '180px',
});

const Logo = styled('img')({
  height: '32px',
});

const CenterSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  transform: 'translateX(-170px)',
});

const CourseBox = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: '#f8f9fa',
  borderRadius: '6px',
  padding: '8px 16px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  border: '1px solid #eee',
  '&:hover': {
    backgroundColor: '#f0f1f2',
  },
});

const RightSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '18px',
  minWidth: '280px',
  justifyContent: 'flex-end',
  marginRight: '114px',
});

const StatBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
});

const StatIconButton = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '42px',
  height: '42px',
  borderRadius: '50%',
  backgroundColor: '#f8f9fa',
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: '#f0f1f2',
  },
});

const UserSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

interface DashboardNavbarProps {
  userName: string;
  flameCount: number;
  xpCount: number;
  onXPClick: () => void;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  userName,
  flameCount,
  xpCount,
  onXPClick,
}) => {
  const [streakModalOpen, setStreakModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenStreakModal = () => {
    setStreakModalOpen(true);
  };

  const handleCloseStreakModal = () => {
    setStreakModalOpen(false);
  };

  const handleStartStreak = () => {
    // Add your streak start logic here
    setStreakModalOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <>
      <NavbarContainer>
        <LogoSection>
          <Logo 
            src="/yuja-logo.svg" 
            alt="App Logo" 
            onClick={handleLogoClick}
            style={{ cursor: 'pointer' }}
          />
        </LogoSection>

        <CenterSection>
          <CourseBox>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                component="span"
                sx={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '4px',
                  backgroundColor: '#E3F2FD',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                }}
              >
                📚
              </Box>
              <Typography
                sx={{
                  fontSize: '0.95rem',
                  color: '#424446',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                }}
              >
                Software Development - Job Assistance
              </Typography>
              <ChevronRightIcon sx={{ color: '#666', fontSize: '20px', ml: 0.5 }} />
            </Box>
          </CourseBox>
        </CenterSection>

        <RightSection>
          <StatBox>
            <StatIconButton onClick={handleOpenStreakModal}>
              <LocalFireDepartmentIcon sx={{ color: '#FF6B6B', fontSize: '22px' }} />
            </StatIconButton>
            <Typography sx={{ fontSize: '0.9rem', color: '#424446', fontWeight: 500 }}>
              {flameCount}
            </Typography>
          </StatBox>

          <StatBox>
            <StatIconButton onClick={onXPClick}>
              <img src={xpIcon} alt="XP" style={{ width: '22px', height: '22px' }} />
            </StatIconButton>
            <Typography sx={{ fontSize: '0.9rem', color: '#424446', fontWeight: 500 }}>
              {xpCount}
            </Typography>
          </StatBox>

          <UserSection>
            <Typography sx={{ fontSize: '0.9rem', color: '#424446', fontWeight: 500 }}>
              Hi, {userName}
            </Typography>
            <Avatar 
              src="https://i.pravatar.cc/150?u=1" 
              alt={userName}
              sx={{ 
                width: 38, 
                height: 38,
              }}
            />
            <IconButton size="small" sx={{ padding: 0 }}>
              <ChevronRightIcon sx={{ fontSize: '20px', color: '#666' }} />
            </IconButton>
          </UserSection>
        </RightSection>
      </NavbarContainer>

      <StreakIntroModal
        open={streakModalOpen}
        onClose={handleCloseStreakModal}
        onStart={handleStartStreak}
      />
    </>
  );
};

export default DashboardNavbar; 