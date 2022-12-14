var email;
var message;

// Inicia nueva peticion
const request = new XMLHttpRequest();

// Selecciona el <form> con id 'login' para extraer datos
const form = document.getElementById('register');

// Modal de bootstrap (alerta)
const modal = new bootstrap.Modal(document.getElementById('modal'));

// Listener para actuar cuando se haga click en 'submit'
form.addEventListener('submit', callbackFunction);

// Funcion principal
function callbackFunction(e) {
	// Esto evita que la consola dek navegador se limpie inmediatamente
	e.preventDefault();

	// Muestra mensaje mientras espera respuesta
	$("#modal .modal-body").text('Esperando respuesta...');
	$('#modal').modal('show');

	// Abre la petici�n, elije formato JSON y env�a el JSON en forma de string
	request.open('POST', 'https://qvento-api.azurewebsites.net/api/user');
	request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	var dto = formJson(e);
	var response = request.send(JSON.stringify(dto));

	// Cuando la peticion cambie de estado se comprueba si est� en 4 (DONE)
	// y si ha recibido un 200 (OK) del servidor.
	request.onreadystatechange = function () {
		$('#modal').modal('show');

		if (request.status == 400) {
			var result = JSON.parse(response);
			$("#modal .modal-body").text(result);
		}

		if (request.status == 404) {
			$("#modal .modal-body").text('404 Conexion fallida.');
		}

		if (request.status == 409) {
			$("#modal .modal-body").text(dto["email"] + " ya está en uso. "
			+ "Por favor, utilice un e-mail distinto.");
		}

		if (request.readyState == 4 && request.status == 422) {
			$("#modal .modal-body").text('Http 422');
		}

		if (request.readyState == 4 && request.status == 200) {
			$("#modal .modal-body").text("Usuario registrado con éxito con "
				+ " email: " + dto["email"]);

			$("modal .modal.footer").text('Click para volver');
			//window.location.href = "web.html";
		}
	}
};

// Comprueba si el formulario tiene los campos obligatorios
function checkForm() {
	var name = document.getElementById("name").value;
	var lastName = document.getElementById("last-name").value;
	email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	var confirmPassword = document.getElementById("confirm-password").value;

	var message = "";
	if (name === '' || lastName === '' || email === '' || password === '') {
		var message = "Por favor, rellene: ";
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
		$("#modal .modal-body").text(message);
		$('#modal').modal('show');

	} else if (password != confirmPassword) {
		$("#modal .modal-body").text(
			"La confirmación de la contraseña debe ser igual a la contraseña.");
		$('#modal').modal('show');
	} else {
		return true;
	}

	return false;
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

// Close the modal
function closeDialog() {
	modal.hide();
}
