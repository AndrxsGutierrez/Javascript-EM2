// src/services/authService.js
const URL_USERS = 'http://localhost:3000/users'

export async function loginUser(username, password) {
    const response = await fetch(URL_USERS)
    if (!response.ok) {
        throw new Error('No se pudo conectar con el servidor de usuarios')
    }

    const users = await response.json()
    const user = users.find(u => u.user === username && u.password === password)
    return user ?? null
}

export async function createUser(username, password) {
    const usersResponse = await fetch(URL_USERS)
    if (!usersResponse.ok) {
        throw new Error('No se pudo conectar con el servidor de usuarios')
    }

    const users = await usersResponse.json()
    const userExists = users.some(u => u.user === username)

    if (userExists) {
        return null
    }

    const response = await fetch(URL_USERS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: username, password: password })
    })

    if (!response.ok) {
        throw new Error('No se pudo crear el usuario')
    }

    return await response.json()
}
