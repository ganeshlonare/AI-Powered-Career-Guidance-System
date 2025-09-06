// import React from 'react';
// import { Box, Typography, Button, Container, Chip } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import YouTube from 'react-youtube';

// const WaveBackground = styled(Box)({
//   position: 'relative',
//   background: `linear-gradient(135deg, rgba(0, 0, 0, 0) 0%, rgba(0,0, 0, 0) 100%),
//                url('/purple-bg.svg') no-repeat center center`,
//   backgroundSize: 'cover',
//   overflow: 'hidden',
//   minHeight: '100vh',
//   display: 'flex',
//   alignItems: 'flex-start',
//   paddingTop: '80px',
//   paddingBottom: '120px',
//   '&::after': {
//     content: '""',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     width: '100%',
//     height: '35%',
//     // background: 'url("/wave.svg") no-repeat bottom',
//     backgroundSize: '100% auto',
//     zIndex: 1
//   }
// });

// const StyledContainer = styled(Container)({
//   maxWidth: '1400px !important',
//   margin: '0 auto',
//   padding: '0 32px',
//   position: 'relative',
//   zIndex: 5,
//   display: 'flex',
//   alignItems: 'flex-start',
//   justifyContent: 'space-between',
//   gap: '150px'
// });

// const BadgeChip = styled(Chip)({
//   backgroundColor: '#E8E3F6',
//   color: '#462872',
//   fontWeight: 600,
//   fontSize: '0.7rem',
//   height: '28px',
//   borderRadius: '14px',
//   padding: '0 4px',
//   '& .MuiChip-label': {
//     padding: '0 14px',
//     letterSpacing: '0.5px'
//   }
// });

// const ContentSection = styled(Box)({
//   maxWidth: '580px',
//   flex: '0 0 auto',
//   paddingTop: '40px',
//   position: 'relative',
//   zIndex: 5,
//   marginLeft: '-40px'
// });

// const VideoContainer = styled(Box)(({ theme }) => ({
//   width: '800px',
//   backgroundColor: '#2A2A2A',
//   borderRadius: '12px',
//   boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
//   overflow: 'hidden',
//   flex: '0 0 auto',
//   position: 'relative',
//   zIndex: 5,
//   marginLeft: '40px',
//   [theme.breakpoints.down('lg')]: {
//     width: '600px',
//   },
//   [theme.breakpoints.down('md')]: {
//     width: '100%',
//     marginTop: '40px',
//     marginLeft: 0
//   }
// }));

// const BrowserHeader = styled(Box)({
//   padding: '12px 16px',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   borderBottom: '1px solid #3A3A3A',
// });

// const BrowserTitle = styled(Typography)({
//   color: '#fff',
//   fontSize: '0.7rem',
//   fontWeight: 500,
// });

// const BrowserControls = styled(Box)({
//   display: 'flex',
//   gap: '6px',
//   '& .control': {
//     width: '10px',
//     height: '10px',
//     borderRadius: '50%'
//   }
// });

// const Hero = () => {
//   const opts = {
//     height: '380',
//     width: '100%',
//     playerVars: {
//       autoplay: 0,
//       modestbranding: 1,
//       rel: 0,
//       showinfo: 1,
//       fs: 1,
//       controls: 1
//     },
//   };

//   return (
//     <WaveBackground>
//       <StyledContainer>
//         <ContentSection>
//           <BadgeChip label="CAREER GUIDANCE" />
          
//           <Typography 
//             variant="h1" 
//             sx={{ 
//               fontSize: '2.4rem',
//               fontWeight: 700,
//               color: '#424446',
//               mt: 2.5,
//               mb: 2,
//               lineHeight: 1.2,
//               letterSpacing: '-0.01em',
//               maxWidth: '540px'
//             }}
//           >
//             Your Path to Career Success Success Success Success 
//           </Typography>

//           <Typography 
//             sx={{ 
//               color: '#424446',
//               fontWeight: 400,
//               fontSize: '0.85rem',
//               lineHeight: 1.6,
//               mb: 3.5,
//               maxWidth: '540px'
//             }}
//           >
//             Get personalized career guidance and discover the perfect career path that aligns with your skills, interests, and aspirations.
//           </Typography>

//           <Box sx={{ display: 'flex', gap: 2 }}>
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: '#462872',
//                 padding: '10px 28px',
//                 fontSize: '0.85rem',
//                 fontWeight: 500,
//                 textTransform: 'none',
//                 borderRadius: '4px',
//                 boxShadow: 'none',
//                 minHeight: '44px',
//                 '&:hover': {
//                   backgroundColor: '#3b2260',
//                   boxShadow: 'none',
//                 },
//               }}
//             >
//               Take Career Quiz
//             </Button>
//             <Button
//               variant="outlined"
//               sx={{
//                 borderColor: '#462872',
//                 color: '#462872',
//                 padding: '10px 28px',
//                 fontSize: '0.85rem',
//                 fontWeight: 500,
//                 textTransform: 'none',
//                 borderRadius: '4px',
//                 borderWidth: '1px',
//                 backgroundColor: 'transparent',
//                 minHeight: '44px',
//                 '&:hover': {
//                   borderColor: '#3b2260',
//                   color: '#3b2260',
//                   borderWidth: '1px',
//                   backgroundColor: 'transparent',
//                 },
//               }}
//             >
//               Learn More
//             </Button>
//           </Box>
//         </ContentSection>

//         <VideoContainer>
//           <BrowserHeader>
//             <BrowserTitle>How To Find The Perfect Career</BrowserTitle>
//             <BrowserControls>
//               <Box className="control" sx={{ backgroundColor: '#FF605C' }} />
//               <Box className="control" sx={{ backgroundColor: '#FFBD44' }} />
//               <Box className="control" sx={{ backgroundColor: '#00CA4E' }} />
//             </BrowserControls>
//           </BrowserHeader>
//           <Box sx={{ bgcolor: '#000' }}>
//             <YouTube
//               videoId="lJ6n52Lsjfo"
//               opts={opts}
//               style={{ display: 'block' }}
//             />
//           </Box>
//         </VideoContainer>
//       </StyledContainer>
//     </WaveBackground>
//   );
// };

// export default Hero; 



import React from 'react';
import { Box, Typography, Button, Container, Chip, Card, CardContent, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { styled } from '@mui/material/styles';
import YouTube from 'react-youtube';
import { 
  BrainCircuit, 
  Briefcase, 
  CalendarCheck, 
  LineChart, 
  Map, 
  ScrollText,
  UserPlus,
  FileEdit,
  ClipboardList,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

// Your existing styled components
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

// New styled components for additional sections
const SectionContainer = styled(Container)({
  maxWidth: '1200px !important',
  margin: '0 auto',
  padding: '80px 32px'
});

const FeatureCard = styled(Card)({
  height: '100%',
  border: '2px solid #E0E0E0',
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: '#462872',
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(70, 40, 114, 0.15)'
  }
});

const GradientTitle = styled(Typography)({
  background: 'linear-gradient(135deg, #462872 0%, #7B4397 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
});

const StepContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '16px'
});

const StepIcon = styled(Box)({
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  backgroundColor: 'rgba(70, 40, 114, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#462872'
});

// Data arrays
const features = [
  {
    icon: <Map style={{ width: 40, height: 40, color: '#462872', marginBottom: 16 }} />,
    title: "AI-Powered Personalized Roadmap",
    description: "Get a customized learning roadmap tailored to your career goals and skill level."
  },
  {
    icon: <CalendarCheck style={{ width: 40, height: 40, color: '#462872', marginBottom: 16 }} />,
    title: "Weekly Study Plan",
    description: "Receive an AI-generated weekly study plan based on your personalized roadmap for structured learning."
  },
  {
    icon: <BrainCircuit style={{ width: 40, height: 40, color: '#462872', marginBottom: 16 }} />,
    title: "AI-Powered Career Guidance",
    description: "Get personalized career advice and insights powered by advanced AI technology."
  },
  {
    icon: <Briefcase style={{ width: 40, height: 40, color: '#462872', marginBottom: 16 }} />,
    title: "Interview Preparation",
    description: "Practice with role-specific questions and get instant feedback to improve your performance."
  },
  {
    icon: <LineChart style={{ width: 40, height: 40, color: '#462872', marginBottom: 16 }} />,
    title: "Industry Insights",
    description: "Stay ahead with real-time industry trends, salary data, and market analysis."
  },
  {
    icon: <ScrollText style={{ width: 40, height: 40, color: '#462872', marginBottom: 16 }} />,
    title: "Smart Resume Creation",
    description: "Generate ATS-optimized resumes with AI assistance."
  }
];

const howItWorks = [
  {
    title: "Register & Onboarding",
    description: "Sign up and complete onboarding forms with details about your industry, skills, bio, targets, certifications, achievements, and projects.",
    icon: <UserPlus style={{ width: 32, height: 32, color: '#462872' }} />
  },
  {
    title: "Skill Assessment Quiz",
    description: "Take a 10-question quiz based on the skills you provided in onboarding to evaluate your current knowledge.",
    icon: <ClipboardList style={{ width: 32, height: 32, color: '#462872' }} />
  },
  {
    title: "AI-Powered Personalized Roadmap",
    description: "Get a customized roadmap to achieve your target based on your skills, projects, quiz results, and overall profile analysis.",
    icon: <Map style={{ width: 32, height: 32, color: '#462872' }} />
  },
  {
    title: "Weekly Study Plan",
    description: "Receive an AI-generated weekly study plan aligned with your roadmap for structured learning and goal achievement.",
    icon: <CalendarCheck style={{ width: 32, height: 32, color: '#462872' }} />
  },
  {
    title: "Resume & Cover Letter Builder",
    description: "Create ATS-optimized resumes and compelling cover letters to enhance your job applications.",
    icon: <FileEdit style={{ width: 32, height: 32, color: '#462872' }} />
  },
  {
    title: "Industry Insights & Quizzes",
    description: "Stay ahead with industry trends and take skill-based quizzes to refine your knowledge.",
    icon: <ScrollText style={{ width: 32, height: 32, color: '#462872' }} />
  },
  {
    title: "Track Your Progress",
    description: "Monitor your growth with detailed performance analytics and roadmap completion tracking.",
    icon: <LineChart style={{ width: 32, height: 32, color: '#462872' }} />
  }
];

const faqs = [
  {
    question: "How does the AI-powered career guidance work?",
    answer: "Our AI analyzes your skills, experience, and career goals to provide personalized recommendations and insights tailored specifically to your profile."
  },
  {
    question: "Is the platform suitable for all career levels?",
    answer: "Yes! Whether you're a recent graduate, career changer, or experienced professional, our platform adapts to your specific needs and experience level."
  },
  {
    question: "How often is the content updated?",
    answer: "We continuously update our content, including industry insights, interview questions, and market trends to ensure you have the most current information."
  },
  {
    question: "Can I track my progress over time?",
    answer: "Absolutely! Our platform provides detailed analytics and progress tracking to help you monitor your career development journey."
  }
];

const Hero: React.FC = () => {
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
    <Box>
      {/* Hero Section */}
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
              Your Path to Career Success
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

      {/* Features Section */}
      <Box sx={{ py: 0 }}>
        <SectionContainer>
          <GradientTitle
            variant="h2"
            sx={{
              fontSize: '2.5rem',
              fontWeight: 700,
              textAlign: 'center',
              mb: 6
            }}
          >
            Powerful Features for Your Career Growth
          </GradientTitle>
          
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)'
              },
              gap: 3,
              maxWidth: '1000px',
              mx: 'auto'
            }}
          >
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <CardContent sx={{ p: 3, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {feature.icon}
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </FeatureCard>
            ))}
          </Box>
        </SectionContainer>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: 0 }}>
        <SectionContainer>
          <Box sx={{ textAlign: 'center', maxWidth: '600px', mx: 'auto', mb: 6 }}>
            <GradientTitle
              variant="h2"
              sx={{
                fontSize: '2.5rem',
                fontWeight: 700,
                mb: 2
              }}
            >
              How It Works
            </GradientTitle>
            <Typography variant="body1" color="text.secondary">
              Seven simple steps to accelerate your career growth
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(4, 1fr)'
              },
              gap: 4,
              maxWidth: '1000px',
              mx: 'auto'
            }}
          >
            {howItWorks.slice(0, 4).map((item, index) => (
              <StepContainer key={index}>
                <StepIcon>
                  {item.icon}
                </StepIcon>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </StepContainer>
            ))}
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(3, 1fr)'
              },
              gap: 4,
              maxWidth: '750px',
              mx: 'auto',
              mt: 6
            }}
          >
            {howItWorks.slice(4).map((item, index) => (
              <StepContainer key={index + 4}>
                <StepIcon>
                  {item.icon}
                </StepIcon>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </StepContainer>
            ))}
          </Box>
        </SectionContainer>
      </Box>

      {/* FAQ Section */}
      <Box sx={{  py: 0 }}>
        <SectionContainer>
          <Box sx={{ textAlign: 'center', maxWidth: '600px', mx: 'auto', mb: 6 }}>
            <GradientTitle
              variant="h2"
              sx={{
                fontSize: '2.5rem',
                fontWeight: 700,
                mb: 2
              }}
            >
              Frequently Asked Questions
            </GradientTitle>
            <Typography variant="body1" color="text.secondary">
              Find answers to common questions about our platform
            </Typography>
          </Box>

          <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
            {faqs.map((faq, index) => (
              <Accordion key={index} sx={{ mb: 2, '&:before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ChevronDown />}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </SectionContainer>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 0 }}>
        <SectionContainer>
          <Box sx={{ 
            textAlign: 'center', 
            maxWidth: '600px', 
            mx: 'auto',
            py: 8,
            px: 4,
            borderRadius: '12px',
            color: '#462872'
          }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: '2.5rem',
                fontWeight: 700,
                mb: 2,
                color: '#462872'
              }}
            >
              Ready to Accelerate Your Career?
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of professionals who are advancing their careers with AI-powered guidance.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: 'white',
                color: '#462872',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: '6px',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                }
              }}
              endIcon={<ArrowRight />}
            >
              Start Your Journey Today
            </Button>
          </Box>
        </SectionContainer>
      </Box>
    </Box>
  );
};

export default Hero;