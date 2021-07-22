
import {  filterByDirector ,filterByCharteres, orderByYears,orderAlphabetPerson, SearchByTitle , joinCharacter} from './data.js';

import data from "./data/ghibli/ghibli.js";

const contenedorFiltrado = document.getElementById("root");
const containerAnimes = document.getElementById("container-animes");
const valorSeleccionado = document.getElementById("best-films-list");
const botonSeleccionado = document.getElementById("list-order");
const charactersHome=document.getElementById("characters-main");
const input = document.querySelector("#search");
const boton = document.querySelector("#btn");
const mensaje = document.querySelector("#mensaje-error");
const selectedSpecie = document.getElementById("filter-by-species");
const alphabetSelect = document.getElementById("order-by-alphabet");




//mostrar la lista de peliculas en la pantalla principal

let dataFilms = data.films;
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

        let idFilms = cardAnime.firstElementChild.id;

           // console.log(idFilms);

            most(idFilms);
        
    });
    return cardAnime;
    
}

//funcion para detalles de peliculas con sus locaciones y personajes 
function most(idFilms) { 
    console.log(idFilms);
    console.log("hola");

}



//limpieza de pantallas
function limpieza () {
    containerAnimes.innerHTML = "";
    contenedorFiltrado.innerHTML = "";
}



//filtrado de peliculas por directores
valorSeleccionado.addEventListener("change", filterDirectors);

function filterDirectors() {
    limpieza ();
     //containerAnimes.style.display="none";  //oculta el cuadro de animes totales
    let selectedDirector = valorSeleccionado.value;
     //console.log (valor);
    let directorFilms = filterByDirector(selectedDirector,dataFilms)//filtra las peliculas que incluyes el director seleccioando
	//console.log(dire);
    directorFilms.forEach(mostrarFilms);
}




// peliculas ordenados por año

botonSeleccionado.addEventListener("change", sortYear);

function sortYear() {
    limpieza ();
    let selectedOption = botonSeleccionado.value;
	let orderedMovie = orderByYears(selectedOption,dataFilms);
	orderedMovie.forEach(mostrarFilms);
}





//Buscador de peliculas


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
console.log(containerCharacters);


function mostrarPersonajes() {

    charactersHome.style.display="block";
    limpieza();
    document.querySelector(".home").style.display = "none";
   let totalPersonajes = joinCharacter(dataFilms);
    console.log(totalPersonajes);
    totalPersonajes.forEach(showDataCharacters);
}


function showDataCharacters(person) {
    
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


//funcion de filtrar  data personajes 

selectedSpecie.addEventListener("change", filterEspecies);

function filterEspecies() {
    containerCharacters.innerHTML="";
    let valorEspecie = selectedSpecie.value;
    const totalPersonajes = joinCharacter(dataFilms);  
    let datoCharacter = filterByCharteres(valorEspecie,totalPersonajes);
    datoCharacter.forEach((showDataCharacters));
}



// funcion de ordenar personajes alfabeticamente 

alphabetSelect.addEventListener("change", orderAlphabet);

function orderAlphabet() {
    containerCharacters.innerHTML="";
    const valorAlphabet =alphabetSelect.value;
    const totalPersonajes = joinCharacter(dataFilms);
    let dataCharacter = orderAlphabetPerson(valorAlphabet,totalPersonajes);
    dataCharacter.forEach((showDataCharacters));
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
