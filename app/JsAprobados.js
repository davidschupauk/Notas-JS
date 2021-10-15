window.onload = cargaPagina();

function cargaPagina() { 
    for(let i=0; i < sessionStorage.length; i++){
      let clave = sessionStorage.key(i);
      let alumno = JSON.parse(sessionStorage.getItem(clave));
      if(alumno.estado == "Aprobado"){
        let contenido = $("#tbodyAP");
        contenido.append(`<tr>
        <td>${alumno.legajo}</td>
        <td>${alumno.nombre}</td>
        <td>${alumno.apellido}</td>
        <td>${alumno.notaMate}</td>
        <td>${alumno.notaIng}</td>
        <td>${alumno.notaEdFis}</td>
        <td>${alumno.notaFinal}</td>
        </tr>`);
      }
    }
}
