import { Cookie } from './cookie.js';
const cookie = new Cookie();

// Formulario e-mail, password y boton
const form = document.getElementById('login')
const email = document.getElementById('InputEmail')
const password = document.getElementById('InputPassword')
const button = document.querySelector('#login-button');
updateButton();

form.addEventListener("change", updateButton);

// Desactiva botón de login si e-mail o password están vacíos
function updateButton() {
    if (email.value == "" || password.value == "") {
        button.disabled = true;
    } else {
        button.disabled = false;
    }
}

// Modals de bootstrap (alerta)
const waitModal = new bootstrap.Modal(document.getElementById('waitModal'));
const warningModal = new bootstrap.Modal(document.getElementById('warningModal'));

// Inicia nueva peticion
const request = new XMLHttpRequest();

// Listener para actuar cuando se haga click en 'submit'
form.addEventListener('submit', callbackFunction);

// Funcion principal
function callbackFunction(e) {
    e.preventDefault();
    // Muestra mensaje mientras espera respuesta
    $("#waitModal .modal-body").text('Esperando respuesta del servidor...');
    waitModal.show();

    // Abre la petici�n, elije formato JSON y env�a el JSON en forma de string
    request.open('POST', 'https://qvento-api.azurewebsites.net/api/login');
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.send(JSON.stringify(formJson(e)));

    // Cuando la peticion cambie de estado se comprueba si est� en 4 (DONE)
    // y si ha recibido un 200 (OK) del servidor.
    request.onreadystatechange = function () {

        if (request.readyState === 4) {
            waitModal.hide();

            if (request.status === 401) {
                $("#warningModal .modal-body").text('Contraseña incorrecta '
                    + 'para ' + email.value);
                warningModal.show();
            }

            if (request.status === 404) {
                $("#warningModal .modal-body").text('404 Conexi�n fallida.');
                warningModal.show();
            }

            if (request.status === 422) {
                $("#warningModal .modal-body").text('No existe usuario con el email '
                    + email.value);
                warningModal.show();
            }

            if (request.status === 200) {
                // Obtiene token con informacion del email y userId
                const token = JSON.parse(atob(request.response.split(".")[1]));
                cookie.createCookie("token", JSON.stringify(token));

                // Navega a pagina principal
                window.location.href = "main.html";
            }
        }
    }
};

// Coge todos los campos de <form> y crea un JSON con ellos
function formJson(event) {
    const credentialsDto = {};
    const myFormData = new FormData(event.target);
    myFormData.forEach((value, key) => (credentialsDto[key] = value));

    return credentialsDto;
}
