import { Cookie } from './cookie.js';
import { Navbar } from './navbar.js';

// Variables
let initialValues;
let currentValues;

// Obtiene datos de las cookies
const cookie = new Cookie();
const token = JSON.parse(cookie.readCookie("token"));

// Cargar navbar con email de usuario
const navbar = new Navbar(cookie);
navbar.load(token);

//Id del Evento
const qventoId = cookie.readCookie("qventoId");

// Modal de bootstrap (alerta)
const modal = new bootstrap.Modal(document.getElementById('Modal'));
const successModal = new bootstrap.Modal(document.getElementById('successModal'));
const waitModal = new bootstrap.Modal(document.getElementById('waitModal'));

// Comienza peticion
const request = new XMLHttpRequest();

const form = document.getElementById('formulario');

// Desactiva botón de Modificar si los campos no han variado
const button = document.querySelector('#submit-button');
button.disabled = true;

form.addEventListener('change', async (e) => {
    e.preventDefault();

    currentValues = await formJson(form);

    for (const [key, value] of Object.entries(currentValues)) {
        let compare;
        if (key == 'DateOfQvento') {
            compare = value.slice(0, -3);
        } else {
            compare = value.trim();
        }

        if (compare != initialValues[key]) {
            button.disabled = false;
            return;
        } else {
            button.disabled = true;
        }
    }
})

// Listener para actuar cuando se haga click en 'submit'
form.addEventListener('submit', callbackFunction);

function callbackFunction(e) {
    if (checkForm(e)) {
        sendRequest(e);
    }
}

// Acción botón
function sendRequest(e) {
    e.preventDefault();

    // Muestra mensaje mientras espera respuesta
    $("#waitModal .modal-body").text('Esperando respuesta...');
    waitModal.show();

    request.open('PUT', 'https://qvento-api.azurewebsites.net/api/qventos/' + qventoId);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.send(JSON.stringify(formJson(form)));

    // Cuando la peticion cambie de estado se comprueba si está en 4 (DONE)
    // y si ha recibido un 200 (OK) del servidor.
    request.onreadystatechange = function () {

        if (request.readyState == 4 && request.status != 200) {
            waitModal.hide();
            $("#Modal .modal-body").text('Ha ocurrido un error');
            modal.show();
        }

        if (request.readyState == 4 && request.status == 200) {
            waitModal.hide();
            // Muestra mensaje de éxito y vuelve a página para visualizar evento(s)
            $("#successModal .modal-body").text('Evento modificado con éxito');
            successModal.show();
            initialValues = currentValues;
        }
    }
}

function formJson(form) {
    const qventoDto = {};
    const myFormData = new FormData(form);

    myFormData.forEach((value, key) => {
        if (key == 'Time') {
            qventoDto["DateOfQvento"] += "T" + value + ":00";
        } else {
            qventoDto[key] = value.trim();
        }
    });
    return qventoDto;
}

// Hace GET a la API y rellena los campos
const getQvento = async () => {
    const response = await fetch("https://qvento-api.azurewebsites.net/api/qventos/" + qventoId);
    initialValues = await response.json();
    initialValues['DateOfQvento'] = initialValues['DateOfQvento'].slice(0, 17);

    const { elements } = document.querySelector('form');

    for (const [key, value] of Object.entries(initialValues)) {

        const field = elements.namedItem(key)
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
    getQvento();
});

// Comprueba si el formulario tiene los campos obligatorios y construye el
// mensaje relevante para devolverlo en un modal
function checkForm(e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const date = document.getElementById("dateOfQvento").value;
    const time = document.getElementById("time").value;

    let message;

    if (title === '' || date === '' || time === '') {
        message = "Por favor, rellene: ";

        if (title === '') {
            message += "\n - Título del evento";
        }

        if (date === '') {
            message += "\n - Fecha";
        }

        if (time === '') {
            message += "\n - Hora";
        }

        $("#Modal .modal-body").text(message);
        $('#Modal').modal('show');
        return false;

    } else {
        return true;
    }
}
