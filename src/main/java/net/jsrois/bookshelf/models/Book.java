package net.jsrois.bookshelf.models;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;
    private ReadStatus readStatus;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "book")
    private List<Comment> comments;

    public Book() {

    }

    public Book(Long id, String title, String author, ReadStatus readStatus) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.readStatus = readStatus;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public ReadStatus getReadStatus() {
        return readStatus;
    }

    public List<Comment> getComments() {
        return comments;
    }
}
