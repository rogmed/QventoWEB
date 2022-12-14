const registrarUsuario = () => {
    var name = document.getElementById("name").value;
    var lastName = document.getElementById("last-name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;
    var phone = document.getElementById("phone").value;
    var address = document.getElementById("address").value;

    if (password != confirmPassword) {
        alert("La confirmación de la contraseña debe ser igual a la contraseña.");
    } else if (name === '' || lastName === '' || email === '' || password === '' ) {
        alert("No se puede dejar ningún campo vacío")
    } else {
        console.log("Nombre: " + name
            + "\nApellidos: " + lastName
            + "\ne-mail: " + email);
    }
}
