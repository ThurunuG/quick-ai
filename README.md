# QUICKAI

QUICKAI is a full-stack AI SaaS application for generating written content, creating images, editing images, and reviewing resumes. It includes a React frontend, an Express backend, Clerk authentication, Neon database storage, and Cloudinary-based media handling.

## Features

- AI article writer
- Blog title generator
- AI image generation
- Image background removal
- Object removal from images
- Resume review from uploaded PDF files
- User dashboard for recent creations
- Community feed for published creations
- Clerk authentication and subscription-aware access control

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Tailwind CSS
- Clerk React
- Axios

### Backend

- Node.js
- Express 5
- Clerk Express
- Neon Serverless Postgres
- OpenAI SDK with Google Gemini-compatible endpoint
- Cloudinary
- Multer
- `pdf-parse`

## Project Structure

```text
QUICKAI/
|-- client/        # React frontend
|-- server/        # Express API
|-- README.md
```

## Core Modules

### Client

- `/` landing page with product overview and pricing
- `/ai` authenticated app layout
- `/ai/write-article` article generator
- `/ai/blog-titles` blog title generator
- `/ai/generate-images` image generation
- `/ai/remove-background` image background remover
- `/ai/remove-object` object removal tool
- `/ai/review-resume` resume review tool
- `/ai/community` published creations feed

### Server API

- `POST /api/ai/generate-article`
- `POST /api/ai/generate-blog-title`
- `POST /api/ai/generate-image`
- `POST /api/ai/remove-image-background`
- `POST /api/ai/remove-image-object`
- `POST /api/ai/resume-review`
- `GET /api/user/get-user-creations`
- `GET /api/user/get-published-creations`
- `POST /api/user/toggle-like-creation`

All API routes are protected after Clerk middleware is applied.

## Environment Variables

### Server `.env`

Create `server/.env`:

```env
DATABASE_URL=your_neon_database_url
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
GEMINI_API_KEY=your_gemini_api_key
CLICKDROP_API_KEY=your_clipdrop_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=3000
```

### Client `.env`

Create `client/.env`:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BASE_URL=http://localhost:3000
```

## Getting Started

### 1. Install dependencies

```bash
cd client
npm install
```

```bash
cd ../server
npm install
```

### 2. Configure services

Set up these services before running the app:

- Clerk for authentication and pricing plans
- Neon for the Postgres database
- Cloudinary for image uploads and transformations
- Gemini API access for text generation
- ClipDrop API access for text-to-image generation

### 3. Start the backend

```bash
cd server
npm run server
```

### 4. Start the frontend

```bash
cd client
npm run dev
```

The frontend will usually run on `http://localhost:5173` and connect to the backend through `VITE_BASE_URL`.

## Database Notes

The backend expects a `creations` table that stores generated content, publish status, likes, and timestamps. At minimum, the application logic uses these fields:

- `id`
- `user_id`
- `prompt`
- `content`
- `type`
- `publish`
- `likes`
- `created_at`
- `updated_at`

## Access Rules

- Free users can generate up to 10 text-based creations
- Premium users can access image generation, background removal, object removal, and resume review
- Usage tracking is stored in Clerk private metadata

## Available Scripts

### Client

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

### Server

```bash
npm run server
npm start
```

## Notes

- The backend uses the OpenAI SDK with a Gemini-compatible base URL
- Uploaded resume files are parsed as PDFs before review
- Image editing and generation rely on external third-party services
- The provided `server/.env.example` currently contains a few naming typos, so follow the actual variable names used in code
