# ContestHub — Frontend

A Coding Contest Aggregator Platform built with React and Vite.

---

## Tech Stack

- **React 18** — UI library
- **Vite** — Fast build tool with Hot Module Replacement (HMR)
- **Tailwind CSS** — Utility-first CSS framework
- **Axios** — HTTP client for API requests
- **React Router DOM** — Client-side routing
- **React Hot Toast** — Toast notifications
- **date-fns** — Date formatting utilities
- **@heroicons/react** — Icon library

---

## Getting Started

### Prerequisites

- Node.js v18 or above
- npm v9 or above

### Installation

```bash
# Clone the repository
git clone https://github.com/devendra529/ContestHub.git

# Navigate to client folder
cd ContestHub/client

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Available Scripts

- `npm run dev` — Start development server with HMR
- `npm run build` — Build for production
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint checks

---

## Project Structure

```
client/
├── public/
├── src/
│   ├── api/              # Axios instance and API config
│   ├── assets/           # Images, icons, static files
│   ├── components/
│   │   ├── auth/         # Login and Signup form components
│   │   ├── contest/      # Contest card, list, filter, countdown
│   │   ├── layout/       # Navbar, Sidebar, Layout wrapper
│   │   ├── notes/        # Notes modal and card components
│   │   └── ui/           # Reusable UI — Button, Modal, Badge, Spinner
│   ├── context/          # React Context — Auth, Theme, Contest state
│   ├── hooks/            # Custom hooks — useAuth, useContests, etc.
│   ├── pages/            # Route-level pages
│   ├── routes/           # AppRoutes and ProtectedRoute
│   ├── utils/            # Date formatter, duration, platform colors
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## Environment Variables

Create a `.env` file inside the `client/` folder:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

> For production, replace with your deployed backend URL on Render.

---

## Vite Plugins

Two official Vite plugins are available for React:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) — uses [Oxc](https://oxc.rs/) for fast transforms
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) — uses [SWC](https://swc.rs/) for even faster builds

This project uses `@vitejs/plugin-react` by default.

---

## React Compiler

The React Compiler is not enabled by default due to its impact on dev and build performance. To enable it, follow the [official React Compiler installation guide](https://react.dev/learn/react-compiler/installation).

---

## ESLint Configuration

ESLint is pre-configured with basic rules. For a production-grade setup with type-aware linting, consider switching to TypeScript. See the [Vite React TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for integrating `typescript-eslint`.

---

## Features

- User authentication — Signup, Login, JWT-based protected routes
- Contest aggregator dashboard — Codeforces, LeetCode, CodeChef
- Filter contests — Upcoming, Live, Past, Platform-wise
- Search contests by name
- Bookmark contests — saved per user
- Personal notes on contests
- Countdown timers for upcoming contests
- Dark mode support
- Responsive design — mobile friendly
- Loading skeletons and spinners

---

## Deployment

This frontend is deployed on **Vercel**.

```bash
# Build for production
npm run build

# The dist/ folder is the production output
# Connect your GitHub repo to Vercel for automatic deployments
```

Set `VITE_API_BASE_URL` in Vercel environment variables pointing to your Render backend URL.

---

## Related

- [ContestHub Backend](../server/README.md) — Node.js + Express + MongoDB
- [Codeforces API](https://codeforces.com/apiHelp)
- [Kontests API](https://kontests.net/api)

---

## Author

**Devendra Pratap Singh**
- GitHub: [@devendra529](https://github.com/devendra529)
