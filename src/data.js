import data from "./data/ghibli/ghibli.js";

const contenedorFiltrado = document.getElementById("root");
const containerAnimes = document.getElementById("container-animes");
const valorSeleccionado = document.getElementById("best-films-list");
const botonSeleccionado = document.getElementById("list-order");

//dinamico boton desplegado
addEventListener('DOMContentLoaded', () => {
    const botonMenu = document.querySelector(".btn-menu");
    if(botonMenu) {
        botonMenu.addEventListener("click", () => {
            const navMenu = document.querySelector('.nav-menu')
            navMenu.classList.toggle('show')
        })
    }
})

//mostrar la lista de peliculas en la pantalla principal
export const mostrarPelicula = data.films.forEach(mostrarFilms);

function mostrarFilms(dato) {
    const cardAnime = document.createElement("div");
    cardAnime.className = "container-card-anime";
    cardAnime.innerHTML = `
    <div >
    <img src= '${dato.poster}' class="image-poster"></img>
    <p class="title"> ${dato.title}</p>
    <p class="release"> ${"(" + dato.release_date + ")"} </p>
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



// personajes
const persona = document.getElementById("personajes");
persona.addEventListener("click", mostrarPersonajes);
const containerPersonajes = document.getElementById("container-personajes");

function personajes(person) {
    const detallesPersonajes = document.createElement("div");
    detallesPersonajes.className = "container-card-personajes";
    detallesPersonajes.innerHTML = `
    <div class="container-personajes">
    <img src='${person.img}' class="image-personajes"></img>
    <div class="descripciones">
    <p><b>Name:</b> ${person.name}</p>
    <p><b>Gender:</b> ${person.gender}</p>
    <p><b>Age:</b> ${person.age}</p>
    <p><b>Eye color:</b> ${person.eye_color}</p>
    <p><b>Hair color:</b> ${person.hair_color}</p>
    <p><b>Specie:</b> ${person.specie}</p>
    </div>
    </div>`;
    //console.log(detallesPersonajes);
    containerPersonajes.appendChild(detallesPersonajes);
}

function mostrarPersonajes() {
    limpieza ();
    const dataPersonajes = data.films.map((e) => e.people);
    const totalPersonajes = dataPersonajes.reduce((acc, el) => acc.concat(el), []);
    //console.log(dataPersonajes);
    totalPersonajes.forEach(personajes);

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
    }

