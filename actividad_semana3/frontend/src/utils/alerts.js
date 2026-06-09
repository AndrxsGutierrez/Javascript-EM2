import Swal from 'sweetalert2'

export function credencialError(text) {
    Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: "#1f2937", 
    color: "#fff",         
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
    
    }).fire({
        icon: "error",
        title: text
    });
}

export function credencialSuccess(text) {
    Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: "#1f2937", 
    color: "#fff",         
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
    background: "#1f2937", 
    color: "#fff",         
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
    
    }).fire({
        icon: "warning",
        title: text
    });
}
