import data from "./data/ghibli/ghibli.js";

const contenedorFiltrado = document.getElementById("root");
const containerAnimes = document.getElementById("container-animes");
const valorSeleccionado = document.getElementById("best-films-list");
const botonSeleccionado = document.getElementById("list-order");

//mostrar la lista de peliculas en la pantalla principal
export const mostrarPelicula = data.films.forEach(mostrarFilms);

function mostrarFilms(dato) {
    const cardAnime = document.createElement("div");
    cardAnime.className = "container-card-anime";
    cardAnime.innerHTML = `
    <div >
    <img src= '${dato.poster}' id="image-poster"></img>
    <p id="title"> ${dato.title}
    </p>
    <p id="release"> ${"(" + dato.release_date + ")"} </p>
    <br>
    </div>`;
    containerAnimes.appendChild(cardAnime);

}

//limpieza de pantallas
function limpieza () {
    containerAnimes.innerHTML="";
    contenedorFiltrado.innerHTML="";
}


//filtrado de peliculas por directores
valorSeleccionado.addEventListener("change", seleccionado);

function seleccionado() {
    limpieza ();
     //containerAnimes.style.display="none";  //oculta el cuadro de animes totales
    let valor = valorSeleccionado.value;
     //console.log (valor);
    const dire = data.films.filter((item) => item.director==valor); //filtra las peliculas que incluyes el director seleccioando
    //console.log(dire);
    dire.forEach(mostrarFilms);
}


//ordenado por año
botonSeleccionado.addEventListener("change", orden);
function orden() {
    limpieza ();
    let opcion = botonSeleccionado.value;
    if(opcion=="falling") {
        const yearsPeli = data.films.sort((unNumero, otroNumero) => otroNumero.release_date - unNumero.release_date);
    yearsPeli.forEach(mostrarFilms);
}
    else if (opcion=="upward") {
        const yearsPeli = data.films.sort((unNumero, otroNumero) => unNumero.release_date - otroNumero.release_date);
    yearsPeli.forEach(mostrarFilms);
}
}

//Buscador de peliculas
const input = document.querySelector("#search");
const boton = document.querySelector("#btn");
const mensaje = document.querySelector("#mensaje-error");

input.addEventListener("keyup", () => {
    mensaje.classList.remove("mensaje-correcto");
    mensaje.classList.add("mensaje-error");
})

const buscador = () => {
    const texto = input.value.toLowerCase();
    if(texto === "") {
        mensaje.classList.add("mensaje-correcto");
        //alert("completa el buscador");
        //console.log(texto);
    }
    let nombreTitle = data.films.filter((nombre) => nombre.title.toLowerCase().indexOf(texto) !== -1);
    if(nombreTitle.length > 0) {
        limpieza();
        nombreTitle.forEach(mostrarFilms);
        //console.log(nombreTitle);
    }
    else {
        limpieza();
        const noBuscador = document.createElement("div");
        noBuscador.className = "container-mensaje-error";
        noBuscador.innerHTML = `
        <p> ${"No se encontraron resultados..."}</p>`;
        containerAnimes.appendChild(noBuscador);
    }
}




function detalles (detalles){ 
    const detallesPeliculas = document.createElement("div");
    detallesPeliculas.className = "detallePelicula";
    detallesPeliculas.innerHTML = `
    <div >
        <img src= '${detalles.poster}' id="image-poster"></img>
        <div class="tituloPelicula"> titulo:${detalles.title} </div>
            <div class="cuadrogeneral">
                <div class="cuadros">
                    <div class= "director">                
                        <div id="d1">Director:${detalles.director}</div>
                    </div>
                </div>
            </div>
        <div class="fecha">Realse Date: ${"(" + detalles.release_date+")"}</div>
        <div class="producer">Producer:${detalles.producer}</div>
        <div class="rtScore">Rt_Score:${detalles.rt_score}</div>
        </div>
        <div class="description">Description:${detalles.description}</div>
        </div>
    </div >`;
    containerAnimes.appendChild(detallesPeliculas);
   }


boton.addEventListener('click', buscador);

//acceso a peliculas , personajes y detalles de cada pelicula de acuerdo al link+

containerAnimes.addEventListener("click",detallesPeliculas);
function detallesPeliculas(e){
    let capturaClick= e.target.textContent.toString();
    let capturando=('"'+capturaClick+'"');

    console.log(capturando);
    //"\'Hola\'"
    let detallesFiltrado=data.films.filter((title) => title.title=="Castle in the Sky");

    console.log(detallesFiltrado);
    limpieza();
    detallesFiltrado.forEach(detalles);
    };

