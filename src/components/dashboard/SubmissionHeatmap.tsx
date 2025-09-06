import React from 'react';
import { Box, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

interface HeatmapCellProps {
  intensity: number;
}

const HeatmapCell = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'intensity',
})<HeatmapCellProps>(({ theme, intensity }) => {
  const getColor = () => {
    if (intensity === 0) return '#ebedf0';
    if (intensity <= 2) return 'rgba(70, 40, 114, 0.2)';
    if (intensity <= 4) return 'rgba(70, 40, 114, 0.4)';
    if (intensity <= 6) return 'rgba(70, 40, 114, 0.6)';
    return 'rgba(70, 40, 114, 0.8)';
  };

  return {
    width: '10px',
    height: '10px',
    borderRadius: '2px',
    backgroundColor: getColor(),
    margin: '2px',
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  };
});

const HeatmapRow = styled(Box)({
  display: 'flex',
  gap: '2px',
});

const HeatmapGrid = styled(Box)({
  display: 'flex',
  gap: '2px',
  flexWrap: 'wrap',
});

const WeekLabels = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  marginRight: '4px',
  '& > span': {
    fontSize: '10px',
    color: '#636E72',
    height: '14px',
    display: 'flex',
    alignItems: 'center',
  },
});

const MonthLabels = styled(Box)({
  display: 'flex',
  gap: '2px',
  marginBottom: '8px',
  marginLeft: '20px',
  '& > span': {
    fontSize: '10px',
    color: '#636E72',
    width: '30px',
  },
});

// Generate mock data for the heatmap
const generateMockData = () => {
  const data = [];
  const days = 52 * 7; // 52 weeks
  for (let i = 0; i < days; i++) {
    const intensity = Math.floor(Math.random() * 8);
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000),
      intensity,
    });
  }
  return data;
};

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const SubmissionHeatmap: React.FC = () => {
  const data = generateMockData();
  const weeks = [];

  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  return (
    <Box sx={{ p: 2 }}>
      <MonthLabels>
        {months.map((month) => (
          <span key={month}>{month}</span>
        ))}
      </MonthLabels>
      <Box sx={{ display: 'flex' }}>
        <WeekLabels>
          {weekDays.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </WeekLabels>
        <HeatmapGrid>
          {weeks.map((week, weekIndex) => (
            <HeatmapRow key={weekIndex}>
              {week.map((day, dayIndex) => (
                <Tooltip
                  key={`${weekIndex}-${dayIndex}`}
                  title={`${day.intensity} submissions on ${day.date.toLocaleDateString()}`}
                  arrow
                >
                  <Box>
                    <HeatmapCell intensity={day.intensity} />
                  </Box>
                </Tooltip>
              ))}
            </HeatmapRow>
          ))}
        </HeatmapGrid>
      </Box>
    </Box>
  );
};

export default SubmissionHeatmap; 