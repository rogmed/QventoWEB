const request = new XMLHttpRequest();

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

    const title = datos.get('title');

    const dto = formJson(e);
    console.log(dto)

    request.open('POST', 'https://qvento-api.azurewebsites.net/api/qventos');
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