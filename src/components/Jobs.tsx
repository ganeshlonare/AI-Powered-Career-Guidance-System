import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Job } from '../data/mockJobs';
import { mockJobs } from '../data/mockJobs';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { jobsApi } from '../api/jobs';
import type { JobItem } from '../types/jobs';

// SearchBar component
const SearchBar = ({ onSearch }: { onSearch: (search: string, location: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('United States');
  const navigate = useNavigate();

  const handleSearch = (newSearch: string, newLocation: string) => {
    setSearchTerm(newSearch);
    setLocation(newLocation);
    onSearch(newSearch, newLocation);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <Box component="div" className="bg-white border-b shadow-sm">
      <Container maxWidth="lg" className="py-6">
        <Box className="flex items-center gap-6">
          <Box className="mr-4">
            <img 
              src="/yuja-logo.svg" 
              alt="App Logo" 
              className="h-8 cursor-pointer"
              onClick={handleLogoClick}
            />
          </Box>

          {/* Search Input */}
          <Box className="flex flex-1 max-w-3xl">
            {/* Search Input with Jobs Block */}
            <Box className="relative flex-1 bg-[#F5F5F5] rounded-l-lg flex h-[42px] border border-r-0 border-[#E0E0E0]">
              <Box className="flex items-center pl-4 pr-3 border-r border-[#E0E0E0]">
                <span className="text-[15px] font-medium text-[#462872]">Jobs</span>
                <svg 
                  className="w-4 h-4 ml-1 text-[#666666]" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Box>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value, location)}
                placeholder="Search job titles or companies"
                className="flex-1 pl-4 pr-3 py-2 bg-transparent text-[15px] placeholder-[#666666] text-[#191919] focus:outline-none min-w-[200px] font-inter"
              />
            </Box>

            {/* Location Input */}
            <Box className="relative bg-[#F5F5F5] rounded-r-lg min-w-[200px] h-[42px] border border-l-0 border-[#E0E0E0] flex items-center">
              <div className="absolute left-0 h-[28px] w-[1px] bg-[#E0E0E0]"></div>
              <input
                type="text"
                value={location}
                onChange={(e) => handleSearch(searchTerm, e.target.value)}
                placeholder="Location"
                className="w-full h-full pl-4 pr-10 bg-transparent text-[15px] text-[#191919] placeholder-[#666666] focus:outline-none font-inter"
              />
              <svg 
                className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-[#666666]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Box>
          </Box>

          {/* Right Side Buttons */}
          <Box className="flex items-center ml-4">
            <button 
              onClick={() => navigate('/dashboard/overview')}
              className="text-[15px] text-white bg-[#462872] px-6 py-2 rounded-lg hover:bg-[#3b2260] font-medium transition-colors"
            >
              Dashboard
            </button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

// SearchFilters component
const SearchFilters = () => {
  return (
    <Box component="div" className="bg-white py-4 px-4 border-b">
      <Container maxWidth="lg" className="flex flex-wrap items-center gap-3">
        <button className="inline-flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-white bg-[#057642] border border-[#057642] rounded-xl hover:bg-[#046235] transition-colors">
          Any time
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-[#666666] bg-white border border-[#E0E0E0] rounded-lg hover:bg-[#F5F5F5] transition-colors">
          Company
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-[#666666] bg-white border border-[#E0E0E0] rounded-lg hover:bg-[#F5F5F5] transition-colors">
          Job type
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-[#666666] bg-white border border-[#E0E0E0] rounded-lg hover:bg-[#F5F5F5] transition-colors">
          Experience level
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-[#666666] bg-white border border-[#E0E0E0] rounded-lg hover:bg-[#F5F5F5] transition-colors">
          Location
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-[#666666] bg-white border border-[#E0E0E0] rounded-lg hover:bg-[#F5F5F5] transition-colors">
          Salary
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-[#666666] bg-white border border-[#E0E0E0] rounded-lg hover:bg-[#F5F5F5] transition-colors">
          Remote
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </Container>
    </Box>
  );
};

// JobCard component
const JobCard = ({ job, isSelected, onClick }: { job: Job; isSelected: boolean; onClick: () => void }) => {
  return (
    <Box
      component="div"
      onClick={onClick}
      className={`p-5 border-b border-[#EBEBEB] cursor-pointer ${
        isSelected ? 'bg-[#F5F5F5]' : 'hover:bg-[#F8F8F8]'
      }`}
    >
      <Box className="flex gap-4">
        <img src={job.logo} alt={job.company} className="w-14 h-14 rounded-lg" />
        <Box className="flex-1 min-w-0">
          <h3 className="text-[18px] font-medium text-[#462872] hover:text-[#3b2260] truncate leading-6 font-inter">{job.title}</h3>
          <p className="text-[15px] text-[#191919] truncate mt-1 font-inter">{job.company}</p>
          <p className="text-[14px] text-[#666666] truncate font-inter">{job.location}</p>
          <Box className="flex flex-wrap gap-2 mt-2">
            {job.isActivelyHiring && (
              <span className="inline-flex items-center gap-1 text-[13px] text-[#462872] font-medium bg-[#F5F5F5] px-3 py-1 rounded-lg">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Actively Hiring
              </span>
            )}
            {job.isEarlyApplicant && (
              <span className="inline-flex items-center text-[13px] text-[#666666] bg-[#F5F5F5] px-3 py-1 rounded-lg">
                Be an early applicant
              </span>
            )}
          </Box>
          <p className="text-[13px] text-[#666666] mt-2 font-inter">{job.postedAt} · {job.applicantCount} applicants</p>
        </Box>
      </Box>
    </Box>
  );
};

// JobDetails component
const JobDetails = ({ job }: { job: Job }) => {
  return (
    <Box className="h-[calc(100vh-180px)] flex flex-col">
      {/* Fixed Header Section */}
      <Box className="p-8 border-b border-[#EBEBEB]">
        <Box className="flex items-start gap-6">
          <img src={job.logo} alt={job.company} className="w-20 h-20 rounded-lg" />
          <Box className="flex-1">
            <h2 className="text-[26px] font-medium text-[#462872] leading-[1.3] font-inter">{job.title}</h2>
            <p className="text-[17px] text-[#462872] hover:text-[#3b2260] cursor-pointer mt-2 font-inter">{job.company}</p>
            <p className="text-[15px] text-[#666666] mt-1 font-inter">{job.location}</p>
            <p className="text-[14px] text-[#666666] mt-1 font-inter">{job.postedAt} · {job.applicantCount} applicants</p>
            
            <Box className="flex gap-3 mt-6">
              <button className="px-6 py-2 bg-[#462872] text-white rounded-xl hover:bg-[#3b2260] font-medium text-[15px] transition-colors">
                Apply
              </button>
              <button className="px-6 py-2 bg-white text-[#462872] border-2 border-[#462872] rounded-xl hover:bg-[#F5F5F5] font-medium text-[15px] transition-colors">
                Save
              </button>
            </Box>

            <Box className="mt-5 flex items-center gap-3">
              <Box className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-white"
                    src={`https://ui-avatars.com/api/?name=U${i}&background=random`}
                    alt=""
                  />
                ))}
              </Box>
              <p className="text-[14px] text-[#462872] hover:text-[#3b2260] cursor-pointer font-inter">
                See who {job.company} has hired for this role
              </p>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Scrollable Content */}
      <Box 
        className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-2 
        [&::-webkit-scrollbar-track]:bg-white 
        [&::-webkit-scrollbar-thumb]:bg-[#E0E0E0] 
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:border-2
        [&::-webkit-scrollbar-thumb]:border-white
        hover:[&::-webkit-scrollbar-thumb]:bg-[#D0D0D0]"
      >
        <Box className="p-8">
          <Grid container spacing={3} className="mb-8">
            <Grid item xs={12} sm={6}>
              <Paper elevation={0} className="p-4 bg-[#F5F5F5] rounded-lg">
                <p className="text-[14px] text-[#666666] font-inter">Seniority Level</p>
                <p className="text-[16px] text-[#191919] font-medium mt-1 font-inter">{job.seniority}</p>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper elevation={0} className="p-4 bg-[#F5F5F5] rounded-lg">
                <p className="text-[14px] text-[#666666] font-inter">Employment Type</p>
                <p className="text-[16px] text-[#191919] font-medium mt-1 font-inter">{job.employmentType}</p>
              </Paper>
            </Grid>
            {job.salary && (
              <Grid item xs={12} sm={6}>
                <Paper elevation={0} className="p-4 bg-[#F5F5F5] rounded-lg">
                  <p className="text-[14px] text-[#666666] font-inter">Salary Range</p>
                  <p className="text-[16px] text-[#191919] font-medium mt-1 font-inter">{job.salary}</p>
                </Paper>
              </Grid>
            )}
          </Grid>

          <Box className="border-t border-[#EBEBEB] pt-8">
            <Box className="mb-8">
              <h3 className="text-[22px] font-medium text-[#462872] mb-3 font-inter">About the company</h3>
              <p className="text-[15px] text-[#666666] leading-[1.6] font-inter">
                {job.companyDescription}
                {/* <button className="text-[#462872] bg-white border-b border-[#462872] hover:text-[#3b2260] ml-1 font-medium transition-colors">
                  Show more
                </button> */}
              </p>
            </Box>

            <Box className="mb-8">
              <h3 className="text-[22px] font-medium text-[#462872] mb-3 font-inter">About the job</h3>
              <div className="text-[15px] text-[#666666] leading-[1.6] whitespace-pre-wrap font-inter">
                {job.description}
              </div>
            </Box>

            <Box className="mt-8">
              <h3 className="text-[22px] font-medium text-[#462872] mb-3 font-inter">Skills</h3>
              <Box className="flex flex-wrap gap-2">
                {job.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-[#F5F5F5] text-[#462872] rounded-lg text-[14px] font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// Main JobListings component
const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [selectedJob, setSelectedJob] = useState<Job>(mockJobs[0]);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('United States');
  const navigate = useNavigate();

  // Map backend JobItem to existing Job shape used by UI
  function mapJobItemToJob(item: JobItem): Job {
    const logoInitials = item.company?.split(' ').map(w => w[0]).join('').slice(0, 2) || 'CG';
    return {
      id: Number.isNaN(Number(item.id)) ? Math.abs(item.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) : Number(item.id),
      title: item.title,
      company: item.company,
      logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(logoInitials)}&background=random`,
      location: item.location || 'Remote',
      isActivelyHiring: false,
      isEarlyApplicant: false,
      postedAt: item.postedAt || 'Recently',
      applicantCount: 0,
      seniority: 'N/A',
      employmentType: item.type || 'Full-time',
      salary: undefined,
      companyDescription: '',
      description: '',
      skills: [],
    };
  }

  // Fetch jobs from backend whenever search or location changes (debounced)
  useEffect(() => {
    const controller = new AbortController();
    const t = setTimeout(async () => {
      try {
        const page = await jobsApi.search({ q: searchTerm, location: locationFilter, page: 1, pageSize: 20 });
        const mapped = page.items.map(mapJobItemToJob);
        setJobs(mapped.length ? mapped : mockJobs);
        if (mapped.length) {
          setSelectedJob(mapped[0]);
        } else {
          setSelectedJob(mockJobs[0]);
        }
      } catch (e) {
        // On error, keep mock data as fallback
        setJobs(mockJobs);
        setSelectedJob(mockJobs[0]);
      }
    }, 300);
    return () => {
      controller.abort();
      clearTimeout(t);
    };
  }, [searchTerm, locationFilter]);

  const handleLogoClick = () => {
    navigate('/');
  };

  // Filter jobs based on search term and location (client-side filtering in addition to backend query)
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = searchTerm === '' || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation = locationFilter === '' ||
        job.location.toLowerCase().includes(locationFilter.toLowerCase());

      return matchesSearch && matchesLocation;
    });
  }, [jobs, searchTerm, locationFilter]);

  const handleSearch = (search: string, location: string) => {
    setSearchTerm(search);
    setLocationFilter(location);
  };

  return (
    <Box className="min-h-screen bg-white">
      {/* Fixed Header */}
      <Box className="sticky top-0 z-50 bg-white shadow-sm">
        {/* Search Section */}
        <Container maxWidth="lg" className="py-4">
          <Box className="flex items-center gap-6">
            <Box className="mr-4">
              <img 
                src="/yuja-logo.svg" 
                alt="App Logo" 
                className="h-8 cursor-pointer"
                onClick={handleLogoClick}
              />
            </Box>

            {/* Search Input */}
            <Box className="flex flex-1 max-w-3xl">
              {/* Search Input with Jobs Block */}
              <Box className="relative flex-1 bg-[#F5F5F5] rounded-l-lg flex h-[42px] border border-r-0 border-[#E0E0E0]">
                <Box className="flex items-center pl-4 pr-3 border-r border-[#E0E0E0]">
                  <span className="text-[15px] font-medium text-[#462872]">Jobs</span>
                  <svg 
                    className="w-4 h-4 ml-1 text-[#666666]" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Box>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value, locationFilter)}
                  placeholder="Search job titles or companies"
                  className="flex-1 pl-4 pr-3 py-2 bg-transparent text-[15px] placeholder-[#666666] text-[#191919] focus:outline-none min-w-[200px] font-inter"
                />
              </Box>

              {/* Location Input */}
              <Box className="relative bg-[#F5F5F5] rounded-r-lg min-w-[200px] h-[42px] border border-l-0 border-[#E0E0E0] flex items-center">
                <div className="absolute left-0 h-[28px] w-[1px] bg-[#E0E0E0]"></div>
                <input
                  type="text"
                  value={locationFilter}
                  onChange={(e) => handleSearch(searchTerm, e.target.value)}
                  placeholder="Location"
                  className="w-full h-full pl-4 pr-10 bg-transparent text-[15px] text-[#191919] placeholder-[#666666] focus:outline-none font-inter"
                />
                <svg 
                  className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-[#666666]" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Box>
            </Box>

            {/* Right Side Buttons */}
            <Box className="flex items-center ml-4">
              <button 
                onClick={() => navigate('/dashboard/overview')}
                className="text-[15px] text-white bg-[#462872] px-6 py-2 rounded-lg hover:bg-[#3b2260] font-medium transition-colors"
              >
                Dashboard
              </button>
            </Box>
          </Box>
        </Container>

        {/* Filters Section */}
        <Container maxWidth="lg" className="py-3">
          <Box className="flex flex-wrap items-center gap-4 px-[1px]">
            <button className="inline-flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-white bg-[#057642] border border-[#057642] rounded-xl hover:bg-[#046235] transition-colors">
              Any time
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-[#666666] bg-white border border-[#E0E0E0] rounded-xl hover:bg-[#F5F5F5] transition-colors">
              Company
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-[#666666] bg-white border border-[#E0E0E0] rounded-xl hover:bg-[#F5F5F5] transition-colors">
              Job type
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-[#666666] bg-white border border-[#E0E0E0] rounded-xl hover:bg-[#F5F5F5] transition-colors">
              Experience level
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-[#666666] bg-white border border-[#E0E0E0] rounded-xl hover:bg-[#F5F5F5] transition-colors">
              Location
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-[#666666] bg-white border border-[#E0E0E0] rounded-xl hover:bg-[#F5F5F5] transition-colors">
              Salary
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-[#666666] bg-white border border-[#E0E0E0] rounded-xl hover:bg-[#F5F5F5] transition-colors">
              Remote
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </Box>
        </Container>
      </Box>
      
      <Container maxWidth="lg" className="px-6 py-6">
        {/* <Box className="mb-4">
          <p className="text-[15px] text-[#666666] font-inter">{filteredJobs.length.toLocaleString()}+ Jobs in {locationFilter}</p>
        </Box> */}
        
        <Grid container spacing={4}>
          {/* Job Cards List */}
          <Grid item xs={12} lg={5} className={showJobDetails ? 'hidden lg:block' : ''}>
            <Paper elevation={0} className="overflow-hidden rounded-xl h-[calc(100vh-200px)] overflow-y-auto bg-white border border-[#EBEBEB]">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isSelected={selectedJob.id === job.id}
                  onClick={() => {
                    setSelectedJob(job);
                    setShowJobDetails(true);
                  }}
                />
              ))}
              {filteredJobs.length === 0 && (
                <Box className="p-6 text-center">
                  <p className="text-[17px] font-medium text-[#462872] mb-1">No matching jobs found</p>
                  <p className="text-[15px] text-[#666666]">Try adjusting your search criteria</p>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Job Details */}
          <Grid item xs={12} lg={7} className={!showJobDetails ? 'hidden lg:block' : ''}>
            <Paper elevation={0} className="relative rounded-xl bg-white border border-[#EBEBEB]">
              <button
                onClick={() => setShowJobDetails(false)}
                className="lg:hidden absolute top-4 left-4 p-2 rounded-lg hover:bg-[#F5F5F5]"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <JobDetails job={selectedJob} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Jobs; 