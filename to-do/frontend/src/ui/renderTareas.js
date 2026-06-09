// esta funcion se encarga de mostrar las tareas en la tabla
export function mostrarTareas(tareas) {
  const tareasContainer = document.getElementById("tareas");
  tareasContainer.innerHTML = "";
  
  tareas.forEach(tasks => {
    tareasContainer.innerHTML += `
          <tr  class="text-left">
              <!-- aca muestro el id de la tarea -->
              <td class="pl-4 h-12">${tasks.id}</td>
              <!-- aca va el titulo de la tarea -->
              <td class="pl-4 h-12">${tasks.title}</td>
              <!-- si completed es true sale completada, si no sale pendiente -->
              <td class="pl-4 h-12">${tasks.completed ? "Completada" : "Pendiente"}</td>
              <td class="flex gap-2 pl-4 h-12">
                <div class="w-full h-full flex gap-2 items-center">
                  <!-- boton para editar, el data-id guarda el id de esta tarea -->
                  <button
                    title="editar"
                    data-id="${tasks.id}"
                    class="btn_edit w-8 h-8 flex items-center justify-center text-yellow-800 bg-yellow-300 rounded-md
                    hover:bg-yellow-400  active:bg-yellow-500 transition cursor-pointer"
                  >
                    <span class="material-symbols-outlined">edit</span>
                  </button>
                  
                  <!-- boton para eliminar, tambien guarda el id -->
                  <button
                    title="eliminar"
                    data-id="${tasks.id}"
                    class="btn_delete w-8 h-8 flex items-center justify-center text-red-800 bg-red-300 rounded-md  hover:bg-red-400  active:bg-red-500 transition cursor-pointer"
                  >
                    <span class="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </td>
            </tr>
  `;
  })
}
