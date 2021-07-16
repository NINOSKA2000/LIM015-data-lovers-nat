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
    <div class="container-card">
        <a href='#${dato.id}'> <img  src= '${dato.poster}' class="image-poster"></img> </a>
        <div class="post-description">
            <span class="title">${dato.title}</span><br>
            <span class="release">${"(" + dato.release_date + ")"}</span>
        </div>
    </div>

    <section id='${dato.id}' class="modalDialog">
    <section>
    <a href="#close" title="Close" class="close">X</a>
    <h2><p id="title"> ${dato.title}
    </p>
    </h2>
    <h3>Pon lo que quieras</h3>
    <img src="https://dummyimage.com/100x100/000/ffffff&text=Cualquier+Imagen" alt="" srcset="">
    </section>
    </section>
        `;
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

boton.addEventListener('click', buscador);

//funcion de mas detalles

// personajes
const persona = document.getElementById("personajes");
persona.addEventListener("click", mostrarPersonajes);
const containerPersonajes = document.getElementById("container-personajes");

function personajes(person) {
    const detallesPersonajes = document.createElement("div");
    detallesPersonajes.className = "container-card-personajes";
    detallesPersonajes.innerHTML = `
    <div class="container-personajes">
    <figure>
        <img src='${person.img}' class="image-personajes"></img>
    </figure>
    <div class="descripciones">
    <p class="person-name"><b>Name:</b> ${person.name}</p>
    <p class="person-gender"><b>Gender:</b> ${person.gender}</p>
    <p class="person-age"><b>Age:</b> ${person.age}</p>
    <p class="person-eyes"><b>Eye color:</b> ${person.eye_color}</p>
    <p class="person-hair"><b>Hair color:</b> ${person.hair_color}</p>
    <p class="person-specie"><b>Specie:</b> ${person.specie}</p>
    </div>
    </div>`;
    //console.log(detallesPersonajes);
    containerPersonajes.appendChild(detallesPersonajes);
}

function mostrarPersonajes() {
    limpieza();
    const dataPersonajes = data.films.map((e) => e.people);
    const totalPersonajes = dataPersonajes.reduce((acc, el) => acc.concat(el), []);
    //console.log(dataPersonajes);
    totalPersonajes.forEach(personajes);
}




