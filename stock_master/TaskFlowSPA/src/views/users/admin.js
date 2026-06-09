export function renderAdmin() {
    return `
    <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a class="text-xl font-black text-blue-900" href="/">TaskFlowSPA</a>
        <nav class="hidden gap-3 md:flex">
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/dashboard">Dashboard</a>
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/tasks">Tareas</a>
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/profile">Perfil</a>
          <a class="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white" href="/admin">Admin</a>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-7xl px-6 py-10">
      <section class="rounded-[2rem] bg-blue-600 px-8 py-10 text-white shadow-xl shadow-blue-100">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Rol administrador</p>
        <h1 class="mt-3 text-4xl font-black tracking-tight">Panel administrativo</h1>
        <p class="mt-4 max-w-2xl text-blue-50">Vista reservada para gestionar usuarios, roles, permisos y monitoreo general del sistema.</p>
      </section>

      <section class="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <h2 class="text-xl font-bold text-slate-900">Acciones rapidas</h2>
          <div class="mt-5 grid gap-4">
            <a class="rounded-2xl bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-700 hover:bg-blue-100" href="/admin">Gestionar usuarios</a>
            <a class="rounded-2xl bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-700 hover:bg-blue-100" href="/tasks">Ver todas las tareas</a>
            <a class="rounded-2xl bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-700 hover:bg-blue-100" href="/dashboard">Volver al dashboard</a>
          </div>
        </article>

        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-slate-900">Usuarios</h2>
          </div>
          <div id="users-list" class="mt-5 space-y-4"></div>
        </article>
      </section>
    </main>
    `
}

import { getUsers, updateUser } from "../../services/users.service"
import { alertError, alertSuccess } from "../../utils/alerts"

export async function setupAdmin() {
    const usersContainer = document.getElementById("users-list")
    const users = await getUsers()

    function showUsers() {
        usersContainer.innerHTML = ""

        users.forEach((user) => {
            // Tomamos el primer rol del array; en esta app cada usuario tiene uno solo.
            const role = user.roles?.[0] ?? "USER"

            usersContainer.innerHTML += `
            <div class="rounded-2xl bg-blue-50 p-4">
              <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p class="font-bold text-slate-900">${user.nombre} ${user.apellido}</p>
                  <p class="text-sm text-slate-500">${user.email}</p>
                </div>
                <div class="flex gap-2">
                  <select class="role-select rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold text-blue-700" data-id="${user.id}">
                    <option value="USER" ${role === "USER" ? "selected" : ""}>USER</option>
                    <option value="ADMIN" ${role === "ADMIN" ? "selected" : ""}>ADMIN</option>
                  </select>
                </div>
              </div>
            </div>`
        })
    }

    showUsers()

    // "change" en el <select> dispara al elegir otra opción, no al hacer click.
    usersContainer.addEventListener("change", async (e) => {
        if (!e.target.classList.contains("role-select")) {
            return
        }

        const id = e.target.dataset.id
        const newRole = e.target.value

        try {
            // json-server guarda roles como array; mantenemos ese formato al actualizar.
            await updateUser(id, { roles: [newRole] })
            alertSuccess("Rol actualizado exitosamente")
        } catch (error) {
            alertError("No se pudo actualizar el rol")
        }
    })
}