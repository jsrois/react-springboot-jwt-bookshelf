export class CredentialsManager {
    updateToken(token) {
        localStorage.setItem("token", token)
    }

    getToken() {
        return localStorage.getItem("token");
    }

    deleteCredentials() {
        localStorage.clear()
    }
}