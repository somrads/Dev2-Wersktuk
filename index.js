"use strict";
let allMovieData;
let allPosterData;

document.addEventListener('DOMContentLoaded', async () => {
  await getMovieData();
  await movieOptionTags(allMovieData);



  //MOVIE DETAILS
  const selectTag = document.querySelector('select');
  selectTag.onchange = () => {

    for (let i = 0; i < allMovieData.length; i++)
      if (allMovieData[i].title === selectTag.value) {
        selectedMovieDetails(allMovieData[i]);
        return;
      }
  };


  // COMMENTS
  const submitButton = document.querySelector('#submit-btn');

  if (submitButton) {
    submitButton.addEventListener('click', () => {
      const text = document.querySelector('#input-txt').value;
      addListItem(text);
    });
  }

});
// MOVIE DATA
const getMovieData = async () => {
  try {
    const movieData = await fetch("https://ghibliapi.herokuapp.com/films");
    await movieData.json()
      .then()
      .then(data => {
        allMovieData = data;
      });
  } catch (err) {
    console.error(err);
  }
};
/*
// POSTER DATA
const getPosterData = async (film) => {
  try {
    const posterData = await fetch("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" + film + "&callback=?");
    await posterData.json()
      .then(data => {
        allPosterData = data;
      });
  } catch (err) {
    console.error(err);
  }
};
*/


const movieOptionTags = (movieObj) => {
  for (let i = 0; i < movieObj.length; i++) {
    const optionTag = document.createElement('option');
    optionTag.value = movieObj[i].title;
    optionTag.innerText = movieObj[i].title;
    document.querySelector('#select-movies').appendChild(optionTag);
  }
};


// MOVIE DETAILS

const selectedMovieDetails = (selectedMovie) => {
  const movieDetailTag = document.querySelector('#movie-details');

  movieDetailTag.innerHTML = '';

  const title = document.createElement('h3');
  const image = document.createElement('img');
  const year = document.createElement('p');
  const description = document.createElement('p');


  title.innerText = selectedMovie.title;
  title.image = selectedMovie.image;
  year.innerText = selectedMovie.release_date;
  description.innerText = selectedMovie.description;

  movieDetailTag.appendChild(title);
  movieDetailTag.appendChild(image);
  movieDetailTag.appendChild(year);
  movieDetailTag.appendChild(description);

};


// COMMENTS
const addListItem = (text) => {
  const li = document.createElement('li');
  li.innerText = text;
  document.querySelector('ul').appendChild(li);
};