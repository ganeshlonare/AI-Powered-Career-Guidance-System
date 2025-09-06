import { Box, Typography, Button, Paper, Grid, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BarChartIcon from '@mui/icons-material/BarChart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';


const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  border: '1px solid rgba(70, 40, 114, 0.1)',
  boxShadow: '0 4px 12px rgba(70, 40, 114, 0.05)',
  height: '100%',
  background: '#fff',
  position: 'relative',
  overflow: 'hidden',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: '42px',
  height: '42px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#F3F0FF',
  marginBottom: theme.spacing(2),
}));

const ProgressBar = styled(Box)(({ theme }) => ({
  height: '4px',
  backgroundColor: '#F3F0FF',
  borderRadius: '2px',
  overflow: 'hidden',
  '& > div': {
    height: '100%',
    backgroundColor: '#462872',
    borderRadius: '2px',
  },
}));

const COLORS = ['#462872', '#00D2D3', '#FF6B6B', '#54A0FF'];

// Sample data for charts
const skillsData = [
  { name: 'Programming', value: 75 },
  { name: 'Design', value: 60 },
  { name: 'Communication', value: 85 },
  { name: 'Problem Solving', value: 80 }
];

const learningProgressData = [
  { name: 'Web Dev', completed: 12, total: 20 },
  { name: 'UI/UX', completed: 8, total: 15 },
  { name: 'Data', completed: 5, total: 18 },
  { name: 'Mobile', completed: 3, total: 10 }
];

const activityData = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 3.2 },
  { day: 'Wed', hours: 1.8 },
  { day: 'Thu', hours: 4.0 },
  { day: 'Fri', hours: 3.5 },
  { day: 'Sat', hours: 2.0 },
  { day: 'Sun', hours: 1.2 }
];

const DashboardContent = () => {
  const navigate = useNavigate();

  const handleClick=()=>{
    navigate('/week-plan');
  }
  return (
    <Box sx={{ position: 'relative', marginLeft: '42px' }}>
      {/* Welcome Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <StyledPaper>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#2D3436', mb: 1 }}>
                  Welcome back, Ganesh!
                </Typography>
                <Typography variant="body1" sx={{ color: '#636E72' }}>
                  Here's what's happening with your career journey today.
                </Typography>
              </Box>
                <Button
                onClick={handleClick}
                  variant="contained"
                  sx={{
                    backgroundColor: '#462872',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#3a2160',
                    },
                  }}
                >
                  Continue Learning
                </Button>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconWrapper>
                    <StarIcon sx={{ color: '#462872' }} />
                  </IconWrapper>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Career Progress</Typography>
                    <ProgressBar>
                      <Box sx={{ width: '65%' }} />
                    </ProgressBar>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#636E72' }}>65%</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconWrapper>
                    <LocalFireDepartmentIcon sx={{ color: '#FF6B6B' }} />
                  </IconWrapper>
                  <Box>
                    <Typography variant="subtitle2">Learning Streak</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>7 days</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <StyledPaper>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Upcoming Sessions</Typography>
              <CalendarTodayIcon sx={{ color: '#636E72' }} />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {[
                { time: 'Today, 2:00 PM', title: 'Resume Review', host: 'with Sarah M.' },
                { time: 'Tomorrow, 10:00 AM', title: 'Tech Interview Prep', host: 'with Michael P.' }
              ].map((session, index) => (
                <Box key={index} sx={{ borderLeft: '2px solid #462872', pl: 2 }}>
                  <Typography variant="caption" sx={{ color: '#636E72' }}>{session.time}</Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{session.title}</Typography>
                  <Typography variant="body2" sx={{ color: '#636E72' }}>{session.host}</Typography>
                </Box>
              ))}
            </Box>

            <Button
              endIcon={<ArrowForwardIcon />}
              sx={{
                mt: 3,
                color: '#462872',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                },
              }}
            >
              View all sessions
            </Button>
          </StyledPaper>
        </Grid>

        {/* Stats Section */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {[
              { icon: <MenuBookIcon />, label: 'Completed Lessons', value: '47', color: '#462872' },
              { icon: <AccessTimeIcon />, label: 'Learning Hours', value: '38.5', color: '#00D2D3' },
              { icon: <CalendarTodayIcon />, label: 'Next Assessment', value: '2 days', color: '#FF6B6B' },
              { icon: <StarIcon />, label: 'Career Match Score', value: '85%', color: '#54A0FF' }
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <StyledPaper>
                  <IconWrapper sx={{ backgroundColor: `${stat.color}15` }}>
                    <Box sx={{ color: stat.color }}>{stat.icon}</Box>
                  </IconWrapper>
                  <Typography variant="body2" sx={{ color: '#636E72' }}>{stat.label}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, mt: 1 }}>{stat.value}</Typography>
                </StyledPaper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Skills Analysis</Typography>
              <BarChartIcon sx={{ color: '#636E72' }} />
            </Box>
            
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={skillsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {skillsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
              {skillsData.map((skill, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />
                  <Typography variant="caption" sx={{ color: '#636E72' }}>
                    {skill.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Learning Progress</Typography>
              <BarChartIcon sx={{ color: '#636E72' }} />
            </Box>
            
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={learningProgressData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" name="Completed" fill="#462872" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="total" name="Total" fill="#F3F0FF" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Weekly Activity</Typography>
              <BarChartIcon sx={{ color: '#636E72' }} />
            </Box>
            
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={activityData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="#462872" 
                    strokeWidth={2} 
                    dot={{ fill: '#462872' }}
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
              <Box>
                <Typography variant="body2" sx={{ color: '#636E72' }}>Total this week</Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>18.2 hours</Typography>
              </Box>
              <Box sx={{ 
                backgroundColor: '#E6FEF5', 
                color: '#0CA678',
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                fontSize: '0.75rem',
                fontWeight: 600
              }}>
                +12% vs last week
              </Box>
            </Box>
          </StyledPaper>
        </Grid>

        {/* Recommended Section */}
        <Grid item xs={12}>
          <StyledPaper>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Recommended For You</Typography>
              <Button
                endIcon={<ArrowForwardIcon />}
                sx={{
                  color: '#462872',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    textDecoration: 'underline',
                  },
                }}
              >
                View all
              </Button>
            </Box>

            <Grid container spacing={3}>
              {[
                {
                  title: "Frontend Development Fundamentals",
                  type: "Course",
                  duration: "8 hours",
                  image: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600"
                },
                {
                  title: "Technical Interview Preparation",
                  type: "Workshop",
                  duration: "3 hours",
                  image: "https://images.pexels.com/photos/1181615/pexels-photo-1181615.jpeg?auto=compress&cs=tinysrgb&w=600"
                },
                {
                  title: "UI/UX Design Principles",
                  type: "Course",
                  duration: "6 hours",
                  image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600"
                }
              ].map((item, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Box sx={{ 
                    border: '1px solid rgba(70, 40, 114, 0.1)',
                    borderRadius: 2,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(70, 40, 114, 0.1)',
                    }
                  }}>
                    <Box sx={{ 
                      height: 200,
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }} />
                    <Box sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {item.title}
                        </Typography>
                        <Box sx={{ 
                          backgroundColor: '#F3F0FF',
                          color: '#462872',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}>
                          {item.type}
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#636E72' }}>
                        <AccessTimeIcon sx={{ fontSize: 16 }} />
                        <Typography variant="body2">{item.duration}</Typography>
                      </Box>
                      <Button
                        sx={{
                          mt: 2,
                          color: '#462872',
                          p: 0,
                          '&:hover': {
                            backgroundColor: 'transparent',
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        Start Learning
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardContent;