import data from './data/ghibli/ghibli.js';


const containerAnimes = document.getElementById('container-animes');

export const mostrarPelicula= data.films.forEach(datos);


function datos(dato) {
const cardAnime = document.createElement('div')
    cardAnime.className = "container-card-anime";
    cardAnime.innerHTML = `
    <div>
    <img src= '${dato.poster}' id="image-poster"></img>
    <p id="title"> ${dato.title}
    <a href="title.html"> ${dato.title}</a>
    </p>
    <p id="release"> ${"(" + dato.release_date + ")"} </p>
    <br>
    </div>`
    containerAnimes.appendChild(cardAnime);
    
}

//filtrado de peliculas 

//tomamos valor del id de directores

let valorSeleccionado = document.getElementById("best-films-list");

valorSeleccionado.addEventListener("change", seleccionado);


function seleccionado() {

 let valor=document.getElementById("best-films-list");
  let lenguaje= valor.value;
  return lenguaje;

  

}
console.log(valorSeleccionado);



let  directores = document.getElementById("direct1");
//filtrado de peliculas 
const dire= data.films.filter(item =>item.director.includes(directores.value));
console.log(dire);

let  contenedorFiltrado = document.getElementById("root");
dire.forEach(gina);

function gina(dato) {
 const cardAnime = document.createElement('div')
 cardAnime.className = "animeFiltrado";
 cardAnime.innerHTML = `
 <div>
 <img src= '${dato.poster}' id="image-poster"></img>
 <p id="title"> ${dato.title}
 <a href="title.html"> ${dato.title}</a>
 </p>
 <p id="release"> ${"(" + dato.release_date + ")"} </p>
 <br>
 </div>`
 contenedorFiltrado.appendChild(cardAnime);
    
}

  





















// estas funciones son de ejemplo




//export const dataMain
 





//export const anotherExample = () => {   return 'OMG'; };



//
//filterData(data, condition): esta función filter o filtrar recibiría la data, y nos retornaría aquellos datos que sí cumplan con la condición.

//sortData(data, sortBy, sortOrder): esta función sort u ordenar recibe tres parámetros. El primer parámetro, data, nos entrega los datos. El segundo parámetro, sortBy, nos dice con respecto a cuál de los campos de la data se quiere ordenar. El tercer parámetro, sortOrder, indica si se quiere ordenar de manera ascendente o descendente.

//computeStats(data): la función compute o calcular, nos permitirá hacer cálculos estadísticos básicos para ser mostrados de acuerdo a la data proporcionada.

//Estos nombres de funciones y de parámetros son sola//