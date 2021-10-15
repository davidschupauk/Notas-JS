//Declaraciones
let legajoAlumno;
let nombreAlumno;
let apellidoAlumno;
let notaMatematica;
let notaIngles;
let notaEdFisica;
let estado;
let notaFinal;
let consulta;
let id = 0;
let totalAlumnos = 0;
const listadoAlumnos = [];

//carga del DOM
$(()=> { console.log("El DOM esta listo");});


//Clase Alumno
class Alumno{
    constructor(legajo, nombre, apellido, notaMate, notaIng, notaEdFis, estado, notaFinal){
    this.legajo = legajo;
    this.nombre = nombre;
    this.apellido = apellido;
    this.notaMate = notaMate;
    this.notaIng = notaIng;
    this.notaEdFis = notaEdFis;
    this.estado = estado;
    this.notaFinal = notaFinal;
    }
}

//Evento submit del formulario;
let miForm = $("#formulario");
miForm.submit(ingresoDatos);

//Procesamiento de datos
function ingresoDatos(e){
    e.preventDefault();
    //elimina el total
    let spanAlumnos = $("#totalAlumnos");
    spanAlumnos.remove(); 
    legajoAlumno = document.getElementById("legajoAlumno").value;
    nombreAlumno = document.getElementById("nombreAlumno").value;
    apellidoAlumno = document.getElementById("apellidoAlumno").value;
    notaMatematica = parseInt(document.getElementById("notaMatematica").value); 
    notaIngles = parseInt(document.getElementById("notaIngles").value);
    notaEdFisica = parseInt(document.getElementById("notaEdFisica").value);
   
    const prom = (notaMatematica + notaIngles + notaEdFisica)/3;
      notaFinal = prom;
      if(prom >= 6){
        estado = "Aprobado";
      }else{
        estado = "Reprobado";
      }
      let alumnoActual = new Alumno(legajoAlumno, nombreAlumno, apellidoAlumno, notaMatematica, notaIngles, notaEdFisica, estado, notaFinal);
      listadoAlumnos.push(alumnoActual);
      sessionStorage.setItem(alumnoActual.legajo, JSON.stringify(alumnoActual));
      escribirTabla(alumnoActual.legajo);
      totalAlumnos++;
      id++;
      miForm.trigger("reset");
      //carga un nuevo total
      let tarjeta = $(".card-body")
    tarjeta.append(`<span id="totalAlumnos">El total de alumnos ingresados es: ${totalAlumnos}</span>`)
} 


//traer del localStorage y ponerlo modificando el DOM
function escribirTabla(legajoActual){
  
  let alumno = JSON.parse(sessionStorage.getItem(legajoActual));   
  let nombre = alumno.nombre;
  let apellido = alumno.apellido;
  let notaMate = alumno.notaMate;
  let notaIng = alumno.notaIng;
  let notaEdFis = alumno.notaEdFis;
  let estado = alumno.estado;
  let notaFinal = alumno.notaFinal;
  
       
  let contenido = $("#tbody");
  contenido.append(`<tr id="${legajoActual}">
  <td>${legajoActual}</td>
  <td>${nombre}</td>
  <td>${apellido}</td>
  <td>${notaMate}</td>
  <td>${notaIng}</td>
  <td>${notaEdFis}</td>
  <td>${notaFinal}</td>
  <td>${estado}</td>
  <td><button class="btnEliminar"> X</button>

  </tr>`);
 
  $(".btnEliminar").click(function (e) { 
    let filaSeleccionada = $(e.target).parent().parent();
    filaSeleccionada.fadeOut(1000);
    let idaEliminar = filaSeleccionada.attr("id");
    eliminarAlumno(idaEliminar);
});

}

//eliminar alumno de Storage y de array
function eliminarAlumno(legajoActual){
  for (let i = 0; i < listadoAlumnos.length; i++){
    if(listadoAlumnos[i]["legajo"] == legajoActual){
      //elimino del Array
      listadoAlumnos.splice(i, 1);
      //Elimino del session storage
      sessionStorage.removeItem(legajoActual);
    }
  }
}
