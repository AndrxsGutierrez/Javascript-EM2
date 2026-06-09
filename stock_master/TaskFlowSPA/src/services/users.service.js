const endpointUsers = "http://localhost:3000/users"

// json-server no tiene endpoint de login real: traemos todos los usuarios y buscamos en memoria.
// En producción esto NO se haría (expondría contraseñas); aquí es solo para practicar.
export async function loginUser(email, password) {
    const response = await fetch(endpointUsers)
    if (!response.ok) {
        throw new Error('No se pudo conectar con el servidor de usuarios')
    }

    const users = await response.json()
    const user = users.find(u => u.email === email && u.password === password)
    return user ?? null // ?? null convierte undefined en null para unificar el "no encontrado"
}

export async function createUser(userCreate) {
    const usersResponse = await fetch(endpointUsers)
    if (!usersResponse.ok) {
        throw new Error('No se pudo conectar con el servidor de usuarios')
    }

    const users = await usersResponse.json()
    const userExists = users.some(u => u.email === userCreate.email)

    if (userExists) {
        return null // devolvemos null en vez de lanzar error para manejarlo en la vista con un mensaje amigable
    }

    return await create(userCreate)
}

export async function create(usuario) {
    const response = await fetch(endpointUsers, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    if (!response.ok) {
        throw new Error("Error al crear el usuario");
    }

    return response.json();
}

export async function getUsers() {
    const response = await fetch(endpointUsers);
    if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
    }
    return response.json();
}

// json-server permite filtrar: /users?email=x devuelve un array (aunque sea un solo resultado).
export async function getUserByEmail(email) {
    const response = await fetch(`${endpointUsers}?email=${email}`);
    if (!response.ok) {
        throw new Error("Error al obtener el usuario");
    }
    return response.json();
}

export async function updateUser(id, user) {
    const response = await fetch(`${endpointUsers}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
    }

    return response.json();
}

export async function deleteUser(id) {
    const response = await fetch(`${endpointUsers}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Error al eliminar el usuario");
    }

    return response.json();
}
