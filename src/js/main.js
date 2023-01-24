import { Cookie } from './cookie.js';
import { Navbar } from './navbar.js';

// Obtiene datos de las cookies
const cookie = new Cookie();
const token = JSON.parse(cookie.readCookie("token"));

// Cargar navbar con email de usuario
const navbar = new Navbar();
navbar.load(token);

// Lista de eventos
let events;

// Pide datos de Eventos al servidor y llena la tabla
window.addEventListener("load", function () {
    if (token == null) {
        window.location.href = "index.html";
    }
    listEventos();
});

const listEventos = async () => {
    const response = await fetch("https://qvento-api.azurewebsites.net/api/qventos/relevant/" + token.tempToken);
    const result = await response.json();

    events = toList(result);

    if (events.length === 0) {
        const message = "No tienes eventos. Haz click en Crear Evento para empezar.";
        document.getElementById("table-caption").innerHTML = message;
    } else {
        fillTable(events);
    }

    addListenerToClass("qvento-row");
};

// Extraer eventos a lista
function toList(result) {
    let list = [];
    result.forEach((evento, index) => {
        list[index] = evento;
    });

    return list;
}

// Llenar tabla html
function fillTable(events) {
    let tableBody = ``;
    events.forEach((evento, index) => {

        const dateTime = evento.DateOfQvento.split("T");
        const date = dateTime[0].split("-");
        const displayDate = date[2] + "/" + date[1] + "/" + date[0]
        const displayTime = dateTime[1].slice(0, 5);

        tableBody += `<tr class="qvento-row" data-qventoid="${evento.QventoId}">
        <td>${evento.CreatedByNavigation.Name}</td>
        <td>${evento.Title}</td>
        <td>${evento.Location}</td>
        <td type="date">${displayDate}</td>
        <td type="time">${displayTime}</td>
        </tr>`;
    });

    document.getElementById("my-qventos").innerHTML = tableBody;
}


// Al hacer click sobre un Evento guarda su ID en una cookie y navega a la
// página para ver detalles / modificarlo
function qventoDetails(qventoId) {
    cookie.createCookie("qventoId", qventoId, 1);
    window.location.href = "details-event.html";
}

// Ordena por fechas
function datesSorter(a, b) {
    if (new Date(a) < new Date(b)) return 1;
    if (new Date(a) > new Date(b)) return -1;
    return 0;
}

// Agrega un listener para todos los elementos de una clase
function addListenerToClass(classname) {
    var elements = document.getElementsByClassName(classname);

    for (var i = 0; i < elements.length; i++) {
        const qventoId = elements[i].getAttribute("data-qventoid");
        elements[i].addEventListener("click", function () { qventoDetails(qventoId) });
    }
}
