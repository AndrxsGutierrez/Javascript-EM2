import {qs} from './../utils/dom.js';
import {fetchApi} from "../services/api.js"
const URL_LOCATION = 'https://rickandmortyapi.com/api/location';
import { navigateTo } from '../router/router.js';
import { authStore } from '../store/authStore.js';
import { alertWarning } from '../utils/alerts.js';

export function showLocations() {
return `
<header class="w-full sticky top-0 z-10 bg-slate-800 backdrop-blur-sm border-b border-lime-400/50">
    <div class="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
      <div class="flex-shrink-0">
        <img src="/public/logo.svg" alt="Logo" class="w-40 h-12   drop-shadow-[0_0_12px_rgba(132,204,22,0.75)]">
      </div>
      <h1 class="text-xl md:text-2xl font-bold text-white drop-shadow-lg text-center flex-1">
        Locations
      </h1>
      <div class="flex items-center gap-6">
        <nav class="flex items-center gap-6">
          <a href="/episodes" class="text-sm font-semibold text-slate-300 hover:text-lime-400 transition">Episodes</a>
          <a href="/characters" class="text-sm font-semibold text-slate-300 hover:text-lime-400 transition">Characters</a>
        </nav>
        <button id="LogoutBtn" class="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700">
          Logout
        </button>
      </div>
    </div>
  </header>

<div class="fixed inset-0 -z-10 bg-[url('/fondoImagen.png')] bg-cover bg-center bg-no-repeat"></div>
<section class="min-h-screen px-4 py-6">
<div class="mx-auto max-w-6xl">
    <div
    class="rounded-md border border-lime-400/30 bg-slate-900 p-3.5 text-white shadow-[0_0_25px_rgba(132,204,22,0.12)]"
    >
    <div class="flex gap-4">
        <button
        id="btnAnterior"
        class="rounded-md border border-sky-500 bg-none px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
        Atras
        </button>

        <p class="rounded-md border border-lime-300/40 bg-lime-300/90 px-3 py-2 text-sm font-bold text-slate-950">
        Pagina <span id="pagina">1</span> de 7
        </p>

        <button
        id="btnSiguiente"
        class="rounded-md border border-sky-500 bg-none px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
        Siguiente
        </button>
    </div>
    </div>

    <div
    id="locations-view"
    class="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
    ></div>
</div>
</section>
</main>
`;
}
function emptyState(message) {
    return `<p class="rounded-md border border-slate-800 bg-slate-900 p-4 text-slate-300">${message}</p>`;
}
export async function setupLocations() {
let numberPage = 1;
const btnAnterior = qs("#btnAnterior");
const btnSiguiente = qs("#btnSiguiente");
const currentPage = qs("#pagina");
const logout = qs('#LogoutBtn');
const endpoint = `https://rickandmortyapi.com/api/location/?page=${numberPage}`;


function actualizarPagina () {
currentPage.textContent = numberPage;
};

btnSiguiente.addEventListener("click", () => {
if (numberPage < 7) {
    numberPage += 1;
    cargarlocaciones();
    actualizarPagina();
}
});

btnAnterior.addEventListener("click", () => {
if (numberPage > 1) {
    numberPage -= 1;
    cargarlocaciones();
    actualizarPagina();
} else {
    alertWarning("Estas en la pagina 1, no puedes retroceder");
}
});
logout.addEventListener("click",()=>{
    alert("Cerrando sesión...");
    authStore.onLogout();
    navigateTo('/login');
});

const cargarlocaciones= async () => {
try {      
    const endpoint = `https://rickandmortyapi.com/api/location/?page=${numberPage}`;
    const respuesta = await fetch(endpoint);

    console.log(respuesta);
    // si la respuesta es correcta
    if (respuesta.status === 200) {
    const datos = await respuesta.json();
    console.log(datos);
    let personajes = "";
    datos.results.forEach((personaje) => {
    personajes += `
    <article class="portal-card group relative h-auto w-full overflow-hidden rounded-md border border-slate-800 bg-slate-900 transition-all duration-300 hover:-translate-y-3 hover:scale-[1.02] hover:border-lime-400 p-4 flex justify-between items-center gap-4">
  
  <!-- Contenedor de la Información (Izquierda) -->
  <div class="flex-1 min-w-0">
    <h2 class="text-xl font-bold text-white truncate">${personaje.name}</h2>
    
    <dl class="mt-4 flex flex-col w-full gap-2 text-sm text-slate-300">
      <div class="flex justify-between gap-4">
        <dt>Tipo</dt>
        <dd class="font-semibold text-slate-100 truncate">${personaje.type}</dd>
      </div>
      <div class="flex justify-between gap-4">
        <dt>Dimensión</dt>
        <dd class="font-semibold text-slate-100 truncate">${personaje.dimension}</dd>
      </div>
      <div class="flex justify-between gap-4">
        <dt>Residentes</dt>
        <dd class="font-semibold text-slate-100 truncate">${personaje.residents.length}</dd>
      </div>
    </dl>
  </div>

</article>`       
    
    ;
    });
    qs("#locations-view").innerHTML = personajes;
    } else if (respuesta.status === 401) {
    console.log("pusiste la llave mal");
    } else if (respuesta.status === 404) {
    console.log("no existe");
    } else {
    console.log("Hubo un error raro y no sabemos que paso");
    }
} catch (error) {
    console.log(error);
}
};
cargarlocaciones();

}