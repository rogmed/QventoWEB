//Id del Evento
const qventoId = 110;

// Modal de bootstrap (alerta)
const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));

// Obtiene token de la URL
const queryString = window.location.search;
const urlParameters = new URLSearchParams(queryString);
const tempToken = urlParameters.get('temptoken');

const request = new XMLHttpRequest();

const formulario = document.getElementById('formulario');

const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    createdBy: /^[a-zA-Z0-9\_\-]{3}$/, // Letras, numeros, guion y guion_bajo
    title: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    dateOfQvento: /^[a-zA-Z0-9\_\-]{10}$/, // Letras, numeros, guion y guion_bajo
    status: /^[a-zA-Z0-9\s]{1}$/,
    description: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    location: /^[a-zA-Z0-9\s]{4,16}$/, // Letras, numeros, guion y guion_bajo
}

const campos = {
    createdBy: false,
    title: false,
    dateOfQvento: false,
    status: false,
    description: false,
    location: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "createdBy":
            validarCampo(expresiones.createdBy, e.target, 'createdBy');
            break;
        case "title":
            validarCampo(expresiones.title, e.target, 'title');
            break;
        case "dateOfQvento":
            validarCampo(expresiones.dateOfQvento, e.target, 'dateOfQvento');
            break;
        case "status":
            validarCampo(expresiones.status, e.target, 'status');
            break;
        case "description":
            validarCampo(expresiones.description, e.target, 'description');
            break;
        case "location":
            validarCampo(expresiones.location, e.target, 'location');
            break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    // Muestra mensaje mientras espera respuesta
    $("#loginModal .modal-body").text('Esperando respuesta...');
    loginModal.show();

    const datos = new FormData(formulario);

    const title = datos.get('title');

    request.open('PUT', 'https://qvento-api.azurewebsites.net/api/qventos/' + qventoId);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    request.send(JSON.stringify(formJson(e)));

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            alert("Evento " + title + " creado!")
            document.getElementById("formulario").reset();
        }
    }

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
    myFormData.forEach((value, key) => (qventoDto[key] = value));

    return qventoDto;
}

// Hace GET a la API y rellena los campos
const listEventos = async () => {
    const response = await fetch("https://qvento-api.azurewebsites.net/api/qventos/" + qventoId);
    const qvento = await response.json();

    console.log(qvento);

    const { elements } = document.querySelector('form');

    for (const [key, value] of Object.entries(qvento)) {
        const field = elements.namedItem(key)

        if (key == 'dateOfQvento') {
            field && (field.value = value.split("T")[0]);
        } else {
            field && (field.value = value)
        }

    }
};

window.addEventListener("load", function () {
    listEventos();
});

// Close the modal
function closeDialog() {
    loginModal.hide();
}