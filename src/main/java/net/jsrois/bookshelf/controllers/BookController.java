package net.jsrois.bookshelf.controllers;

import net.jsrois.bookshelf.models.Book;
import net.jsrois.bookshelf.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookController {

    private BookRepository bookRepository;

    @Autowired
    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }


    @GetMapping("/books")
    public List<Book> allBooks() {
        return bookRepository.findAll();
    }

    @PostMapping("/books")
    @PreAuthorize("hasRole('MODERATOR')")
    public Book addBook(@RequestBody Book book) {

        bookRepository.save(book);

        return book;
    }

    @DeleteMapping("/books/{id}")
    @PreAuthorize("hasRole('MODERATOR')")
    public void deleteBookById(@PathVariable Long id) {
        bookRepository.deleteById(id);
    }
}
