import {CredentialsManager} from "../session/CredentialsManager";

export class CommentApi {
    async createComment(bookId, comment) {
        const token = new CredentialsManager().getToken()
        await fetch(`/books/${bookId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ comment: comment })
        })
    }
}