import { Cookie } from './cookie.js';
import { Navbar } from './navbar.js';

// Obtiene datos de las cookies
const cookie = new Cookie();
const token = JSON.parse(cookie.readCookie("token"));

// Cargar navbar con email de usuario
const navbar = new Navbar();
navbar.load(token);

// Modal de bootstrap (alerta)
const modal = new bootstrap.Modal(document.getElementById('Modal'));

const request = new XMLHttpRequest();

const form = document.getElementById('formulario');

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

    const datos = new FormData(formulario);

    const title = datos.get('title');

    request.open('POST', 'https://qvento-api.azurewebsites.net/api/qventos/' + token.tempToken);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    request.send(JSON.stringify(formJson(e)));

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 400) {
            $("#Modal .modal-body").text("Error. Faltan campos obligatorios.");
        }

        if (request.readyState == 4 && request.status == 200) {
            $("#Modal .modal-body").text("Evento " + title + " creado!");
            document.getElementById("formulario").reset();
        }
        modal.show();
    }
}

function formJson(event) {
    const qventoDto = {};
    const myFormData = new FormData(event.target);
    let dateOfQvento = "";
    myFormData.forEach((value, key) => {
        if (key == 'date') {
            dateOfQvento += value;
        }

        if (key == 'time') {
            dateOfQvento += "T" + value;
            qventoDto["dateOfQvento"] = dateOfQvento
        }

        if (key != 'date' && key != 'time') {
            qventoDto[key] = value
        }
    });
    return qventoDto;
}

// Comprueba si el formulario tiene los campos obligatorios y construye el
// mensaje relevante para devolverlo en un modal
function checkForm(e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
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
