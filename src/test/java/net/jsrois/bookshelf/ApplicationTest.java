package net.jsrois.bookshelf;

import net.jsrois.bookshelf.models.Book;
import net.jsrois.bookshelf.repositories.BookRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static net.jsrois.bookshelf.models.ReadStatus.WISHLIST;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class ApplicationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BookRepository bookRepository;

    @AfterEach
    void cleanRepository() {
        bookRepository.deleteAll();
    }

    @Test
    public void returnsTheExistingBooks() throws Exception {

        List<Book> books = List.of(
                new Book(1L, "The Lord of the Rings", "J.R.R. Tolkien", WISHLIST),
                new Book(2L, "Moby Dick", "Herman Melville", WISHLIST)
        );

        bookRepository.saveAll(books);

        mockMvc.perform(get("/books"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
                .andExpect(jsonPath("$[0].title", equalTo("The Lord of the Rings")))
                .andExpect(jsonPath("$[0].author", equalTo("J.R.R. Tolkien")))
                .andExpect(jsonPath("$[0].readStatus", equalTo("WISHLIST")))
                .andExpect(jsonPath("$[1].title", equalTo("Moby Dick")))
                .andExpect(jsonPath("$[1].author", equalTo("Herman Melville")))
                .andExpect(jsonPath("$[1].readStatus", equalTo("WISHLIST")));
    }

    @Test
    @WithMockUser(username = "user", roles = {"MODERATOR"})
    void createsNewBooks() throws Exception {

        mockMvc.perform(post("/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"title\": \"Moby Dick\", \"author\": \"Herman Melville\",\"readStatus\":\"WISHLIST\" }")
        ).andExpect(status().is(200));

        var books = bookRepository.findAll();

        assertThat(books, contains(allOf(
                hasProperty("title", is("Moby Dick")),
                hasProperty("author", is("Herman Melville")),
                hasProperty("readStatus", is(WISHLIST))
        )));
    }

    @Test
    @WithMockUser(username = "user", roles = {"MODERATOR"})
    void deleteAnExistingBook() throws Exception {

        Book createdBook = bookRepository.save(new Book(1L, "Some book", "some author", WISHLIST));

        mockMvc.perform(delete("/books/" + createdBook.getId())).andExpect(status().is(200));

        var books = bookRepository.findAll();

        assertThat(books, hasSize(0));
    }

    @Test
    @WithMockUser(username = "user", roles = {"MODERATOR"})
    void editAnExistingBook() throws Exception {

        Book createdBook = bookRepository.save(new Book(1L, "Some book", "some author", WISHLIST));

        mockMvc.perform(put("/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"id\":\"" + createdBook.getId() + "\",\"title\": \"Moby Dick\", \"author\": \"Herman Melville\"}")
        ).andExpect(status().is(200));

        var books = bookRepository.findAll();

        assertThat(books, contains(allOf(
                hasProperty("title", is("Moby Dick")),
                hasProperty("author", is("Herman Melville"))
        )));
    }
}
