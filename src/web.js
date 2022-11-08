const aplication = document.querySelector('.container')

const url = 'https://qvento.azurewebsites.net/all-qventos'

fetch(url)
.then(res => res.json())
.then(data => {
    data.forEach(element => {
        const p = document.createElement('p')
        p.setAttribute('qventoId',element.qventoId)
        p.innerHTML = element.title
        p.addEventListener('click', function(){
            window.location.href = 'https://qvento.azurewebsites.net/qvento/'+ element.qventoId
        })
        aplication.appendChild(p)
        
        
    });
   
})
.catch(err => console.log(err))
