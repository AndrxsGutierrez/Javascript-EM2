import Swal from 'sweetalert2'

// mixin crea una instancia reutilizable con la misma config (toast arriba a la derecha).
export function alertError(text) {
    Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,        
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
    
    }).fire({
        icon: "error",
        title: text
    });
}

export function alertSuccess(text) {
    Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,         
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
    
    }).fire({
        icon: "success",
        title: text
    });
}
export function alertWarning(text) {
    Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,       
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
    
    }).fire({
        icon: "warning",
        title: text
    });
}

// La promesa resuelve con { isConfirmed: true/false } según el botón que pulse el usuario.
export async function alertConfirm() {
  return await Swal.fire({
    title: "¿Eliminar tarea?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#d33",
  });
}
