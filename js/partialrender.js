"use strict";
document.addEventListener("DOMContentLoaded",iniciarAjax);
function iniciarAjax(e){
  let url="portada.html";
  let btnNav=document.querySelectorAll(".nav-ajax");
  for (const btn of btnNav) {
    btn.addEventListener("click",cargarPagina)
  }
  cargarPagina(e);
  async function cargarPagina(e) {
    e.preventDefault();
    if (this) {
      url=this.dataset.url;
    }
    let container = document.querySelector("main");
    container.innerHTML = "<h1>Loading...</h1>";
    try {
      let response = await fetch(url);
      if (response.ok) {
        let t = await response.text()
        container.innerHTML = t;
        window.history.pushState(url,"bat",url);
        if (url==="portada.html"){
          iniciarGaleria();
          iniciarLeerMas();
        }
        if(url==="contacto.html")
        {
          iniciarCaptcha();
        }
        if (url==="voluntarios.html") {
          iniciarTabla();
        }
      }
      else
      container.innerHTML = "<h1>Error - Failed URL!</h1>";
    }
    catch (error) {
      container.innerHTML = "<h1>Connection error</h1>";
      console.log(error);
    }
  }
  function iniciarGaleria(){
    let index=0;
    let imagenes=[];
    imagenes=document.querySelectorAll("img.oculto");
    pasarImagen();
    setInterval(pasarImagen, 3000);
    function pasarImagen(){
      if(index>=imagenes.length){
        imagenes[index-1].classList.toggle("oculto");
        index=0;
      }
      if(index!=0){imagenes[index-1].classList.toggle("oculto")};
      imagenes[index].classList.toggle("oculto");
      index++;
    }
  }   
  function iniciarLeerMas(){
    let leer=document.querySelectorAll("#btn-leer");
    for (const item of leer) {
      item.addEventListener("click",toggleTexto);
    }
    function toggleTexto(e){
      let botonLeer=e.target;
      let padre=botonLeer.parentElement;
      let ocultos=padre.querySelectorAll(".mostrar");
      for (const texto of ocultos) {
        texto.classList.toggle("oculto");
      }
      if (ocultos[0].classList=="mostrar"){
        botonLeer.innerHTML="Leer menos";
      }
      else{ botonLeer.innerHTML="Leer mas"}
    }
  }
  function iniciarCaptcha(){
    let TextoCaptcha= document.querySelector("#captcha");
    let IngresoCaptcha= document.querySelector("#ingreso-captcha");
    let BotonEnviar= document.querySelector("#boton-enviar");
    let respuesta= document.querySelector("#respuesta-captcha");
    let BotonRefresh= document.querySelector("#boton-refrescar");
    
    let ALfaNumerico=[ 'A', 'B','C','D','E','F','G','a','b','c','d','e','f','g','0','1','2','3','4','5','6','7','8','9'];
    let ArregloVacio= [];
    
    for (let i=1; i<=5; i++){
        ArregloVacio.push(ALfaNumerico[Math.floor(Math.random()* ALfaNumerico.length)]);
    }
    
    TextoCaptcha.innerHTML= ArregloVacio.join('');
    TextoCaptcha.addEventListener('keyup', function(e){
        
        if(TextoCaptcha.textoAlfaNum==10 ){
            
            if (IngresoCaptcha.value==TextoCaptcha.innerHTML){
                respuesta.classList.add("Captcha-correcto");
                respuesta.innerHTML== "El captcha ingresado es correcto!";    
            }else{
                respuesta.classList.add("Captcha-incorrecto");
                respuesta.innerHTML=="El captcha ingresado es incorrecto! Por favor intente nuevamente";
            }
        }
    });
    
    BotonEnviar.addEventListener('click', function(e){
        e.preventDefault();
        if (IngresoCaptcha.value==TextoCaptcha.innerHTML){
            respuesta.classList.add("Captcha-correcto");
            respuesta.innerHTML="Correcto!";
        }else{
            respuesta.classList.add("Captcha-incorrecto");
            respuesta.innerHTML="Captcha incorrecto, por favor intente nuevamente";  
        }
    });
    
    BotonRefresh.addEventListener('click', function(e){
        e.preventDefault();
        IngresoCaptcha.value="";
        let refreshArreglo=[];
        for (let j=1; j<=5; j++){
            refreshArreglo.push(ALfaNumerico[Math.floor(Math.random()* ALfaNumerico.length)]);
        } 
        TextoCaptcha.innerHTML= refreshArreglo.join('');
        respuesta=="";
    });
  }
  async function iniciarTabla(){
    const url="https://60c2aab9917002001739d577.mockapi.io/bat/voluntarios";
    document.querySelector("#btn-agregar").addEventListener("click",agrega1);
    document.querySelector("#btn-agregar3").addEventListener("click",agrega3);
    document.querySelector("#filtrar").addEventListener("keyup", filtrar);
    let btnAnt=document.querySelector("#pagina-ant");
    btnAnt.addEventListener("click",pasarPagina);
    let btnSig=document.querySelector("#pagina-sig");
    btnSig.addEventListener("click",pasarPagina);
    const limite=10;
    let pagina=1;
    let paginaMax=await cantPaginas(url);
    actualizarNumPagina();
    mostrarTabla(pagina);
    async function agrega1(e){
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
      try {
        let res = await fetch(url, {
          "method": "POST",
          "headers": { "Content-type": "application/json" },
              "body": JSON.stringify(voluntarioNuevo)
            });
            if (res.ok) {
              console.log("Creado!");
              paginaMax=await cantPaginas(url);
              mostrarTabla(pagina);
              actualizarNumPagina();
            }
          }
          catch (error) {
            console.log(error);
          }  
        }
        function agrega3(e){
          e.preventDefault();
          for(let i=0; i<3; i++){
            agrega1(e);
          }
          mostrarTabla(pagina);
        }
        async function mostrarTabla(pagina){
          try{
            let respuesta = await fetch(`${url}?p=${pagina}&l=${limite}`);
            let voluntarios= await respuesta.json();
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
            <th>Editar</th>
            <th>Borrar</th>
            </tr>
            </thead>
            `;
            let cuerpo=document.createElement("tbody");
            cuerpo.classList.add("tabla-cuerpo");
            if (respuesta.ok) {
              for (let i = 0; i < voluntarios.length; i++){
                let fila=document.createElement("tr");
                fila.innerHTML = `
                <td>${voluntarios[i].nombre}</td>
                <td>${voluntarios[i].apellido}</td> 
                <td>${voluntarios[i].telefono}</td> 
                <td>${voluntarios[i].email}</td> 
                <td>${voluntarios[i].area}</td> 
                <td>${voluntarios[i].turno}</td>
                <td><button class="fas fa-edit" value=${i}></button></td>
                <td><button class="fas fa-trash-alt" value=${voluntarios[i].id}></button></td>
                `;
                cuerpo.appendChild(fila);
              }
              tabla.appendChild(cuerpo);
              let btn_editar=document.querySelectorAll(".fa-edit");
              let btn_borrar=document.querySelectorAll(".fa-trash-alt");
              btn_borrar.forEach(e => {
                e.addEventListener("click", borrar)
              })
              for (const btn of btn_editar) {
                btn.addEventListener("click",function(e){editar(e,voluntarios)});
              }
              actualizarNumPagina();
            }
          }catch(error){
      console.log(error);
    }
  }
  async function borrar() {
    let id = this.value
    try {
      let res = await fetch(`${url}/${id}`, {
        "method": "DELETE",
      });
      if (res.ok) {
        console.log("Borrado!");
        paginaMax=await cantPaginas(url);
        mostrarTabla(pagina);
        actualizarNumPagina();
      }
    }
    catch (error) {
      console.log(error);
    }
  }
  async function editar(e,voluntarios){
    e.preventDefault();
    let fila=e.target.parentElement.parentElement;
    let i=e.target.value;
    fila.innerHTML=`
    <form id="form-edit">
      <td><input type="text" id="edit-nombre" value="${voluntarios[i].nombre}"></td>
      <td><input type="text" id="edit-apellido" value="${voluntarios[i].apellido}"></td>
      <td><input type="text" id="edit-telefono" value="${voluntarios[i].telefono}"></td>
      <td><input type="text" id="edit-email" value="${voluntarios[i].email}"></td>
      <td><input type="text" id="edit-area" value="${voluntarios[i].area}"></td>
      <td><input type="text" id="edit-turno" value="${voluntarios[i].turno}"></td>
      <td><button class="fas fa-check-circle" name="id" value="${voluntarios[i].id}"></button></td>
    </form>
    `;
    document.querySelector(".fa-check-circle").addEventListener("click",async function(e){
      e.preventDefault();
      voluntarios[i].nombre=document.querySelector("#edit-nombre").value;
      voluntarios[i].apellido=document.querySelector("#edit-apellido").value;
      voluntarios[i].telefono=document.querySelector("#edit-telefono").value;
      voluntarios[i].email=document.querySelector("#edit-email").value;
      voluntarios[i].area=document.querySelector("#edit-area").value;
      voluntarios[i].turno=document.querySelector("#edit-turno").value;
      try {
        let res = await fetch(`${url}/${voluntarios[i].id}`, {
          "method": "PUT",
          "headers": { "Content-type": "application/json" },
          "body": JSON.stringify(voluntarios[i])
        });
        if (res.ok) {
          console.log("Editado!");
          mostrarTabla(pagina);
        }
      }
      catch (error) {
        console.log(error);
      }  
    })
  }
  function pasarPagina(){
    pagina+=Number(this.value);
    if (pagina<=paginaMax&&pagina>=1) {
      mostrarTabla(pagina);
      actualizarNumPagina();
    }
    if (pagina>=paginaMax) {
      btnSig.disabled=true;
    }else {
      btnSig.disabled=false;
    }
    if (pagina<=1) {
      btnAnt.disabled=true;
    }else{
      btnAnt.disabled=false;
    }
  }
  async function cantPaginas(url){
    try{
      let respuesta=await fetch(url);
      let datos= await respuesta.json();
      if (respuesta.ok) {
        return Math.ceil(datos.length/limite);
      }
    }
    catch(error){
      console.log(error);
    }
  }
  function actualizarNumPagina(){
    document.querySelector("#pagina-num").innerHTML=`${pagina}/${paginaMax}`;
  }
  async function filtrar() {
    let textoFiltrado = document.querySelector("#filtrar").value;
    let tabla = document.querySelector(".tabla-cuerpo");
    let tr = tabla.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
      let visible = false;
      let td = tr[i].getElementsByTagName("td");
      for (let j = 0; j < td.length; j++) {
        if (td[j] && td[j].innerHTML.indexOf(textoFiltrado) > -1) {
          visible = true;
        }
      }
      if (visible === true) {
        tr[i].classList.remove("oculto");
      } else {
        tr[i].classList.add("oculto");
        
      }
    }
    
  }
}
}