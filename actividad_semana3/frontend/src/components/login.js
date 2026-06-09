import {qs} from './../utils/dom.js';
import {credencialError, credencialSuccess} from './../utils/alerts.js';
import {loginUser} from './../services/authService.js';
import {authStore} from './../store/authStore.js';
import { navigateTo } from '../router/router.js';


export function loginPage() {
    return `
<main class="min-h-screen -[url('')] bg-size-[100%_100%] bg-center bg-no-repeat flex items-center justify-center px-4 text-white ">
<video autoplay muted loop playsinline class="video-fondo fixed top-0 left-0 size-[100%_100%] object-cover -z-10 min-h-screen min-w-screen">
<source src="/videoFondo.mp4" type="video/mp4"> </video>
        <section class="w-full max-w-md">
            <form id="form_login" class="portal-panel grid w-full grid-cols-1 gap-5 rounded-lg border border-lime-400/40 bg-black/80 p-8 shadow-[0_0_50px_rgba(132,204,22,0.22)] backdrop-blur-sm">
                <div class="text-center">
                    <span class="text-xs font-black uppercase tracking-widest text-cyan-300">Acceso al laboratorio</span>
                    <h1 class="portal-title mt-1 text-3xl font-black text-lime-300 drop-shadow-[0_0_12px_rgba(132,204,22,0.65)]">Rick and Morty</h1>
                    <p class="mt-2 text-xs text-slate-400">Ingresa tus credenciales para autorizar tu ingreso.</p>
                </div>

                <div class="grid gap-4 mt-2">
                    <label class="grid gap-1.5 text-xs font-bold text-slate-300">
                        Usuario
                        <input
                            id="login_username"
                            type="text"
                            required
                            placeholder="User1234"
                            class="h-11 rounded-md border border-lime-400/25 bg-slate-950/90 px-3 text-sm text-lime-50 outline-none transition-colors placeholder:text-slate-600 focus:border-lime-300 focus:shadow-[0_0_10px_rgba(163,230,53,0.15)]"
                        />
                    </label>

                    <label class="grid gap-1.5 text-xs font-bold text-slate-300">
                        Contraseña
                        <input
                            id="login_password"
                            type="password"
                            required
                            placeholder="••••••••"
                            class="h-11 rounded-md border border-lime-400/25 bg-slate-950/90 px-3 text-sm text-lime-50 outline-none transition-colors placeholder:text-slate-600 focus:border-lime-300 focus:shadow-[0_0_10px_rgba(163,230,53,0.15)]"
                        />
                    </label>
                </div>

                <button type="submit" class="pulse-glow mt-2 h-11 rounded-md bg-lime-400 font-bold uppercase text-slate-950 shadow-[0_0_18px_rgba(132,204,22,0.4)] transition-all hover:bg-lime-300 hover:scale-[1.01] active:scale-[0.99]">
                    Iniciar Sesión
                </button>

                <a href="/register" class="text-center mt-3 text-sm text-slate-400">
                    Aún no tienes cuenta? <span class="font-bold text-lime-300 hover:underline">Regístrate aquí</span>
                </a>
            </form>
        </section>
    </main>
`
}

export function setupLogin() {
    const form = qs('#form_login')
    const video = qs('.video-fondo')

    video.playbackRate = 0.75

    form.addEventListener('submit', async (event) => {
        event.preventDefault()

        const username = qs('#login_username').value.trim()
        const password = qs('#login_password').value.trim()

        if (!username || !password) {
            credencialError('Todos los campos son obligatorios')
            return
        }

        let user = null
        try {
            user = await loginUser(username, password)
        } catch (error) {
            credencialError(error.message)
            return
        }

        if (!user) {
            credencialError('Usuario o contraseña incorrectos')
            return
        }
        
        credencialSuccess('Inicio de seccion exitoso')

        authStore.onLogin(user)
        navigateTo('/characters')
    })
}
