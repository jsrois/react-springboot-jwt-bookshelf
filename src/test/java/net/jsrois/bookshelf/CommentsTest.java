package net.jsrois.bookshelf;

import net.jsrois.bookshelf.models.Book;
import net.jsrois.bookshelf.models.ReadStatus;
import net.jsrois.bookshelf.repositories.BookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class CommentsTest {

    @Autowired
    private MockMvc server;

    @Autowired
    private BookRepository bookRepository;

    private Long bookId;

    @BeforeEach
    void addSampleBook() {
        bookId = bookRepository.save(
                new Book(1L, "Persepolis", "Marjane Satrapi", ReadStatus.FINISHED)
        ).getId();
    }

    @Test
    @WithMockUser(username = "user", roles = {"MODERATOR"})
    public void addsACommentToABook() throws Exception {

        String commentText = "Es una obra que recomendaría a cualquier persona. Creo que todo el mundo, sin importar si ha leído previamente cómic o no, puede disfrutar de Persépolis, y aprender mucho de ella.";

        String url = "/books/" + bookId + "/comments";
        server.perform(
                        post(url)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{\"comment\":\"" + commentText + "\"}")
                )
                .andExpect(status().isOk());

        server.perform(get(url))
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].comment", equalTo(commentText)));

    }

}
