# CinePlix

CinePlix is a modern web application for browsing movies and TV shows, built with React and Vite. It leverages the TMDB (The Movie Database) API to fetch comprehensive data about films, TV series, and personalities. The application includes a robust profanity filter to ensure a safe and family-friendly browsing experience.

## Features

- **Movie & TV Show Browsing**: Explore a vast collection of movies and TV shows.
- **Detailed Information**: View detailed information for each title, including overviews, cast, and ratings.
- **Search Functionality**: Efficiently search for specific movies, TV shows, or people.
- **Responsive Design**: Enjoy a seamless experience across various devices.

## Getting Started

Follow these steps to get CinePlix up and running on your local machine.

### Prerequisites

Make sure you have the following installed:

- Node.js (LTS version recommended)
- npm or pnpm (pnpm is used in this project)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repository-url>
   cd cine-plix-frontend
   ```

2. **Install dependencies:**

   If using pnpm:
   ```bash
   pnpm install
   ```
   If using npm:
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   CinePlix requires an API key from TMDB. Create a `.env` file in the root directory of the project and add your TMDB API key:

   ```
   VITE_APP_TMDB_API_KEY=YOUR_TMDB_API_KEY
   VITE_TMDB_BASE_URL=YOUR_TMDB_BASE_URL

   ```

   You can get a TMDB API key by registering at [TMDB](https://www.themoviedb.org/documentation/api).

### Running the Application

To start the development server:

If using pnpm:
```bash
pnpm dev
```
If using npm:
```bash
npm run dev
```

The application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

## License

This project is open source and available under the MIT License.
