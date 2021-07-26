
/*,filterByCharteres,filterById, orderByYears,orderAlphabetPerson, SearchByTitle , joinCharacter*/

import {  filterByDirector } from '../src/data.js';







//filtrado por directores 



describe('filterByDirector', () => {
  
  it('is a function to filter by director of studio Ghibli', () => {
    expect(typeof filterByDirector).toBe('function');
  });


  const arrayPrueba = [{ director: "Yoshifumi Kondō", title: "Whisper of the Heart" }, { director: "Hayao Miyazaki", title: "Castle in the Sky" }];
  expect(filterByDirector("Yoshifumi Kondō", arrayPrueba)).toEqual([
      { director: "Yoshifumi Kondō", title: "Whisper of the Heart" }
  ]);

});










/*


describe('anotherExample', () => {
  it('is a function', () => {
    expect(typeof anotherExample).toBe('function');
  });

  it('returns `anotherExample`', () => {
    expect(anotherExample()).toBe('OMG');
  });
});
*/

