# Author - Jainam Gala

# Expense Tracker Frontend

This is a React + TypeScript frontend for an Expense Tracker application. It uses [Vite](https://vitejs.dev/) for fast development, [Redux Toolkit](https://redux-toolkit.js.org/) for state management, and [Material UI](https://mui.com/) for UI components.

## Features

- User registration and login (JWT-based authentication)
- Add, view, and categorize expenses
- Admin dashboard with analytics and expense approval
- Responsive and modern UI

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/jainamga/expReport-Frontend
   cd expense-tracker-frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**

   - Copy `.env.development` and `.env.production` as needed.
   - Set `VITE_API_BASE_URL` to your backend API URL.

4. **Run the development server:**
   ```sh
   npm run dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Build for Production

```sh
npm run build
```

The production-ready files will be in the `dist` folder.

## Project Structure

```
src/
  api/              # Axios API client
  components/       # Reusable UI components
  pages/            # Page components (Login, Register, Dashboard)
  redux/            # Redux slices and store
  App.tsx           # Main app with routes
  main.tsx          # Entry point
```

## Environment Variables

- `.env.development` for local development
- `.env.production` for production

Example:
```
VITE_API_BASE_URL=http://localhost:8080/api
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint the code

## License

MIT

---

**Note:** Make sure your backend API is running and accessible at the URL specified in your
