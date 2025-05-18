package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
public class BookController {

    private final List<Book> books = new ArrayList<>();

    @GetMapping("/books")
    public List<Book> getBooks() {
        return books;
    }

    @PostMapping("/books")
    public Book addBook(@RequestBody Book book) {
        Book newBook = new Book(book.getTitle(), book.getAuthor(), book.getYear(), book.getGenre());
        books.add(newBook);
        return newBook;
    }

    @DeleteMapping("/books/{id}")
    public void deleteBook(@PathVariable int id) {
        books.removeIf(book -> book.getId() == id);
    }

    @GetMapping("/books/search")
    public List<Book> searchBooks(@RequestParam(required = false) String author,
                                  @RequestParam(required = false) String title) {
        return books.stream()
                .filter(book -> (author == null || book.getAuthor().toLowerCase().contains(author.toLowerCase())) &&
                                (title == null || book.getTitle().toLowerCase().contains(title.toLowerCase())))
                .collect(Collectors.toList());
    }
}
