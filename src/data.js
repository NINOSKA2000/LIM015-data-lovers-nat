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
        <div class="post-dato">
            <span class="title">${dato.title}</span><br>
            <span class="release">${"(" + dato.release_date + ")"}</span>
        </div>
    </div>
    <section id='${dato.id}' class="modalDialog">

        <section class="modalDialog-details">
            <a href="#close" title="Close" class="close">CLOSE</a>

            <section>
                <figure class="pictureMovie">
                    <img src= '${dato.poster}'></img>
                </figure>
            </section >

            <section  class="sectionDetails" >

                <div >

                    <h1 class="titleFilms"> ${dato.title}</h1>

                    <div class="pDescription">${dato.description}</div>

                    <div class="rtScore" > <img src="https://cuevana3.io/wp-content/plugins/wp-postratings/images/stars/rating_on.gif"></img>
                    <strong>Rt_Score:</strong> &nbsp &nbsp <span>${dato.rt_score} </span>
                    </div>

                    <li class="director">
                        <p><strong>Director:</strong> &nbsp
                        ${dato.director}</p>
                    </li>

                    <li class="producer">
                        <p> <strong>Producer: </strong>&nbsp${dato.producer}</p>
                    </li>

                    <li class="RealseDate">
                        <p ><strong>Realse Date: </strong>&nbsp${"(" + dato.release_date+")"}</p>
                    </li>
                </div>

                <section class="movieIcons">

                    <button type="submit" class="botonCharacters"><i class="fas fa-users"></i> Characters</button>
                    <button type="submit" class="botonLocation"><i class="fas fa-map-marker-alt"></i>Location</button>
                    <button type="submit" class="botonVehicles"><i class="fas fa-helicopter"></i>Vehicles </button>
                </section>

            </section >

        </section >

    </section>  `;
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


// personajes
const characters = document.getElementById("personajes");
characters.addEventListener("click", mostrarPersonajes);
const containerCharacters = document.getElementById("container-characters");

function mostrarDatosPersonajes(person) {
    const detallesPersonajes = document.createElement("div");
    detallesPersonajes.className = "container-card-characters";
    detallesPersonajes.innerHTML = `
    <div class="card-characters">
        <figure>
            <img src='${person.img}' class="image-characters"></img>
        </figure>
        <div class="description">
            <p class="person-name"><b>Name:</b> ${person.name}</p>
            <p class="person-gender"><b>Gender:</b> ${person.gender}</p>
            <p class="person-age"><b>Age:</b> ${person.age}</p>
            <p class="person-eyes"><b>Eye color:</b> ${person.eye_color}</p>
            <p class="person-hair"><b>Hair color:</b> ${person.hair_color}</p>
            <p class="person-specie"><b>Specie:</b> ${person.specie}</p>
        </div>
    </div>`;
    //console.log(detallesPersonajes);
    containerCharacters.appendChild(detallesPersonajes);
}

const filterCharacters = document.getElementById("menu");

function filterPersonajes() {
    const filtrado = document.createElement("div");
    filtrado.className = "container-filter-characters";
    filtrado.innerHTML = `
    <div class="filter-characters">
        <select  id="filter-by-species" class="filter-box">
            <option disabled selected>--Filter by species--</option>
            <option value="Human">Human</option>
            <option value="Totoro">Totoro</option>
            <option value="Cat">Cat</option>
            <option value="Witch">Witch</option>
            <option value="Raccoon Dog">Raccoon Dog</option>
            <option value="Red elk">Red elk</option>
            <option value="Spirit">Spirit</option>
            <option value="Wolf">Wolf</option>
            <option value="Deity, Dragon">Deity, Dragon</option>
            <option value="Spirit of The White Fox">Spirit of The White Fox</option>
            <option value="unknown">unknown</option>
            <option value="Bird">Bird</option>
            <option value="Wizard">Wizard</option>
            <option value="Witch/Human">Witch/Human</option>
            <option value="Human/Scarecrow">Human/Scarecrow</option>
            <option value="Dog">Dog</option>
            <option value="Arch-mage/Human">Arch-mage/Human</option>
            <option value="Fish/Human">Fish/Human</option>
            <option value="Deity">Deity</option>
            <option value="Borrower">Borrower</option>
        </select>
    </div>
    <div class="filter-characters">
        <select id="order-by-alphabet" class="filter-box">
            <option disabled selected>--Order by alphabet--</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
        </select>
    </div>
    <div class="filter-characters">
        <select id="order-by-age" class="filter-box">
            <option disabled selected>--Order-by-age--</option>
            <option value="Ascended">Upward</option>
            <option value="Descended">Falling</option>
        </select>
    </div>`;
    filterCharacters.appendChild(filtrado);
}



function mostrarPersonajes() {
    limpieza();
    document.querySelector(".home").style.display = "none";
    filterPersonajes();
    const dataPersonajes = data.films.map((e) => e.people);
    const totalPersonajes = dataPersonajes.reduce((acc, el) => acc.concat(el), []);
      //console.log(totalPersonajes);

    let personajesUnicos=[];

    for( let i=0; i<totalPersonajes.length; i++) {

            if(personajesUnicos.length===0 || !personajesUnicos.includes(totalPersonajes[i])) {

            personajesUnicos.push(totalPersonajes[i])
        }

    }

   // console.log(personajesUnicos);

    //console.log(dataPersonajes);
    totalPersonajes.forEach(mostrarDatosPersonajes);
}


const especieSeleccionada = document.getElementById("filter-by-species");
especieSeleccionada.addEventListener("change", filterEspecies);

function filterEspecies() {
    let valorEspecie = especieSeleccionada.value;
    console.log(valorEspecie);
    let filterEspecieSeleccionada = data.films.filter((character) => character.people === valorEspecie);
    console.log(filterEspecieSeleccionada);
}