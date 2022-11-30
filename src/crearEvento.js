
var formulario = document.getElementById('formulario');


formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    var datos = new FormData(formulario);

    console.log(datos)
    console.log(datos.get('createdBy'))
    console.log(datos.get('title'))
    console.log(datos.get('dateOfQvento'))
    console.log(datos.get('status'))
    console.log(datos.get('description'))
    console.log(datos.get('location'))


const listEventos = async () => {
    const response = await fetch("https://qvento-api.azurewebsites.net/api/qventos", {
        method: 'POST',
        body: datos

    });
    const eventos = await response.json();

    window.addEventListener("load", function () {
        listEventos();
    });
}    

})