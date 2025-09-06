import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface RoadmapCardProps {
  title: string;
  subtitle: string;
  description: string;
  color: string;
  position: 'left' | 'right';
}

const roadmapData = [
  {
    title: 'Frontend',
    subtitle: 'HTML, CSS, JS',
    description: 'Begin your journey with core web technologies. Learn HTML to structure web pages, CSS for design and layout, and JavaScript to make your pages interactive and dynamic. Build solid fundamentals in responsive design and browser compatibility.',
    color: '#462872', // Purple
  },
  {
    title: 'React.js',
    subtitle: 'Modern UI Library',
    description: 'Dive into building modern, reusable components using React. Understand state, props, hooks, and how to create performant, maintainable frontends. Build real-world projects to solidify your understanding.',
    color: '#3b82f6', // Blue
  },
  {
    title: 'Backend',
    subtitle: 'Node.js, Express',
    description: 'Learn how to build scalable server-side applications. Handle routing, APIs, and middlewares using Express with Node.js. Understand server-side logic, database connectivity, and security best practices.',
    color: '#22c55e', // Green
  },
  {
    title: 'Database',
    subtitle: 'MongoDB & SQL',
    description: 'Master both SQL and NoSQL databases. Learn data modeling, querying, and optimization. Understand when to use different database types and how to integrate them with your applications.',
    color: '#f59e0b', // Orange
  },
  {
    title: 'DevOps',
    subtitle: 'Deployment & CI/CD',
    description: 'Explore modern deployment practices. Learn Docker, Kubernetes, and cloud platforms. Implement continuous integration and deployment pipelines for efficient development workflows.',
    color: '#ef4444', // Red
  },
];

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
        onClick={() => navigate('/quiz')}
        className="mt-auto self-start px-3 py-1.5 rounded text-sm font-medium text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: color }}
      >
        Take Assessment
      </button>
    </div>
  );
};

const Roadmap: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-20 relative">
      {/* Background Wave - Fixed */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Top Wave */}
        <svg className="absolute -top-10 left-0 w-full h-[600px]" viewBox="0 0 1440 400" preserveAspectRatio="none">
          <path 
            fill="#462872" 
            fillOpacity="0.03"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      {/* Top Bar - Fixed */}
      <div className="fixed top-0 left-0 right-0 h-[72px] flex items-center justify-between px-16 bg-white border-b border-gray-100 z-50">
        <img 
          src="/yuja-logo.svg" 
          alt="App Logo" 
          className="h-8 cursor-pointer" 
          onClick={handleLogoClick}
        />
        <button
          onClick={() => navigate('/week-plan')}
          className="bg-[#462872] h-[40px] text-white px-6 py-3 rounded-lg text-[0.95rem] font-medium hover:bg-[#3b2260] transition-colors flex items-center gap-2"
        >
          Start Preparation
          <ArrowForwardIcon />
        </button>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-[3rem] font-bold text-[#462872] mb-2 font-inter tracking-tight">
            Developer Roadmap
          </h1>
          <h2 className="text-[1.25rem] text-gray-600 font-normal font-inter max-w-[600px] mx-auto">
            Follow the path to become a full stack web developer
          </h2>
        </div>

        {/* Timeline */}
        <div className="container mx-auto max-w-6xl relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full z-0"
               style={{
                 background: 'linear-gradient(to bottom, #8b5cf6, #3b82f6, #22c55e, #f59e0b, #ef4444)',
               }}
          />
          
          {/* Cards */}
          {roadmapData.map((item, index) => (
            <RoadmapCard
              key={index}
              {...item}
              position={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
      </div>

      {/* AI Message - Fixed at bottom right */}
      <div className="fixed bottom-8 right-8 max-w-[400px] p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg z-50">
        <p className="text-gray-600 text-sm leading-relaxed flex items-start gap-2">
          <span className="w-2 h-2 rounded-full bg-[#462872] flex-shrink-0 mt-1.5" />
          <span>
            This roadmap is uniquely generated by AI based on your skills, goals, and learning preferences. It's personalized to optimize your learning journey and career development path.
          </span>
        </p>
      </div>
    </div>
  );
};

export default Roadmap; 