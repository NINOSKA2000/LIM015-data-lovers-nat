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
        <a href='#${dato.id}'>  <img  src= '${dato.poster}' id="image-poster"></img> </a>
        <p id="title"> ${dato.title}
        </p>
        <p id="release"> ${"(" + dato.release_date + ")"}
        </p>
        <br>
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
let modal=document.getElementById("modalPersonajes");



function detalles (datos){ 
    const detallesPeliculas = document.createElement("section");
    detallesPeliculas.className = "modalDialog";
    detallesPeliculas.innerHTML = `
    <section  class="modalDialog" >
        <div class="imagenPelicula"> 
        <img src= '${datos.poster}' class="imagenPelicula"></img>
        </div>
        <div class="tituloPelicula"> titulo:${datos.title}
        </div>
        <div class="cuadrogeneral">
                <div class="cuadros">
                    <div class= "director">                
                        <div id="d1">Director:${datos.director}</div>
                    </div>
                </div>
        </div>
        <div class="fecha">Realse Date: ${"(" + datos.release_date+")"}</div>
        <div class="producer">Producer:${datos.producer}</div>
        <div class="rtScore">Rt_Score:${datos.rt_score}</div>
        </div>
        <div class="description">Description:${datos.description}</div>
        </div>
    </section >
        
    <section class="iconosPeliculas">
        <button type="submit" id="botonCharacters"><i class="fas fa-users"></i>Characters</button>
        <button type="submit" id="botonLocation" ><i class="fas fa-map-marker-alt"></i>Location</button>
        <button type="submit" id="botonVehicles"><i class="fas fa-helicopter"></i>Vehicles</button>
    </section> 


    <section class="cuadroLista"> 
    <div id="per1">
        <div id="imagen"></div>
        <div> Name</div>
        <div> Gender</div>
        <div> Age</div>
        <div>Eye_color</div>
        <div>hair_color</div>
        <div>specie</div>
    </div>
    </section>
    
    `;
    modal.appendChild(detallesPeliculas);
   }


   detalles();
   


//acceso a peliculas , personajes "y detalles de cada pelicula de acuerdo al link+




//let verMas=document.getElementById("${dato.id}");


//console.log(verMas);
//verMas.addEventListener("click",pelicula);

//function pelicula(){   
    //containerAnimes.innerHTML="";
    //let detallesFiltrado=data.films.filter((title) => title.title==="Castle in the Sky");
    //console.log(detallesFiltrado);
    //detallesFiltrado.forEach(detalles);
//}







    




