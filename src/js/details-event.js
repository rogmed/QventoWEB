import { Cookie } from './cookie.js';
import { Navbar } from './navbar.js';

// Variables
let qvento;

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
const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
const successModal = new bootstrap.Modal(document.getElementById('successModal'));

// Muestra modal de confirmación para borrar evento
document.getElementById("delete-button").onclick = function () { showDeleteModal() };

function showDeleteModal() {
    deleteModal.show();
}

// Muestra modal de confirmación para borrar evento
document.getElementById("confirm-delete").onclick = function () { deleteEvent() };

function deleteEvent() {
    const request = new XMLHttpRequest();
    request.open('DELETE', 'https://qvento-api.azurewebsites.net/api/qventos/' + qventoId);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.send();

    // Cuando la peticion cambie de estado se comprueba si está en 4 (DONE)
    // y si ha recibido un 200 (OK) del servidor.
    request.onreadystatechange = function () {

        if (request.readyState == 4 && request.status != 200) {
            $("#Modal .modal-body").text('Ha ocurrido un error');
            modal.show();
        }

        if (request.readyState == 4 && request.status == 200) {
            // Muestra mensaje de éxito y vuelve a página para visualizar evento(s)
            $("#successModal .modal-body").text('Evento eliminado');
            successModal.show();
        }
    }
}

// Carga el evento
window.addEventListener("load", function () {
    getQvento();
});

// Hace GET a la API y rellena los campos
const getQvento = async () => {
    const response = await fetch("https://qvento-api.azurewebsites.net/api/qventos/" + qventoId);
    qvento = await response.json();

    let invitations = qvento.Invitations;

    fillDetailsTable(qvento);
    fillInvitationsTable(invitations);
};

const weekdays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

// Llenar tabla con detalles de evento
function fillDetailsTable(qvento) {

    const date = new Date(qvento.DateOfQvento);
    const dateLong = weekdays[date.getDay()] + ', ' + date.getDate() + ' de '
        + months[date.getMonth()] + ' de ' + date.getFullYear();
    const time = new Date(qvento.DateOfQvento).toLocaleTimeString("es-Es").slice(0, -3);

    const tableBody = `
        <tr class="qvento-row" data-qventoid="${qvento.QventoId}">
            <td>Título:</td>
            <td colspan="2">${qvento.Title}</td>
        </tr>
        <tr>
            <td>Creado por:</td>
            <td colspan="2">${qvento.CreatedByNavigation.Name}</td>
        </tr>
        <tr>
            <td>Fecha:</td>
            <td colspan="2">${dateLong}</td>
        </tr>
        <tr>
            <td>Hora:</td>
            <td colspan="2">${time}</td>
        </tr>
        <tr>
            <td>Localización:</td>
            <td colspan="2">${qvento.Location}</td>
        </tr>
        <tr>
            <td>Descripción:</td>
            <td colspan="2">${qvento.Description}</td>
        </tr>
        `;
 
    document.getElementById("my-qventos").innerHTML = tableBody;
}

// Llenar tabla con invitaciones
function fillInvitationsTable(invitations) {

    let tableBody = ``;

    invitations.forEach(invitation => {
        tableBody += `
            <tr>
                <td>${invitation.User.Name + " " + invitation.User.LastName}</td>
                <td>${invitation.User.Email}</td>
            </tr>`;

        console.log(invitation.User.Name + " " + invitation.User.LastName);
    });


    document.getElementById("invitations").innerHTML = tableBody;
}

// Invitaciones
document.getElementById("invitation-button").onclick = function () { sendInvitation() };

function sendInvitation() {
    console.log("Enviar invitacion")
    let email = document.getElementById("email").value;
    let dto = JSON.stringify({ qventoId: qventoId, email: email });
    console.log(dto);
    const request = new XMLHttpRequest();
    request.open('POST', 'https://qvento-api.azurewebsites.net/api/invitation/');
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.send(dto);
}