// Clave fija para no mezclar datos de esta app con otras en el mismo dominio.
const llave = 'taskflowspa_user';

// Guardamos el objeto usuario completo (incluye id y roles) para no volver a pedirlo al API en cada vista.
export function saveSesion(user) {
    localStorage.setItem(llave, JSON.stringify(user));
}

export function getSession() {
    const sesion = localStorage.getItem(llave);

    if (!sesion) {
        return null
    }
    // Si alguien editó manualmente localStorage, JSON.parse lanzaría error sin el try/catch.
    try {
        return JSON.parse(sesion)   
    } catch (error) {
        return null
    }
}

export function clearSession() {
    localStorage.removeItem(llave);
}
