import data from "./data/ghibli/ghibli.js";


//mostrar la lista de peliculas en la pantalla principal

const containerAnimes = document.getElementById("container-animes");
export const mostrarPelicula = data.films.forEach(datos);

function datos(dato) {
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


//filtrado de peliculas

let valorSeleccionado = document.getElementById("best-films-list");
valorSeleccionado.addEventListener("change", seleccionado);
function seleccionado() {
    containerAnimes.style.display="none";  //oculta el cuadro de animes totales
    let valor = valorSeleccionado.value;
    //console.log (valor);
    const dire = data.films.filter((item) => item.director.includes(valor)); //filtra las peliculas que incluyes el director seleccioando
    //console.log(dire);

    let contenedorFiltrado = document.getElementById("root");
    dire.forEach(gina);
     function gina(dato) {
        const cardAnime = document.createElement("div");
        cardAnime.className = "animeFiltrado";
        cardAnime.innerHTML = `
        <div>
        <img src= '${dato.poster}' id="image-poster"></img>
        <p id="title"> ${dato.title}
        <a href="title.html"> ${dato.title}</a>
        </p>
        <p id="release"> ${"(" + dato.release_date + ")"} </p>
        <br>
        </div>`;
        contenedorFiltrado.appendChild(cardAnime);
    }
}

//buscador de peliculas 
let buscar = document.querySelector("search");
console.log(buscar);

buscar.addEventListener("click", buscador); 

function buscador (){
    console.log(buscar.value);
};
// Filtrado por año ascendente
let botonSeleccionado = document.getElementById("list-order");
botonSeleccionado.addEventListener("change", orden);
function orden() {
    //let opcion = botonSeleccionado.value;
    //console.log(opcion);
    const yearsPeli = data.films.sort((unNumero, otroNumero) => otroNumero.release_date - unNumero.release_date);
    console.log(yearsPeli);
    let contenedorFiltradoAño = document.getElementById("orden");
    yearsPeli.forEach(filtradoAño);
    function filtradoAño(dato) {
        const cardAnime = document.createElement("div");
        cardAnime.className = "animeFiltrado";
        cardAnime.innerHTML = `
        <div>
        <img src= '${dato.poster}' id="image-poster"></img>
        <p id="title"> ${dato.title}
        <a href="title.html"> ${dato.title}</a>
        </p>
        <p id="release"> ${"(" + dato.release_date + ")"} </p>
        <br>
        </div>`;
        contenedorFiltradoAño.appendChild(cardAnime);
    }
}
