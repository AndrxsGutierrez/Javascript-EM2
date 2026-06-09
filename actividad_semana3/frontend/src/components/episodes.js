import { qs } from './../utils/dom.js';
import { authStore } from '../store/authStore.js';
import { navigateTo } from '../router/router.js';
import { alertWarning } from '../utils/alerts.js';

export function showEpisodes() {
  return `
  <header class="w-full sticky top-0 z-10 bg-slate-800 backdrop-blur-sm border-b border-lime-400/50">
    <div class="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
      <div class="flex-shrink-0">
        <img src="/public/logo.svg" alt="Logo" class="w-40 h-12 drop-shadow-[0_0_12px_rgba(132,204,22,0.75)]">
      </div>
      <h1 class="text-xl md:text-2xl font-bold text-white drop-shadow-lg text-center flex-1">
        Episodes
      </h1>
      <div class="flex items-center gap-6">
        <nav class="flex items-center gap-6">
          <a href="/characters" class="text-sm font-semibold text-slate-300 hover:text-lime-400 transition">Characters</a>
          <a href="/locations" class="text-sm font-semibold text-slate-300 hover:text-lime-400 transition">Locations</a>
        </nav>
        <button id="Logout_Btn" class="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700">
          Logout
        </button>
      </div>
    </div>
  </header>
  <video autoplay muted loop playsinline class="video-fondo fixed top-0 left-0 size-[100%_100%] object-cover -z-10 min-h-screen min-w-screen">
    <source src="/otrofondo.mp4" type="video/mp4"> </video>
    <section class="min-h-screen px-4 py-6">
      <div class="mx-auto max-w-6xl">
        <div id="barra_navegacion" class="rounded-md border border-lime-400/30 bg-slate-900 p-3.5 text-white shadow-[0_0_25px_rgba(132,204,22,0.12)]">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex gap-4 h-full">
              <button id="btnAnteriorEp" class="rounded-md border border-sky-500 h-9 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700">Atras</button>
              <p class="rounded-md border border-lime-300/40 bg-lime-300/90 h-9 px-3 py-2 text-sm font-bold text-slate-950">
                Pagina <span id="paginaEp">1</span> de 3
              </p>
              <button id="btnSiguienteEp" class="rounded-md border border-sky-500 h-9 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700">Siguiente</button>
            </div>
            <div class="flex gap-3 h-full">
              <label class="grid gap-1.5 text-xs font-semibold text-slate-300">
                <input id="seasonFilter" type="number" min="1" max="5" placeholder="Temporada" class="h-9 w-28 rounded-md border border-lime-400/25 bg-slate-950/90 px-3 text-xs text-lime-50 outline-none placeholder:text-slate-600 focus:border-lime-400">
              </label>
              <label class="grid gap-1.5 text-xs font-semibold text-slate-300">
                <input id="episodeFilter" type="number" min="1" placeholder="Capitulo" class="h-9 w-28 rounded-md border border-lime-400/25 bg-slate-950/90 px-3 text-xs text-lime-50 outline-none placeholder:text-slate-600 focus:border-lime-400">
              </label>
              <button id="btnBuscarEp" type="button" class="h-9 rounded-md bg-lime-400 px-4 text-xs font-bold uppercase text-slate-950 transition hover:bg-lime-300">
                Buscar
              </button>
              <button id="btnLimpiarEp" type="button" class="h-9 rounded-md border border-sky-500 px-4 text-xs font-semibold text-white transition hover:bg-sky-700">
                Limpiar
              </button>
            </div>
          </div>
        </div>
        <div id="episodios" class="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"></div>
      </div>
    </section>
  `;
}

export function setupEpisodes() {
  let numberPage = 1;
  const btnAnterior = qs("#btnAnteriorEp");
  const btnSiguiente = qs("#btnSiguienteEp");
  const currentPage = qs("#paginaEp");
  const logout = qs('#Logout_Btn');
  const seasonFilter = qs('#seasonFilter');
  const episodeFilter = qs('#episodeFilter');
  const btnBuscar = qs('#btnBuscarEp');
  const btnLimpiar = qs('#btnLimpiarEp');

  const buildEpisodeCode = () => {
    const season = seasonFilter.value.trim();
    const episode = episodeFilter.value.trim();

    if (!season && !episode) {
      return "";
    }

    const seasonCode = season ? `S${season.padStart(2, "0")}` : "";
    const episodeCode = episode ? `E${episode.padStart(2, "0")}` : "";
    return `${seasonCode}${episodeCode}`;
  };

  const actualizarPagina = () => {
    currentPage.textContent = numberPage;
  };

  const cargarEpisodios = async () => {
    try {
      const params = new URLSearchParams({ page: numberPage });
      const episodeCode = buildEpisodeCode();

      if (episodeCode) {
        params.set("episode", episodeCode);
      }

      const endpoint = `https://rickandmortyapi.com/api/episode?${params.toString()}`;
      const respuesta = await fetch(endpoint);

      if (respuesta.ok) {
        const datos = await respuesta.json();
        qs("#episodios").innerHTML = datos.results.map(ep => `
          <article class="portal-card bg-[url(/public/season1.webp)] bg-cover group relative h-64 w-full overflow-hidden rounded-md border border-slate-800 bg-slate-900 transition-all duration-300 hover:-translate-y-3 hover:scale-[1.02] hover:border-lime-400">
          
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-5 text-white">
              <h2 class="mt-2 text-lg font-black truncate drop-shadow-md">${ep.name}</h2>
              <p class="text-xs text-slate-300">${ep.episode} <span class="mx-1">|</span> ${ep.air_date}</p>
              <button type="button" class="mt-2 text-[11px] text-slate-400 leading-relaxed">Personajes: ${ep.characters.length}</button>
            </div>
          </article>
        `).join("");
      } else if (respuesta.status === 404) {
        qs("#episodios").innerHTML = `
          <p class="col-span-full rounded-md border border-lime-400/30 bg-slate-900 p-4 text-center text-sm text-slate-300">
            No se encontraron episodios para ese filtro.
          </p>
        `;
      } else {
        console.error("Error cargando episodios");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cambiarPagina = async (nuevaPagina) => {
    numberPage = nuevaPagina;
    await cargarEpisodios();
    actualizarPagina();
  };

  cambiarPagina(numberPage);

  btnSiguiente.addEventListener("click", () => {
    if (numberPage < 3) cambiarPagina(numberPage + 1);
  });

  btnAnterior.addEventListener("click", () => {
    if (numberPage > 1) cambiarPagina(numberPage - 1);
    else alertWarning("Estas en la pagina 1, no puedes retroceder");
  });

  btnBuscar.addEventListener("click", () => {
    cambiarPagina(1);
  });

  btnLimpiar.addEventListener("click", () => {
    seasonFilter.value = "";
    episodeFilter.value = "";
    cambiarPagina(1);
  });

  logout.addEventListener("click",()=>{
    authStore.onLogout();
    navigateTo('/login');
  })
  
}
