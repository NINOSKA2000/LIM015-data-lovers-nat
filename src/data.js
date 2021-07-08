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
    containerAnimes.style.display="none";
    let valor = valorSeleccionado.value;
    //console.log (valor);
    const dire = data.films.filter((item) => item.director.includes(valor));
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
