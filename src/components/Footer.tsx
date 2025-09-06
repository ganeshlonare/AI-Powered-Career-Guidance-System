import React from 'react';
import { Box, Container, Typography, Button, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Discord } from './Icons/Discord';

const FooterContainer = styled(Box)({
  // backgroundColor: '#f7f5fb',
  padding: '10px 0 0',
  width: '100%'
});

const StyledContainer = styled(Container)({
  maxWidth: '90% !important',
  padding: '0 64px',
});

const FooterGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1.8fr 1fr 1fr 1fr 1fr',
  gap: '64px',
  marginBottom: '64px',
});

const SocialIcons = styled(Box)({
  display: 'flex',
  gap: '16px',
  marginTop: '24px',
  marginBottom: '24px',
  '& svg': {
    width: '20px',
    height: '20px',
    color: '#666',
    cursor: 'pointer',
    '&:hover': {
      color: '#462872',
    },
  },
});

const StatusBox = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 12px',
  backgroundColor: '#F8F8F8',
  borderRadius: '8px',
  border: '1px solid #eee',
  '& svg': {
    color: '#10B981',
    width: '16px',
    height: '16px',
  },
});

const FooterHeading = styled(Typography)({
  fontSize: '0.85rem',
  fontWeight: 600,
  color: '#424446',
  marginBottom: '24px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
});

const FooterLink = styled(Link)({
  display: 'block',
  fontSize: '0.9rem',
  color: '#666',
  marginBottom: '12px',
  textDecoration: 'none',
  '&:hover': {
    color: '#462872',
  },
});

const BottomBar = styled(Box)({
  borderTop: '1px solid #eee',
  padding: '24px 0',
});

const NewBadge = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: '#E8F5E9',
  color: '#2E7D32',
  padding: '2px 8px',
  borderRadius: '12px',
  fontSize: '0.7rem',
  fontWeight: 600,
  marginLeft: '8px',
});

const Footer = () => {
  return (
    <FooterContainer>
      <StyledContainer>
        <FooterGrid>
          {/* Branding & Status */}
          <Box>
            <img src="/yuja-logo.svg" alt="App Logo" style={{ height: '32px' }} />
            <Typography sx={{ mt: 3, mb: 3, color: '#666', fontSize: '0.95rem', maxWidth: '360px' }}>
              Your comprehensive career guidance platform for developers and tech professionals.
            </Typography>
            <SocialIcons>
              <TwitterIcon />
              <Discord />
              <LinkedInIcon />
              <InstagramIcon />
              <YouTubeIcon />
            </SocialIcons>
            <StatusBox>
              <CheckCircleIcon />
              <Typography sx={{ fontSize: '0.85rem', color: '#666' }}>
                All services are online
              </Typography>
            </StatusBox>
          </Box>

          {/* Product */}
          <Box>
            <FooterHeading>Product</FooterHeading>
            <FooterLink href="#">
              Career Assessment
              <NewBadge>New</NewBadge>
            </FooterLink>
            <FooterLink href="#">Learning Paths</FooterLink>
            <FooterLink href="#">AI Career Advisor</FooterLink>
            <FooterLink href="#">Skills Analysis</FooterLink>
            <FooterLink href="#">Resources</FooterLink>
          </Box>

          {/* Company */}
          <Box>
            <FooterHeading>Company</FooterHeading>
            <FooterLink href="#">About Us</FooterLink>
            <FooterLink href="#">Brand Assets</FooterLink>
            <FooterLink href="#">Updates</FooterLink>
            <FooterLink href="#">Feature Requests</FooterLink>
          </Box>

          {/* Blogs */}
          <Box>
            <FooterHeading>Blogs</FooterHeading>
            <FooterLink href="#">Career Tips</FooterLink>
            <FooterLink href="#">Tech Insights</FooterLink>
            <FooterLink href="#">Success Stories</FooterLink>
          </Box>

          {/* Support */}
          <Box>
            <FooterHeading>Support</FooterHeading>
            <FooterLink href="#">Help Center</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
            <FooterLink href="#">Join Community</FooterLink>
            <Button
              endIcon={<ArrowForwardIcon />}
              sx={{
                mt: 2,
                color: '#462872',
                padding: '6px 20px',
                border: '1px solid #462872',
                borderRadius: '50px',
                textTransform: 'none',
                fontSize: '0.85rem',
                '&:hover': {
                  backgroundColor: '#3b2260',
                  color: '#fff',
                },
              }}
            >
              Start Assessment
            </Button>
          </Box>
        </FooterGrid>

        {/* Bottom Bar */}
        <BottomBar>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '0.85rem', color: '#666' }}>
              © Career Guidance 2025 — All rights reserved
            </Typography>
            <Box sx={{ display: 'flex', gap: 4 }}>
              <FooterLink href="#" sx={{ mb: 0 }}>Privacy Policy</FooterLink>
              <FooterLink href="#" sx={{ mb: 0 }}>Terms</FooterLink>
              <FooterLink href="#" sx={{ mb: 0 }}>Code of Conduct</FooterLink>
            </Box>
          </Box>
        </BottomBar>
      </StyledContainer>
    </FooterContainer>
  );
};

export default Footer; 