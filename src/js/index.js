// Botón de Iniciar Sesion
const button = document.querySelector('#login-button');
button.disabled = true;

// Formulario e-mail y password
const form = document.getElementById('login')
const email = document.getElementById('InputEmail')
const password = document.getElementById('InputPassword')

form.addEventListener("change", updateButton);

// Desactiva botón de login si e-mail o password están vacíos
function updateButton(e) {
	if (email.value == "" || password.value == "") {
		button.disabled = true;
	} else {
		button.disabled = false;
	}
}

// Inicia nueva peticion
const request = new XMLHttpRequest();

// Listener para actuar cuando se haga click en 'submit'
form.addEventListener('submit', callbackFunction);

// Modal de bootstrap (alerta)
const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));

// Funcion principal
function callbackFunction(e) {
	// Muestra mensaje mientras espera respuesta
	$("#loginModal .modal-body").text('Esperando respuesta...');
	$('#loginModal').modal('show');

	// Esto evita que la consola dek navegador se limpie inmediatamente
	e.preventDefault();

	// Abre la petici�n, elije formato JSON y env�a el JSON en forma de string
	request.open('POST', 'https://qvento-api.azurewebsites.net/api/login');
	request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
	request.send(JSON.stringify(formJson(e)));

	// Cuando la peticion cambie de estado se comprueba si est� en 4 (DONE)
	// y si ha recibido un 200 (OK) del servidor.
	request.onreadystatechange = function () {
		$('#loginModal').modal('show');

		if (request.readyState == 4 && request.status == 400) {
			$("#loginModal .modal-body").text('Se necesita e-mail y password.');
		}

		if (request.readyState == 4 && request.status == 400) {
			$("#loginModal .modal-body").text('Se necesita e-mail y password.');
		}

		if (request.readyState == 4 && request.status == 401) {
			$("#loginModal .modal-body").text('E-mail y/o password incorrectos.');
		}

		if (request.status == 404) {
			$("#loginModal .modal-body").text('404 Conexi�n fallida.');
		}

		if (request.readyState == 4 && request.status == 200) {
			loginModal.hide();
			// Obtiene token con informacion del email y userId
			document.cookie = request.response;

			// Navega a pagina principal
			window.location.href = "web.html";
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

// Close the modal
function closeDialog() {
	loginModal.hide();
}

// Boton de registro
const registerButton = document.getElementById("register-button");
registerButton.disabled = true;