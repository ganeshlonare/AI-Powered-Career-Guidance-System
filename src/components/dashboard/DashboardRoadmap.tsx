import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { roadmapApi } from '../../api/roadmap';

interface RoadmapCardProps {
  title: string;
  subtitle: string;
  description: string;
  color: string;
  position: 'left' | 'right';
}


const RoadmapCard: React.FC<RoadmapCardProps> = ({ title, subtitle, description, color, position }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className={`w-[45%] relative mb-20 bg-white rounded-xl shadow-lg p-8 min-h-[200px] flex flex-col
                  ${position === 'left' ? 'ml-0' : 'ml-auto'}`}
    >
      <div className="absolute top-1/2 -translate-y-1/2 w-[12.5%] h-0.5"
           style={{
             backgroundColor: color,
             [position === 'left' ? 'right' : 'left']: '-12.5%',
           }}
      />
      <div className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 z-10"
           style={{
             borderColor: color,
             [position === 'left' ? 'right' : 'left']: '-12.5%',
             transform: `translate(${position === 'left' ? '20%' : '-15%'}, -50%)`,
           }}
      />
      <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full z-20"
           style={{
             backgroundColor: color,
             [position === 'left' ? 'right' : 'left']: '-12.5%',
             transform: `translate(${position === 'left' ? '-10%' : '15%'}, -50%)`,
           }}
      />
      
      <h3 className="text-[1.75rem] font-semibold mb-3 font-inter"
          style={{ color }}
      >
        {title}
      </h3>
      <h4 className="text-[1.1rem] text-gray-600 font-medium mb-4 font-inter">
        {subtitle}
      </h4>
      <div className="w-12 h-[3px] mb-6" style={{ backgroundColor: color }} />
      <p className="text-gray-600 leading-[1.7] text-base font-inter mb-5">
        {description}
      </p>
      <button
        onClick={() => navigate('/dashboard/assessment')}
        className="mt-auto self-start px-3 py-1.5 rounded text-sm font-medium text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: color }}
      >
        Take Assessment
      </button>
    </div>
  );
};

type StepLike = { id?: string; title: string; description?: string };

const DashboardRoadmap = () => {
  const [loading, setLoading] = useState(true);
  const [steps, setSteps] = useState<StepLike[]>([]);
  const [careerTitle, setCareerTitle] = useState<string>('');

  const normalizeToSteps = (rm: any): StepLike[] => {
    if (!rm) return [];
    // 1) Direct steps
    if (Array.isArray(rm.steps) && rm.steps.length) return rm.steps;
    // 2) milestonesArray (already parsed)
    if (Array.isArray(rm.milestonesArray) && rm.milestonesArray.length) return rm.milestonesArray;
    // 3) milestones as JSON string
    if (typeof rm.milestones === 'string') {
      try {
        const parsed = JSON.parse(rm.milestones);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
    }
    // 4) roadmapData as JSON string (array of items with title/sub title/description)
    if (typeof rm.roadmapData === 'string') {
      try {
        const parsed = JSON.parse(rm.roadmapData);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
    }
    return [];
  };

  useEffect(() => {
    let cancelled = false;

    const ensureRoadmap = async () => {
      // 1) Try to get roadmap with id = 1
      try {
        const rm: any = await roadmapApi.getById(1);
        const normalized = normalizeToSteps(rm);
        const career = rm?.career || rm?.title || 'Personalized Roadmap';
        if (normalized.length > 0) {
          if (!cancelled) {
            setCareerTitle(career);
            setSteps(normalized);
            setLoading(false);
          }
          return;
        }
      } catch {
        // Not found or error; proceed to generate
      }

      // 2) Generate once, then fetch id=1 again
      try {
        await roadmapApi.generate();
        const rm2: any = await roadmapApi.getById(1);
        const normalized2 = normalizeToSteps(rm2);
        const career2 = rm2?.career || rm2?.title || 'Personalized Roadmap';
        if (!cancelled) {
          setCareerTitle(career2);
          setSteps(normalized2);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setSteps([]);
          setLoading(false);
        }
      }
    };

    ensureRoadmap();
    return () => { cancelled = true; };
  }, []);

  const hasData = steps.length > 0;

  return (
    <Box sx={{ 
      width: '100%',
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 32px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div className="relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-[2.5rem] font-bold text-[#462872] mb-2 font-inter tracking-tight">
            Developer Roadmap
          </h1>
          <h2 className="text-[1.25rem] text-gray-600 font-normal font-inter max-w-[600px] mx-auto">
            Follow the path to become a full stack web developer
          </h2>
        </div>

        {loading && (
          <Box sx={{ minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress sx={{ color: '#462872', mb: 2 }} />
              <Typography sx={{ color: '#424446' }}>Generating your personalized roadmap…</Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>This usually takes a few seconds.</Typography>
            </Box>
          </Box>
        )}

        {!loading && hasData && (
          <div className="w-full max-w-[1200px] mx-auto relative px-4">
            {/* Vertical Line */}
            <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full z-0"
                 style={{
                   background: 'linear-gradient(to bottom, #8b5cf6, #3b82f6, #22c55e, #f59e0b, #ef4444)',
                 }}
            />
            {/* Cards built from roadmap data */}
            {steps.map((step: any, index: number) => (
              <RoadmapCard
                key={step.id || `${index}-${step.title}`}
                title={step.title}
                subtitle={careerTitle}
                description={step.description || step['sub title'] || ''}
                color={['#462872','#3b82f6','#22c55e','#f59e0b','#ef4444'][index % 5]}
                position={index % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>
        )}

        {!loading && !hasData && (
          <Box sx={{ minHeight: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ color: '#666' }}>
              Roadmap is not available yet. Please try again shortly.
            </Typography>
          </Box>
        )}
      </div>
    </Box>
  );
};

export default DashboardRoadmap;