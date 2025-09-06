import React, { useEffect, useMemo, useState } from 'react';
import { Box, Paper, Typography, Grid, Chip, LinearProgress, Button, Divider, Alert, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InsightsIcon from '@mui/icons-material/Insights';
import HistoryIcon from '@mui/icons-material/History';
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { quizApi } from '../api/quiz';
import type { QuizResultResponse } from '../types/quiz';
import { useNavigate } from 'react-router-dom';

const PageWrap = styled(Box)({
  minHeight: '100vh',
  background: '#f7f7fb',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  padding: '32px 24px',
});

const Content = styled(Box)({
  width: '100%',
  maxWidth: 1100,
  display: 'block',
});

const Card = styled(Paper)({
  borderRadius: 16,
  padding: 24,
});

const Title = styled(Typography)({
  fontWeight: 700,
  color: '#424446',
});

const AssessmentResults: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [latest, setLatest] = useState<QuizResultResponse | null>(null);
  const [history, setHistory] = useState<QuizResultResponse[]>([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedAttempt, setSelectedAttempt] = useState<{ index: number; data: QuizResultResponse } | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [lr, hist] = await Promise.all([
          quizApi.latestResult(),
          quizApi.history()
        ]);
        if (!cancelled) {
          setLatest(lr || null);
          setHistory(hist || []);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to load quiz results.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const maxSkill = useMemo(() => {
    if (!latest?.skillBreakdown) return null;
    const entries = Object.entries(latest.skillBreakdown);
    if (entries.length === 0) return null;
    return entries.reduce((a, b) => (a[1] > b[1] ? a : b));
  }, [latest]);

  return (
    <PageWrap>
      <Content>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmojiEventsIcon sx={{ color: '#462872' }} />
              <Title variant="h5">Assessment Results</Title>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard/overview')} sx={{ color: '#424446', borderColor: '#ddd' }}>Dashboard</Button>
              <Button variant="contained" startIcon={<ReplayIcon />} onClick={() => navigate('/assessment/instructions')} sx={{ backgroundColor: '#462872' }}>Retake</Button>
            </Box>
          </Box>

          {loading && (
            <Card>
              <Typography sx={{ color: '#666' }}>Loading your results…</Typography>
            </Card>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
          )}

          {!loading && latest && (
            <>
              <Card sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#424446', mb: 1 }}>Overall Score</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: '#462872' }}>{Math.round(latest.score || 0)}%</Typography>
                  <Chip label={maxSkill ? `Top Skill: ${maxSkill[0]}` : 'Top Skill: n/a'} color="default" variant="outlined" />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <LinearProgress variant="determinate" value={Math.min(100, Math.max(0, latest.score || 0))} sx={{ height: 10, borderRadius: 8 }} />
                </Box>
              </Card>

              <Card sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <InsightsIcon sx={{ color: '#462872' }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#424446' }}>Skill Breakdown</Typography>
                </Box>
                {latest.skillBreakdown && Object.keys(latest.skillBreakdown).length > 0 ? (
                  <Grid container spacing={2}>
                    {Object.entries(latest.skillBreakdown).map(([skill, value]) => (
                      <Grid item xs={12} sm={6} md={4} key={skill}>
                        <Paper sx={{ p: 2, borderRadius: 12 }}>
                          <Typography sx={{ fontWeight: 600, color: '#424446', mb: 1 }}>{skill}</Typography>
                          <LinearProgress variant="determinate" value={Math.min(100, Math.max(0, value))} sx={{ height: 8, borderRadius: 6 }} />
                          <Typography variant="caption" sx={{ color: '#666' }}>{Math.round(value)}%</Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body2" sx={{ color: '#666' }}>No skill breakdown available.</Typography>
                )}
              </Card>

              {latest.recommendations && (
                <Card sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#424446', mb: 1 }}>Recommendations</Typography>
                  <Typography sx={{ color: '#555', whiteSpace: 'pre-line' }}>{latest.recommendations}</Typography>
                </Card>
              )}
            </>
          )}
        </Box>

        <Box>
          <Card>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <HistoryIcon sx={{ color: '#462872' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#424446' }}>All Attempts</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {history && history.length > 0 ? (
              <Grid container spacing={2}>
                {history.map((h, idx) => (
                  <Grid item xs={12} sm={6} md={4} key={idx}>
                    <Paper
                      sx={{ p: 2, borderRadius: 12, cursor: 'pointer', transition: 'all .2s', '&:hover': { boxShadow: 3 } }}
                      onClick={() => { setSelectedAttempt({ index: history.length - idx, data: h }); setOpenDetail(true); }}
                    >
                      <Typography sx={{ fontWeight: 600, color: '#424446', mb: .5 }}>Attempt #{history.length - idx}</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: '#462872' }}>{Math.round(h.score || 0)}%</Typography>
                      <LinearProgress variant="determinate" value={Math.min(100, Math.max(0, h.score || 0))} sx={{ height: 8, borderRadius: 6, my: 1 }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ color: '#666' }}>Open details</Typography>
                        <Chip label={Math.round(h.score || 0) >= 70 ? 'Pass' : 'Review'} color={Math.round(h.score || 0) >= 70 ? 'success' : 'warning'} size="small" />
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body2" sx={{ color: '#666' }}>No previous attempts found.</Typography>
            )}
          </Card>
        </Box>
      </Content>

      {/* Attempt Details Dialog */}
      <Dialog open={openDetail} onClose={() => setOpenDetail(false)} maxWidth="md" fullWidth>
        <DialogTitle>Attempt {selectedAttempt?.index} · Overview</DialogTitle>
        <DialogContent>
          {selectedAttempt && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#424446', mb: 1 }}>Overall Score</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#462872' }}>{Math.round(selectedAttempt.data.score || 0)}%</Typography>
                <LinearProgress variant="determinate" value={Math.min(100, Math.max(0, selectedAttempt.data.score || 0))} sx={{ flex: 1, height: 10, borderRadius: 8 }} />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#424446', mb: 1 }}>Skill Breakdown</Typography>
                {selectedAttempt.data.skillBreakdown && Object.keys(selectedAttempt.data.skillBreakdown).length > 0 ? (
                  <Grid container spacing={2}>
                    {Object.entries(selectedAttempt.data.skillBreakdown).map(([skill, value]) => (
                      <Grid item xs={12} sm={6} md={4} key={skill}>
                        <Paper sx={{ p: 2, borderRadius: 12 }}>
                          <Typography sx={{ fontWeight: 600, color: '#424446', mb: 1 }}>{skill}</Typography>
                          <LinearProgress variant="determinate" value={Math.min(100, Math.max(0, value))} sx={{ height: 8, borderRadius: 6 }} />
                          <Typography variant="caption" sx={{ color: '#666' }}>{Math.round(value)}%</Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body2" sx={{ color: '#666' }}>No skill breakdown available.</Typography>
                )}
              </Box>
              {selectedAttempt.data.recommendations && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#424446', mb: 1 }}>Recommendations</Typography>
                  <Typography sx={{ color: '#555', whiteSpace: 'pre-line' }}>{selectedAttempt.data.recommendations}</Typography>
                </Box>
              )}
              <Alert severity="info" sx={{ mt: 2 }}>
                Question-level review (correct vs wrong) is not available from the current API. If you expose answer-level data for an attempt, I can display full question-by-question results here.
              </Alert>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </PageWrap>
  );
};

export default AssessmentResults;
