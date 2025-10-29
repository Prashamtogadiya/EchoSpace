# EchoSpace

EchoSpace is a lightweight real-time chat demo where messages instantly propagate to all connected clients. Built with React (Vite) and Supabase, the project demonstrates live data sync, a minimal UI, and a simple serverless backend pattern.

## Quick overview
- Real-time messaging using Supabase Realtime
- Vite + React frontend for fast local development
- Minimal, extensible data model and client logic

## Table of contents
- Features
- Tech stack
- Requirements
- Environment
- Quick start
- Database schema
- Scripts
- Deployment
- Troubleshooting
- Contributing
- License

## Features
- Live message broadcasting across clients
- Simple, responsive UI (React + Vite)
- Easy to extend (auth, rooms, persistence)

## Tech stack
- React (Vite)
- Supabase (Postgres + Realtime)
- Optional: Supabase Edge Functions for server-side logic

## Requirements
- Node.js 16+ (recommended)
- npm, yarn, or pnpm
- Supabase project (free tier is fine)

## Environment
Create a .env or .env.local file in the project root with:
- SUPABASE_URL=https://your-project-ref.supabase.co
- SUPABASE_ANON_KEY=your-public-anon-key

Do not commit secrets. Use your hosting provider's environment settings for production.

## Quick start (local)
1. Clone:
   - git clone <repo-url>
   - cd EchoSpace
2. Install:
   - npm install
3. Add environment variables (.env.local)
4. Start dev server:
   - npm run dev
5. Open the URL shown by Vite (usually http://localhost:5173)

## Minimal database schema
Create a messages table (example SQL):

```sql
-- Example: minimal messages table
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  username text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
```

Enable realtime replication and Row Level Security (RLS) as appropriate for your project.

## Example message (client)
- { id, content, username, created_at }

## Scripts
- npm run dev — start dev server
- npm run build — build production assets
- npm run preview — serve production build locally

(Add lint/test scripts if present.)

## Deployment
- Frontend: Vercel, Netlify, or Cloudflare Pages
- Set SUPABASE_URL and SUPABASE_ANON_KEY in your host environment
- If using Supabase functions, deploy via the Supabase CLI or dashboard

## Troubleshooting
- "Cannot connect to Supabase": verify SUPABASE_URL and SUPABASE_ANON_KEY values
- "Realtime updates not received": check Supabase Realtime settings and table replication
- Inspect browser console and server logs for errors

## Contributing
- Open issues for bugs/feature requests
- Create PRs against main with a clear description
- Keep secrets out of commits

## License
Add your license here (e.g., MIT). Replace this line with the chosen license block.

## Notes for reviewers
Check Quick start, Environment, and Database schema sections first — they make the project easy to run and verify.
