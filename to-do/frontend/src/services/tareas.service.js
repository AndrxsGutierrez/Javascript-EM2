const endpoint = 'http://localhost:3000/todos';

// trae todas las tareas de la api
export async function obtenerTareas() {
  const response = await fetch(endpoint);
  // convierto la respuesta a json para poder usarla en js
  return await response.json();
}

// trae una sola tarea usando su id
export async function obtenerTareaPorId(id) {
  const response = await fetch(`${endpoint}/${id}`);
  // devuelvo la tarea ya convertida a json
  return await response.json();
}

// crea una tarea nueva en la api
export async function crearTarea(tarea) {
  const response = await fetch(endpoint, {
    // post sirve para guardar algo nuevo
    method: 'POST',
    headers: {
      // le digo que estoy mandando datos tipo json
      'Content-Type': 'application/json'
    },
    // convierto la tarea a texto json por que fetch no manda objetos directo
    body: JSON.stringify(tarea)
  });

  // regreso lo que respondio la api
  return await response.json();
}

// actualiza una tarea que ya existe
export async function actualizarTarea(id, tarea) {
  const response = await fetch(`${endpoint}/${id}`, {
    // patch cambia solo los datos que le mando
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    // mando la tarea con los nuevos datos
    body: JSON.stringify(tarea)
  });

  // devuelvo la tarea actualisada
  return await response.json();
}

// elimina una tarea usando su id
export async function eliminarTarea(id) {
  await fetch(`${endpoint}/${id}`, {
    // delete borra el registro en la api
    method: 'DELETE'
  });
}
