import React from 'react';
import { Box, Typography, Button, Container, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import YouTube from 'react-youtube';

const WaveBackground = styled(Box)({
  position: 'relative',
  background: `linear-gradient(135deg, rgba(0, 0, 0, 0) 0%, rgba(0,0, 0, 0) 100%),
               url('/purple-bg.svg') no-repeat center center`,
  backgroundSize: 'cover',
  overflow: 'hidden',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'flex-start',
  paddingTop: '80px',
  paddingBottom: '120px',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '35%',
    // background: 'url("/wave.svg") no-repeat bottom',
    backgroundSize: '100% auto',
    zIndex: 1
  }
});

const StyledContainer = styled(Container)({
  maxWidth: '1400px !important',
  margin: '0 auto',
  padding: '0 32px',
  position: 'relative',
  zIndex: 5,
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '150px'
});

const BadgeChip = styled(Chip)({
  backgroundColor: '#E8E3F6',
  color: '#462872',
  fontWeight: 600,
  fontSize: '0.7rem',
  height: '28px',
  borderRadius: '14px',
  padding: '0 4px',
  '& .MuiChip-label': {
    padding: '0 14px',
    letterSpacing: '0.5px'
  }
});

const ContentSection = styled(Box)({
  maxWidth: '580px',
  flex: '0 0 auto',
  paddingTop: '40px',
  position: 'relative',
  zIndex: 5,
  marginLeft: '-40px'
});

const VideoContainer = styled(Box)(({ theme }) => ({
  width: '800px',
  backgroundColor: '#2A2A2A',
  borderRadius: '12px',
  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
  overflow: 'hidden',
  flex: '0 0 auto',
  position: 'relative',
  zIndex: 5,
  marginLeft: '40px',
  [theme.breakpoints.down('lg')]: {
    width: '600px',
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginTop: '40px',
    marginLeft: 0
  }
}));

const BrowserHeader = styled(Box)({
  padding: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid #3A3A3A',
});

const BrowserTitle = styled(Typography)({
  color: '#fff',
  fontSize: '0.7rem',
  fontWeight: 500,
});

const BrowserControls = styled(Box)({
  display: 'flex',
  gap: '6px',
  '& .control': {
    width: '10px',
    height: '10px',
    borderRadius: '50%'
  }
});

const Hero = () => {
  const opts = {
    height: '380',
    width: '100%',
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 1,
      fs: 1,
      controls: 1
    },
  };

  return (
    <WaveBackground>
      <StyledContainer>
        <ContentSection>
          <BadgeChip label="CAREER GUIDANCE" />
          
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: '2.4rem',
              fontWeight: 700,
              color: '#424446',
              mt: 2.5,
              mb: 2,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              maxWidth: '540px'
            }}
          >
            Your Path to Career Success Success Success Success 
          </Typography>

          <Typography 
            sx={{ 
              color: '#424446',
              fontWeight: 400,
              fontSize: '0.85rem',
              lineHeight: 1.6,
              mb: 3.5,
              maxWidth: '540px'
            }}
          >
            Get personalized career guidance and discover the perfect career path that aligns with your skills, interests, and aspirations.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#462872',
                padding: '10px 28px',
                fontSize: '0.85rem',
                fontWeight: 500,
                textTransform: 'none',
                borderRadius: '4px',
                boxShadow: 'none',
                minHeight: '44px',
                '&:hover': {
                  backgroundColor: '#3b2260',
                  boxShadow: 'none',
                },
              }}
            >
              Take Career Quiz
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#462872',
                color: '#462872',
                padding: '10px 28px',
                fontSize: '0.85rem',
                fontWeight: 500,
                textTransform: 'none',
                borderRadius: '4px',
                borderWidth: '1px',
                backgroundColor: 'transparent',
                minHeight: '44px',
                '&:hover': {
                  borderColor: '#3b2260',
                  color: '#3b2260',
                  borderWidth: '1px',
                  backgroundColor: 'transparent',
                },
              }}
            >
              Learn More
            </Button>
          </Box>
        </ContentSection>

        <VideoContainer>
          <BrowserHeader>
            <BrowserTitle>How To Find The Perfect Career</BrowserTitle>
            <BrowserControls>
              <Box className="control" sx={{ backgroundColor: '#FF605C' }} />
              <Box className="control" sx={{ backgroundColor: '#FFBD44' }} />
              <Box className="control" sx={{ backgroundColor: '#00CA4E' }} />
            </BrowserControls>
          </BrowserHeader>
          <Box sx={{ bgcolor: '#000' }}>
            <YouTube
              videoId="lJ6n52Lsjfo"
              opts={opts}
              style={{ display: 'block' }}
            />
          </Box>
        </VideoContainer>
      </StyledContainer>
    </WaveBackground>
  );
};

export default Hero; 