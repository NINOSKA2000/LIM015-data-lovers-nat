
import {  filterByDirector ,filterByCharteres,filterById, orderByYears,orderAlphabetPerson, SearchByTitle , joinCharacter} from './data.js';

import data from "./data/ghibli/ghibli.js";


addEventListener('DOMContentLoaded', () => {
    /*---- botón de hamburguesa ---- */
    const botonMenu = document.querySelector('.btn-menu');
    const navMenu = document.querySelector('.nav-menu');
    botonMenu.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    })
    /*---- botón de collection ---- */
    const showCollection = document.querySelector('#show-collection');
    showCollection.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.remove('show');
    })
    /*---- botón de characters ---- */
    const showCharacters = document.querySelector('#show-characters');
    showCharacters.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.remove('show');
    })
})




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

const movie = document.getElementById("animes");
movie.addEventListener("click", mostrarFilms);
//const containerAnimes = document.getElementById("container-animes");

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
    </div>`;

    containerAnimes.appendChild(cardAnime);

    cardAnime.addEventListener("click", ()=>{

    let idFilms = cardAnime.firstElementChild.id;

    most(idFilms);

    });
    return cardAnime;
}


const titleFilms = document.querySelector(".titleFilms");
const pDescription = document.querySelector(".pDescription");
const rtScore = document.querySelector(".rtScore");
const pirector = document.querySelector(".pDirector");
const pProducer = document.querySelector(".pProducer");
const pictureMovie = document.querySelector(".pictureMovie");

const CardPeopleFilm = document.getElementById("panel-1");
const CardLocationFilm = document.getElementById("panel-2");
const CardVehiclesFilm = document.getElementById("panel-3");




//funcion para detalles de peliculas con sus locaciones y personajes
function most(idFilms) {

    //identifique la pelicula seleccionada
    let dataFiltrado = filterById(idFilms,dataFilms);

    // muestre los datos en mi modal de detalles
    titleFilms.innerHTML= dataFiltrado[0].title;
    pictureMovie.src= dataFiltrado[0].poster;
    pDescription.innerHTML= dataFiltrado[0].description;
    rtScore.innerHTML= dataFiltrado[0].rt_score;
    pirector.innerHTML= dataFiltrado[0].director;
    pProducer.innerHTML= dataFiltrado[0].producer;

    //data de  sus personajes

    let dataPerson=dataFiltrado[0].people;
    CardPeopleFilm.innerHTML="";
    peopleShow(CardPeopleFilm,dataPerson);

    //data de location

    let dataLocation=dataFiltrado[0].locations;
    //console.log(dataLocation);
    CardLocationFilm.innerHTML="";
    locationShow(CardLocationFilm,dataLocation);

    let dataVehicles=dataFiltrado[0].vehicles;
    //console.log(dataLocation);
    CardVehiclesFilm.innerHTML="";
    vehiclesShow(CardVehiclesFilm ,dataVehicles);

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


function peopleShow (contenedor, datatotal) {

    datatotal.forEach((person)=> {
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
        contenedor.appendChild(detallesPersonajes);
    })
}




function locationShow (contenedor, datatotal) {

    datatotal.forEach((ele)=> {
        const detallesPersonajes = document.createElement("div");
        detallesPersonajes.className = "container-card-characters";
        detallesPersonajes.innerHTML = `
        <div class="card-location">
            <figure>
                <img src='${ele.img}' class="image-characters"></img>
            </figure>
            <div class="detailsLocation">
                <p ><b>Name:</b> ${ele.name}</p>
                <p ><b>Gender:</b> ${ele.climate}</p>
                <p ><b>residents:</b> ${ele.residents}</p>

            </div>
        </div>`;
        contenedor.appendChild(detallesPersonajes);

    })
}


function vehiclesShow (contenedor, datatotal) {

    datatotal.forEach((ele)=> {
        const detallesPersonajes = document.createElement("div");
        detallesPersonajes.className = "container-card-characters";
        detallesPersonajes.innerHTML = `
        <div class="card-vehicles">
            <figure>
                <img src='${ele.img}' class="image-characters"></img>
            </figure>
            <div class="detailsLocation">
                <p ><b>Name:</b> ${ele.name}</p>
                <p ><b>vehicle class:</b> ${ele.vehicle_class}</p>
                <p ><b>Pilots:</b> ${ele.pilot}</p>

            </div>
        </div>`;
        contenedor.appendChild(detallesPersonajes);
    })
}


function mostrarPersonajes() {
    charactersHome.style.display="block";
    limpieza();
    document.querySelector(".home").style.display = "none";
    let totalPersonajes = joinCharacter(dataFilms);
    peopleShow(containerCharacters,totalPersonajes);
     //totalPersonajes.forEach(showDataCharacters);
}



//funcion de filtrar  data personajes

selectedSpecie.addEventListener("change", filterEspecies);

function filterEspecies() {
    containerCharacters.innerHTML="";
    let valorEspecie = selectedSpecie.value;
    const totalPersonajes = joinCharacter(dataFilms);
    let datoCharacter = filterByCharteres(valorEspecie,totalPersonajes);
    peopleShow(containerCharacters,datoCharacter);
    //datoCharacter.forEach((showDataCharacters));
}



// funcion de ordenar personajes alfabeticamente

alphabetSelect.addEventListener("change", orderAlphabet);

function orderAlphabet() {
    containerCharacters.innerHTML="";
    const valorAlphabet =alphabetSelect.value;
    const totalPersonajes = joinCharacter(dataFilms);
    let dataCharacter = orderAlphabetPerson(valorAlphabet,totalPersonajes);
    peopleShow(containerCharacters,dataCharacter);
    //dataCharacter.forEach((showDataCharacters));
}


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
