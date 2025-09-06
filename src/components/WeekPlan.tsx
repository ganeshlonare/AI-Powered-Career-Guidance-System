import React, { useState, useEffect, useMemo } from 'react';
import {
  Typography,
  IconButton,
  Button,
  Rating,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import YouTube from 'react-youtube';
import { useNavigate } from 'react-router-dom';
import { weeklyPlanApi } from '../api/weeklyPlan';
import type { WeeklyPlanItem } from '../api/weeklyPlan';

interface ModuleData {
  id: number;
  title: string;
  subtitle: string;
  completed: boolean;
  lessons: {
    id: string;
    title: string;
    youtube?: string;
    completed: boolean;
  }[];
}

const initialModuleData: ModuleData[] = [];

const WeekPlan = () => {
  const [activeTab, setActiveTab] = useState('rating');
  const [expanded, setExpanded] = useState<string | false>('module2');
  const [moduleData, setModuleData] = useState<ModuleData[]>(initialModuleData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLessonId, setCurrentLessonId] = useState<string>('1-1');
  const [progress, setProgress] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // Fetch/generate weekly plan on mount (idempotent server)
  useEffect(() => {
    (async () => {
      try {
        const weeks: WeeklyPlanItem[] = await weeklyPlanApi.generate();
        const mapped: ModuleData[] = (weeks || []).map((w) => ({
          id: Number(w.week),
          title: w.title || `Week ${w.week}`,
          subtitle: '',
          completed: false,
          lessons: (w.data || []).map((d, idx) => ({
            id: `${w.week}-${idx + 1}`,
            title: d.subpoint,
            youtube: d.youtube_link || '',
            completed: false,
          })),
        }));
        setModuleData(mapped);
        // Initialize selection to first lesson if present
        if (mapped.length && mapped[0].lessons.length) {
          setCurrentLessonId(mapped[0].lessons[0].id);
          setExpanded(`module${mapped[0].id}`);
        }
      } catch (e: any) {
        setError(e?.message || 'Failed to load weekly plan');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Calculate total progress
  useEffect(() => {
    const totalLessons = moduleData.reduce((acc, module) => acc + module.lessons.length, 0);
    const completedLessons = moduleData.reduce((acc, module) => 
      acc + module.lessons.filter(lesson => lesson.completed).length, 0);
    const newProgress = Math.round((completedLessons / totalLessons) * 100);
    setProgress(newProgress);
  }, [moduleData]);

  // Handle lesson completion
  const handleLessonComplete = (checked: boolean) => {
    setModuleData(prevData => {
      const newData = prevData.map(module => ({
        ...module,
        lessons: module.lessons.map(lesson => 
          lesson.id === currentLessonId 
            ? { ...lesson, completed: checked }
            : lesson
        ),
        // Update module completion if all lessons are completed
        completed: module.lessons.every(lesson => 
          lesson.id === currentLessonId ? checked : lesson.completed
        )
      }));
      return newData;
    });
  };

  // Find current lesson completion status
  const getCurrentLessonStatus = () => {
    for (const module of moduleData) {
      const lesson = module.lessons.find(l => l.id === currentLessonId);
      if (lesson) return lesson.completed;
    }
    return false;
  };

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Determine current lesson and YouTube video id
  const currentLesson = useMemo(() => {
    for (const module of moduleData) {
      const lesson = module.lessons.find(l => l.id === currentLessonId);
      if (lesson) return lesson;
    }
    return null;
  }, [moduleData, currentLessonId]);

  const extractVideoId = (url?: string) => {
    if (!url) return '';
    // supports youtu.be, youtube.com/watch?v=, youtube.com/embed/
    try {
      const u = new URL(url);
      if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
      if (u.pathname.includes('/embed/')) return u.pathname.split('/embed/')[1];
      const v = u.searchParams.get('v');
      return v || '';
    } catch {
      // possibly already just id
      if (url.includes('/embed/')) return url.split('/embed/')[1];
      return url;
    }
  };

  const videoId = extractVideoId(currentLesson?.youtube);

  const opts = {
    height: '600px',
    width: '100%',
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      controls: 0,
      showinfo: 0,
      rel: 0,
    },
  };

  const handleClick = () => {
    navigate('/dashboard/overview');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[800px] opacity-[0.03]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23462872' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
          }}
        />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] opacity-[0.02] transform rotate-180" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23462872' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Top Navigation Bar */}
      <div className="h-20 border-b border-gray-200 flex items-center px-8 bg-white/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-6 flex-1">
          <img 
            src="/yuja-logo.svg" 
            alt="App Logo" 
            className="h-9 cursor-pointer" 
            onClick={handleLogoClick}
          />
          <div className="flex items-center gap-3">
            <ArrowBackIcon onClick={handleClick} className="text-gray-800 text-2xl cursor-pointer" />
            <span className="text-xl text-gray-800 font-semibold">
              Full Stack Web Development Roadmap
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Progress</span>
          <div className="relative flex items-center justify-center">
            <CircularProgress
              variant="determinate"
              value={progress}
              size={40}
              thickness={4}
              sx={{
                color: '#462872'
              }}
            />
            <span className="absolute text-sm font-medium text-gray-800">{progress}%</span>
          </div>
          <button 
            onClick={() => navigate('/dashboard/overview')}
            className="ml-4 px-6 py-2 bg-[#462872] text-white rounded-xl hover:bg-[#3b2260] font-medium text-[15px] transition-colors"
          >
            Dashboard
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <div className="w-[390px] border-r border-gray-200 overflow-hidden flex flex-col sticky top-20 h-[calc(100vh-80px)] bg-white/95 backdrop-blur-sm">
          <div className="overflow-y-auto flex-1">
            {loading ? (
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <CircularProgress size={20} sx={{ color: '#462872' }} />
                  <span>Preparing your weekly plan…</span>
                </div>
              </div>
            ) : (
            moduleData.map((module) => (
              <div key={module.id}>
                <Accordion
                  expanded={expanded === `module${module.id}`}
                  onChange={handleAccordionChange(`module${module.id}`)}
                  className="bg-transparent shadow-none before:hidden"
                  sx={{
                    '&.MuiAccordion-root': {
                      borderBottom: 'none'
                    }
                  }}
                >
                  <AccordionSummary 
                    expandIcon={<ExpandMoreIcon className="text-2xl text-gray-600" />}
                    className={`relative py-6 px-6 hover:bg-gray-50 transition-colors duration-200 ${
                      expanded === `module${module.id}` ? 'bg-gray-50' : ''
                    }`}
                  >
                    <div className={`absolute left-0 top-0 w-1 h-full ${module.completed ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-lg font-semibold text-gray-800">{module.title}</h3>
                      {module.subtitle ? (
                        <p className="text-[15px] text-gray-500 font-normal">{module.subtitle}</p>
                      ) : null}
                    </div>
                  </AccordionSummary>
                  {module.lessons.length > 0 && (
                    <AccordionDetails className="px-6 pb-6">
                      <div className="flex flex-col gap-4">
                        {module.lessons.map((lesson, index) => (
                          <div 
                            key={lesson.id}
                            className={`flex items-center gap-4 py-3 pl-4 relative cursor-pointer rounded-lg transition-colors duration-200 ${
                              currentLessonId === lesson.id ? 'bg-gray-100 hover:bg-gray-100' : 'hover:bg-gray-50'
                            }`}
                            onClick={() => setCurrentLessonId(lesson.id)}
                          >
                            {/* Vertical connecting line */}
                            {index < module.lessons.length - 1 && (
                              <div 
                                className={`absolute left-[27px] top-[100%] w-[2px] h-[calc(100%+16px)] -translate-y-[40%] transition-colors duration-200 ${
                                  lesson.completed && module.lessons[index + 1].completed
                                    ? 'bg-emerald-500'
                                    : 'bg-gray-200'
                                }`}
                              />
                            )}
                            
                            {/* Task circle and content */}
                            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center relative z-10 transition-colors duration-200 ${
                              lesson.completed ? 'bg-emerald-500' : 'bg-gray-300'
                            }`}>
                              <CheckCircleIcon className="text-white text-lg" />
                            </div>
                            <span className="text-[15px] text-gray-700 font-medium">{lesson.title}</span>
                          </div>
                        ))}
                      </div>
                    </AccordionDetails>
                  )}
                </Accordion>
              </div>
            )))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto h-[calc(100vh-80px)]">
          {/* Sub Header */}
          <div className="h-16 flex items-center justify-between px-16 bg-gray-50 sticky">
            <span className="text-lg text-gray-800 font-medium">
              {currentLesson?.title || 'Lecture'}
            </span>
            <FormControlLabel
              control={
                <Checkbox
                  checked={getCurrentLessonStatus()}
                  onChange={(e) => handleLessonComplete(e.target.checked)}
                  sx={{
                    '&.Mui-checked': {
                      color: '#462872'
                    }
                  }}
                />
              }
              label={<span className="text-gray-700 font-medium">Mark Complete</span>}
              className="select-none"
            />
          </div>

          {/* Video Section */}
          <div className="px-16 bg-gray-50/95 backdrop-blur-sm">
            <div className="relative max-w-[1400px] px-24 bg-black">
              {videoId ? (
                <YouTube
                  videoId={videoId}
                  opts={opts}
                  className="w-full"
                />
              ) : (
                <div className="w-full h-[600px] flex items-center justify-center text-white">
                  <span>No video link available for this item.</span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent flex items-center gap-3 text-white">
                <IconButton size="small" className="text-white hover:text-[#462872]">
                  <FastRewindIcon />
                </IconButton>
                <IconButton size="small" className="text-white hover:text-[#462872]">
                  <PlayArrowIcon />
                </IconButton>
                <IconButton size="small" className="text-white hover:text-[#462872]">
                  <FastForwardIcon />
                </IconButton>
                <span className="text-sm mx-2">18:46 / 1:41:02</span>
                <div className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer">
                  <div className="h-full w-[40%] bg-[#462872] rounded-full" />
                </div>
                <IconButton size="small" className="text-white hover:text-[#462872]">
                  <VolumeUpIcon />
                </IconButton>
                <IconButton size="small" className="text-white hover:text-[#462872]">
                  <SettingsIcon />
                </IconButton>
                <IconButton size="small" className="text-white hover:text-[#462872]">
                  <OpenInFullIcon />
                </IconButton>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-3 border-b border-gray-300">
              <div className="flex gap-2">
                {['Overview', 'Attachment', 'Notes', 'Rating'].map((tab) => (
                  <div
                    key={tab}
                    className={`px-6 py-3 text-[15px] font-medium transition-colors duration-200 ${
                      activeTab === tab.toLowerCase()
                        ? 'text-[#462872] border-b-2 border-[#462872]'
                        : 'text-gray-500 border-b-2 border-transparent'
                    }`}
                  >
                    {tab}
                  </div>
                ))}
              </div>
            </div>

            {/* Rating Content */}
            {activeTab === 'rating' && (
              <div className="mt-8 pb-8">
                <div className="mb-8">
                  <h2 className="text-xl text-gray-800 font-semibold mb-4">Rate your class</h2>
                  <Rating 
                    size="large"
                    sx={{
                      '& .MuiRating-iconFilled': {
                        color: '#462872'
                      }
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-gray-800 font-medium mb-4">
                    Would you like to share any other thoughts? (optional)
                  </h3>
                  <TextField
                    multiline
                    rows={4}
                    fullWidth
                    placeholder="Your feedback..."
                    className="rounded-lg"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#462872'
                        }
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-[20%] right-[5%] w-64 h-64 bg-[#462872] rounded-full mix-blend-multiply filter blur-3xl opacity-[0.03] animate-blob"></div>
      <div className="absolute top-[40%] left-[5%] w-72 h-72 bg-[#462872] rounded-full mix-blend-multiply filter blur-3xl opacity-[0.03] animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[20%] right-[15%] w-80 h-80 bg-[#462872] rounded-full mix-blend-multiply filter blur-3xl opacity-[0.03] animate-blob animation-delay-4000"></div>
    </div>
  );
};

// Add these keyframes to your global CSS or tailwind.config.js
const style = document.createElement('style');
style.textContent = `
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
`;
document.head.appendChild(style);

export default WeekPlan; 