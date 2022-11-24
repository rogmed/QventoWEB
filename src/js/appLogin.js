



const registrarUsuario=()=>{
    var nombreUsuario=document.getElementById("nombre").value;
    var apellido=document.getElementById("apellidos").value;
    var password=document.getElementById("correo").value;
    var correo=document.getElementById("password").value;
    var telefono=document.getElementById("telefono").value;
    var direccion=document.getElementById("direccion").value;

     if(nombre===''||
     apellido===''||
     password===''||
     correo===''||
     telefono===''||
     direccion===''){

       alert("No se puede dejar ningún campo vacío")
     }
    console.log("NombreUsuario" + nombreUsuario);
}