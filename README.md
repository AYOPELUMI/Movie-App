# Movie Library Application

A responsive and dynamic movie library application built with **Next.js**, **TypeScript**, and **Tailwind CSS**. The app fetches movie data from [The Movie Database (TMDb) API](https://developer.themoviedb.org/reference/intro/getting-started) and provides features such as searching, favoriting, and viewing detailed information about movies.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Integration](#api-integration)
  - [Endpoints Used](#endpoints-used)
  - [Setting Up API Access](#setting-up-api-access)
- [Design Decisions](#design-decisions)
- [Bonus Features](#bonus-features)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This application provides an intuitive and responsive interface for users to explore popular movies, search for specific titles, and manage a list of favorite movies. The application emphasizes clean UI/UX design, responsiveness, and strong type safety.

## Features

### 1. Homepage

- Displays a grid of popular movies fetched from TMDb's **Popular Movies** API endpoint.
- Each movie card includes:
  - Poster image
  - Movie title
  - Release date
  - Average rating
- Search functionality to filter movies by title.

### 2. Movie Details Page

- Navigate to a detailed page by clicking a movie card.
- Displays:
  - Full title
  - Poster image
  - Overview
  - Genres
  - Cast (optional).

### 3. Favorite Movies

- Add or remove movies from a **Favorites** list.
- Favorites persist using `localStorage and Zustand`.
- A dedicated page to view and manage favorite movies.

### 4. Responsive Design

- Optimized layouts for mobile, tablet, and desktop screens using Tailwind CSS.

### 5. TypeScript

- Type safety enforced throughout the application.
- Defined types/interfaces for API responses and components.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (for routing and data fetching)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (for responsive and modern styling)
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/) (for strong typing)
- **API**: [TMDb API](https://developer.themoviedb.org/reference/intro/getting-started)
- **Zustand**: [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn package manager
- A TMDb API key (sign up [here](https://developer.themoviedb.org/reference/intro/getting-started) to obtain one)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AYOPELUMI/Movie-App.git
   cd Movie-App
   ```

### Endpoints Used

1. **Popular Movies**

   - Fetches a list of the most popular movies.
   - Used for the homepage movie grid.

2. **Movie Details**

   - Retrieves detailed information about a specific movie.
   - Displays data such as title, overview, genres, and cast on the details page.

3. **Search Movies**
   - Searches movies based on the provided title keyword.
   - Supports real-time search functionality.

### Setting Up API Access

To access the TMDb API:

1. Register for a free TMDb API key by visiting [TMDb's API page](https://developer.themoviedb.org/reference/intro/getting-started).
2. Add the API key to the project:
   - Create a `.env.local` file in the project root.
   - Add the following environment variable:
     ```plaintext
     TMDB_API_KEY=your_tmdb_api_key
     ```

Refer to the [TMDb API Documentation](https://developer.themoviedb.org/reference/intro/getting-started) for more details on the API and its capabilities.

---

## Design Decisions

### 1. **Next.js for Routing**

- Simplifies client-side routing.
- Offers server-side rendering (SSR) and static site generation (SSG) for better performance and SEO.

### 2. **Tailwind CSS**

- Utility-first framework for rapid UI development.
- Provides responsive designs and consistent styling across devices.

### 3. **TypeScript**

- Enforces type safety, reducing runtime errors.
- Enhances developer productivity and code maintainability.

### 4. **LocalStorage for Favorites**

- Chosen for its simplicity and ability to persist favorite movies on the client-side.
- Allows users to manage a personalized favorites list.

---

## Bonus Features

### Implemented Features

1. **Infinite Scrolling**

   - Loads more movies dynamically as the user scrolls through the homepage.

2. **Skeleton Loader**

   - Displays loading placeholders to improve user experience while data is being fetched.

3. **Full Screen Spinner**
   - Displays rotating spinner to improve user experience while data is being fetched.

---
