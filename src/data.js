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
    <div>
    <img src= '${dato.poster}' id="image-poster"></img>
    <p id="title"> ${dato.title}
    <a href="title.html"> ${dato.title}</a>
    </p>
    <p id="release"> ${"(" + dato.release_date + ")"} </p>
    <br>
    </div>`;
    containerAnimes.appendChild(cardAnime);
}


//limpieza de pantallas 
function limpieza () { 
   containerAnimes.innerHTML="";
   contenedorFiltrado.innerHTML=""
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

//buscador de peliculas 
//let buscar = document.querySelector("search");
//console.log(buscar);

//buscar.addEventListener("click", buscador); 

//function buscador (){
    //console.log(buscar.value);
//};

