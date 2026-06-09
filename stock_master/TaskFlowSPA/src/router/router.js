import { notFoundView, routes } from "./routes";
import { getSession } from "../services/auth.service";
import { alertError } from "../utils/alerts";

// pushState cambia la URL sin recargar; el navegador no dispara ningún evento solo,
// por eso llamamos renderRoute() manualmente después.
export function navigate(path) {
    window.history.pushState({}, "", path);
    renderRoute();
}

export function renderRoute() {
    const app = document.getElementById("app")
    if (!app) return

    // pathname no incluye query string (?id=...), así que /task-form y /task-form?id=1
    // comparten la misma entrada en el objeto routes.
    const currentPath = window.location.pathname
    const route = routes[currentPath] ?? { render: notFoundView }
    const session = getSession()

    // Guard: evita que un usuario logueado vuelva a ver /login o /register.
    // replaceState (no pushState) para no dejar la ruta bloqueada en el historial.
    if (route.redirectIfAuthenticated && session) {
        window.history.replaceState({}, "", "/dashboard")
        renderRoute() // se vuelve a llamar a sí misma con la nueva URL
        return
    }

    if (route.requiresAuth && !session) {
        window.history.replaceState({}, "", "/login")
        renderRoute()
        return
    }

    // allowedRoles es un array: el usuario necesita tener AL MENOS uno de esos roles.
    // session.roles?.includes evita error si roles no existe en la sesión guardada.
    if (route.allowedRoles && !route.allowedRoles.some(role => session.roles?.includes(role))) {
        window.history.replaceState({}, "", "/dashboard")
        alertError("No tienes permiso para acceder a esta página")
        renderRoute()
        return
    }

    // innerHTML destruye el DOM anterior; por eso setup() se ejecuta después
    // y vuelve a enlazar los event listeners de la vista nueva.
    app.innerHTML = route.render()

    if (route.setup) {
        route.setup()
    }
}

export function initRouter() {
    document.addEventListener("click", (e) => {
        // closest sube por el DOM: funciona aunque el click sea en un hijo del <a>.
        const link = e.target.closest("a")
        if (!link) return

        const href = link.getAttribute("href")

        // Solo interceptamos rutas internas (/dashboard). Links externos o archivos
        // (mailto:, https://, /archivo.pdf) siguen con su comportamiento normal.
        if (!href || !href.startsWith("/")) return

        e.preventDefault()
        navigate(href)
    })

    // popstate se dispara con botones atrás/adelante del navegador.
    window.addEventListener("popstate", renderRoute)

    renderRoute()
}
