alert("hola mundo");
console.log("hola mundo en la consola");
document.querySelector("#parrafo").innerHTML = "hola mundo en la web";
document.querySelector("#boton").addEventListener("click",saludar);
function saludar(){
    let nombre=document.querySelector("#nombre").value;
    console.log(nombre);
    let apellido=document.querySelector("#apellido").value;
    console.log(apellido);
    document.querySelector("#parrafo").innerHTML="hola "+nombre+" "+apellido;
}
document.querySelector("#div1").innerHTML="div 1";
document.querySelector("#div2").innerHTML="div 2";
document.querySelector("#div3").innerHTML="div 3";
document.querySelector("#btn-rojo").addEventListener("click",escribirRojo);
document.querySelector("#btn-verde").addEventListener("click",escribirverde);
document.querySelector("#btn-azul").addEventListener("click",escribirAzul);
function escribirRojo(){
    document.querySelector("#color").innerHTML="rojo";
}
function escribirverde(){
    document.querySelector("#color").innerHTML="verde";
}
function escribirAzul(){
    document.querySelector("#color").innerHTML="azul";
}
document.querySelector("#btn-captcha").addEventListener("click",captcha)
function captcha(){
    const respuestaCorrecta="4";
    let respuesta = document.querySelector("#respuesta").value;
    console.log(respuestaCorrecta);
    console.log(respuesta);
    if (respuesta==respuestaCorrecta){
        document.querySelector("#resultado").innerHTML="Correcto, es humano";
    }else{
        document.querySelector("#resultado").innerHTML="Incorrecto, si es humano no sabe sumar F";
    }
}
document.querySelector("#btn-agregar").addEventListener("click",agregarTarea);
function agregarTarea(){
    let tarea = document.createElement("li");
    document.querySelector("#list-tareas").appendChild(tarea);
    let aux = document.querySelector("#input-tarea").value;
    console.log(aux);
    tarea.innerHTML = aux;

}