// Inicia nueva peticion
const request = new XMLHttpRequest();

// Selecciona el <form> con id 'login' para extraer datos
const form = document.getElementById('register');

// Modales de bootstrap (mensajes pop up)
let waitModal = new bootstrap.Modal(document.getElementById('waitModal'));
let warningModal = new bootstrap.Modal(document.getElementById('warningModal'));
let successModal = new bootstrap.Modal(document.getElementById('successModal'));

// Listener para actuar cuando se haga click en 'submit'
form.addEventListener('submit', callbackFunction);

// Boton Registrarse primero comprueba si el formulario es correcto para enviar
// i.e. si tiene los campos obligatorios y el password se ha confirmado
// luego envía le petición y da un mensaje dependiendo de la respuesta del
// servidor
function callbackFunction(e) {
    if (checkForm(e)) {
        sendRequest(e);
    }
}

// Llamada al servidor
function sendRequest(e) {
    // Muestra mensaje mientras comienza peticion y procesa respuesta
    $("#waitModal .modal-body").text('Esperando respuesta...');
    waitModal.show();

    request.open('POST', 'https://qvento-api.azurewebsites.net/api/user');
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    const dto = formJson(e);
    response = request.send(JSON.stringify(dto));

    // Cuando la peticion tenga un código de respuesta, muestra otro mensaje
    request.onreadystatechange = function () {

        if (request.readyState === 4) {
            waitModal.hide();

            if (request.status === 404) {
                $("#warningModal .modal-body").text('Conexion fallida.');
                warningModal.show();
            }

            if (request.status === 409) {
                $("#warningModal .modal-body").text(dto["email"] + " ya está en uso."
                    + "\nPor favor, utilice un e-mail distinto.");
                warningModal.show();
            }

            if (request.status === 422) {
                $("#warningModal .modal-body").text('Petición inválida (422)');
                warningModal.show();
            }

            if (request.status === 200) {
                $("#successModal .modal-body").text("Usuario registrado con éxito con "
                    + " email:\n" + dto["email"]);
                successModal.show();

                form.reset();
            }
        }
    }
};

// Comprueba si el formulario tiene los campos obligatorios y construye el
// mensaje relevante para devolverlo en un modal
function checkForm(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    let message;

    if (name === '' || lastName === '' || email === '' || password === '') {
        message = "Por favor, rellene: ";
        if (name === "") {
            message += "\n - Nombre";
        }
        if (lastName === "") {
            message += "\n - Apellidos";
        }
        if (email === "") {
            message += "\n - E-mail";
        }
        if (password === "") {
            message += "\n - Contraseña";
        }
        closeModals();
        $("#warningModal .modal-body").text(message);
        $('#warningModal').modal('show');
        return false;

    } else if (password != confirmPassword) {
        closeModals();
        $("#warningModal .modal-body").text(
            "La confirmación de la contraseña debe ser igual a la contraseña.");
        $('#warningModal').modal('show');

        return false;

    } else {
        return true;
    }
}

// Coge todos los campos de <form> y crea un JSON con ellos
function formJson(event) {
    const dto = {};
    const myFormData = new FormData(event.target);
    myFormData.forEach((value, key) => {
        if (key != "confirmPassword") {
            dto[key] = value;
        }
    });

    return dto;
}

// Cierra los modales que pueda haber abiertos
function closeModals() {
    waitModal.hide();
    warningModal.hide();
    successModal.hide();
}
