export function renderProfile() {
    return `
    <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a class="text-xl font-black text-blue-900" href="/">TaskFlowSPA</a>
        <nav class="hidden gap-3 md:flex">
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/dashboard">Dashboard</a>
          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/tasks">Tareas</a>
          <a class="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white" href="/profile">Perfil</a>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-6 py-10">
      <section class="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <aside class="rounded-[2rem] bg-blue-600 p-8 text-white shadow-xl shadow-blue-100">
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Cuenta</p>
          <h1 class="mt-3 text-4xl font-black tracking-tight">Mi perfil</h1>
          <p class="mt-4 text-blue-50">El usuario puede actualizar sus datos personales y gestionar su propia cuenta dentro del sistema.</p>
        </aside>

        <section class="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-blue-50">
          <form class="grid gap-5">
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="name">Nombre</label>
              <input id="name" type="text" required class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="lastname">Apellido</label>
              <input id="lastname" type="text" required class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="profile-email">Correo</label>
              <input id="profile-email" type="email" required class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="password-new">Nueva contrasena</label>
              <input id="password-new" type="password" placeholder="Actualiza tu contrasena" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
            </div>
            <div class="flex flex-col gap-3 pt-2 sm:flex-row">
              <button type="submit" class="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500">Guardar cambios</button>
              <button id="btnDeleteAccount" type="button" class="inline-flex items-center justify-center rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50">Eliminar mi cuenta</button>
            </div>
          </form>
        </section>
      </section>
    </main>
    `
}

import { clearSession, getSession, saveSesion } from "../../services/auth.service"
import { deleteUser, updateUser } from "../../services/users.service"
import { alertConfirm, alertError, alertSuccess } from "../../utils/alerts"
import { navigate } from "../../router/router"

export function setupProfile() {
    const form = document.querySelector("form")
    const name = document.getElementById("name")
    const lastname = document.getElementById("lastname")
    const email = document.getElementById("profile-email")
    const password = document.getElementById("password-new")
    const btnDeleteAccount = document.getElementById("btnDeleteAccount")
    const session = getSession()

    if (session) {
        name.value = session.nombre ?? ""
        lastname.value = session.apellido ?? ""
        email.value = session.email ?? ""
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault()

        const userData = {
            nombre: name.value.trim(),
            apellido: lastname.value.trim(),
            email: email.value.trim(),
        }

        // Solo enviamos password si el usuario escribió una nueva; así no sobreescribimos con vacío.
        if (password.value.trim()) {
            userData.password = password.value.trim()
        }

        try {
            const user = await updateUser(session.id, userData)
            // Actualizar localStorage para que el resto de la app vea los datos nuevos sin re-login.
            saveSesion(user)
            alertSuccess("Perfil actualizado exitosamente")
        } catch (error) {
            alertError("No se pudo actualizar el perfil")
        }
    })

    btnDeleteAccount.addEventListener("click", async () => {
        const result = await alertConfirm()

        if (!result.isConfirmed) {
            return
        }

        try {
            await deleteUser(session.id)
            // Borrar en API y limpiar localStorage para que los guards redirijan al login.
            clearSession()
            alertSuccess("Cuenta eliminada exitosamente")
            navigate("/login")
        } catch (error) {
            alertError("No se pudo eliminar la cuenta")
        }
    })
}

