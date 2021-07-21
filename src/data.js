


export const filterByDirector = (valor, data) => {

    let dataFiltrado= data.filter(item =>item.director==valor);
    return dataFiltrado;
}



export const orderByYears = (opcion,data) => { 

   if(opcion=="falling") {
    const yearsPeli = data.sort((unNumero, otroNumero) => otroNumero.release_date - unNumero.release_date);
   
    return yearsPeli;
        }
   else if (opcion=="upward") {
                
   const yearsPeli = data.sort((unNumero, otroNumero) => unNumero.release_date - otroNumero.release_date);
     return yearsPeli;
            
        }
        
}



export const SearchByTitle = (input,data) => { 

    const texto = input.value.toLowerCase();
    let nombreTitle = data.filter((nombre) => nombre.title.toLowerCase().indexOf(texto) !== -1);

    return nombreTitle;
}


export const joinCharacter = (data) => { 

    const dataPersonajes = data.map((e) => e.people);

    const totalPersonajes = dataPersonajes.reduce((acc, el) => acc.concat(el), []);
    return totalPersonajes;
}
