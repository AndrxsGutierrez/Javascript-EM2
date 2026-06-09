
export const notFoundView = () => `
    <main class="relative isolate min-h-screen bg-black bg-size-[100%_100%] bg-center bg-no-repeat flex items-center justify-center px-4 text-white overflow-hidden">
    <video id="notFoundVideo" autoplay muted playsinline class="fondo-home fixed top-0 left-0 z-0 size-[100%_100%] object-cover min-h-screen min-w-screen">
    <source src="/fondohome.mp4" type="video/mp4"> </video>
        <section class="relative z-10 grid gap-4 text-center">
            <h1 class="text-3xl font-black text-purple-950">404</h1>
            <p class="text-purple-950 text-2xl font-bold">La ruta que buscas no existe.</p>
            <a href="/characters" class="rounded-md bg-lime-400 px-4 py-2 font-bold uppercase text-slate-950">
                Volver
            </a>
        </section>
    </main>
`;

export function setupNotFoundVideo() {
    const video = document.querySelector('#notFoundVideo');

    if (!video) {
        return;
    }

    const loopStart = 0.05;
    const skipFinalSeconds = 0.8;

    video.addEventListener('timeupdate', () => {
        if (!video.duration || video.currentTime < video.duration - skipFinalSeconds) {
            return;
        }

        video.currentTime = loopStart;
        video.play();
    });

    video.addEventListener('loadedmetadata', () => {
        video.playbackRate = 0.4;
    });
}
