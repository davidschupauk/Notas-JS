window.onload = cargaPagina();

function cargaPagina() { 
    const URLJSON = "../data/profes.json"
    $.get(URLJSON, function(profesores, estado){
        if(estado === "success"){
            let contenido = $("#listadoProfesores");
            for(const profesor of profesores){
                contenido.append(`
                <li class="itemProf">${profesor.nombre + " " + profesor.apellido}</li>
                `)
            }
        }
    })
}