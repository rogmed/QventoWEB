// Obtiene token de la URL
const queryString = window.location.search;
const urlParameters = new URLSearchParams(queryString);
const tempToken = urlParameters.get('temptoken');

const listEventos = async () => {
    const response = await fetch("https://qvento-api.azurewebsites.net/api/qventos/relevant/" + tempToken);
    const eventos = await response.json();

    let tableBody = ``;
    eventos.forEach((evento, index) => {

        tableBody += `<tr>
        <td class="centered">${evento.QventoId}</td>
        <td class="centered">${evento.CreatedBy}</td>
        <td class="centered">${evento.Title}</td>
        <td class="centered">${evento.Description}</td>
        <td class="centered">${evento.Location}</td>
        <td class="centered">${evento.DateCreated}</td>
        <td class="centered">${evento.DateOfQvento}</td>
        <td class="centered">${evento.Status}</td>
        </tr>`;
    });

    document.getElementById("tableBody_Eventos").innerHTML = tableBody;
};

window.addEventListener("load", function () {
    listEventos();
});

const crearEvento = () => {
    console.log(tempToken);
    window.location.href = "crearEvento.html?temptoken=" + tempToken;
}
