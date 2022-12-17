import { Cookie } from './cookie.js';
import { Navbar } from './navbar.js';

// Obtiene datos de las cookies
const cookie = new Cookie();
const token = JSON.parse(cookie.readCookie("token"));

// Cargar navbar con email de usuario
const navbar = new Navbar();
navbar.load(token);

const request = new XMLHttpRequest();

const formulario = document.getElementById('formulario');

const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    title: /^[a-zA-Z0-9À-ÿ\s]{3,50}$/, // Alfanumérico (3 a 50 caracteres)
    description: /^.{0,255}$/,
    location: /^.{0,255}$/
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
        case "title":
            validarCampo(expresiones.title, e.target, 'title');
            break;
        case "dateOfQvento":
            validarCampo(expresiones.dateOfQvento, e.target, 'dateOfQvento');
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

    const datos = new FormData(formulario);

    const title = datos.get('title');

    request.open('POST', 'https://qvento-api.azurewebsites.net/api/qventos/' + token.tempToken);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    request.send(JSON.stringify(formJson(e)));

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 400) {
            alert("Error. Faltan campos obligatorios.")
        }

        if (request.readyState == 4 && request.status == 200) {
            alert("Evento " + title + " creado!")
            document.getElementById("formulario").reset();
        }
    }
})

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
