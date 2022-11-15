const listEventos= async()=>{
    const response = await fetch("https://qvento.azurewebsites.net/all-qventos");
    const eventos = await response.json();
    
    let tableBody=``;
    eventos.forEach((evento, index) => {
        
        tableBody+=`<tr>
        <td class="centered">${evento.qventoId}</td>
        <td class="centered">${evento.title}</td>
        <td class="centered">${evento.description}</td>
        <td class="centered">${evento.location}</td>
        <td class="centered">${evento.dateCreated}</td>
        <td class="centered">${evento.dateOfQvento}</td>
        </tr>`;  
          
    });
    
    document.getElementById("tableBody_Eventos").innerHTML = tableBody;
    
    };
    
    window.addEventListener("load", function(){
        listEventos();
    });
    