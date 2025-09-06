import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  InputBase,
  Box,
  Select,
  MenuItem,
  Container,
  useTheme,
  useMediaQuery,
  Avatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAuth } from '../hooks/useAuth';

const Search = styled('div')(() => ({
  position: 'relative',
  borderRadius: '20px',
  backgroundColor: '#F5F5F5',
  marginLeft: 0,
  width: '250px',
  '@media (max-width: 960px)': {
    width: '200px',
  },
  '@media (max-width: 600px)': {
    width: '100%',
  },
}));

const SearchIconWrapper = styled('div')(() => ({
  padding: '0 16px',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#666',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: '8px 8px 8px 0',
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    fontSize: '0.9rem',
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: '#666',
  padding: '8px 12px',
  fontSize: '0.95rem',
  fontWeight: 500,
  minWidth: 'auto',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#5E35B1',
  },
  '& .MuiButton-endIcon': {
    marginLeft: 0,
    width: '20px',
    height: '20px',
  },
  [theme.breakpoints.down('lg')]: {
    padding: '8px 8px',
    fontSize: '0.9rem',
  },
}));

const SecondaryNavButton = styled(Button)(({ theme }) => ({
  color: '#666',
  padding: '8px 12px',
  fontSize: '0.85rem',
  fontWeight: 500,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  minWidth: 'auto',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#5E35B1',
  },
  '& .MuiButton-endIcon': {
    marginLeft: 0,
    width: '18px',
    height: '18px',
  },
  [theme.breakpoints.down('lg')]: {
    padding: '8px 8px',
    fontSize: '0.8rem',
  },
}));

const LanguageSelect = styled(Select)(({ theme }) => ({
  fontSize: '0.9rem',
  color: '#666',
  position: 'absolute',
  top: '-32px',
  right: '0',
  '&:before': {
    borderColor: 'transparent',
  },
  '&:after': {
    borderColor: 'transparent',
  },
  '& .MuiSelect-select': {
    paddingRight: '24px !important',
    paddingTop: '4px',
    paddingBottom: '4px',
  },
  [theme.breakpoints.down('sm')]: {
    position: 'static',
    marginBottom: theme.spacing(1),
  },
}));

const BackToLectureButton = styled(Button)(({ theme }) => ({
  color: '#5E35B1',
  fontSize: '0.9rem',
  fontWeight: 500,
  textTransform: 'none',
  padding: '8px 12px',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#4527A0',
  },
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  [theme.breakpoints.down('md')]: {
    fontSize: '0.85rem',
    padding: '8px',
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: '1400px !important',
  padding: '0 64px',
  [theme.breakpoints.down('lg')]: {
    padding: '0 48px',
  },
  [theme.breakpoints.down('md')]: {
    padding: '0 32px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '0 16px',
  },
}));

const CameraIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 8v8H5V8h10m1-2H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4V7c0-.55-.45-1-1-1z" fill="currentColor"/>
  </svg>
);

const SignUpButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#462872',
  color: '#fff',
  padding: '8px 24px',
  borderRadius: '20px',
  fontSize: '0.9rem',
  fontWeight: 500,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#3b2260',
  },
}));

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const displayName = React.useMemo(() => {
    if (!user) return '';
    const first = user.firstName?.trim();
    if (first) return first;
    const email = user.email || '';
    return email.includes('@') ? email.split('@')[0] : email;
  }, [user]);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleGoToClassroom = () => {
    navigate('/dashboard/overview');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        color="transparent" 
        elevation={0} 
        sx={{ 
          borderBottom: '1px solid #eee',
          backgroundColor: '#fff',
          top: 0,
          zIndex: 1100,
          pt: 2
        }}
      >
        <StyledContainer>
          <Toolbar disableGutters sx={{ minHeight: '72px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <img 
                src="/yuja-logo.svg" 
                alt="App Logo" 
                style={{ height: '72px',width: '100px', marginRight: '48px', cursor: 'pointer' }} 
                onClick={handleLogoClick}
              />
              {!isMobile ? (
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <NavButton endIcon={<KeyboardArrowDownIcon />}>Products</NavButton>
                  <NavButton>Services</NavButton>
                  <NavButton>News</NavButton>
                  <NavButton>Events</NavButton>
                  <NavButton endIcon={<KeyboardArrowDownIcon />}>Case Studies</NavButton>
                  <NavButton endIcon={<KeyboardArrowDownIcon />}>Company</NavButton>
                  <NavButton>Contact Us</NavButton>
                </Box>
              ) : (
                <IconButton
                  color="inherit"
                  onClick={handleMobileMenuToggle}
                  sx={{ ml: 'auto' }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>

            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 3, gap: 2 }}>
                {user ? (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Typography sx={{ fontSize: '0.95rem', color: '#424446', fontWeight: 500 }}>
                        Hi, {displayName}
                      </Typography>
                      <Avatar 
                        src={`https://i.pravatar.cc/100?u=${encodeURIComponent(user.email)}`}
                        alt={displayName}
                        sx={{ width: 34, height: 34 }}
                      />
                    </Box>
                    <SignUpButton 
                      onClick={handleGoToClassroom}
                      endIcon={<ArrowForwardIcon />}
                    >
                      Go to Classroom
                    </SignUpButton>
                  </>
                ) : (
                  <SignUpButton onClick={handleSignUpClick}>
                    Sign Up
                  </SignUpButton>
                )}
              </Box>
            )}
          </Toolbar>
        </StyledContainer>
      </AppBar>

      {/* Spacer for first navbar only */}
      <Toolbar sx={{ minHeight: '80px !important' }} /> {/* 72px + 16px padding */}

      <AppBar 
        position="static" 
        color="transparent" 
        elevation={0}
        sx={{ 
          backgroundColor: 'transparent',
          zIndex: 1
        }}
      >
        <StyledContainer>
          <Toolbar disableGutters sx={{ minHeight: '56px' }}>
            {!isMobile ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <BackToLectureButton startIcon={<CameraIcon />}>
                  Back to Lecture Capture
                </BackToLectureButton>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <SecondaryNavButton endIcon={<KeyboardArrowDownIcon />}>
                    CAPTURE CLOUD
                  </SecondaryNavButton>
                  <SecondaryNavButton endIcon={<KeyboardArrowDownIcon />}>
                    CAPTURE TOOLS
                  </SecondaryNavButton>
                  <SecondaryNavButton endIcon={<KeyboardArrowDownIcon />}>
                    CAPTURE INTEGRATIONS
                  </SecondaryNavButton>
                </Box>
              </Box>
            ) : (
              <BackToLectureButton startIcon={<CameraIcon />}>
                Back to Lecture Capture
              </BackToLectureButton>
            )}
          </Toolbar>
        </StyledContainer>
      </AppBar>

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <Box 
          className="fixed left-0 right-0 bg-white shadow-md p-4 z-[1000]"
          sx={{ top: '88px' }}
        >
          <Box className="flex flex-col gap-4">
            <NavButton endIcon={<KeyboardArrowDownIcon />}>Products</NavButton>
            <NavButton>Services</NavButton>
            <NavButton>News</NavButton>
            <NavButton>Events</NavButton>
            <NavButton endIcon={<KeyboardArrowDownIcon />}>Case Studies</NavButton>
            <NavButton endIcon={<KeyboardArrowDownIcon />}>Company</NavButton>
            <NavButton>Contact Us</NavButton>
          </Box>
          <Box className="mt-8">
            <LanguageSelect
              value="en"
              variant="standard"
              fullWidth
            >
              <MenuItem value="en">
                <Box className="flex items-center gap-2">
                  <img src="/gb.svg" alt="English" className="w-5 h-5" />
                  English
                </Box>
              </MenuItem>
            </LanguageSelect>
            <Search className="mt-4">
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Navbar; 