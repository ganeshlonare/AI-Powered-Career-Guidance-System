# Career Guidance Platform (Frontend)

Modern, full-stack-ready frontend for a personalized career guidance platform. Users can sign up, complete onboarding, take an assessment, and receive a generated roadmap and weekly plan, with a dashboard for ongoing progress, jobs, insights, and resume tools.

## What this project is

This repository contains a production-ready React + TypeScript app styled with Material UI and Tailwind CSS, wired to a Java/Spring backend via typed API modules. It includes authentication, protected dashboard routes, onboarding, assessment (quiz), roadmap, weekly plan, jobs search, and industry insights.

## Why it’s different

- Personalized onboarding feeds into assessment to tailor roadmaps and study plans.
- Clear, opinionated user flows to reduce friction from sign-up to first value.
- Strong separation of concerns: typed API modules and a light HTTP client.
- Modern UI/UX with accessible components and responsive layouts.
- Extensible dashboard modules (Roadmap, Resume Builder, Jobs, Insights).

## Core user flows

- Sign up flow: `signup → onboarding → assessment → roadmap`
- Sign in flow: `signin → dashboard overview`

Routes are defined in `src/App.tsx`. Dashboard routes are protected via `ProtectedRoute`.

## Features

- Auth (register, login, verify email) and protected routes
- Onboarding multi-step form (profile, skills, preferences)
- Assessment/Quiz with timer, navigation, and backend submission
- Automatic Roadmap generation and Weekly Plan view
- Dashboard with Roadmap, Profile, Resume Builder
- Jobs search and Industry Insights pages
- Fully typed API modules and minimal HTTP wrapper

## Tech stack

- React 18, TypeScript, Vite
- Material UI (MUI) + Tailwind CSS
- React Router v6
- Framer Motion (animations)

## Project structure (high level)

```
src/
  api/                 # typed API modules (auth, quiz, roadmap, jobs, etc.)
  components/          # UI components and pages
  context/AuthContext  # auth state provider
  hooks/useAuth.ts     # consumer hook for auth
  config/env.ts        # env variables (API base URL, storage keys)
  App.tsx              # routes
public/
  logos/               # partner logos (optional)
```

## Getting started

1) Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)

2) Install

```bash
git clone <repository-url>
cd career-guidance
npm install
```

3) Environment

Copy `.env.example` to `.env` and set the backend URL:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

This is read in `src/config/env.ts` as `API_BASE_URL` and used by the HTTP client.

4) Run

```bash
npm run dev
```

App runs at `http://localhost:5173`.

5) Build

```bash
npm run build
```

Outputs to `dist/`.

## Using authentication in components

```tsx
import { useAuth } from '@/hooks/useAuth';

function ExampleLogin() {
  const { login, user, logout } = useAuth();

  async function onSubmit() {
    await login({ email: 'test@example.com', password: 'secret' });
  }

  return null;
}
```

## API modules

Typed API modules under `src/api/` call backend endpoints through `src/lib/http.ts` which injects `Authorization` headers (when token exists):

- `authApi` (`src/api/auth.ts`): `/auth/login`, `/auth/register`, `/auth/me`
- `userApi` (`src/api/user.ts`): `/users/me` (GET/PUT)
- `jobsApi` (`src/api/jobs.ts`): `/jobs` (search)
- `quizApi` (`src/api/quiz.ts`): `/quiz/questions`, `/quiz/submit`
- `roadmapApi` (`src/api/roadmap.ts`): `/roadmap/me`, `/roadmap/steps/:stepId`
- `resumeApi` (`src/api/resume.ts`): `/resume/me` (GET/PUT)

If your backend paths differ, adjust these modules accordingly.

## How to use (happy paths)

- New user: go to `/signup` → create account → you’ll be redirected to `/onboarding` → complete it → you’ll be redirected to `/dashboard/assessment` → submit → you’ll be redirected to `/dashboard/roadmap`.
- Existing user: go to `/signin/email` → on success you’ll be redirected to `/dashboard/overview`.

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Type-check and build for production
- `npm run preview` — Preview the production build
- `npm run lint` — Run ESLint

## License

MIT

