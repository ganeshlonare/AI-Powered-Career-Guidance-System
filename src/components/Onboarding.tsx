import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Autocomplete,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextareaAutosize,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LanguageIcon from '@mui/icons-material/Language';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { onboardingApi } from '../api/onboarding';

// Form data interface
interface FormData {
  industry: {
    selected: string;
    hasExperience: boolean;
    reason: string;
  };
  skills: {
    selected: string[];
    proficiency: 'beginner' | 'intermediate' | 'advanced';
  };
  career: {
    targetRole: string;
    shortTermGoals: string;
    longTermGoals: string;
  };
  bio: {
    education: string;
    achievements: string;
    interests: string;
  };
}

// Initial form data
const initialFormData: FormData = {
  industry: {
    selected: '',
    hasExperience: false,
    reason: '',
  },
  skills: {
    selected: [],
    proficiency: 'beginner',
  },
  career: {
    targetRole: '',
    shortTermGoals: '',
    longTermGoals: '',
  },
  bio: {
    education: '',
    achievements: '',
    interests: '',
  },
};

const PageContainer = styled(Box)({
  minHeight: '100vh',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
});

const TopBar = styled(Box)({
  width: '100%',
  height: '64px',
  borderBottom: '1px solid #eee',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#fff',
});

const TopBarContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '0 40px',
  margin: '0 auto',
});

const Logo = styled('img')({
  height: '32px',
});

const LanguageButton = styled(Button)({
  textTransform: 'none',
  color: '#424446',
  fontSize: '0.875rem',
  padding: '6px 12px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
});

const MainContent = styled(Box)({
  display: 'flex',
  flex: 1,
  position: 'relative',
  zIndex: 1,
});

const ContentSection = styled(Box)({
  flex: 1,
  padding: '50px',
  marginRight: '200px',
  display: 'flex',
  justifyContent: 'center',
});

const ProgressSection = styled(Box)({
  width: '450px',
  borderLeft: '1px solid #eee',
  backgroundColor: '#fafafa',
  height: 'calc(100vh - 64px)',
  position: 'fixed',
  right: 0,
  top: '64px',
  display: 'flex',
  flexDirection: 'column',
});

const ProgressContent = styled(Box)({
  padding: '40px 32px',
  flex: 1,
  overflowY: 'auto',
});

const HelpSection = styled(Box)({
  borderTop: '1px solid #eee',
  padding: '24px 32px',
  backgroundColor: '#fafafa',
});

const StepIcon = styled(Box)<{ completed?: boolean; active?: boolean }>(
  ({ completed, active }) => ({
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: completed ? '#10B981' : active ? '#fff' : '#e0e0e0',
    border: active ? '2px solid #462872' : 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '16px',
    color: completed ? '#fff' : '#666',
  })
);

const StepContent = styled(Box)({
  flex: 1,
});

const QuestionContainer = styled(Box)({
  marginBottom: '32px',
});

const ProgressStep = styled(Box)<{ completed?: boolean; active?: boolean }>(
  ({ completed, active }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    position: 'relative',
    paddingBottom: '32px',
    '&:before': {
      content: '""',
      position: 'absolute',
      left: '15px',
      top: '30px',
      bottom: 0,
      width: '2px',
      backgroundColor: completed ? '#10B981' : '#e0e0e0',
      display: active || completed ? 'block' : 'none',
    },
    '&:last-child:before': {
      display: 'none',
    },
  })
);

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Marketing',
  'Engineering',
  'Design',
  'Sales',
  'Research',
  'Consulting',
];

const skills = [
  'Programming',
  'Data Analysis',
  'Project Management',
  'Communication',
  'Leadership',
  'Problem Solving',
  'Design Thinking',
  'Public Speaking',
  'Writing',
  'Research',
];

const Onboarding = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const navigate = useNavigate();
  const { user, loading, refresh } = useAuth();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verifyingUser, setVerifyingUser] = useState(false);

  // Additional onboarding payload fields
  const [onb, setOnb] = useState({
    collegeName: '',
    degree: '',
    branch: '',
    currentYear: 1,
    currentCgpa: 0,
    careerGoal: '',
    targetCompanies: '',
    preferredRoles: '',
    targetSalary: 0,
    preferredLocation: '',
    currentSkills: '',
    skillLevels: '',
    learningPreferences: '',
    dailyStudyHours: 0,
    preferredStudyTime: '',
    weekendAvailability: false,
    internshipExperience: '',
    projectExperience: '',
    certifications: '',
  });

  // Gate: only allow verified, signed-in users
  React.useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate('/signin/email', { replace: true });
      return;
    }
    // If unverified, try to refresh once to pick up latest verification status
    if (user.verified === false && !verifyingUser) {
      (async () => {
        try {
          setVerifyingUser(true);
          await refresh();
        } finally {
          setVerifyingUser(false);
        }
      })();
    }
  }, [loading, user, navigate, refresh, verifyingUser]);

  // After refresh, if still unverified, redirect to verify page
  React.useEffect(() => {
    if (loading) return;
    if (user && user.verified === false && !verifyingUser) {
      navigate('/verify-email', { replace: true });
    }
  }, [loading, user, verifyingUser, navigate]);

  const handleFormChange = (section: keyof FormData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const steps = [
    {
      title: 'Industry',
      subtitle: 'Tell us about your preferred industry',
      completed: activeStep > 0,
      active: activeStep === 0,
    },
    {
      title: 'Skills',
      subtitle: 'What are your key skills?',
      completed: activeStep > 1,
      active: activeStep === 1,
    },
    {
      title: 'Target',
      subtitle: 'What are your career goals?',
      completed: activeStep > 2,
      active: activeStep === 2,
    },
    {
      title: 'Bio',
      subtitle: 'Tell us about yourself',
      completed: activeStep > 3,
      active: activeStep === 3,
    },
    {
      title: 'Onboarding Details',
      subtitle: 'Education, preferences and experience',
      completed: activeStep > 4,
      active: activeStep === 4,
    },
    {
      title: 'Go to Quiz',
      subtitle: 'Take a career assessment',
      completed: activeStep > 5,
      active: activeStep === 5,
    },
  ];

  const submitOnboarding = async () => {
    setError(null);
    try {
      setSaving(true);
      // Derive defaults from earlier steps if user left fields empty
      const derivedCurrentSkills = onb.currentSkills?.trim() || formData.skills.selected.join(', ');
      const cap = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
      const derivedSkillLevels = onb.skillLevels?.trim() ||
        (formData.skills.selected.length ? formData.skills.selected.map(s => `${s}-${cap(formData.skills.proficiency)}`).join(', ') : '');
      const derivedCareerGoal = onb.careerGoal?.trim() ||
        [formData.career.targetRole, formData.career.longTermGoals].filter(Boolean).join(' - ');
      const derivedPreferredRoles = onb.preferredRoles?.trim() || formData.career.targetRole;

      await onboardingApi.submit({
        collegeName: onb.collegeName,
        degree: onb.degree,
        branch: onb.branch,
        currentYear: Number(onb.currentYear) || 0,
        currentCgpa: Number(onb.currentCgpa) || 0,
        careerGoal: derivedCareerGoal,
        targetCompanies: onb.targetCompanies,
        preferredRoles: derivedPreferredRoles,
        targetSalary: Number(onb.targetSalary) || 0,
        preferredLocation: onb.preferredLocation,
        currentSkills: derivedCurrentSkills,
        skillLevels: derivedSkillLevels,
        learningPreferences: onb.learningPreferences,
        dailyStudyHours: Number(onb.dailyStudyHours) || 0,
        preferredStudyTime: onb.preferredStudyTime,
        weekendAvailability: Boolean(onb.weekendAvailability),
        internshipExperience: onb.internshipExperience,
        projectExperience: onb.projectExperience,
        certifications: onb.certifications,
      });
      // After onboarding, go to assessment per desired flow
      navigate('/dashboard/assessment', { replace: true });
    } catch (e: any) {
      setError(e?.details?.message || e?.message || 'Failed to save onboarding details.');
    } finally {
      setSaving(false);
    }
  };

  const handleNext = () => {
    if (activeStep < 4) {
      setActiveStep(activeStep + 1);
      return;
    }
    if (activeStep === 5) {
      navigate('/dashboard/assessment');
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const renderQuestions = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <QuestionContainer>
              <Typography variant="h6" sx={{ mb: 2, color: '#424446' }}>
                Which industry interests you the most?
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={formData.industry.selected}
                  onChange={(e) => handleFormChange('industry', 'selected', e.target.value)}
                  sx={{ borderRadius: '8px' }}
                >
                  {industries.map((industry) => (
                    <MenuItem key={industry} value={industry}>
                      {industry}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </QuestionContainer>

            <QuestionContainer>
              <Typography variant="h6" sx={{ mb: 2, color: '#424446' }}>
                Do you have any experience in this industry?
              </Typography>
              <RadioGroup
                value={formData.industry.hasExperience}
                onChange={(e) => handleFormChange('industry', 'hasExperience', e.target.value === 'true')}
              >
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
              </RadioGroup>
            </QuestionContainer>

            <QuestionContainer>
              <Typography variant="h6" sx={{ mb: 2, color: '#424446' }}>
                What attracts you to this industry?
              </Typography>
              <TextField
                multiline
                rows={3}
                fullWidth
                value={formData.industry.reason}
                onChange={(e) => handleFormChange('industry', 'reason', e.target.value)}
                placeholder="Tell us what interests you about this industry..."
                sx={{ borderRadius: '8px' }}
              />
            </QuestionContainer>
          </>
        );

      case 1:
        return (
          <>
            <QuestionContainer>
              <Typography variant="h6" sx={{ mb: 2, color: '#424446' }}>
                Select your top skills (up to 5)
              </Typography>
              <Autocomplete
                multiple
                value={formData.skills.selected}
                onChange={(_, newValue) => handleFormChange('skills', 'selected', newValue)}
                options={skills}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select skills" />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      sx={{
                        backgroundColor: '#462872',
                        color: '#fff',
                      }}
                    />
                  ))
                }
              />
            </QuestionContainer>

            <QuestionContainer>
              <Typography variant="h6" sx={{ mb: 2, color: '#424446' }}>
                What is your proficiency level in these skills?
              </Typography>
              <RadioGroup
                value={formData.skills.proficiency}
                onChange={(e) => handleFormChange('skills', 'proficiency', e.target.value)}
              >
                <FormControlLabel value="beginner" control={<Radio />} label="Beginner" />
                <FormControlLabel value="intermediate" control={<Radio />} label="Intermediate" />
                <FormControlLabel value="advanced" control={<Radio />} label="Advanced" />
              </RadioGroup>
            </QuestionContainer>
          </>
        );

      case 2:
        return (
          <>
            <QuestionContainer>
              <Typography variant="h6" sx={{ mb: 2, color: '#424446' }}>
                What is your target career role?
              </Typography>
              <TextField
                fullWidth
                value={formData.career.targetRole}
                onChange={(e) => handleFormChange('career', 'targetRole', e.target.value)}
                placeholder="e.g., Software Engineer, Data Scientist, Product Manager"
                sx={{ borderRadius: '8px' }}
              />
            </QuestionContainer>

            <QuestionContainer>
              <Typography variant="h6" sx={{ mb: 2, color: '#424446' }}>
                What are your short-term career goals? (1-2 years)
              </Typography>
              <TextField
                multiline
                rows={3}
                fullWidth
                value={formData.career.shortTermGoals}
                onChange={(e) => handleFormChange('career', 'shortTermGoals', e.target.value)}
                placeholder="Describe what you want to achieve in the next couple of years..."
                sx={{ borderRadius: '8px' }}
              />
            </QuestionContainer>

            <QuestionContainer>
              <Typography variant="h6" sx={{ mb: 2, color: '#424446' }}>
                What are your long-term career goals? (5+ years)
              </Typography>
              <TextField
                multiline
                rows={3}
                fullWidth
                value={formData.career.longTermGoals}
                onChange={(e) => handleFormChange('career', 'longTermGoals', e.target.value)}
                placeholder="Describe where you see yourself in 5+ years..."
                sx={{ borderRadius: '8px' }}
              />
            </QuestionContainer>
          </>
        );

      case 3:
        return (
          <>
            <QuestionContainer>
              <Typography variant="h6" sx={{ mb: 2, color: '#424446' }}>
                Tell us about your educational background
              </Typography>
              <TextField
                multiline
                rows={3}
                fullWidth
                value={formData.bio.education}
                onChange={(e) => handleFormChange('bio', 'education', e.target.value)}
                placeholder="Share your academic journey, degrees, certifications..."
                sx={{ borderRadius: '8px' }}
              />
            </QuestionContainer>

            <QuestionContainer>
              <Typography variant="h6" sx={{ mb: 2, color: '#424446' }}>
                What are your key achievements?
              </Typography>
              <TextField
                multiline
                rows={3}
                fullWidth
                value={formData.bio.achievements}
                onChange={(e) => handleFormChange('bio', 'achievements', e.target.value)}
                placeholder="List your professional accomplishments, awards, or notable projects..."
                sx={{ borderRadius: '8px' }}
              />
            </QuestionContainer>

            <QuestionContainer>
              <Typography variant="h6" sx={{ mb: 2, color: '#424446' }}>
                What are your interests and hobbies?
              </Typography>
              <TextField
                multiline
                rows={2}
                fullWidth
                value={formData.bio.interests}
                onChange={(e) => handleFormChange('bio', 'interests', e.target.value)}
                placeholder="Share activities you enjoy outside of work..."
                sx={{ borderRadius: '8px' }}
              />
            </QuestionContainer>
          </>
        );

      case 4:
        return (
          <>
            <QuestionContainer>
              <Typography variant="h6" sx={{ mb: 2, color: '#424446' }}>
                Education Details
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <TextField label="College Name" fullWidth value={onb.collegeName} onChange={(e) => setOnb({ ...onb, collegeName: e.target.value })} />
                <TextField label="Degree" fullWidth value={onb.degree} onChange={(e) => setOnb({ ...onb, degree: e.target.value })} />
                <TextField label="Branch" fullWidth value={onb.branch} onChange={(e) => setOnb({ ...onb, branch: e.target.value })} />
                <TextField label="Current Year" type="number" fullWidth value={onb.currentYear} onChange={(e) => setOnb({ ...onb, currentYear: Number(e.target.value) })} />
                <TextField label="Current CGPA" type="number" fullWidth value={onb.currentCgpa} onChange={(e) => setOnb({ ...onb, currentCgpa: Number(e.target.value) })} />
              </Box>
            </QuestionContainer>

            <QuestionContainer>
              <Typography variant="h6" sx={{ mb: 2, color: '#424446' }}>
                Career Preferences
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <TextField label="Career Goal" fullWidth value={onb.careerGoal} onChange={(e) => setOnb({ ...onb, careerGoal: e.target.value })} />
                <TextField label="Target Companies" fullWidth value={onb.targetCompanies} onChange={(e) => setOnb({ ...onb, targetCompanies: e.target.value })} />
                <TextField label="Preferred Roles" fullWidth value={onb.preferredRoles} onChange={(e) => setOnb({ ...onb, preferredRoles: e.target.value })} />
                <TextField label="Target Salary" type="number" fullWidth value={onb.targetSalary} onChange={(e) => setOnb({ ...onb, targetSalary: Number(e.target.value) })} />
                <TextField label="Preferred Location" fullWidth value={onb.preferredLocation} onChange={(e) => setOnb({ ...onb, preferredLocation: e.target.value })} />
              </Box>
            </QuestionContainer>

            <QuestionContainer>
              <Typography variant="h6" sx={{ mb: 2, color: '#424446' }}>
                Skills & Learning
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <TextField label="Current Skills" fullWidth value={onb.currentSkills} onChange={(e) => setOnb({ ...onb, currentSkills: e.target.value })} />
                <TextField label="Skill Levels (e.g. Java-Intermediate)" fullWidth value={onb.skillLevels} onChange={(e) => setOnb({ ...onb, skillLevels: e.target.value })} />
                <TextField label="Learning Preferences" fullWidth value={onb.learningPreferences} onChange={(e) => setOnb({ ...onb, learningPreferences: e.target.value })} />
                <TextField label="Daily Study Hours" type="number" fullWidth value={onb.dailyStudyHours} onChange={(e) => setOnb({ ...onb, dailyStudyHours: Number(e.target.value) })} />
                <TextField label="Preferred Study Time" fullWidth value={onb.preferredStudyTime} onChange={(e) => setOnb({ ...onb, preferredStudyTime: e.target.value })} />
                <FormControlLabel
                  control={<Radio checked={onb.weekendAvailability === true} onChange={() => setOnb({ ...onb, weekendAvailability: true })} />}
                  label="Weekend Availability: Yes"
                />
                <FormControlLabel
                  control={<Radio checked={onb.weekendAvailability === false} onChange={() => setOnb({ ...onb, weekendAvailability: false })} />}
                  label="Weekend Availability: No"
                />
              </Box>
            </QuestionContainer>

            <QuestionContainer>
              <Typography variant="h6" sx={{ mb: 2, color: '#424446' }}>
                Experience & Certifications
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <TextField label="Internship Experience" fullWidth value={onb.internshipExperience} onChange={(e) => setOnb({ ...onb, internshipExperience: e.target.value })} />
                <TextField label="Project Experience" fullWidth value={onb.projectExperience} onChange={(e) => setOnb({ ...onb, projectExperience: e.target.value })} />
                <TextField label="Certifications" fullWidth value={onb.certifications} onChange={(e) => setOnb({ ...onb, certifications: e.target.value })} />
              </Box>
            </QuestionContainer>

            {error && (
              <Typography variant="body2" color="error" sx={{ mb: 1 }}>{error}</Typography>
            )}
            <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
              Please review your information and press Continue to save.
            </Typography>
          </>
        );

      case 5:
        return (
          <>
            <QuestionContainer>
              <Typography variant="h6" sx={{ mb: 2, color: '#424446' }}>
                Ready to take the career assessment quiz?
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
                This quiz will help us understand your strengths, preferences, and potential career paths that align with your profile.
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                The quiz consists of multiple-choice questions and should take about 15-20 minutes to complete.
                Your answers will help us provide personalized career recommendations.
              </Typography>
            </QuestionContainer>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <PageContainer>
      {/* Background Wave */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <svg
          style={{
            display: 'block',
            width: '100%',
            height: '500px',
          }}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#462872"
            fillOpacity="0.03"
            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,106.7C672,117,768,171,864,197.3C960,224,1056,224,1152,197.3C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </Box>

      <TopBar>
        <TopBarContent>
          <Logo 
            src="/yuja-logo.svg" 
            alt="App Logo" 
            onClick={handleLogoClick}
            style={{ cursor: 'pointer' }}
          />
          <LanguageButton startIcon={<LanguageIcon />}>
            English
          </LanguageButton>
        </TopBarContent>
      </TopBar>

      <MainContent>
        <ContentSection>
          <Box sx={{ maxWidth: '600px', width: '100%' }}>
            <Typography variant="h5" sx={{ mb: 4, color: '#424446', fontWeight: 600 }}>
              Let's get to know you better
            </Typography>
            {renderQuestions()}
            {activeStep === 4 ? (
              <Button
                variant="contained"
                onClick={submitOnboarding}
                disabled={saving}
                sx={{
                  backgroundColor: '#462872',
                  color: '#fff',
                  padding: '12px 32px',
                  borderRadius: '24px',
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  '&:hover': { backgroundColor: '#3b2260' },
                }}
              >
                {saving ? 'Submitting...' : 'Submit'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  backgroundColor: '#462872',
                  color: '#fff',
                  padding: '12px 32px',
                  borderRadius: '24px',
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  '&:hover': { backgroundColor: '#3b2260' },
                }}
              >
                {activeStep === steps.length - 1 ? 'Start Quiz' : 'Continue'}
              </Button>
            )}
          </Box>
        </ContentSection>

        <ProgressSection>
          <ProgressContent>
            <Typography variant="subtitle1" sx={{ mb: 4, color: '#424446', fontWeight: 600 }}>
              Complete Your Profile
            </Typography>
            {steps.map((step, index) => (
              <ProgressStep
                key={step.title}
                completed={step.completed}
                active={step.active}
              >
                <StepIcon completed={step.completed} active={step.active}>
                  {step.completed ? (
                    <CheckCircleIcon sx={{ fontSize: 18 }} />
                  ) : (
                    index + 1
                  )}
                </StepIcon>
                <StepContent>
                  <Typography
                    variant="body1"
                    sx={{
                      color: step.active ? '#462872' : '#424446',
                      fontWeight: step.active ? 600 : 500,
                      fontSize: '0.875rem',
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', fontSize: '0.75rem' }}>
                    {step.subtitle}
                  </Typography>
                </StepContent>
              </ProgressStep>
            ))}
          </ProgressContent>
          <HelpSection>
            <Typography variant="subtitle2" sx={{ mb: 1, color: '#424446' }}>
              Having trouble?
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
              Feel free to contact us and we will always help you through the process.
            </Typography>
            <Button
              variant="outlined"
              sx={{
                color: '#424446',
                borderColor: '#ddd',
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#bbb',
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                },
              }}
            >
              Contact us
            </Button>
          </HelpSection>
        </ProgressSection>
      </MainContent>
    </PageContainer>
  );
};

export default Onboarding; 