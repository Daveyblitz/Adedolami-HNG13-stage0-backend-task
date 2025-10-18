# Backend Stage 0 — Profile + Cat Fact API

A minimal Node/Express service that exposes a GET /me endpoint returning profile information plus a dynamic cat fact from https://catfact.ninja/fact. This README explains setup, run instructions, dependencies, environment variables and quick tests.

---

## What this project does
- Serves a simple REST endpoint: `GET /me`
- Returns JSON (Content-Type: application/json) with this shape:
```json
{
  "status": "success",
  "user": { "email": "...", "name": "...", "stack": "..." },
  "timestamp": "2025-10-18T12:34:56.789Z",
  "fact": "A cat fact string..."
}
```
- Fetches a cat fact from the external Cat Facts API on each request.
- Includes middleware for security (helmet), CORS, logging (morgan), and a basic in-memory rate limiter.
- Returns a friendly fallback `fact` if the external API is unavailable.

---

## Prerequisites
- Node.js v14+ (recommended LTS)
- npm (bundled with Node.js)

---

## Install dependencies
From the project root run:

```bash
npm install
```

The main dependencies used by the project are:
- express
- axios
- dotenv
- cors
- helmet
- morgan
- express-rate-limit

(They are listed in `package.json`.)

---

## Environment variables
Create a `.env` file in the project root or set environment variables in your shell. Example `.env` (safe to use for local dev):

```
PORT=3000
PROFILE_EMAIL=you@example.com
PROFILE_NAME=Your Name
PROFILE_STACK=Node.js/Express
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
MORGAN_FORMAT=dev
```

Notes:
- The server allows requests from any origin (development friendly). "cors()"
- Rate limiter is in-memory (not distributed). For production with multiple instances, use a Redis-backed store.

---

## Run locally / test
Start the server with Node:

```bash
node index.js
```

Or during development with automatic restarts (if you have nodemon):

```bash
npx nodemon index.js
```

You should see a console message like:

```
Server is running on http://localhost:3000
```

---

## Test the endpoint
Using curl (shows headers + body):

```bash
curl -i http://localhost:3000/me
```

Pretty-print JSON (if you have `jq`):

```bash
curl -s http://localhost:3000/me | jq
```

Example expected JSON keys: `status`, `user` (with `email`, `name`, `stack`), `timestamp`, `fact`.

If the Cat Facts API is slow or unavailable, the server will return a fallback meassage string instead of failing.

---

## License
This project is provided as-is for the Stage 0 task.

---

