export function renderDashboard() {
    return `
    <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a class="text-xl font-black text-blue-900" href="/">TaskFlowSPA</a>
        <nav class="hidden gap-3 md:flex">
          <a class="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white" href="/dashboard">Dashboard</a>
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/tasks">Tareas</a>
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/profile">Perfil</a>
          <a id="linkAdmin" class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/admin">Admin</a>
          <a id="btnLogout" class="rounded-full px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50" href="/login">Logout</a>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-6 py-10">
      <section class="rounded-[2rem] bg-blue-600 px-8 py-10 text-white shadow-xl shadow-blue-100">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Dashboard principal</p>
        <h1 id="welcome" class="mt-3 text-4xl font-black tracking-tight">Bienvenida.</h1>
        <p class="mt-4 max-w-2xl text-blue-50">Resumen general del trabajo del usuario, accesos rapidos y estado actual de productividad.</p>
      </section>

      <section class="mt-8 grid gap-4 md:grid-cols-3">
        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <p class="text-sm text-slate-500">Tareas activas</p>
          <p id="stat-activas" class="mt-3 text-4xl font-black text-blue-700">0</p>
        </article>
        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <p class="text-sm text-slate-500">Completadas</p>
          <p id="stat-completadas" class="mt-3 text-4xl font-black text-blue-700">0</p>
        </article>
        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <p class="text-sm text-slate-500">Pendientes hoy</p>
          <p id="stat-hoy" class="mt-3 text-4xl font-black text-blue-700">0</p>
        </article>
      </section>

      <section class="mt-8">
        <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-slate-900">Accesos rapidos</h2>
            <a class="text-sm font-semibold text-blue-700 hover:text-blue-600" href="/tasks">Ver tareas</a>
          </div>
          <div class="mt-6 grid gap-4 sm:grid-cols-2">
            <a class="rounded-3xl bg-blue-50 p-5 hover:bg-blue-100" href="/task-form">
              <p class="text-sm font-semibold text-blue-600">Crear</p>
              <h3 class="mt-2 text-lg font-bold text-slate-900">Nueva tarea</h3>
            </a>
            <a class="rounded-3xl bg-blue-50 p-5 hover:bg-blue-100" href="/profile">
              <p class="text-sm font-semibold text-blue-600">Cuenta</p>
              <h3 class="mt-2 text-lg font-bold text-slate-900">Editar perfil</h3>
            </a>
          </div>
        </article>
      </section>
    </main>
    `
}

import { clearSession, getSession } from "../../services/auth.service"
import { getTasksForSession } from "../../services/tasks.service"
import { alertSuccess } from "../../utils/alerts"
import { navigate } from "../../router/router"

export async function setupDashboard() {
    const session = getSession()

    if (session) {
        document.getElementById("welcome").textContent = `Bienvenida, ${session.nombre}.`
    }

    // Ocultar el link no es seguridad real (el guard del router bloquea /admin),
    // pero mejora la UX para que el user no vea opciones que no puede usar.
    if (!session?.roles?.includes("ADMIN")) {
        document.getElementById("linkAdmin")?.remove()
    }

    const btnLogout = document.getElementById("btnLogout")
    btnLogout.addEventListener("click", (e) => {
        e.preventDefault()
        clearSession()
        alertSuccess("Sesion cerrada exitosamente")
        navigate("/login")
    })

    try {
        const tasks = await getTasksForSession(session)
        // toISOString() devuelve UTC; para fechas locales estrictas habría que ajustar zona horaria.
        const hoy = new Date().toISOString().split("T")[0]

        document.getElementById("stat-activas").textContent =
            tasks.filter((t) => t.status !== "Completada").length

        document.getElementById("stat-completadas").textContent =
            tasks.filter((t) => t.status === "Completada").length

        document.getElementById("stat-hoy").textContent =
            tasks.filter((t) => t.dueDate === hoy && t.status !== "Completada").length
    } catch (error) {
        console.error(error)
    }
}