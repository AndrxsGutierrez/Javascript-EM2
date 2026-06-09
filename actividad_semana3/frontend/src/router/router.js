import { qs } from "../utils/dom.js";
import { routes} from "./routes.js";
import { notFoundView, setupNotFoundVideo } from "./../components/notFoundView.js"
import { authStore } from "../store/authStore.js";

export function navigateTo(path) {
    window.history.pushState({}, "", path);
    renderRouter();
}

export function renderRouter () {
    const app = qs('#app')
    if(!app) {
        return
    }

    const currentPath = window.location.pathname
    let route = routes[currentPath] ?? {render: notFoundView, setup: setupNotFoundVideo}

    if (route.isAuthorized && !authStore.isLoged) {
        window.history.replaceState({}, "", "/login")
        route = routes["/login"]
    }
    
    
    const render = route.render ?? notFoundView
    app.innerHTML = render()

    if (route.setup) {
        route.setup()
    }
}

export function initRouter() {
    authStore.loadData()

    document.addEventListener('click', (e) => {
        const link = e.target.closest('a')

        if (!link) {
            return
        }
        const href = link.getAttribute('href')

        if (!href || !href.startsWith('/')) {
            return
        }

        e.preventDefault()
        navigateTo(href)
    })
    window.addEventListener("popstate", renderRouter)
    renderRouter()
}
