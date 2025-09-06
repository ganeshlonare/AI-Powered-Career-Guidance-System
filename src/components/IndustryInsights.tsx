import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function IndustryInsights() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const chartData = {
    labels: ['Software Engineer', 'Data Scientist', 'Frontend Developer', 'Backend Developer', 'DevOps Engineer', 'Mobile App Developer'],
    datasets: [
      {
        label: 'Minimum',
        data: [75, 80, 65, 70, 85, 60],
        backgroundColor: 'rgba(59, 34, 96, 0.2)',
        borderColor: 'rgba(59, 34, 96, 0.4)',
        borderWidth: 1,
        barPercentage: 0.85,
        categoryPercentage: 0.85,
        borderRadius: 8,
        hoverBackgroundColor: 'rgba(59, 34, 96, 0.3)'
      },
      {
        label: 'Median',
        data: [105, 115, 95, 100, 110, 90],
        backgroundColor: 'rgba(59, 34, 96, 0.4)',
        borderColor: 'rgba(59, 34, 96, 0.6)',
        borderWidth: 1,
        barPercentage: 0.85,
        categoryPercentage: 0.85,
        borderRadius: 8,
        hoverBackgroundColor: 'rgba(59, 34, 96, 0.5)'
      },
      {
        label: 'Maximum',
        data: [130, 140, 115, 125, 135, 120],
        backgroundColor: 'rgba(59, 34, 96, 0.6)',
        borderColor: 'rgba(59, 34, 96, 0.8)',
        borderWidth: 1,
        barPercentage: 0.85,
        categoryPercentage: 0.85,
        borderRadius: 8,
        hoverBackgroundColor: 'rgba(59, 34, 96, 0.7)'
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(59, 34, 96, 0.1)',
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Inter',
            size: 12
          },
          color: '#4B5563',
          padding: 10
        }
      },
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Inter',
            size: 12
          },
          color: '#4B5563',
          padding: 5
        }
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Salary Ranges by Role (in thousands USD)',
        align: 'center' as const,
        color: '#374151',
        font: {
          family: 'Inter',
          size: 18,
          weight: 600
        },
        padding: {
          bottom: 30,
          top: 10
        }
      },
      legend: {
        display: true,
        position: 'top' as const,
        align: 'center' as const,
        labels: {
          boxWidth: 8,
          boxHeight: 8,
          padding: 20,
          font: {
            family: 'Inter',
            size: 12,
            weight: 500
          },
          color: '#4B5563',
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#374151',
        bodyColor: '#4B5563',
        borderColor: 'rgba(59, 34, 96, 0.2)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        titleFont: {
          family: 'Inter',
          weight: 600,
          size: 13
        },
        bodyFont: {
          family: 'Inter',
          size: 12
        },
        cornerRadius: 8,
        displayColors: true
      }
    },
  };

  const roleIcons = {
    'Software Engineer': '💻',
    'Data Scientist': '📊',
    'Frontend Developer': '🎨',
    'Backend Developer': '⚙️',
    'DevOps Engineer': '🔄',
    'Mobile App Developer': '📱'
  };

  const skills = [
    'Python', 'Cloud Computing', 'Agile', 'Cybersecurity',
    'Data Analysis', 'JavaScript', 'Docker', 'Kubernetes', 'React',
    'Node.js', 'SQL', 'AWS', 'TensorFlow', 'UI/UX Design',
    'REST APIs'
  ];

  const trends = [
    {
      title: 'AI/ML',
      description: 'Artificial Intelligence and Machine Learning continue to reshape industries',
      icon: '🧠',
    },
    {
      title: 'Cloud Computing',
      description: 'The shift to cloud-based infrastructure and services accelerates',
      icon: '☁️',
    },
    {
      title: 'DevOps',
      description: 'Integration of development and operations for faster delivery',
      icon: '🔄',
    },
    {
      title: 'Cybersecurity',
      description: 'Growing importance of data protection and security measures',
      icon: '🔒',
    },
    {
      title: 'Big Data',
      description: 'Extracting value from large, complex datasets across industries',
      icon: '📊',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F5F3FF] to-[#EDE9FF]">
      {/* Header with Logo and Dashboard Button */}
      <div className="w-full bg-opacity-70 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-8 py-4 flex justify-between items-center">
          <img 
            src="/yuja-logo.svg" 
            alt="App Logo" 
            className="h-10 w-auto cursor-pointer" 
            onClick={handleLogoClick}
          />
          <button
            onClick={() => navigate('/dashboard/overview')}
            className="px-6 py-2 bg-[#3B2260] text-white rounded-lg font-medium hover:bg-[#2A1745] transition-colors duration-200 flex items-center gap-2 shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5zM14 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5zM4 15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4zM14 15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-12 relative">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-[#D1D5DB] to-[#2A1745] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-[#D1D5DB] to-[#2A1745] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        </div>

        <div className="text-center mb-8 relative">
          <div className="inline-flex flex-col items-center">
            <div className="bg-[#3B2260] bg-opacity-5 rounded-full p-3 flex items-center gap-3 mb-2 shadow-sm">
              <div className="w-8 h-8 bg-[#3B2260] rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 13V17M16 8V17M12 3V17M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-600">Analytics Dashboard</p>
            </div>
            <h1 className="text-4xl font-bold text-[#3B2260] mb-3 font-inter">Industry Insights</h1>
            <p className="text-base text-gray-500 font-inter">
              Explore top career paths, skills, and emerging trends in technology
            </p>
          </div>
        </div>

        <div className="col-span-full mb-4">
          <div className="flex items-center justify-end gap-3 bg-white bg-opacity-70 p-3 rounded-lg shadow-sm border border-gray-200">
            <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-gray-600">Last Updated:</span>
              <span className="text-sm text-gray-700">May 22, 2025</span>
            </div>
            <span className="text-xs text-gray-500">(Updates every 7 days)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white bg-opacity-70 p-6 rounded-xl shadow-sm relative overflow-hidden group backdrop-blur-sm border border-gray-200 hover:bg-opacity-80 transition-all duration-300">
            <div className="absolute top-4 right-4">
              <div className="w-10 h-10 bg-gray-300 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21H4.6C4.03995 21 3.75992 21 3.54601 20.891C3.35785 20.7951 3.20487 20.6422 3.10899 20.454C3 20.2401 3 19.9601 3 19.4V3M21 7L15.5 12.5L11.5 8.5L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Market Outlook</h3>
              <p className="text-2xl font-bold text-gray-700">Positive</p>
              <p className="text-xs text-gray-500">Strong growth expected</p>
            </div>
          </div>

          <div className="bg-white bg-opacity-70 p-6 rounded-xl shadow-sm relative overflow-hidden group backdrop-blur-sm border border-gray-200 hover:bg-opacity-80 transition-all duration-300">
            <div className="absolute top-4 right-4">
              <div className="w-10 h-10 bg-gray-300 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 14.5L12 9.5L17 14.5M12 9.5V21.5M21 21.5H3M21 3H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Industry Growth</h3>
              <p className="text-2xl font-bold text-gray-700">7.5%</p>
              <p className="text-xs text-gray-500">Annual growth rate</p>
            </div>
          </div>

          <div className="bg-white bg-opacity-70 p-6 rounded-xl shadow-sm relative overflow-hidden group backdrop-blur-sm border border-gray-200 hover:bg-opacity-80 transition-all duration-300">
            <div className="absolute top-4 right-4">
              <div className="w-10 h-10 bg-gray-300 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6.5V4M12 6.5C10.3431 6.5 9 7.84315 9 9.5C9 11.1569 10.3431 12.5 12 12.5M12 6.5C13.6569 6.5 15 7.84315 15 9.5C15 11.1569 13.6569 12.5 12 12.5M12 12.5V15M21 21L3 21M6.2 21C6.2 17.5817 8.78172 15 12.2 15C15.6183 15 18.2 17.5817 18.2 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Demand Level</h3>
              <p className="text-2xl font-bold text-gray-700">High</p>
              <p className="text-xs text-gray-500">Consistent demand</p>
            </div>
          </div>

          <div className="bg-white bg-opacity-70 p-6 rounded-xl shadow-sm relative overflow-hidden group backdrop-blur-sm border border-gray-200 hover:bg-opacity-80 transition-all duration-300">
            <div className="absolute top-4 right-4">
              <div className="w-10 h-10 bg-gray-300 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.5 14.5L11.5 16.5L14.5 12.5M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Top Skills</h3>
              <p className="text-2xl font-bold text-gray-700">15+</p>
              <p className="text-xs text-gray-500">In-demand skills</p>
            </div>
          </div>
        </div>

        <div className="bg-white bg-opacity-70 p-6 rounded-xl shadow-sm backdrop-blur-sm border border-gray-200 mb-8 hover:bg-opacity-80 transition-all duration-300">
          <div className="h-[360px]">
            <Bar data={chartData} options={chartOptions} />
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {Object.entries(roleIcons).map(([role, icon]) => (
              <div key={role} className="flex items-center gap-2">
                <span className="text-xl">{icon}</span>
                <span className="text-xs text-gray-500">{role.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white bg-opacity-70 p-6 rounded-xl shadow-sm backdrop-blur-sm border border-gray-200 hover:bg-opacity-80 transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-6 font-inter">Key Industry Trends</h2>
            <div className="space-y-4">
              {trends.map((trend, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <div className="w-10 h-10 bg-[#3B2260] rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl">{trend.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">{trend.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{trend.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white bg-opacity-70 p-6 rounded-xl shadow-sm backdrop-blur-sm border border-gray-200 hover:bg-opacity-80 transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-6 font-inter">Recommended Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndustryInsights;