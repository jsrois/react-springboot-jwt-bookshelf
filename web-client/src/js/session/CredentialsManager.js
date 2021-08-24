export class CredentialsManager {
    updateToken(token) {
        localStorage.setItem("token", token)
    }
}