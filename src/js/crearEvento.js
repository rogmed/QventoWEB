// Obtiene tempToken de las cookies
const tokenData = JSON.parse(atob(document.cookie.split(".")[1]));
const tempToken = tokenData.tempToken;

const request = new XMLHttpRequest();

var formulario = document.getElementById('formulario');

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

    /*const terminos = document.getElementById('terminos');
    if(campos.createdBy && campos.title && campos.dateOfQvento && campos.status && campos.description && campos.location && terminos.checked ){
        formulario.reset();

        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);

        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }*/

    var datos = new FormData(formulario);

    const title = datos.get('title');

    request.open('POST', 'https://qvento-api.azurewebsites.net/api/qventos/' + tempToken);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    request.send(JSON.stringify(formJson(e)));

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            alert("Evento " + title + " creado!")
            document.getElementById("formulario").reset();
        }
    }
})

function formJson(event) {
    const qventoDto = {};
    const myFormData = new FormData(event.target);
    myFormData.forEach((value, key) => (qventoDto[key] = value));

    return qventoDto;
}
