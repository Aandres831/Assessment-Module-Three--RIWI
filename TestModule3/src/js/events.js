
const API_URL = "http://localhost:3000/events";
const appa = document.getElementById("appa");

let editandoId = null;

render();

function render() {
appa.innerHTML = `
<div id="events-datos" class="event">
<h1>Create Event</h1>
<form id="evento-form">
<div class="form-group">
<label>Name</label>
<input type="text" id="nombreEvento" required />
</div>
<div class="form-group">
<label>Description</label>
<textarea id="descripcion"></textarea>
</div>
<div class="form-group">
<label>Capacity</label>
<input type="number" id="invitados" required />
</div>
<div class="form-group">
<label>Date</label>
<input type="date" id="fecha" required />
</div>
<button type="submit">${editandoId ? "Actualizar" : "Agregar"} Evento</button>
${editandoId ? '<button type="button" id="cancelar">Cancelar</button>' : ""}
</form>
</div>




<h2 id="event-title">Events</h2>
<div id="eventos-list"></div>
`;

document.getElementById("evento-form").addEventListener("submit", handleFormSubmit);
if (editandoId) {
document.getElementById("cancelar").addEventListener("click", () => {
editandoId = null;
render();
});
}

cargarEventos();
}

async function handleFormSubmit(e) {
e.preventDefault();

const evento = {
nombreEvento: document.getElementById("nombreEvento").value,
fecha: document.getElementById("fecha").value,
invitados: Number(document.getElementById("invitados").value),
descripcion: document.getElementById("descripcion").value
};

if (editandoId) {
await fetch(`${API_URL}/${editandoId}`, {
method: "PUT",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(evento)
});
editandoId = null;
} else {
await fetch(API_URL, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(evento)
});
}

render();
}

async function cargarEventos() {
try {
const res = await fetch(API_URL);
const eventos = await res.json();

const lista = document.getElementById("eventos-list");
if (!eventos.length) {
lista.innerHTML = "<p>No hay eventos registrados.</p>";
return;
}

lista.innerHTML = eventos.map(ev => `
<div class="event-card">
<h3>${ev.nombreEvento}</h3>
<p>${ev.descripcion}</p>
<p><strong>Invitados:</strong> ${ev.invitados}</p>
<p><strong>Fecha:</strong> ${ev.fecha}</p>
<button onclick="editarEvento(${ev.id})">Editar</button>
<button onclick="eliminarEvento(${ev.id})">Eliminar</button>
</div>
`).join("");
} catch (error) {
console.error("Error cargando eventos:", error);
}
}

window.eliminarEvento = async function(nombreEvento) {
await fetch(`${API_URL}/${nombreEvento}`, { method: "DELETE" });
render();
};

window.editarEvento = async function(id) {
const res = await fetch(`${API_URL}/${id}`);
const evento = await res.json();

editandoId = id;
render();

// Prellenar campos
document.getElementById("nombreEvento").value = evento.nombreEvento;
document.getElementById("fecha").value = evento.fecha;
document.getElementById("invitados").value = evento.invitados;
document.getElementById("descripcion").value = evento.descripcion;
};
