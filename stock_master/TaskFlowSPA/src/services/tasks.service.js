const endpointTasks = 'http://localhost:3000/tasks';

// json-server filtra con query params: ?userId=2 devuelve solo tareas de ese usuario.
// Sin userId trae el listado completo (lo usa el admin).
export async function getTasks(userId) {
    const url = userId ? `${endpointTasks}?userId=${userId}` : endpointTasks
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('No se pudo conectar con el servidor de tareas')
    }

    return response.json();
}

// Centraliza la regla: admin ve todo, user solo lo suyo.
// Así no repetimos el if en dashboard, tasks, etc.
export async function getTasksForSession(session) {
    if (session?.roles?.includes("ADMIN")) {
        return getTasks()
    }
    return getTasks(session.id)
}

// Si no has iniciado sesión no puedes gestionar la tarea. Si eres administrador, puedes gestionar cualquier tarea. Si eres un usuario normal, solo puedes gestionar las tareas que te pertenecen
export function canManageTask(task, session) {
    if (!session) return false
    if (session.roles?.includes("ADMIN")) return true
    return task.userId === session.id
}

export async function createTask(task) {
    const response = await fetch(endpointTasks, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });

    if (!response.ok) {
        throw new Error('No se pudo crear la tarea')
    }

    return response.json();
}

export async function deleteTask(id) {
    const response = await fetch(`${endpointTasks}/${id}`, {
        method: "DELETE"
    }); 

    if (!response.ok) {
        throw new Error('No se pudo eliminar la tarea')
    }

    return response.json();
}

export async function getTaskById(id) {
    const response = await fetch(`${endpointTasks}/${id}`);

    if (!response.ok) {
        throw new Error('No se pudo obtener la tarea')
    }

    return response.json();
}


export async function updateTask(id, task) {
    const response = await fetch(`${endpointTasks}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });

    if (!response.ok) {
        throw new Error('No se pudo actualizar la tarea')
    }

    return response.json();
}
