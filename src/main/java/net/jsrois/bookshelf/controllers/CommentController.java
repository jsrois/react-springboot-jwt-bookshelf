package net.jsrois.bookshelf.controllers;

import net.jsrois.bookshelf.models.Book;
import net.jsrois.bookshelf.models.Comment;
import net.jsrois.bookshelf.repositories.BookRepository;
import net.jsrois.bookshelf.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books/{bookId}/comments")
public class CommentController {

    private BookRepository bookRepository;
    private CommentRepository commentRepository;

    @Autowired
    public CommentController(BookRepository bookRepository, CommentRepository commentRepository) {
        this.bookRepository = bookRepository;
        this.commentRepository = commentRepository;
    }

    @PostMapping
    public void addComment(@PathVariable Long bookId, @RequestBody CommentDTO commentDTO) {
        Book book = bookRepository.getById(bookId);
        Comment comment = new Comment(commentDTO.comment(), book);

        commentRepository.save(comment);
    }
    @GetMapping
    public List<Comment> getComments(@PathVariable Long bookId) {

        return bookRepository.findById(bookId).get().getComments();
    }
}
