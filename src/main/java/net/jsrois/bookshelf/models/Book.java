package net.jsrois.bookshelf.models;


import javax.persistence.*;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;
    private ReadStatus readStatus;

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
}
