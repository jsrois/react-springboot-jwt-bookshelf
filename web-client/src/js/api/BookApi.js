
export class BookApi {
    getBooks() {
        return Promise.resolve([
            { title: "First book", author: "first author"},
            { title: "Second book", author: "second author"},
            { title: "Third book", author: "third author"},
            { title: "Fourth book", author: "fourth author"},
            { title: "Fifth book", author: "fifth author"},
            { title: "Sixth book", author: "sixth author"},
        ])
        // return fetch("/books").then(r => r.json())
    }
}