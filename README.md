# MS Consultant

A careers & coaching platform for teachers, students and institutes in Jharkhand —
built as a Next.js + TypeScript + Tailwind frontend, talking to a NestJS REST API
backed by PostgreSQL.

```
Next.js (TypeScript, Tailwind)  ──REST──▶  NestJS API  ──▶  PostgreSQL
        frontend/                         backend/
```

## Project layout

```
ms-consultant/
├── backend/     NestJS REST API (jobs, courses, candidates, employers, applications, contact)
├── frontend/    Next.js app (App Router) consuming the API
└── docker-compose.yml   PostgreSQL for local development
```

## 1. Start PostgreSQL

```bash
docker compose up -d
```

This starts Postgres on `localhost:5432` with database `ms_consultant`,
user `postgres`, password `postgres` (see `docker-compose.yml` to change these).

Don't have Docker? Install PostgreSQL locally and create a database called
`ms_consultant`, then update `backend/.env` to match your credentials.

## 2. Run the backend

```bash
cd backend
cp .env.example .env      # adjust DB credentials if needed
npm install
npm run start:dev         # http://localhost:4000/api
```

`synchronize: true` is enabled for local development, so tables are created
automatically from the entities on first run. Then seed some sample data:

```bash
npm run seed
```

This adds the same sample jobs, courses and a candidate you saw in the
original design (Mathematics/Chemistry/Physics Faculty, IIT-JEE/NEET/Board/
Foundation courses).

### API endpoints

| Resource      | Routes |
|---------------|--------|
| Jobs          | `GET /api/jobs`, `GET /api/jobs/:id`, `POST /api/jobs`, `PATCH /api/jobs/:id`, `DELETE /api/jobs/:id` |
| Courses       | `GET /api/courses`, `GET /api/courses/:id`, `POST /api/courses`, `PATCH /api/courses/:id`, `DELETE /api/courses/:id` |
| Candidates    | `GET /api/candidates`, `GET /api/candidates/:id`, `POST /api/candidates`, `PATCH /api/candidates/:id` |
| Employers     | `GET /api/employers`, `GET /api/employers/:id`, `POST /api/employers`, `PATCH /api/employers/:id` |
| Applications  | `GET /api/applications?candidateId=`, `POST /api/applications`, `PATCH /api/applications/:id/status` |
| Contact       | `GET /api/contact`, `POST /api/contact` |

`jobs` supports query filters: `?search=`, `?location=`, `?type=full_time|part_time`.

## 3. Run the frontend

```bash
cd frontend
cp .env.local.example .env.local   # points to http://localhost:4000/api
npm install
npm run dev                        # http://localhost:3000
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero search, featured jobs, categories, courses, testimonials |
| `/jobs`, `/jobs/[id]` | Job listings and job detail (description/requirements/benefits) |
| `/courses`, `/courses/[id]` | Course catalogue and course detail (syllabus, price, enroll) |
| `/about` | Company overview, mission & vision, team, FAQ |
| `/candidates` | Candidate dashboard (profile, applications, alerts, settings) |
| `/employers` | Employer dashboard (overview, jobs, applicants, shortlist) |
| `/contact` | Contact details + message form wired to the Contact API |

## Deploying

- **Frontend**: deploy `frontend/` to Vercel (or any Node host); set
  `NEXT_PUBLIC_API_URL` to your deployed backend's `/api` URL.
- **Backend**: deploy `backend/` to any Node host (Railway, Render, Fly.io,
  an EC2 box, etc.); set the `DB_*` env vars to your managed Postgres instance,
  and turn off `synchronize` in `app.module.ts` in favor of migrations once
  you're past local development.
- **Database**: any managed PostgreSQL (Supabase, Neon, RDS, Railway Postgres…).
