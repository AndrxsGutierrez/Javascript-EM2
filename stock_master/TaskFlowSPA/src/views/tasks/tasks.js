export function renderTasks() {
  return `
    <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a class="text-xl font-black text-blue-900" href="/src/views/home.html">TaskFlowSPA</a>
        <nav class="hidden gap-3 md:flex">
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/dashboard">Dashboard</a>
          <a class="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white" href="/tasks">Tareas</a>
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/profile">Perfil</a>
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/admin">Admin</a>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-6 py-10">
      <section class="flex flex-col gap-4 rounded-[2rem] bg-blue-600 px-8 py-10 text-white md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">CRUD de tareas</p>
          <h1 id="tasks-title" class="mt-3 text-4xl font-black tracking-tight">Mis tareas</h1>
          <p class="mt-4 max-w-2xl text-blue-50">Vista principal para listar, editar y eliminar las tareas del usuario autenticado.</p>
        </div>
        <a class="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50" href="/task-form">
          Crear tarea
        </a>
      </section>

      <section  id="tasks" class="mt-8 grid gap-4">
      </section>
    </main>
    `;
}

import { getTasksForSession, deleteTask, getTaskById, canManageTask } from "../../services/tasks.service.js";
import { getSession } from "../../services/auth.service.js";
import { alertError, alertSuccess, alertConfirm } from "../../utils/alerts.js";
import { navigate } from "../../router/router.js";

export async function setupTasks() {
  const session = getSession()
  const isAdmin = session?.roles?.includes("ADMIN")
  const tareas = await getTasksForSession(session);
  const tasksContainer = document.getElementById("tasks");

  if (isAdmin) {
    document.getElementById("tasks-title").textContent = "Todas las tareas"
  }

  function showTasks() {
    tasksContainer.innerHTML = "";
    // innerHTML += en un loop funciona pero re-renderiza el DOM en cada iteración;
    // para este tamaño de lista es aceptable y mantiene el código simple.
    tareas.forEach((tarea) => {
      tasksContainer.innerHTML += `
       <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">${tarea.status}</p>
              <h2 class="mt-2 text-2xl font-bold text-slate-900">${tarea.title}</h2>
              <p class="mt-3 max-w-2xl text-slate-600">${tarea.description}</p>
            </div>
            <div class="flex gap-3">
              <button class="btn_edit rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50" id="btnEdit" data-id="${tarea.id}" >Editar</button>
              <button class="btn_delete rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50" id="btnDelete" data-id="${tarea.id}">Eliminar</button>
            </div>
          </div>
        </article>`;
    });
  }

  showTasks();

  // Un solo listener en el contenedor (delegación de eventos) en vez de uno por cada botón.
  // Los botones se recrean al navegar, pero el contenedor #tasks persiste mientras dura setup.
  tasksContainer.addEventListener("click", async (e) => {

    if (e.target.closest(".btn_delete")) {
      const id = e.target.closest(".btn_delete").dataset.id;
      // Volvemos a pedir la tarea al API para validar permisos con datos actuales, no solo el id del DOM.
      const task = await getTaskById(id)

      if (!canManageTask(task, session)) {
        alertError("No tienes permiso para eliminar esta tarea")
        return
      }

      const result = await alertConfirm();
      if (result.isConfirmed) {
        await deleteTask(id);
        alertSuccess("Tarea eliminada correctamente");
        navigate("/tasks");
      }
    }

    if (e.target.closest(".btn_edit")) {
      const id = e.target.closest(".btn_edit").dataset.id;
      const task = await getTaskById(id)

      if (!canManageTask(task, session)) {
        alertError("No tienes permiso para editar esta tarea")
        return
      }

      navigate(`/task-form?id=${id}`);
    }
  })

  

}
