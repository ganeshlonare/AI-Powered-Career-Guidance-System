import React from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button,
  Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    maxWidth: '400px',
    width: '90%',
    borderRadius: '16px',
    padding: theme.spacing(4),
    margin: theme.spacing(2),
  },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  backgroundColor: '#FFF3E0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: theme.spacing(3),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-4px',
    left: '-4px',
    right: '-4px',
    bottom: '-4px',
    borderRadius: '50%',
    border: '2px solid #FFB74D',
    opacity: 0.5,
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(2),
  top: theme.spacing(2),
  color: theme.palette.grey[500],
}));

const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#462872',
  color: '#fff',
  padding: '10px 24px',
  borderRadius: '50px',
  fontSize: '0.95rem',
  fontWeight: 500,
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#3a2160',
  },
}));

interface StreakIntroModalProps {
  open: boolean;
  onClose: () => void;
  onStart: () => void;
}

const StreakIntroModal: React.FC<StreakIntroModalProps> = ({
  open,
  onClose,
  onStart,
}) => {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      aria-labelledby="streak-intro-dialog"
    >
      <DialogContent sx={{ textAlign: 'center', position: 'relative', p: 0 }}>
        <CloseButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </CloseButton>

        <IconContainer>
          <LocalFireDepartmentIcon
            sx={{
              fontSize: '32px',
              color: '#FF9800',
            }}
          />
        </IconContainer>

        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 600,
            mb: 2,
            color: '#2D3436',
          }}
        >
          Introducing Streaks!
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#636E72',
            mb: 1,
            fontSize: '1rem',
            lineHeight: 1.6,
          }}
        >
          Your streak is your daily win!
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: '#636E72',
            mb: 2,
            fontSize: '0.95rem',
            lineHeight: 1.5,
          }}
        >
          Watch 10 minutes each day to keep it alive and growing,
          <br />
          showing off your dedication!
        </Typography>

        <ActionButton
          fullWidth
          onClick={onStart}
        >
          Start My Streak
        </ActionButton>

        <Typography
          variant="caption"
          sx={{
            color: '#636E72',
            display: 'block',
            fontSize: '0.8rem',
          }}
        >
          Still unsure?{' '}
          <Link
            href="#"
            underline="hover"
            sx={{ color: '#462872' }}
            onClick={(e) => {
              e.preventDefault();
              // Add your learn more logic here
            }}
          >
            Learn more about streaks here!
          </Link>
        </Typography>
      </DialogContent>
    </StyledDialog>
  );
};

export default StreakIntroModal;