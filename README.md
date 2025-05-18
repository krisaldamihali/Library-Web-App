# 📚 Library Book Management Web Application

A simple web application for managing books in a small library. Users can add books, view the list, filter by author or title, and delete books.

---

## 🚀 Main Features

### Frontend (HTML / CSS / JavaScript):
- Book addition form with fields:
  - Title (text input)
  - Author (text input)
  - Publication Year (numeric input)
  - Genre (dropdown: Roman, Thriller, Fantasy, History, etc.)
  - "Add Book" button
- JavaScript validation:
  - All fields are required
  - Year must be a number
  - Author name cannot contain symbols
- Dynamic book list fetched from Java backend API
- Display books in a table with columns:
  - Title, Author, Year, Genre, Delete button
- Real-time search/filter input to filter books by title or author dynamically
- Simple responsive design using Flexbox and Grid

### Backend (Java Servlet or Spring Boot):
- `Book` class with relevant fields (id, title, author, year, genre)
- In-memory `List<Book>` for storing books initially
- RESTful endpoints:
  - `GET /books` – returns list of books as JSON
  - `POST /books` – accepts new book data from frontend and adds it to the list
  - `DELETE /books/{id}` – deletes the book with the given ID
  - (Optional) `GET /books/search?author=xyz` – filter books by author on the server side
- Uses Gson library for JSON serialization/deserialization (if using Servlets)

---

## 🛠️ Technologies Used

- **Backend:** Java + Spring Boot
- **Frontend:** HTML, CSS, JavaScript 

---
