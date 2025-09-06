import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
  Alert,
  Chip,
} from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { quizApi } from '../api/quiz';
import { useNavigate } from 'react-router-dom';
type UIQuestion = { id: number; text: string; options: string[] };

const PageContainer = styled(Box)({
  minHeight: '100vh',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
});

const Header = styled(Box)({
  height: '64px',
  borderBottom: '1px solid #eee',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 24px',
  backgroundColor: '#fff',
});

const HeaderTitle = styled(Typography)({
  fontSize: '1rem',
  color: '#424446',
  display: 'flex',
  alignItems: 'center',
  '& > span': {
    margin: '0 8px',
    color: '#666',
  },
});

const MainContent = styled(Box)({
  display: 'flex',
  flex: 1,
  height: 'calc(100vh - 64px)',
});

const LeftSidebar = styled(Box)({
  width: '300px',
  borderRight: '1px solid #eee',
  backgroundColor: '#fff',
  overflowY: 'auto',
  padding: '24px',
});

const QuestionGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '8px',
  marginTop: '16px',
});

const QuestionButton = styled(Button)<{ status?: 'answered' | 'current' | 'marked' | 'visited' | 'not-visited' }>(
  ({ status }) => ({
    minWidth: '40px',
    height: '40px',
    padding: '0',
    border: '1px solid #ddd',
    backgroundColor: 
      status === 'answered' ? '#10B981' : 
      status === 'marked' ? '#462872' :
      status === 'visited' ? '#fcec03' :
      '#fff',
    color: 
      status === 'answered' || status === 'marked' ? '#fff' : 
      '#424446',
    '&:hover': {
      backgroundColor: 
        status === 'answered' ? '#10B981' : 
        status === 'marked' ? '#462872' :
        status === 'visited' ? '#fcec03' :
        '#f5f5f5',
    },
    ...(status === 'current' && {
      border: '2px solid #462872',
    }),
  }),
);

const ContentSection = styled(Box)({
  flex: 1,
  padding: '32px',
  overflowY: 'auto',
});

const RightSidebar = styled(Box)({
  width: '300px',
  borderLeft: '1px solid #eee',
  backgroundColor: '#fff',
  padding: '24px',
});

const Timer = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 600,
  color: '#424446',
  textAlign: 'center',
  marginBottom: '24px',
});

const SummaryItem = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 0',
  borderBottom: '1px solid #eee',
  '&:last-child': {
    borderBottom: 'none',
  },
});

const defaultQuestions: UIQuestion[] = [
  {
    id: 1,
    text: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
  },
  {
    id: 2,
    text: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
  },
  {
    id: 3,
    text: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
  },
  {
    id: 4,
    text: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
  },
  // Add more questions up to 15...
];

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeLeft, setTimeLeft] = useState({ minutes: 10, seconds: 0 });
  const [timeLimit, setTimeLimit] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [bookmarked, setBookmarked] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [visitedQuestions, setVisitedQuestions] = useState<number[]>([]);
  const [markedQuestions, setMarkedQuestions] = useState<number[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [questions, setQuestions] = useState<UIQuestion[]>(defaultQuestions);
  const [loadingQuestions, setLoadingQuestions] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [openExitConfirm, setOpenExitConfirm] = useState(false);
  const [openSubmitConfirm, setOpenSubmitConfirm] = useState(false);
  const totalQuestions = questions.length || 15;

  // Proctoring state
  const [proctorDialogOpen, setProctorDialogOpen] = useState(true);
  const [proctoringActive, setProctoringActive] = useState(false);
  const [violationCount, setViolationCount] = useState(0);
  const [warningOpen, setWarningOpen] = useState(false);
  const [proctorError, setProctorError] = useState<string | null>(null);
  const camStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const shareInProgressRef = useRef(false);
  const hiddenViolationRef = useRef(false);

  const MAX_VIOLATIONS = 3;

  // If user reaches assessment without preflight OK, send them to instructions.
  // If preflight OK, auto-start proctoring (no extra dialog card).
  useEffect(() => {
    const ok = typeof window !== 'undefined' && localStorage.getItem('cg_proctor_preflight_ok') === '1';
    if (!ok) {
      navigate('/assessment/instructions', { replace: true });
      return;
    }
    // Auto-start proctoring one time
    (async () => {
      try {
        setProctorDialogOpen(false);
        await startProctoring();
      } catch {}
    })();
  }, [navigate]);

  const cleanupProctoring = () => {
    try {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      window.removeEventListener('blur', onWindowBlur);
      window.removeEventListener('beforeunload', onBeforeUnload);
      window.removeEventListener('keydown', onKeyDown, true);
    } catch {}
    try { camStreamRef.current?.getTracks().forEach(t => t.stop()); } catch {}
    try { screenStreamRef.current?.getTracks().forEach(t => t.stop()); } catch {}
    camStreamRef.current = null;
    screenStreamRef.current = null;
    setProctoringActive(false);
    try { if (document.fullscreenElement) document.exitFullscreen(); } catch {}
    try { localStorage.removeItem('cg_proctor_preflight_ok'); } catch {}
  };

  const addViolation = () => {
    setViolationCount(prev => {
      const next = prev + 1;
      setWarningOpen(true);
      if (next >= MAX_VIOLATIONS) {
        // Auto-submit on next tick to allow Snackbar to render
        setTimeout(() => handleSubmit(), 250);
      }
      return next;
    });
  };

  const onVisibilityChange = async () => {
    if (shareInProgressRef.current) return;
    if (document.hidden && proctoringActive) {
      hiddenViolationRef.current = true;
      addViolation();
    } else if (!document.hidden && proctoringActive) {
      // Returned to tab; if a hidden violation occurred, show a warning again and restore fullscreen
      if (hiddenViolationRef.current) {
        setWarningOpen(true);
        hiddenViolationRef.current = false;
      }
      if (!document.fullscreenElement) {
        try { await document.documentElement.requestFullscreen(); } catch {}
      }
    }
  };

  const onFullscreenChange = async () => {
    if (shareInProgressRef.current) return;
    if (proctoringActive && !document.fullscreenElement) {
      addViolation();
      // Try to immediately restore fullscreen
      try { await document.documentElement.requestFullscreen(); } catch {}
    }
  };

  const onWindowBlur = () => {
    if (shareInProgressRef.current) return;
    if (proctoringActive) addViolation();
  };

  const onBeforeUnload = (e: BeforeUnloadEvent) => {
    if (proctoringActive) {
      e.preventDefault();
      e.returnValue = '';
    }
  };

  const onKeyDown = async (e: KeyboardEvent) => {
    if (!proctoringActive) return;
    // Attempt to block Escape; browsers may still exit fullscreen, so we also re-enter in fullscreenchange
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      // If somehow fullscreen was exited by ESC, try restoring
      if (!document.fullscreenElement) {
        try { await document.documentElement.requestFullscreen(); } catch {}
      }
    }
  };

  const startProctoring = async () => {
    try {
      setProctorError(null);
      // Request fullscreen
      await document.documentElement.requestFullscreen();
      // Camera + mic
      try {
        const preCam: MediaStream | undefined = (window as any).__cg_camStream;
        if (preCam && preCam.getTracks().some(t => t.readyState === 'live')) {
          camStreamRef.current = preCam;
        } else {
          camStreamRef.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        }
      } catch {
        setProctorError('Camera and microphone permission is required to start the test.');
        try { if (document.fullscreenElement) await document.exitFullscreen(); } catch {}
        cleanupProctoring();
        return;
      }
      // Screen share (some browsers require explicit user gesture; this is inside a button click)
      try {
        // Optional: screen capture. While the picker is open, browsers may exit fullscreen;
        // mark shareInProgress to avoid counting a violation, and re-enter fullscreen afterwards.
        shareInProgressRef.current = true;
        const preScreen: MediaStream | undefined = (window as any).__cg_screenStream;
        if (preScreen && preScreen.getTracks().some(t => t.readyState === 'live')) {
          screenStreamRef.current = preScreen;
        } else {
          // @ts-ignore
          screenStreamRef.current = await (navigator.mediaDevices as any).getDisplayMedia?.({ video: true, audio: false });
        }
        // After picker closes, try to re-enter fullscreen if not already
        if (!document.fullscreenElement) {
          try { await document.documentElement.requestFullscreen(); } catch {}
        }
      } catch {
        setProctorError('Screen sharing permission is required to start the test.');
        try { if (document.fullscreenElement) await document.exitFullscreen(); } catch {}
        // Stop camera if it was started
        try { camStreamRef.current?.getTracks().forEach(t => t.stop()); } catch {}
        camStreamRef.current = null;
        return;
      }
      finally {
        shareInProgressRef.current = false;
      }
      // Clear any preflight globals now that we've adopted them
      try { delete (window as any).__cg_camStream; } catch {}
      try { delete (window as any).__cg_screenStream; } catch {}
      // Listeners
      document.addEventListener('visibilitychange', onVisibilityChange);
      document.addEventListener('fullscreenchange', onFullscreenChange);
      window.addEventListener('blur', onWindowBlur);
      window.addEventListener('beforeunload', onBeforeUnload);
      window.addEventListener('keydown', onKeyDown, true);
      setProctoringActive(true);
      setProctorDialogOpen(false);
      try { localStorage.removeItem('cg_proctor_preflight_ok'); } catch {}
    } catch {
      // If user denies, keep dialog open
    }
  };

  // Start timer only after questions are loaded and timeLimit established
  useEffect(() => {
    if (loadingQuestions) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer);
          // auto submit when time is up
          handleSubmit();
          return prev;
        }
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [loadingQuestions]);

  // Load questions from backend
  useEffect(() => {
    (async () => {
      try {
        const res: any = await quizApi.getQuestions();
        const qs = res?.questions ?? res ?? [];
        const mapped: UIQuestion[] = (qs as any[]).map((q: any, idx: number) => ({
          id: Number(q.id ?? idx + 1),
          text: q.question ?? q.text,
          options: (q.options ?? []).map((o: any) => (typeof o === 'string' ? o : (o.label ?? o.key ?? ''))),
        }));
        if (mapped.length) setQuestions(mapped);
        const tl = res?.timeLimit;
        if (typeof tl === 'number') {
          setTimeLimit(tl);
          setTimeLeft({ minutes: tl, seconds: 0 });
        }
      } catch {
        // keep defaults
      }
      finally {
        setLoadingQuestions(false);
      }
    })();
  }, []);

  const handleQuestionClick = (questionNumber: number) => {
    setCurrentQuestion(questionNumber);
    setSelectedAnswer(answers[questionNumber] || '');
    if (!visitedQuestions.includes(questionNumber)) {
      setVisitedQuestions([...visitedQuestions, questionNumber]);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setAnswers({ ...answers, [currentQuestion]: answer });
    if (!answeredQuestions.includes(currentQuestion)) {
      setAnsweredQuestions([...answeredQuestions, currentQuestion]);
    }
  };

  const handleMarkForReview = () => {
    if (markedQuestions.includes(currentQuestion)) {
      setMarkedQuestions(markedQuestions.filter(q => q !== currentQuestion));
    } else {
      setMarkedQuestions([...markedQuestions, currentQuestion]);
    }
  };

  const getQuestionStatus = (questionNumber: number) => {
    if (questionNumber === currentQuestion) return 'current';
    if (markedQuestions.includes(questionNumber)) return 'marked';
    if (answeredQuestions.includes(questionNumber)) return 'answered';
    if (visitedQuestions.includes(questionNumber)) return 'visited';
    return 'not-visited';
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(answers[nextQuestion] || '');
      if (!visitedQuestions.includes(nextQuestion)) {
        setVisitedQuestions([...visitedQuestions, nextQuestion]);
      }
    }
  };

  const handleSubmit = async () => {
    // Submit answers to backend as QuizSubmissionRequest
    const arr = Object.entries(answers).map(([questionId, selectedOption]) => ({
      questionId,
      selectedOption,
    }));
    const totalTime = (timeLimit ?? 10) * 60 - (timeLeft.minutes * 60 + timeLeft.seconds);
    setSubmitting(true);
    try {
      await quizApi.submit({ answers: arr as any, timeTaken: Math.max(0, totalTime) });
      // Mark quiz completed locally for guards and redirect to dashboard roadmap (main flow)
      try { localStorage.setItem('cg_quiz_completed', '1'); } catch {}
      navigate('/dashboard/roadmap', { replace: true });
    } finally {
      setSubmitting(false);
      cleanupProctoring();
    }
  };

  const currentQuestionData = questions[currentQuestion - 1] || {
    text: "Question not available",
    options: [],
  };

  return (
    <PageContainer>
      {/* Proctoring start dialog */}
      <Dialog open={proctorDialogOpen} disableEscapeKeyDown>
        <DialogTitle>Enable Proctoring</DialogTitle>
        <DialogContent>
          {proctorError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {proctorError}
            </Alert>
          )}
          <Typography variant="body2" sx={{ mb: 2 }}>
            This assessment is proctored. We will:
          </Typography>
          <ul style={{ marginLeft: 16, marginTop: 0 }}>
            <li>Enter fullscreen mode</li>
            <li>Access your camera and microphone</li>
            <li>Optionally capture your screen (for monitoring)</li>
            <li>Monitor tab switching or leaving fullscreen</li>
          </ul>
          <Typography variant="caption" sx={{ color: '#666' }}>
            Leaving fullscreen or switching tabs will generate a warning. After 3 warnings, your test will be auto-submitted.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenExitConfirm(true)} sx={{ color: '#424446' }}>Cancel</Button>
          <Button variant="contained" onClick={startProctoring} sx={{ backgroundColor: '#462872' }}>Start</Button>
        </DialogActions>
      </Dialog>

      {/* Warnings snackbar */}
      <Snackbar
        open={warningOpen}
        autoHideDuration={2000}
        onClose={() => setWarningOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={violationCount >= MAX_VIOLATIONS ? 'error' : 'warning'} sx={{ width: '100%' }}>
          {violationCount >= MAX_VIOLATIONS
            ? 'Multiple violations detected. Auto-submitting your test...'
            : `Proctoring violation detected (${violationCount}/${MAX_VIOLATIONS}). Stay in fullscreen and do not switch tabs.`}
        </Alert>
      </Snackbar>
      <Header>
        <HeaderTitle variant="h6">
          Career Guidance Quiz <span>{'>'}</span> Section A
        </HeaderTitle>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Chip
            label={`Warnings: ${violationCount}/${MAX_VIOLATIONS}`}
            color={violationCount === 0 ? 'default' : (violationCount < MAX_VIOLATIONS ? 'warning' : 'error') as any}
            variant={violationCount === 0 ? 'outlined' : 'filled'}
            size="small"
          />
          <Button
            variant="outlined"
            startIcon={<ExitToAppIcon />}
            onClick={() => setOpenExitConfirm(true)}
            sx={{ color: '#424446', borderColor: '#ddd' }}
          >
            Exit
          </Button>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={() => setOpenSubmitConfirm(true)}
            sx={{
              backgroundColor: '#462872',
              '&:hover': { backgroundColor: '#3b2260' },
            }}
          >
            Review and Submit
          </Button>
        </Box>
      </Header>

      {loadingQuestions ? (
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress sx={{ color: '#462872', mb: 2 }} />
            <Typography sx={{ color: '#424446' }}>Preparing your assessment…</Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>Please wait while we generate your questions.</Typography>
          </Box>
        </Box>
      ) : (
      <MainContent>
        <LeftSidebar>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: '#424446',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 2,
              }}
            >
              Section A
              <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                fontSize: '0.75rem',
                color: '#666',
              }}>
                <Box sx={{ color: '#10B981' }}>{answeredQuestions.length}</Box> • 15
              </Box>
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Button
                variant="outlined"
                onClick={handleMarkForReview}
                sx={{
                  color: markedQuestions.includes(currentQuestion) ? '#fff' : '#462872',
                  backgroundColor: markedQuestions.includes(currentQuestion) ? '#462872' : 'transparent',
                  borderColor: '#462872',
                  '&:hover': {
                    backgroundColor: markedQuestions.includes(currentQuestion) ? '#3b2260' : 'rgba(70, 40, 114, 0.04)',
                    borderColor: '#462872',
                  },
                }}
              >
                Mark for Review
              </Button>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" sx={{ display: 'block', mb: 1, color: '#666' }}>
                Legend:
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, backgroundColor: '#10B981', borderRadius: 1 }} />
                  <Typography variant="caption">Answered</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, backgroundColor: '#FCD34D', borderRadius: 1 }} />
                  <Typography variant="caption">Visited</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, backgroundColor: '#462872', borderRadius: 1 }} />
                  <Typography variant="caption">Marked</Typography>
                </Box>
              </Box>
            </Box>

            <QuestionGrid>
              {Array.from({ length: totalQuestions }, (_, i) => (
                <QuestionButton
                  key={i + 1}
                  onClick={() => handleQuestionClick(i + 1)}
                  status={getQuestionStatus(i + 1)}
                >
                  {i + 1}
                </QuestionButton>
              ))}
            </QuestionGrid>
          </Box>
        </LeftSidebar>

        <ContentSection>
          <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" sx={{ color: '#424446' }}>
                Q: {currentQuestion}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#666', cursor: 'pointer' }}
              >
                Report
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ mb: 4, color: '#424446' }}>
              {currentQuestionData.text}
            </Typography>

            <RadioGroup
              value={selectedAnswer}
              onChange={(e) => handleAnswerSelect(e.target.value)}
            >
              {currentQuestionData.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                  sx={{ mb: 2 }}
                />
              ))}
            </RadioGroup>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 4,
                pt: 3,
                borderTop: '1px solid #eee',
              }}
            >
              <Button
                startIcon={bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                onClick={() => setBookmarked(!bookmarked)}
                sx={{ color: '#424446' }}
              >
                Bookmark
              </Button>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setSelectedAnswer('');
                    setAnswers({ ...answers, [currentQuestion]: '' });
                    setAnsweredQuestions(answeredQuestions.filter(q => q !== currentQuestion));
                  }}
                  sx={{ color: '#424446', borderColor: '#ddd' }}
                >
                  Clear Response
                </Button>
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  disabled={submitting}
                  onClick={currentQuestion === totalQuestions ? () => setOpenSubmitConfirm(true) : handleNext}
                  sx={{
                    backgroundColor: '#462872',
                    '&:hover': { backgroundColor: '#3b2260' },
                  }}
                >
                  {currentQuestion === totalQuestions ? (submitting ? 'Submitting…' : 'Submit') : 'Next'}
                </Button>
              </Box>
            </Box>
          </Box>
        </ContentSection>

        <RightSidebar>
          <Timer>
            {String(timeLeft.minutes).padStart(2, '0')} :{' '}
            {String(timeLeft.seconds).padStart(2, '0')}
          </Timer>

          <Box sx={{ mb: 4 }}>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mb: 2, color: '#424446', borderColor: '#ddd' }}
            >
              About Test
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ color: '#424446', borderColor: '#ddd' }}
            >
              Read Instructions
            </Button>
          </Box>

          <Typography variant="subtitle1" sx={{ mb: 2, color: '#424446' }}>
            Overview
          </Typography>

          {[
            { label: 'Total Questions', value: totalQuestions },
            { label: 'Visited', value: visitedQuestions.length },
            { label: 'Not Visited', value: totalQuestions - visitedQuestions.length },
            { label: 'Answered', value: answeredQuestions.length },
            { label: 'Not Answered', value: visitedQuestions.length - answeredQuestions.length },
            { label: 'Marked for review', value: markedQuestions.length },
            { label: 'Bookmarked', value: bookmarked ? 1 : 0 },
          ].map((item) => (
            <SummaryItem key={item.label}>
              <Typography variant="body2" sx={{ color: '#666' }}>
                {item.label}
              </Typography>
              <Typography variant="body2" sx={{ color: '#424446' }}>
                {item.value}
              </Typography>
            </SummaryItem>
          ))}
        </RightSidebar>
      </MainContent>
      )}

      {/* Exit Confirmation */}
      <Dialog open={openExitConfirm} onClose={() => setOpenExitConfirm(false)}>
        <DialogTitle>Exit Assessment?</DialogTitle>
        <DialogContent>
          <Typography variant="body2">Your progress may be lost. Are you sure you want to exit?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenExitConfirm(false)}>Cancel</Button>
          <Button color="error" onClick={() => { setOpenExitConfirm(false); cleanupProctoring(); window.history.back(); }}>Exit</Button>
        </DialogActions>
      </Dialog>

      {/* Submit Confirmation */}
      <Dialog open={openSubmitConfirm} onClose={() => setOpenSubmitConfirm(false)}>
        <DialogTitle>Submit Assessment?</DialogTitle>
        <DialogContent>
          <Typography variant="body2">You won’t be able to modify your answers after submission.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSubmitConfirm(false)}>Review More</Button>
          <Button variant="contained" onClick={() => { setOpenSubmitConfirm(false); handleSubmit(); }} disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default Quiz;