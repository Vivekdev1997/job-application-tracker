# Job Application Tracking System

A portfolio-ready MERN application for managing job applications, analytics,
profiles, resumes, notes, and administrative workflows.

## Phase 1

This phase establishes the project structure and runnable starter applications:

- React 19 frontend powered by Vite
- Express backend with a health-check API
- Clean frontend and backend module boundaries
- Shared environment examples and linting configuration

## Prerequisites

- Node.js 20+
- npm 10+

## Local Development

Install dependencies:

```bash
cd backend
npm install

cd ../frontend
npm install
```

Create local environment files:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Run the backend:

```bash
cd backend
npm run dev
```

Run the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

The frontend runs at `http://localhost:5173` and the backend health endpoint is
available at `http://localhost:5000/api/health`.

## Roadmap

The project is implemented phase-by-phase. Authentication is the next phase.

