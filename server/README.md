# IVC Backend Server

The backend for the **Innovators & Visionaries Club (IVC)** platform, built with Node.js and Express. It provides a secure API for serving club data and handling join applications.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Security**: 
  - `helmet` (HTTP headers)
  - `cors` (Cross-Origin Resource Sharing)
  - `express-rate-limit` (Anti-spam protection)
- **Deployment**: Configured for Vercel Functions

---

## API Endpoints

### General
- `GET /api` - Health check

### Data Retrieval
- `GET /api/events` - Returns a list of upcoming club events
- `GET /api/projects` - Returns a list of active club projects

### Applications
- `POST /api/join` - Submit a new member application
  - **Body**: `{ name, email, department, year }`
  - **Features**: Includes anti-spam rate limiting (5 requests/hour per IP) and strict input validation.

---

## Security Features

1.  **Rate Limiting**: Prevents brute-force attacks and abuse of the join endpoint.
2.  **Input Validation**: Strict checks on email formats, data length, and required fields.
3.  **Payload Control**: Limits JSON body size to 10kb to prevent memory exhaustion attacks.
4.  **CORS**: Restricted origins in production to ensure only trusted clients can access the API.

---

## Local Development

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`.
