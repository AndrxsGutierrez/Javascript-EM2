import './style.css'
import { obtenerTareas, obtenerTareaPorId, crearTarea, actualizarTarea, eliminarTarea } from './services/tareas.service.js'
import { mostrarTareas } from './ui/renderTareas.js'

// aca agarro los elementos del html para poder usarlos en js
const form = document.getElementById("guardar");
const btnSave = document.getElementById("btn_guardar");
const inputTitle = document.getElementById("title");
const inputCompleted = document.getElementById("completed");
const tareasContainer = document.getElementById("tareas");

// esto guarda el id cuando voy a editar una tarea, si esta null es por que voy a crear
let editandoId = null;

// esto escucha cuando mando el formulario
form.addEventListener("submit", (e) => {
  // esto evita que la pagina se recargue sola
  e.preventDefault();

  // aqui creo el objeto con los datos que escribi en el form
  const newTask = {
    title: inputTitle.value.trim(),
    completed: inputCompleted.value === "true"
  }

  // si editandoId tiene algo entonces actualiza, si no crea una tarea nueva
  if (editandoId) {
    guardarCambiosTarea(editandoId, newTask)
  } else {
    agregarTarea(newTask)
  }
})

// cuando se limpia el formulario vuelve al modo de crear tarea normal
form.addEventListener("reset", () => {
  editandoId = null;
  btnSave.textContent = "Enviar"
})

// aca escucho los clicks de la tabla donde estan las tareas
tareasContainer.addEventListener("click", async (e) => {
  // si el click fue en el boton editar entonces busco el id de esa tarea
  if (e.target.closest(".btn_edit")) {
    const id = e.target.closest(".btn_edit").dataset.id
    await prepararEdicion(id)
  }

  // si el click fue en eliminar entonces borro esa tarea
  if (e.target.closest(".btn_delete")) {
    const id = e.target.closest(".btn_delete").dataset.id
    await borrarTarea(id)
  }
})

// esta funcion trae todas las tareas y las pinta en pantalla
async function traeDatos() {
  const responseData = await obtenerTareas();
  mostrarTareas(responseData);
}

// esta funcion agrega una tarea nueva
async function agregarTarea(tarea) {
  await crearTarea(tarea)
  // despues de crearla vuelvo a pedir los datos pa que se vea actualisado
  await traeDatos()
  // limpio el formulario
  form.reset()
}

// aqui se guardan los cambios cuando ya estaba editando una tarea
async function guardarCambiosTarea(id, tarea) {
  await actualizarTarea(id, tarea)
  // recargo las tareas para que salga el cambio en la tabla
  await traeDatos()
  // limpio el formulario y tambien quita el modo editar
  form.reset()
}

// esta funcion elimina una tarea por su id
async function borrarTarea(id) {
  await eliminarTarea(id)
  // vuelvo a pintar los datos sin la tarea que borre
  await traeDatos()
}

// esta funcion no actualiza, solo prepara el formulario para editar
async function prepararEdicion(id) {
  // busco la tarea exacta que quiero editar
  const tarea = await obtenerTareaPorId(id)

  // pongo los datos de esa tarea en los inputs
  inputTitle.value = tarea.title;
  inputCompleted.value = tarea.completed;

  // guardo el id para que cuando envie el form sepa que tiene que actualizar
  editandoId = id;
  btnSave.textContent = "Actualizar";
}

// apenas carga la pagina trae las tareas
traeDatos()

// boton para cambiar a modo oscuro, medio simple
const btn_dark = document.getElementById('dark_mode')

btn_dark.addEventListener('click', () => {
  // aqui busco el body y le cambio la clase
  const body = document.getElementById('body')
  body.classList.toggle("bg-black")
})
