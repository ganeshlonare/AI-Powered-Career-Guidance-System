import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './dashboard/Sidebar';
import DashboardNavbar from './dashboard/DashboardNavbar';
import XPSidebar from './dashboard/XPSidebar';
import DashboardContent from './dashboard/DashboardContent';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const PageContainer = styled(Box)({
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
});

const MainContentWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'sidebarCollapsed' && prop !== 'xpSidebarOpen'
})<{ sidebarCollapsed: boolean; xpSidebarOpen: boolean }>(({ sidebarCollapsed, xpSidebarOpen }) => ({
  flex: 1,
  marginLeft: sidebarCollapsed ? '64px' : '256px',
  marginRight: xpSidebarOpen ? '500px' : '0',
  transition: 'all 0.3s ease',
  width: `calc(100% - ${sidebarCollapsed ? '64px' : '256px'} - ${xpSidebarOpen ? '500px' : '0px'})`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '90px 0 40px',
}));

const ContentContainer = styled(Box)({
  width: '100%',
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '0 32px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
});

const DashboardOverview = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [xpSidebarOpen, setXpSidebarOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const userName = (() => {
    if (!user) return 'User';
    const first = user.firstName?.trim();
    if (first) return first;
    const email = user.email || '';
    const handle = email.includes('@') ? email.split('@')[0] : email;
    return handle || 'User';
  })();

  const handleSidebarCollapse = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  const handleXPSidebarToggle = () => {
    setXpSidebarOpen(!xpSidebarOpen);
  };

  return (
    <PageContainer>
      <DashboardNavbar 
        userName={userName}
        flameCount={0}
        xpCount={0}
        onXPClick={handleXPSidebarToggle}
      />

      <Sidebar onCollapse={handleSidebarCollapse} />
      
      <XPSidebar 
        open={xpSidebarOpen} 
        onClose={() => setXpSidebarOpen(false)} 
      />

      <MainContentWrapper sidebarCollapsed={sidebarCollapsed} xpSidebarOpen={xpSidebarOpen}>
        <ContentContainer>
          {location.pathname === '/dashboard/overview' ? (
        <DashboardContent />
          ) : (
            <Outlet />
          )}
        </ContentContainer>
      </MainContentWrapper>
    </PageContainer>
  );
};

export default DashboardOverview;