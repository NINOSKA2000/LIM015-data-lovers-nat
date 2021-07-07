//import { example } from './data.js';
import data from './data/ghibli/ghibli.js';


const containerAnimes = document.getElementById('container-animes');




data.films.forEach(datos);

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










console.log(data.films.map(director => director.director));



document.addEventListener("click", function(){
    document.getElementById("root").innerHTML = JSON.stringify(dire);
  });


const directores = document.getElementById("direct1");
const dire= data.films.filter(item => 
   item.director.includes(directores.value));

console.log(dire);

console.log(data.films.filter(item => item.director.includes(directores.value)));


//console.log(example, data);
