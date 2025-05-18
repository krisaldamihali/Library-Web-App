document.addEventListener('DOMContentLoaded', () => {
  const bookForm = document.getElementById('bookForm');
  const booksTableBody = document.querySelector('#booksTable tbody');
  const searchInput = document.getElementById('searchInput');

  function validAuthor(name) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
  }

  async function fetchBooks() {
    try {
      const response = await fetch('/books');
      if (!response.ok) throw new Error('Error fetching books');
      const books = await response.json();
      displayBooks(books);
    } catch (error) {
      alert(error.message);
    }
  }

  function displayBooks(books) {
    booksTableBody.innerHTML = '';
    books.forEach(book => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.year}</td>
        <td>${book.genre}</td>
        <td><button class="delete-btn" data-id="${book.id}">Delete</button></td>
      `;
      booksTableBody.appendChild(tr);
    });
  }

  searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    booksTableBody.querySelectorAll('tr').forEach(row => {
      const title = row.cells[0].textContent.toLowerCase();
      const author = row.cells[1].textContent.toLowerCase();
      row.style.display = (title.includes(filter) || author.includes(filter)) ? '' : 'none';
    });
  });

  bookForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = bookForm.title.value.trim();
    const author = bookForm.author.value.trim();
    const year = bookForm.year.value.trim();
    const genre = bookForm.genre.value;

    if (!title || !author || !year || !genre) {
      alert('Please fill in all fields.');
      return;
    }

    if (!validAuthor(author)) {
      alert('Author must contain only letters and spaces.');
      return;
    }

    const yearNum = Number(year);
    if (isNaN(yearNum) || yearNum < 0) {
      alert('Year must be a valid number.');
      return;
    }

    try {
      const response = await fetch('/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, year: yearNum, genre }),
      });
      if (!response.ok) throw new Error('Error adding book');
      bookForm.reset();
      fetchBooks();
    } catch (error) {
      alert(error.message);
    }
  });

  booksTableBody.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const id = e.target.dataset.id;
      if (confirm('Are you sure you want to delete this book?')) {
        try {
          const response = await fetch(`/books/${id}`, { method: 'DELETE' });
          if (!response.ok) throw new Error('Error deleting book');
          fetchBooks();
        } catch (error) {
          alert(error.message);
        }
      }
    }
  });

  fetchBooks();
});
