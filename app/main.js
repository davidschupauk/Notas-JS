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

//carga de la pagina
window.onload = cargaPagina();

function cargaPagina() { 

  for(let i=0; i < localStorage.length; i++){
    let clave = localStorage.key(i);
    let alumno = JSON.parse(localStorage.getItem(clave));
    let contenido = $("#tbody");
    if(alumno.estado == "Aprobado" || alumno.estado == "Reprobado"){
      contenido.append(`<tr id="${alumno.legajo}">
      <td>${alumno.legajo}</td>
      <td>${alumno.nombre}</td>
      <td>${alumno.apellido}</td>
      <td>${alumno.notaMate}</td>
      <td>${alumno.notaIng}</td>
      <td>${alumno.notaEdFis}</td>
      <td>${alumno.notaFinal}</td>
      <td>${alumno.estado}</td>
      <td><button class="btnEliminar"> X</button></td>
      </tr>`);
      listadoAlumnos.push(alumno);

      $(".btnEliminar").click(function (e) { 
        let filaSeleccionada = $(e.target).parent().parent();
        filaSeleccionada.fadeOut(1000);
        let legajoActualEliminar = filaSeleccionada.attr("id");
        eliminarAlumno(legajoActualEliminar);
      });
    }
    
  }
}

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
    let legajoValido = validezLegajo(legajoAlumno);
    if(legajoValido == true){
      nombreAlumno = document.getElementById("nombreAlumno").value;
      apellidoAlumno = document.getElementById("apellidoAlumno").value;
      notaMatematica = parseInt(document.getElementById("notaMatematica").value); 
      notaIngles = parseInt(document.getElementById("notaIngles").value);
      notaEdFisica = parseInt(document.getElementById("notaEdFisica").value);
      let notasValidas = validarNotas(notaMatematica, notaIngles, notaEdFisica);
      if(notasValidas == true){
        const prom = (notaMatematica + notaIngles + notaEdFisica)/3;
        notaFinal = prom;
        if(prom >= 6){
          estado = "Aprobado";
        }else{
          estado = "Reprobado";
        }
        let alumnoActual = new Alumno(legajoAlumno, nombreAlumno, apellidoAlumno, notaMatematica, notaIngles, notaEdFisica, estado, notaFinal);
        listadoAlumnos.push(alumnoActual);
        localStorage.setItem(alumnoActual.legajo, JSON.stringify(alumnoActual));
        escribirTabla(alumnoActual.legajo);
        totalAlumnos++;
        id++;
        miForm.trigger("reset");
        //carga un nuevo total
        let tarjeta = $(".card-body")
        tarjeta.append(`<span id="totalAlumnos">El total de alumnos procesados en esta sesión es: ${totalAlumnos}</span>`)
      }
    }else{
      swal({
        title: "Atención!",
        text: "Ya existe un alumno con ese numero de legajo, desea sobrescribirlo?",
        icon: "warning",
        buttons: ["Cancelar", "Sobrescribir"],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal({
            title: "Modificado",
            text: "El alumno se sobrescribió",
            icon: "success",
          });
          let filaSeleccionada = $(document.getElementById(legajoAlumno));
          filaSeleccionada.hide();
          let legajoActualEliminar = filaSeleccionada.attr("id");
          eliminarAlumno(legajoActualEliminar);
          ingresoDatos(e);
        } else {
          swal({
            title: "Sin modificaciones!",
            text: "El alumno no se sobrescribió",
            icon: "info",
          });
          miForm.trigger("reset");
        }
      });
      
    }
} 



//traer del localStorage y ponerlo modificando el DOM
function escribirTabla(legajoActual){
  
  let alumno = JSON.parse(localStorage.getItem(legajoActual));   
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
  <td><button class="btnEliminar"> X</button></td>

  </tr>`);
 
  $(".btnEliminar").click(function (e) { 
    let filaSeleccionada = $(e.target).parent().parent();
    filaSeleccionada.hide();
    let legajoActualEliminar = filaSeleccionada.attr("id");
    eliminarAlumno(legajoActualEliminar);
});

}



//eliminar alumno de Storage y de array
function eliminarAlumno(legajoActual){
  for (let i = 0; i < listadoAlumnos.length; i++){
    if(listadoAlumnos[i]["legajo"] == legajoActual){
      //elimino del Array
      listadoAlumnos.splice(i, 1);
      //Elimino del local storage, no estaria eliminando lo que se carga con la pagina
      localStorage.removeItem(legajoActual);
    }
  }
}


//validacion notas
function validarNotas(notaMatematica, notaIngles, notaEdFisica){
  let valMate;
  let valIngles;
  let valEdFisica;
  if(notaMatematica > 0 && notaMatematica <= 10){
    valMate = true;
  }else{
    document.getElementById("notaMatematica").value = "";
  }

  if(notaIngles > 0 && notaIngles <= 10){
    valIngles = true;
  }else{
    document.getElementById("notaIngles").value = "";
  }
 
  if(notaEdFisica > 0 && notaEdFisica <= 10){
    valEdFisica = true;
  }else{
    document.getElementById("notaEdFisica").value ="";
  }

  if(valEdFisica == true && valIngles == true && valMate==true){
    return true;
  }

}

//Validar legajo ingresado

function validezLegajo(legajoAlumno){
  for (let i = 0; i < listadoAlumnos.length; i++){
    if(listadoAlumnos[i]["legajo"] == legajoAlumno){
      return false;
    }
  }
  return true;
}

