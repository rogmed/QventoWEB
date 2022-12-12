// Obtiene tempToken de las cookies
const tokenData = JSON.parse(atob(document.cookie.split(".")[1]));
const tempToken = tokenData.tempToken;

const listEventos = async () => {
    const response = await fetch("https://qvento-api.azurewebsites.net/api/qventos/relevant/" + tempToken);
    const eventos = await response.json();

    let tableBody = ``;
    eventos.forEach((evento, index) => {

        var date = evento.DateOfQvento

        tableBody += `<tr>
        <td align="left">${evento.CreatedBy}</td>
        <td align='left'>${evento.Title}</td>
        <td align="left">${evento.Description}</td>
        <td align="left">${evento.Location}</td>
        <td align="left">${evento.DateOfQvento}</td>
        </tr>`;
    });

    document.getElementById("tableBody_Eventos").innerHTML = tableBody;
};

window.addEventListener("load", function () {
    listEventos();
});

const crearEvento = () => {
    console.log(tempToken);
    window.location.href = "crearEvento.html";
}
