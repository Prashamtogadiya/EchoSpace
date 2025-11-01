# EchoSpace

EchoSpace is a lightweight real-time chat demo built with React (Vite) and Supabase. It demonstrates live message broadcasting to all connected clients with a minimal UI and a simple serverless backend pattern.

Why this repo
- Small, focused example for realtime updates using Supabase Realtime.
- Good starting point for adding auth, rooms, persistence, or integrating with Supabase Edge Functions.
- Easy to run locally for testing and demos.

## Quick start (local)
1. Clone the repo:
   - git clone <repo-url>
   - cd EchoSpace
2. Install dependencies:
   - npm install
3. Add environment variables:
   - Create a file at the project root named `.env` or `.env.local` with the values below.
4. Run the dev server:
   - npm run dev
5. Open the URL printed by Vite (default: http://localhost:5173)

## Required environment variables
Create .env or .env.local (do not commit this file):

SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-public-anon-key

Note: Use the anon (public) key for client-side demos. Keep service_role keys out of frontend code.

## Minimal database schema
Run this SQL in your Supabase project's SQL editor to create a simple messages table:

```sql
-- Example: minimal messages table
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  username text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
```

Enable realtime replication for the messages table in Supabase if you want live updates.

## How it works (short)
- Frontend: React app (Vite) connects to Supabase using SUPABASE_URL and SUPABASE_ANON_KEY.
- Realtime: Clients subscribe to changes on the messages table; inserts broadcast to all connected clients.
- Backend: There is no required server — Supabase handles persistence and realtime updates. Add Edge Functions if you need server-side logic.

## Useful npm scripts
- npm run dev — start dev server
- npm run build — build for production
- npm run preview — serve the production build locally

## Troubleshooting
- "Cannot connect to Supabase": verify SUPABASE_URL and SUPABASE_ANON_KEY are correct and not wrapped in quotes.
- "Realtime updates not received": confirm table replication is enabled in Supabase and that RLS/Policies allow the anon key to read/replicate events.
- Check browser console for client-side errors and Supabase project logs for backend issues.

## Contributing
- Open issues for bugs or feature requests.
- Send a PR with a clear description and small, focused changes.
- Keep secrets out of commits.
