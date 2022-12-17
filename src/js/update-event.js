import { Cookie } from './cookie.js';
import { Navbar } from './navbar.js';

// Obtiene datos de las cookies
const cookie = new Cookie();
const token = JSON.parse(cookie.readCookie("token"));

// Cargar navbar con email de usuario
const navbar = new Navbar(cookie);
navbar.load(token);

//Id del Evento
const qventoId = cookie.readCookie("qventoId");

// Modal de bootstrap (alerta)
const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));

// Comienza peticion
const request = new XMLHttpRequest();

const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    // Muestra mensaje mientras espera respuesta
    $("#loginModal .modal-body").text('Esperando respuesta...');
    loginModal.show();

    const datos = new FormData(formulario);

    request.open('PUT', 'https://qvento-api.azurewebsites.net/api/qventos/' + qventoId);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.send(JSON.stringify(formJson(e)));

    // Cuando la peticion cambie de estado se comprueba si está en 4 (DONE)
    // y si ha recibido un 200 (OK) del servidor.
    request.onreadystatechange = function () {

        if (request.readyState == 4 && request.status != 200) {
            $("#loginModal .modal-body").text('Ha ocurrido un error');
        }

        if (request.readyState == 4 && request.status == 200) {
            // Abre la página que el servidor indica
            $("#loginModal .modal-body").text('Evento modificado con éxito');
        }
    }
})

function formJson(event) {
    const qventoDto = {};
    const myFormData = new FormData(event.target);
    let dateOfQvento = "";
    myFormData.forEach((value, key) => {
        if (key == 'DateOfQvento') {
            dateOfQvento += value;
        }

        if (key == 'Time') {
            dateOfQvento += "T" + value;
            qventoDto["DateOfQvento"] = dateOfQvento
        }

        if (key != 'Date' && key != 'Time') {
            qventoDto[key] = value
        }
    });
    return qventoDto;
}

// Hace GET a la API y rellena los campos
const listEventos = async () => {
    const response = await fetch("https://qvento-api.azurewebsites.net/api/qventos/" + qventoId);
    const qvento = await response.json();

    const { elements } = document.querySelector('form');

    for (const [key, value] of Object.entries(qvento)) {

        const field = elements.namedItem(key)
        console.log(key + ": " + value);
        if (key == 'DateOfQvento') {
            let date = value.split("T")[0];
            field && (field.value = date);
            let time = value.split("T")[1].slice(0, 5);
            elements.namedItem("Time").value = time;
        } else {
            field && (field.value = value)
        }

    }
};

window.addEventListener("load", function () {
    listEventos();
});
