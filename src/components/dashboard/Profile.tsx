import { Box, Typography, Button, Paper, Avatar, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

import {
  LocationOn,
  School,
  Language,
  GitHub,
  LinkedIn,
  Code,
  Edit as EditIcon,
  ArrowDropDown as ArrowDropDownIcon
} from '@mui/icons-material';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import SubmissionHeatmap from './SubmissionHeatmap';
import { useEffect, useState } from 'react';
import { userApi } from '../../api/user';
import type { UserProfile } from '../../types/user';

// Styled components
const ProfileGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '400px 1fr 1fr',
  gridTemplateRows: '300px 280px 300px',
  gap: 0,
  padding: '24px',
  maxWidth: '1800px',
  margin: '0 auto',
  '& > *': {
    marginLeft: '16px',
  },
  '& > *:first-of-type': {
    marginLeft: 0,
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto auto auto 300px',
    gap: '16px',
    '& > *': {
      marginLeft: 0,
    },
  },
}));

const ProfileCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  border: '1px solid rgba(70, 40, 114, 0.1)',
  boxShadow: '0 4px 12px rgba(70, 40, 114, 0.05)',
  background: '#fff',
  gridRow: '1/span 3',
  gridColumn: '1',
  height: 'auto',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none', // Hide scrollbar for Chrome, Safari, and newer Edge
  },
  '-ms-overflow-style': 'none', // Hide scrollbar for IE and older Edge
  'scrollbar-width': 'none', // Hide scrollbar for Firefox
  '& .MuiAvatar-root': {
    width: 140,
    height: 140,
    marginBottom: '24px',
  },
  '& .MuiTypography-h5': {
    fontSize: '1.5rem',
    marginBottom: '12px',
  },
  [theme.breakpoints.down('md')]: {
    gridRow: '1',
    gridColumn: '1',
    padding: theme.spacing(3),
  },
}));

const ContestCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  border: '1px solid rgba(70, 40, 114, 0.1)',
  boxShadow: '0 4px 12px rgba(70, 40, 114, 0.05)',
  background: '#fff',
  gridRow: '1',
  gridColumn: '2 / span 2',
  height: '280px',
  [theme.breakpoints.down('md')]: {
    gridRow: '2',
    gridColumn: '1',
    height: 'auto',
  },
}));

const ProblemsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: '16px',
  border: '1px solid rgba(70, 40, 114, 0.1)',
  boxShadow: '0 4px 12px rgba(70, 40, 114, 0.05)',
  background: '#fff',
  gridRow: '2',
  gridColumn: '2',
  height: '270px',
  [theme.breakpoints.down('md')]: {
    gridRow: '3',
    gridColumn: '1',
    height: 'auto',
  },
}));

const BadgesCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: '16px',
  border: '1px solid rgba(70, 40, 114, 0.1)',
  boxShadow: '0 4px 12px rgba(70, 40, 114, 0.05)',
  background: '#fff',
  gridRow: '2',
  gridColumn: '3',
  height: '270px',
  [theme.breakpoints.down('md')]: {
    gridRow: '4',
    gridColumn: '1',
    height: 'auto',
  },
}));

const ContributionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  border: '1px solid rgba(70, 40, 114, 0.1)',
  boxShadow: '0 4px 12px rgba(70, 40, 114, 0.05)',
  background: '#fff',
  gridRow: '3',
  gridColumn: '2 / span 2',
  marginTop: '8px',
  height: '300px',
  [theme.breakpoints.down('md')]: {
    gridRow: '5',
    gridColumn: '1',
    height: '300px',
  },
}));

const EditButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(70, 40, 114, 0.08)',
  color: '#462872',
  padding: '8px 24px',
  borderRadius: '20px',
  fontSize: '0.9rem',
  fontWeight: 500,
  textTransform: 'none',
  width: '100%',
  '&:hover': {
    backgroundColor: 'rgba(70, 40, 114, 0.12)',
  },
}));

const StatsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: '#666',
  fontSize: '0.9rem',
  marginBottom: theme.spacing(1),
}));

const Tag = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(70, 40, 114, 0.08)',
  color: '#462872',
  padding: '4px 12px',
  borderRadius: '16px',
  fontSize: '0.85rem',
  display: 'inline-block',
}));

const CircularProgress = styled(Box)(({ theme }) => ({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  border: '8px solid #f3f0ff',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-8px',
    left: '-8px',
    right: '-8px',
    bottom: '-8px',
    border: '8px solid #462872',
    borderRadius: '50%',
    clipPath: 'polygon(0 0, 30% 0, 30% 100%, 0 100%)',
  },
}));

const DifficultyBar = styled(Box)<{ level: 'easy' | 'medium' | 'hard' }>(({ theme, level }) => ({
  backgroundColor: level === 'easy' ? '#00b8a3' : level === 'medium' ? '#ffc01e' : '#ff375f',
  color: '#fff',
  padding: '4px 12px',
  borderRadius: '4px',
  fontSize: '0.85rem',
  marginBottom: theme.spacing(1),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const SkillTag = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(70, 40, 114, 0.08)',
  color: '#462872',
  padding: '4px 12px',
  borderRadius: '16px',
  fontSize: '0.85rem',
  display: 'inline-flex',
  alignItems: 'center',
  margin: '4px',
  gap: '4px',
}));

const ShowMoreButton = styled(Button)(({ theme }) => ({
  color: '#636E72',
  fontSize: '0.85rem',
  padding: '4px',
  '&:hover': {
    background: 'none',
    textDecoration: 'underline',
  },
}));

const DifficultyDot = styled('span')<{ level: 'advanced' | 'intermediate' | 'fundamental' }>(({ level }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  display: 'inline-block',
  marginRight: '8px',
  backgroundColor: level === 'advanced' ? '#ff375f' : level === 'intermediate' ? '#ffc01e' : '#00b8a3',
}));

// Mock data for the rating chart
const ratingData = [
  { month: 'Jan', rating: 1421 },
  { month: 'Feb', rating: 1392 },
  { month: 'Mar', rating: 1380 },
  { month: 'Apr', rating: 1395 },
  { month: 'May', rating: 1410 },
];

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile>({
    id: 'me',
    name: 'Ganesh Lonare',
    email: 'ganeshlonare@example.com',
    bio: '👋 Ganesh Lonare | 💻 Passionate about Software Development | 🌱 Always learning & coding | ✨ Let\'s code something incredible together! 🚀',
    avatarUrl: 'https://i.pravatar.cc/150?u=1',
    skills: ['Java', 'MySQL'],
    interests: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const p = await userApi.getProfile();
        setProfile(prev => ({ ...prev, ...p }));
      } catch {
        // keep defaults
      }
    })();
  }, []);

  return (
    <ProfileGrid>
      {/* Profile Card - Left Sidebar */}
      <ProfileCard>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Avatar
            src={profile.avatarUrl || 'https://i.pravatar.cc/150?u=1'}
            sx={{ width: 140, height: 140, margin: '0 auto 24px' }}
          />
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#2D3436', fontSize: '1.5rem' }}>
            {profile.name || 'User'}
          </Typography>
          <Typography variant="body1" sx={{ color: '#636E72', mb: 2, fontSize: '1.1rem' }}>
            {(profile.email || '').split('@')[0] || 'username'}
          </Typography>
          <Typography variant="body1" sx={{ color: '#636E72', mb: 3, fontSize: '1.1rem' }}>
            Rank 1,165,943
          </Typography>
          <EditButton startIcon={<EditIcon />}>
            Edit Profile
          </EditButton>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ color: '#636E72', mb: 3, lineHeight: 1.8, fontSize: '1.1rem' }}>
            {profile.bio || 'Welcome to your profile!'}
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <StatsBox>
            <LocationOn sx={{ color: '#462872', fontSize: 24 }} />
            <Typography sx={{ fontSize: '1.1rem' }}>India</Typography>
          </StatsBox>
          <StatsBox>
            <School sx={{ color: '#462872', fontSize: 24 }} />
            <Typography sx={{ fontSize: '1.1rem' }}>Sanjivani College Of Engineering, Kopargaon</Typography>
          </StatsBox>
        </Box>

        <Box sx={{ mb: 4 }}>
          <StatsBox>
            <Language sx={{ color: '#462872', fontSize: 24 }} />
            <Typography sx={{ fontSize: '1.1rem' }}>{profile.website || 'https://example.com'}</Typography>
          </StatsBox>
          <StatsBox>
            <GitHub sx={{ color: '#462872', fontSize: 24 }} />
            <Typography sx={{ fontSize: '1.1rem' }}>{(profile as any).github || 'github-username'}</Typography>
          </StatsBox>
          <StatsBox>
            <Code sx={{ color: '#462872', fontSize: 24 }} />
            <Typography sx={{ fontSize: '1.1rem' }}>{(profile as any).codeforces || 'code-username'}</Typography>
          </StatsBox>
          <StatsBox>
            <LinkedIn sx={{ color: '#462872', fontSize: 24 }} />
            <Typography sx={{ fontSize: '1.1rem' }}>{(profile as any).linkedin || 'linkedin-username'}</Typography>
          </StatsBox>
        </Box>

        {/* Languages Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#2D3436', mb: 2, fontSize: '1.1rem' }}>
            Languages
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <SkillTag>Java</SkillTag>
              <Typography sx={{ color: '#636E72', fontSize: '0.9rem' }}>100 problems solved</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <SkillTag>MySQL</SkillTag>
              <Typography sx={{ color: '#636E72', fontSize: '0.9rem' }}>2 problems solved</Typography>
            </Box>
          </Box>
        </Box>

        {/* Skills Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#2D3436', mb: 2, fontSize: '1.1rem' }}>
            Skills
          </Typography>
          
          {/* Advanced Skills */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ display: 'flex', alignItems: 'center', color: '#2D3436', mb: 1, fontSize: '1rem', fontWeight: 500 }}>
              <DifficultyDot level="advanced" />
              Advanced
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
              <SkillTag>Divide and Conquer ×7</SkillTag>
              <SkillTag>Dynamic Programming ×6</SkillTag>
              <SkillTag>Backtracking ×2</SkillTag>
            </Box>
            <ShowMoreButton>Show more</ShowMoreButton>
          </Box>

          {/* Intermediate Skills */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ display: 'flex', alignItems: 'center', color: '#2D3436', mb: 1, fontSize: '1rem', fontWeight: 500 }}>
              <DifficultyDot level="intermediate" />
              Intermediate
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
              <SkillTag>Tree ×35</SkillTag>
              <SkillTag>Binary Tree ×35</SkillTag>
              <SkillTag>Depth-First Search ×24</SkillTag>
            </Box>
            <ShowMoreButton>Show more</ShowMoreButton>
          </Box>

          {/* Fundamental Skills */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ display: 'flex', alignItems: 'center', color: '#2D3436', mb: 1, fontSize: '1rem', fontWeight: 500 }}>
              <DifficultyDot level="fundamental" />
              Fundamental
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
              <SkillTag>Array ×35</SkillTag>
              <SkillTag>Two Pointers ×21</SkillTag>
              <SkillTag>Linked List ×17</SkillTag>
            </Box>
            <ShowMoreButton>Show more</ShowMoreButton>
          </Box>
        </Box>

        <Box>
          <SkillTag>Aspiring Java Backend Dev</SkillTag>
        </Box>
      </ProfileCard>

      {/* Contest Stats Card */}
      <ContestCard>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#2D3436', mb: 0.5, fontSize: '0.95rem' }}>
                Contest Rating
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#462872', fontSize: '1.75rem', mb: 0.5 }}>
                1,392
              </Typography>
              <Typography sx={{ color: '#636E72', fontSize: '0.9rem' }}>
                Global Ranking: 604,066 / 697,019
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#2D3436', fontSize: '0.95rem', mb: 0.5 }}>
                  Contests Attended
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#462872', fontSize: '1.3rem' }}>
                  3
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#2D3436', fontSize: '0.95rem', mb: 0.5 }}>
                  Top
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#462872', fontSize: '1.3rem' }}>
                  86.88%
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ height: 140 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ratingData}>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="rating" stroke="#462872" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </ContestCard>

      {/* Problems Solved Card - More compact layout */}
      <ProblemsCard>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          height: '100%',
          py: 1
        }}>
          <CircularProgress>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#462872', fontSize: '1.1rem' }}>
              102
            </Typography>
            <Typography variant="caption" sx={{ color: '#636E72', fontSize: '0.7rem' }}>
              /3555
            </Typography>
            <Typography variant="caption" sx={{ color: '#462872', mt: 0.2, fontSize: '0.7rem' }}>
              ✓ Solved
            </Typography>
            <Typography variant="caption" sx={{ color: '#636E72', mt: 0.2, fontSize: '0.7rem' }}>
              7 Attempting
            </Typography>
          </CircularProgress>
          <Box sx={{ flex: 1, ml: 2 }}>
            <DifficultyBar level="easy" sx={{ mb: 0.5 }}>
              <span>Easy</span>
              <span>63/877</span>
            </DifficultyBar>
            <DifficultyBar level="medium" sx={{ mb: 0.5 }}>
              <span>Medium</span>
              <span>37/1843</span>
            </DifficultyBar>
            <DifficultyBar level="hard" sx={{ mb: 0 }}>
              <span>Hard</span>
              <span>2/835</span>
            </DifficultyBar>
          </Box>
        </Box>
      </ProblemsCard>

      {/* Badges Card - More compact layout */}
      <BadgesCard>
        <Box sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          py: 1
        }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2D3436', mb: 0.5 }}>
            Badges
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#462872', mb: 0.5 }}>
            0
          </Typography>
          <Box sx={{ 
            backgroundColor: 'rgba(70, 40, 114, 0.05)', 
            borderRadius: 1,
            p: 1
          }}>
            <Typography variant="caption" sx={{ color: '#636E72', display: 'block' }}>
              🔒 May LeetCoding Challenge
            </Typography>
          </Box>
        </Box>
      </BadgesCard>

      {/* Contribution Graph Card - Now spans two columns in third row */}
      <ContributionCard>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#2D3436' }}>
            235 submissions in the past one year
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ color: '#636E72' }}>
              Total active days: 52
            </Typography>
            <Typography variant="body2" sx={{ color: '#636E72' }}>
              Max streak: 5
            </Typography>
            <Button
              endIcon={<ArrowDropDownIcon />}
              sx={{ color: '#636E72', textTransform: 'none' }}
            >
              Current
            </Button>
          </Box>
        </Box>
        <SubmissionHeatmap />
      </ContributionCard>
    </ProfileGrid>
  );
};

export default Profile; 