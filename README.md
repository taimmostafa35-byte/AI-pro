# AI Chatbot

A modern, real-time AI chatbot powered by Google Gemini. Features a sleek dark-themed UI built with React and TypeScript, backed by a Node.js/Express server.

![AI Chatbot](https://img.shields.io/badge/AI-Chatbot-6c63ff?style=for-the-badge)

## Features

- **Real-time AI Conversations** — Chat with Gemini 1.5 Flash via Google AI API
- **Markdown Rendering** — AI responses support rich markdown (code blocks, lists, etc.)
- **Conversation History** — Full context maintained across messages
- **Responsive Design** — Works on desktop and mobile
- **Typing Indicator** — Animated loading dots while AI is thinking
- **Clear Chat** — Reset conversation with one click

## Tech Stack

| Layer    | Technology                  |
| -------- | --------------------------- |
| Frontend | React 18, TypeScript, Vite  |
| Backend  | Node.js, Express, TypeScript |
| AI       | Google Gemini 1.5 Flash      |
| Styling  | Custom CSS (dark theme)      |

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Google Gemini API Key** (free) — [Get one here](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/YOUR_USERNAME/ai-chatbot.git
   cd ai-chatbot
   ```

2. **Install all dependencies**:

   ```bash
   npm run install:all
   ```

3. **Set up environment variables**:

   ```bash
   cp server/.env.example server/.env
   ```

   Edit `server/.env` and add your Gemini API key:

   ```env
   GEMINI_API_KEY=your-gemini-api-key-here
   PORT=3001
   ```

4. **Start the development servers**:

   ```bash
   npm run dev
   ```

   This starts both the backend (port 3001) and frontend (port 5173) concurrently.

5. **Open** [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
ai-chatbot/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── ChatInput.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   └── Header.tsx
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   └── vite.config.ts
├── server/                 # Express backend
│   ├── src/
│   │   ├── routes/
│   │   │   └── chat.ts     # Gemini chat endpoint
│   │   └── index.ts        # Server entry point
│   └── .env.example
├── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint       | Description              |
| ------ | -------------- | ------------------------ |
| POST   | `/api/chat`    | Send messages to Gemini  |
| GET    | `/api/health`  | Health check             |

### POST `/api/chat`

**Request Body:**

```json
{
  "messages": [
    { "role": "user", "content": "Hello!" }
  ]
}
```

**Response:**

```json
{
  "message": "Hello! How can I help you today?"
}
```

## Scripts

| Command              | Description                            |
| -------------------- | -------------------------------------- |
| `npm run dev`        | Start both frontend and backend        |
| `npm run dev:client` | Start frontend only                    |
| `npm run dev:server` | Start backend only                     |
| `npm run build`      | Build frontend for production          |
| `npm run lint`       | Run TypeScript type checks             |

## License

MIT
