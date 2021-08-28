import {CredentialsManager} from "../session/CredentialsManager";

export class BookApi {
    getBooks() {
        return fetch("/books").then(r => r.json())
    }

    addBook(title, author, readStatus) {
        const token = new CredentialsManager().getToken()

        return fetch("/books", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                'title': title,
                'author': author,
                'readStatus': readStatus
            })
        })

    }

    deleteBook(id) {
        const token = new CredentialsManager().getToken()

        return fetch(`/books/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    }
}