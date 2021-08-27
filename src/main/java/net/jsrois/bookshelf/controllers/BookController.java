package net.jsrois.bookshelf.controllers;

import net.jsrois.bookshelf.models.Book;
import net.jsrois.bookshelf.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @PutMapping("/books")
    @PreAuthorize("hasRole('MODERATOR')")
    public ResponseEntity<Book> editById(@RequestBody Book book) {
        if (bookRepository.findById(book.getId()).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        bookRepository.save(book);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
