import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Typography, IconButton, Avatar } from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  Route as RouteIcon,
  School as SchoolIcon,
  QuestionAnswer as AssessmentIcon,
  Business as IndustryIcon,
  Description as ResumeIcon,
  Article as CVIcon,
  Person as UserIcon,
  Group as UsersIcon,
  Message as MessageIcon,
  Headset as HeadsetIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

interface SidebarProps {
  onCollapse: (collapsed: boolean) => void;
}

const SidebarContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'collapsed'
})<{ collapsed: boolean }>(({ theme, collapsed }) => ({
  position: 'fixed',
  left: 0,
  top: '70px',
  height: 'calc(100vh - 70px)',
  width: collapsed ? '80px' : '300px',
  backgroundColor: '#fff',
  borderRight: '1px solid #eee',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  zIndex: 1000,
  boxShadow: '4px 0 8px rgba(0, 0, 0, 0.05)',
}));

const ToggleButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: '-12px',
  top: '32px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  padding: '4px',
  '& .MuiSvgIcon-root': {
    fontSize: '20px',
  },
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
}));

const NavLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'collapsed'
})<{ active: boolean; collapsed: boolean }>(({ theme, active, collapsed }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: collapsed ? 'center' : 'flex-start',
  padding: collapsed ? '10px' : '10px 20px',
  textDecoration: 'none',
  color: active ? '#462872' : '#666',
  backgroundColor: active ? 'rgba(70, 40, 114, 0.08)' : 'transparent',
  borderRadius: '12px',
  margin: '1px 12px',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: active ? 'rgba(70, 40, 114, 0.12)' : 'rgba(0, 0, 0, 0.04)',
  },
  '& .MuiSvgIcon-root': {
    width: '24px',
    height: '24px',
    marginRight: collapsed ? '0' : '16px',
    color: active ? '#462872' : '#666',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.85rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  color: '#666',
  padding: '1px 28px 12px',
  letterSpacing: '0.5px',
}));

const UserSection = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'collapsed'
})<{ collapsed: boolean }>(({ collapsed }) => ({
  padding: collapsed ? '12px' : '16px 24px',
  borderBottom: '1px solid #eee',
  display: 'flex',
  alignItems: 'center',
  justifyContent: collapsed ? 'center' : 'flex-start',
}));

const VersionInfo = styled(Typography)({
  padding: '20px 28px',
  fontSize: '0.8rem',
  color: '#666',
});

const Sidebar: React.FC<SidebarProps> = ({ onCollapse }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    onCollapse(newCollapsed);
  };

  // Mock user data (replace with actual user data later)
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://i.pravatar.cc/150?u=1'
  };
  
  const navItems = [
    { path: '/dashboard/overview', label: 'Dashboard', icon: <DashboardIcon /> },
    { path: '/dashboard/roadmap', label: 'Roadmap', icon: <RouteIcon /> },
    { path: '/week-plan', label: 'Learning', icon: <SchoolIcon /> },
    { path: '/assessment/instructions', label: 'Assessment', icon: <AssessmentIcon /> },
    { path: '/industry-insights', label: 'Industry Insights', icon: <IndustryIcon /> },
    { path: '/dashboard/resume-builder', label: 'Resume Builder', icon: <ResumeIcon /> },
    { path: '/jobs', label: 'Jobs', icon: <IndustryIcon /> },
    { path: '/dashboard/profile', label: 'Profile', icon: <UserIcon /> },
  ];
  
  const secondaryNavItems = [
    { path: '/dashboard/community', label: 'Community', icon: <UsersIcon /> },
    { path: '/dashboard/mentors', label: 'Mentors', icon: <MessageIcon /> },
    { path: '/dashboard/support', label: 'Support', icon: <HeadsetIcon /> },
    { path: '/dashboard/settings', label: 'Settings', icon: <SettingsIcon /> },
  ];
  
  return (
    <SidebarContainer collapsed={collapsed}>
      <ToggleButton onClick={toggleSidebar} size="small">
        {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </ToggleButton>

      <UserSection collapsed={collapsed}>
        {collapsed ? (
          <Avatar src={user.avatar} sx={{ width: 40, height: 40 }} />
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={user.avatar} sx={{ width: 48, height: 48 }} />
            <Box>
              <Typography variant="subtitle1" sx={{ color: '#424446', fontWeight: 500, fontSize: '1rem' }}>
                {user.name}
              </Typography>
              <Typography variant="caption" sx={{ color: '#666', fontSize: '0.85rem' }}>
                {user.email}
              </Typography>
            </Box>
          </Box>
        )}
      </UserSection>

      <Box sx={{ py: 2 }}>
        {!collapsed && <SectionTitle>Main</SectionTitle>}
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            active={location.pathname === item.path}
            collapsed={collapsed}
          >
            {item.icon}
            {!collapsed && (
              <Typography
                variant="body1"
                sx={{ 
                  fontWeight: location.pathname === item.path ? 500 : 400,
                  fontSize: '0.95rem'
                }}
              >
                {item.label}
              </Typography>
            )}
          </NavLink>
        ))}

        {!collapsed && <SectionTitle sx={{ mt: 2 }}>Secondary</SectionTitle>}
        {secondaryNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            active={location.pathname === item.path}
            collapsed={collapsed}
          >
            {item.icon}
            {!collapsed && (
              <Typography 
                variant="body1"
                sx={{ fontSize: '0.95rem' }}
              >
                {item.label}
              </Typography>
            )}
          </NavLink>
        ))}
      </Box>

      {!collapsed && (
        <Box sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
          <VersionInfo>
            CareerCompass v1.0.0
          </VersionInfo>
        </Box>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;