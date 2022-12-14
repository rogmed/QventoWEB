const registrarUsuario = () => {
    var name = document.getElementById("name").value;
    var lastName = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
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
