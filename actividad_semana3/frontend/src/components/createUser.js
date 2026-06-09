import {qs} from './../utils/dom.js';
import {credencialError, credencialSuccess} from './../utils/alerts.js';
import {createUser} from './../services/authService.js';
import {authStore} from './../store/authStore.js';
import { navigateTo } from '../router/router.js';


export function createUserPage() {
    return  `
<main class="min-h-screen -[url('/fondoLogin.png')] bg-size-[100%_100%] bg-center bg-no-repeat flex items-center justify-center px-4 text-white ">
<video autoplay muted loop playsinline class="video-fondo fixed top-0 left-0 size-[100%_100%] object-cover -z-10 min-h-screen min-w-screen">
    <source src="/videoFondo.mp4" type="video/mp4"> 
</video>
    <section class="w-full max-w-md">
        <form id="form_register" class="portal-panel grid w-full grid-cols-1 gap-5 rounded-lg border border-cyan-400/40 bg-black/80 p-8 shadow-[0_0_50px_rgba(34,211,238,0.22)] backdrop-blur-sm">
            <div class="text-center">
                <span class="text-xs font-black uppercase tracking-widest text-lime-300">Registro de acceso</span>
                <h1 class="portal-title mt-1 text-3xl font-black text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.65)]">Rick and Morty</h1>
                <p class="mt-2 text-xs text-slate-400">Crea tu usuario para ingresar al laboratorio.</p>
            </div>

            <div class="grid gap-4 mt-2">
                <label class="grid gap-1.5 text-xs font-bold text-slate-300">
                    Usuario
                    <input
                        id="register_username"
                        type="text"
                        required
                        placeholder="User1234"
                        class="h-11 rounded-md border border-cyan-400/25 bg-slate-950/90 px-3 text-sm text-cyan-50 outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-300 focus:shadow-[0_0_10px_rgba(34,211,238,0.15)]"
                    />
                </label>

                <label class="grid gap-1.5 text-xs font-bold text-slate-300">
                    Contraseña
                    <input
                        id="register_password"
                        type="password"
                        required
                        placeholder="••••••••"
                        class="h-11 rounded-md border border-cyan-400/25 bg-slate-950/90 px-3 text-sm text-cyan-50 outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-300 focus:shadow-[0_0_10px_rgba(34,211,238,0.15)]"
                    />
                </label>

            </div>

            <button type="submit" class="pulse-glow mt-2 h-11 rounded-md bg-cyan-400 font-bold uppercase text-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.4)] transition-all hover:bg-cyan-300 hover:scale-[1.01] active:scale-[0.99]">
                Crear Usuario
            </button>
            <a id="btn_login" class="text-center mt-3 text-sm text-slate-400">
                    Ya tienes cuenta? <span class="font-bold text-cyan-300 hover:underline">Inicia sesión aquí</span>
                </a>
        </form>
    </section>
</main>
`
}

export function setupCreateUser () {
    const form = qs('#form_register')
    const btnLogin = qs('#btn_login')
    const video = qs('.video-fondo')

    video.playbackRate = 0.75

    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        const username = qs('#register_username').value.trim()
        const password = qs('#register_password').value.trim()
        
        if (!username || !password) {
            credencialError('Todos los campos son obligatorios')
            return
        }
        let user = null
        try {
            user = await createUser(username, password)
        } catch (error) {
            credencialError(error.message)
            return
        }

        if (!user) {
            credencialError('Ese usuario ya existe')
            return
        }
        credencialSuccess('Usuario creado exitosamente')

        authStore.onLogin(user)
        navigateTo('/characters')
    })

    
    btnLogin.addEventListener('click', () => {
        navigateTo('/login')
    })

}


