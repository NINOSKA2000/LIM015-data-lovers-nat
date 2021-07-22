
import {  filterByDirector ,orderByYears, SearchByTitle , joinCharacter} from './data.js';

import data from "./data/ghibli/ghibli.js";

const contenedorFiltrado = document.getElementById("root");
const containerAnimes = document.getElementById("container-animes");
const valorSeleccionado = document.getElementById("best-films-list");
const botonSeleccionado = document.getElementById("list-order");



//mostrar la lista de peliculas en la pantalla principal


let dataFilms=data.films;

dataFilms.forEach(mostrarFilms);

function mostrarFilms(dato) {

    const cardAnime = document.createElement("div");
    cardAnime.className = "container-card-anime";   
    cardAnime.innerHTML = `
    <div class="container-card" id="${dato.id}">
        <div> <img  src= '${dato.poster}' class="image-poster"></img> </div>
        <div class="post-dato">
            <span class="title">${dato.title}</span><br>
            <span class="release">${"(" + dato.release_date + ")"}</span>
        </div>
    </div>
 `;

    containerAnimes.appendChild(cardAnime);

    cardAnime.addEventListener("click", ()=>{

        let idFilms=cardAnime.firstElementChild.id;

            console.log(idFilms);

            most(idFilms);
        
    });
    return cardAnime;
    
}

function most(idFilms) { 

    console.log(idFilms);
    console.log("hola");

}




//limpieza de pantallas
function limpieza () {
    containerAnimes.innerHTML="";
    contenedorFiltrado.innerHTML="";
}



//filtrado de peliculas por directores
valorSeleccionado.addEventListener("change", filterDirectors);

function filterDirectors() {
    limpieza ();
     //containerAnimes.style.display="none";  //oculta el cuadro de animes totales
    let valor = valorSeleccionado.value;
     //console.log (valor);
    let dire=filterByDirector(valor,dataFilms)//filtra las peliculas que incluyes el director seleccioando
	//console.log(dire);
    dire.forEach(mostrarFilms);
}



//ordenado por año

botonSeleccionado.addEventListener("change", sortYear);

function sortYear() {
    limpieza ();
    let opcion = botonSeleccionado.value;

	let yearsPeli=orderByYears(opcion,dataFilms);

	yearsPeli.forEach(mostrarFilms);
}





//Buscador de peliculas
const input = document.querySelector("#search");
const boton = document.querySelector("#btn");
const mensaje = document.querySelector("#mensaje-error");

input.addEventListener("keyup", () => {
    mensaje.classList.remove("mensaje-correcto");
    mensaje.classList.add("mensaje-error");
})
 
const movieSearch = () => {

    const texto = input.value.toLowerCase();

    if(texto === "") {
        mensaje.classList.add("mensaje-correcto");
        //alert("completa el buscador");
        //console.log(texto);
    }

    let nombreTitle =SearchByTitle (input,dataFilms);

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

boton.addEventListener('click', movieSearch);





// function de mostrador de personajes
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
   const totalPersonajes = joinCharacter(dataFilms)
    //console.log(dataPersonajes);
    totalPersonajes.forEach(mostrarDatosPersonajes);
}







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



//mostrador de detalles de tabs 

const [tabs, tabsPanels] = [
    
	Array.from(document.querySelectorAll(".tabs li")),
	Array.from(document.querySelectorAll(".tabs-panel"))
];

tabs.forEach((tab) => {
	tab.addEventListener("click", () => {
		const target = document.querySelector(`#${tab.dataset.target}`);
		removeActiveClass([tabs, tabsPanels]);
		tab.classList.add("active");
		target.classList.add("active");
	});
});

const removeActiveClass = (el) => {
	el.forEach((item) => {
		item.find((e) => e.classList.contains("active")).classList.remove("active");
	});
};
