export class AuthApi {
    signIn(user, password) {
        return fetch("/auth/signin", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'username': user,
                'password': password
            })
        })
    }
}