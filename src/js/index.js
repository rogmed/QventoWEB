// Inicia nueva peticion
const request = new XMLHttpRequest();

// Selecciona el <form> con id 'login' para extraer datos
const form = document.getElementById('login')

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
	event.preventDefault();

	// Abre la petición, elije formato JSON y envía el JSON en forma de string
	request.open('POST', 'https://qvento-api.azurewebsites.net/api/login');
	request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
	request.send(JSON.stringify(formJson(e)));

	// Cuando la peticion cambie de estado se comprueba si está en 4 (DONE)
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
			$("#loginModal .modal-body").text('404 Conexión fallida.');
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
