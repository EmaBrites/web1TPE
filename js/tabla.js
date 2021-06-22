"use strict";
document.addEventListener("DOMContentLoaded",iniciarTabla);
async function iniciarTabla(){
    // let voluntarios=[
    // {
    //     id:"1",
    //     nombre:"Antonela",
    //     apellido:"Valdez",
    //     telefono:"2494609754",
    //     email:"avaldez@gmail.com",
    //     area:"administracion",
    //     turno:"mañana",
    // },
    // {
    //     id:"2",
    //     nombre:"Carlos",
    //     apellido:"Cardona",
    //     telefono:"2494628754",
    //     email:"ccardona@gmail.com",
    //     area:"deposito",
    //     turno:"mañana",
    // },
    // {
    //     id:"3",
    //     nombre:"Daniel",
    //     apellido:"Fuentes",
    //     telefono:"2494626018",
    //     email:"dfuentes@gmail.com",
    //     area:"deposito",
    //     turno:"tarde",
    // },
    // {
    //     id:"4",
    //     nombre:"Florencia",
    //     apellido:"Gomez",
    //     telefono:"2494641444",
    //     email:"fgomez@gmail.com",
    //     area:"administracion",
    //     turno:"tarde",
    // }];
    try{
        let respuesta = await fetch("https://60c2aab9917002001739d577.mockapi.io/bat/voluntarios");
        let voluntarios= await respuesta.json();
        console.log(voluntarios);
        mostrarTabla(voluntarios);
        document.querySelector("#btn-agregar").addEventListener("click",agrega1);
        document.querySelector("#btn-agregar3").addEventListener("click",agrega3);
        document.querySelector("#btn-borrar").addEventListener("click",borrar);
    }catch(error){
        console.log(error);
    }
    


function agrega1(e){
    e.preventDefault();
    let nombre=document.querySelector("#nombre").value;
    let apellido=document.querySelector("#apellido").value;
    let telefono=document.querySelector("#telefono").value;
    let email=document.querySelector("#email").value;
    let area=document.querySelector("#area").value;
    let turno=document.querySelector("#turno").value;

    let voluntarioNuevo={
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        email: email,
        area: area,
        turno: turno,
    }
    voluntarios.push(voluntarioNuevo);
    mostrarTabla();
}
function agrega3(e,){
    e.preventDefault();
    for(let i=0; i<3; i++){
        agrega1(e);
    }
    mostrarTabla();
}

function mostrarTabla(voluntarios){
    let tabla=document.querySelector("#t-voluntarios");
    tabla.innerHTML=`
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Telefono</th>
                <th>email</th>
                <th>Area</th>
                <th>Turno</th>
            </tr>
        </thead>
        `;
    let cuerpo=document.createElement("tbody");
    for (const item of voluntarios) {
        let fila=document.createElement("tr");
        fila.innerHTML = `
                <td>${item.nombre}</td>
                <td>${item.apellido}</td> 
                <td>${item.telefono}</td> 
                <td>${item.email}</td> 
                <td>${item.area}</td> 
                <td>${item.turno}</td>
            `;
        cuerpo.appendChild(fila);
    }
    tabla.appendChild(cuerpo);
}
function borrar(e){
    e.preventDefault();
    voluntarios=[];   
    mostrarTabla();
}
}