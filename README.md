# Turn The Page: A Book Review Platform

Turn The Page is a full-stack MERN application designed for book lovers to discover, discuss, and track their reading. Users can search and filter a dynamic book catalog, share their thoughts by posting detailed reviews, and manage their own literary contributions. The platform features a robust backend with secure authentication and a dynamic frontend built with React.

## Live Demo

- **Frontend (Vercel):** [Link to your deployed frontend]
- **Backend (Render):** [Link to your deployed backend API]
- [![Run in Postman](https://run.pstmn.io/button.svg)](https://solar-meadow-470145.postman.co/workspace/Postman-API-Fundamentals-Studen~5cd81f7b-e92e-47ad-9378-e1fa8d962ebc/collection/42534529-2ca96b7a-0ed6-49b9-8111-af548a6a0beb?action=share&source=copy-link&creator=42534529)

## Features

- **Secure User Authentication**:

  - User registration and login.
  - Stateless authentication using JWTs stored in secure, `httpOnly` cookies.
  - Frontend protected routes and conditional UI rendering based on authentication state.

- **Complete Book Management (CRUD)**:

  - Authenticated users can add, edit, and delete their own books.
  - Ownership control ensures users can only manage content they created.
  - Paginated view for browsing all books.

- **Interactive Review System**:

  - Authenticated users can add, edit, and delete their own reviews on book detail pages.
  - Real-time UI updates upon review submission, edit, or deletion without page reloads.

- **Advanced Search & Discovery**:

  - Live search for books by title or author with debouncing for performance.
  - Filter books by a predefined list of genres.
  - Sort books by publication date, creation date, or average rating.

- **User Profiles**:

  - A dedicated profile page for logged-in users to view all of their own added books and written reviews.

- **Data Visualization**:

  - A dynamic bar chart on each book's detail page displays the distribution of ratings (1-5 stars) using Recharts.

- **Dynamic Book Covers**:
  - Automatically fetches and caches book cover images from external APIs (Open Library, Google Books) to enrich the UI, providing a visually appealing experience while optimizing performance by preventing redundant network requests.

## Tech Stack

### Backend

- **Node.js** & **Express**
- **MongoDB Atlas** with **Mongoose** (Object Data Modeling)
- **JSON Web Tokens (JWT)** for authentication
- **Bcrypt.js** for password hashing

### Frontend

- **React** (with Vite)
- **React Router** for client-side routing
- **React Context API** for global state management
- **Axios** for API requests
- **Recharts** for data visualization

## Local Setup

To run this project on your local machine, follow these steps.

### Prerequisites

- Node.js (v18.x or higher)
- pnpm (or npm/yarn)
- A MongoDB Atlas account & a Google Cloud account (for the Books API Key)

### Environment Variables

Example environment files (`.env.example`) are provided in both the `/backend` and `/frontend` directories. Please copy these to a new `.env` file in their respective folders and fill in the required secret values before running the application.

### 1. Clone the Repository

git clone [https://github.com/YourUsername/turn-the-page.git](https://github.com/YourUsername/turn-the-page.git)

cd turn-the-page

### 2. Backend Setup
cd backend

pnpm install

pnpm run start

The backend server will be running on `http://localhost:8008`.

### 3. Frontend Setup
cd frontend

pnpm install

pnpm run dev

The frontend application will be available at `http://localhost:5173`.

## API Endpoints

The following are the API routes established for the application.

### Authentication (`/api/auth`)

| Method | Endpoint        | Description                                  | Access  |
| :----- | :-------------- | :------------------------------------------- | :------ |
| `POST` | `/register`     | Register a new user.                         | Public  |
| `POST` | `/login`        | Log in a user and set the session cookie.    | Public  |
| `GET`  | `/logout`       | Log out a user and clear the session cookie. | Public  |
| `GET`  | `/user-details` | Get details of the currently logged-in user. | Private |

### Books (`/api/books`)

| Method   | Endpoint | Description                                            | Access          |
| :------- | :------- | :----------------------------------------------------- | :-------------- |
| `GET`    | `/`      | Get all books with search, filter, sort, & pagination. | Public          |
| `POST`   | `/`      | Add a new book.                                        | Private         |
| `GET`    | `/:id`   | Get details for a single book.                         | Public          |
| `PUT`    | `/:id`   | Update a book.                                         | Private (Owner) |
| `DELETE` | `/:id`   | Delete a book.                                         | Private (Owner) |

### Reviews (`/api/books` & `/api/reviews`)

| Method   | Endpoint                 | Description                          | Access          |
| :------- | :----------------------- | :----------------------------------- | :-------------- |
| `GET`    | `/books/:bookId/reviews` | Get all reviews for a specific book. | Public          |
| `POST`   | `/books/:bookId/reviews` | Add a new review to a book.          | Private         |
| `PUT`    | `/reviews/:id`           | Update a review.                     | Private (Owner) |
| `DELETE` | `/reviews/:id`           | Delete a review.                     | Private (Owner) |

### Users (`/api/users`)

| Method | Endpoint      | Description                                    | Access  |
| :----- | :------------ | :--------------------------------------------- | :------ |
| `GET`  | `/my-books`   | Get all books created by the logged-in user.   | Private |
| `GET`  | `/my-reviews` | Get all reviews written by the logged-in user. | Private |
