// Obtiene tempToken de las cookies
const tokenData = JSON.parse(atob(document.cookie.split(".")[1]));
const tempToken = tokenData.tempToken;

const listEventos = async () => {
    const response = await fetch("https://qvento-api.azurewebsites.net/api/qventos/relevant/" + tempToken);
    const eventos = await response.json();

    let tableBody = ``;
    eventos.forEach((evento, index) => {

        const dateTime = evento.DateOfQvento.split("T");
        const date = dateTime[0].split("-");
        const displayDate = date[2] + "/" + date[1] + "/" + date[0]
        const displayTime = dateTime[1].slice(0, 5);

        tableBody += `<tr>
        <td align="left">${evento.CreatedByNavigation.Name}</td>
        <td align='left'>${evento.Title}</td>
        <td align="left">${evento.Description}</td>
        <td align="left">${evento.Location}</td>
        <td type="date" align="left">${displayDate}</td>
        <td type="time" align="left">${displayTime}</td>
        </tr>`;
    });

    document.getElementById("tableBody_Eventos").innerHTML = tableBody;
};

window.addEventListener("load", function () {
    listEventos();
});

function crearEvento() {
    window.location.href = "crearEvento.html";
}