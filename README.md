# Candidate Profile Shortlisting System

A full-stack MERN application designed to help recruiters add candidates, match their skills to job requirements, and generate AI-driven shortlisting recommendations using the OpenRouter API.

## Features

- **Candidate Management**: Add and view a robust database of candidates.
- **Skill Matching**: Provide job requirements and minimum experience to instantly see a list of matched candidates with percentage-based matching scores.
- **AI Recommendation Model**: Uses OpenRouter API to evaluate the top candidates and explain why they are suitable fits for the job.
- **Beautiful Modern UI**: A responsive, ATS-style modern dashboard built with Tailwind CSS.

## Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS, React Router DOM, Axios, Lucide React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **AI Integration**: OpenRouter API (`meta-llama/llama-3.1-8b-instruct:free` or configurable in controller)

## Project Structure

```bash
candidate-shortlisting-system/
├── backend/
│   ├── config/          # DB connection setup
│   ├── controllers/     # Controller logic for candidates and AI
│   ├── models/          # Mongoose Schemas
│   ├── routes/          # Express Routes
│   ├── server.js        # Main Entry Point
│   └── .env             # Environment Variables
└── frontend/
    ├── src/
    │   ├── components/  # Render components (CandidateCard)
    │   ├── pages/       # Next pages (Dashboard, Candidates, Shortlist)
    │   ├── services/    # Axios wrapper
    │   ├── App.jsx      # Main Application Router Layout
    │   └── main.jsx     # Vite Entry point
```

## Setup & Installation Instructions

### Prerequisite Requirements

- Node.js (v16+ recommended)
- MongoDB Account (or local instance)
- OpenRouter Account for AI API key

### 1. Clone & Install Dependencies

Open terminal in the project root folder.

**Backend Installation:**
```bash
cd backend
npm install
```

**Frontend Installation:**
```bash
cd ../frontend
npm install
```

### 2. Configure Environment Variables

1. Go to the `backend` folder.
2. Rename `.env.example` to `.env` (or create a new `.env` file).
3. Fill in your details:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
OPENROUTER_API_KEY=sk-or-v1-...
```

*Note: In the provided setup by the AI, `.env` is already configured with your keys.*

### 3. Running the Application Locally

You need two terminals to run both client and server simultaneously.

**Terminal 1: Start Backend Server**
```bash
cd backend
npm start     # or node server.js
```
*(Runs on http://localhost:5000)*

**Terminal 2: Start Frontend Server**
```bash
cd frontend
npm run dev
```
*(Runs securely on your Vite port, usually http://localhost:5173)*

### Usage Steps:
1. Open the Frontend URL in your browser.
2. Navigate to **Candidates** to add various profiles with differing skills.
3. Navigate to **AI Shortlisting**.
4. Enter required skills (e.g. `React, Node.js`) and minimum experience.
5. Click **Find Matches** to see match ratings.
6. Click **Generate AI Report** to get OpenRouter’s insights on top matching candidates.
