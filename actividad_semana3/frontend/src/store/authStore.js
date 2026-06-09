export const authStore = {
    isLoged: false,
    user: null,

    onLogin(user) {
    this.user = user
    this.isLoged = true
    localStorage.setItem('user', JSON.stringify(user))
    },

    loadData() {
    const data = JSON.parse(localStorage.getItem('user'))
    if (data !== null) {
        this.isLoged = true
        this.user = data
        }
    },

    onLogout() {
    localStorage.removeItem('user')
    this.isLoged = false
    this.user = null
    }
}
