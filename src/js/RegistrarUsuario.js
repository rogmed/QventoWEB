var email;

const registrarUsuario = () => {
    var name = document.getElementById("name").value;
    var lastName = document.getElementById("lastname").value;
    email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;
    var phone = document.getElementById("phone").value;
    var address = document.getElementById("address").value;

    if (name === '' || lastName === '' || email === '' || password === '') {
        alert("Los siguientes campos son obligatorios:"
            + "\n - Nombre"
            + "\n - Apellidos"
            + "\n - E-mail"
            + "\n - Contraseña");
    } else if (password != confirmPassword) {
        alert("La confirmación de la contraseña debe ser igual a la contraseña.");
    } else { 
        alert("Registro de"
            + "\nNombre: " + name
            + "\nApellidos: " + lastName
            + "\ne-mail: " + email);
    }
}

// Inicia nueva peticion
const request = new XMLHttpRequest();

// Selecciona el <form> con id 'login' para extraer datos
const form = document.getElementById('register');

// Listener para actuar cuando se haga click en 'submit'
form.addEventListener('submit', callbackFunction);

// Modal de bootstrap (alerta)
const modal = new bootstrap.Modal(document.getElementById('modal'));

// Funcion principal
function callbackFunction(e) {
	// Muestra mensaje mientras espera respuesta
	$("#modal .modal-body").text('Esperando respuesta...');
	$('#modal').modal('show');

	// Esto evita que la consola dek navegador se limpie inmediatamente
	e.preventDefault();

	// Abre la petici�n, elije formato JSON y env�a el JSON en forma de string
	request.open('POST', 'https://qvento-api.azurewebsites.net/api/user');
	request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
	request.send(JSON.stringify(formJson(e)));

	// Cuando la peticion cambie de estado se comprueba si est� en 4 (DONE)
	// y si ha recibido un 200 (OK) del servidor.
	request.onreadystatechange = function () {
		$('#modal').modal('show');

		if (request.readyState == 4 && request.status == 400) {
			$("#modal .modal-body").text('Http 400');
		}

		if (request.status == 404) {
			$("#modal .modal-body").text('404 Conexion fallida.');
		}

		if (request.status == 409) {
			$("#modal .modal-body").text('El e-mail ' + email + " ya está en"
			+ " uso. Por favor, utilice otro distinto.");
		}

		if (request.readyState == 4 && request.status == 422) {
			$("#modal .modal-body").text('Http 422');
		}

		if (request.readyState == 4 && request.status == 200) {
			$("#modal .modal-body").text("Usuario registrado con éxito con "
			+ " email: " + email);

			$("modal .modal.footer").text('Click para volver');
			//window.location.href = "web.html";
		}
	}
};

// Coge todos los campos de <form> y crea un JSON con ellos
function formJson(event) {
	const dto = {};
	const myFormData = new FormData(event.target);
	myFormData.forEach((value, key) => {
		if(key != "confirmPassword"){
			dto[key] = value;
		}
	});

	return dto;
}

// Close the modal
function closeDialog() {
	modal.hide();
}
