const listEventos = async () => {
    const response = await fetch("https://qvento-api.azurewebsites.net/api/qventos");
    const eventos = await response.json();
    
    let tableBody = ``;
    eventos.forEach((evento, index) => {
        
        tableBody += `<tr>
        <td class="centered">${evento.qventoId}</td>
        <td class="centered">${evento.createdBy}</td>
        <td class="centered">${evento.title}</td>
        <td class="centered">${evento.description}</td>
        <td class="centered">${evento.location}</td>
        <td class="centered">${evento.dateCreated}</td>
        <td class="centered">${evento.dateOfQvento}</td>
        <td class="centered">${evento.status}</td>
        </tr>`;           
    });

    document.getElementById("tableBody_Eventos").innerHTML = tableBody;
        
   
    
    };
        
window.addEventListener("load", function () {
        listEventos();
    });
