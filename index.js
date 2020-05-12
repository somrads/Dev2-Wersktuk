"use strict";
// GLOBAL VARIABLES ///
let allMovieData;

// FIREBASE ///

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyD04u2sMUv-aSD4XE7KbjtXdEeNF_If4r8",
  authDomain: "dev-2-18d9a.firebaseapp.com",
  projectId: "dev-2-18d9a",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth.Auth.Persistence.LOCAL;

const database = firebase.firestore();
const watchedMoviesCollection = database.collection("watched-movies");


const convertQuerySnapshotToRegularArray = (querySnapshot) => querySnapshot.docs.map((item) => ({
  id: item.id,
  ...item.data()
}));
////// ///////



//// LOG IN  & SIGN UP PAGE /////

// LOG IN//
let login = document.getElementById("btn-login");
if (login) {
  login.addEventListener('click', logInButton);
}

async function logInButton() {
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  if (email != "" && password != "") {
    let result = firebase.auth().signInWithEmailAndPassword(email, password);
    result.catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);
      window.alert(errorMessage);
    });
  } else {
    window.alert("Please fill out all fields");

  }

}


let logout = document.getElementById("btn-logout"); // log out
if (logout) {
  logout.addEventListener('click', logOutButton);
}


let signUp = document.getElementById("btn-signup"); // sign up
if (signUp) {
  signUp.addEventListener('click', signUpButton);
}



async function logOutButton() {
  firebase.auth().signOut();

}

async function signUpButton() {
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  let confirmPassword = document.querySelector("#confirmPassword").value;

  if (email != "" && password != "" && confirmPassword != "") {
    if (password == confirmPassword) {
      let result = firebase.auth().createUserWithEmailAndPassword(email, password);
      result.catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
        window.alert(errorMessage);
      });
    } else {
      window.alert("Password do not match with Confirm Password");

    }

  } else {
    window.alert("Please fill out all fields");

  }
}
//// //// //// //////////////////////////////


document.addEventListener('DOMContentLoaded', async () => {
  await getMovieData();
  await movieOptionTags(allMovieData);
  await watchedMovies();


  //MOVIE DETAILS
  const selectTag = document.querySelector('select');
  selectTag.onchange = () => {
    for (let i = 0; i < allMovieData.length; i++)
      if (allMovieData[i].title === selectTag.value) {
        selectedMovieDetails(allMovieData[i]);
        return;
      }
  };
});


////// MOVIE DATA ///////

///// FETCH CALL

const getMovieData = async () => {
  try {
    const movieData = await fetch("https://ghibliapi.herokuapp.com/films");
    await movieData.json()
      .then(data => {
        allMovieData = data;
      });
  } catch (err) {
    console.error(err);
  }
};


/// OPTION TAGS 
const movieOptionTags = (moviesArr) => {
  moviesArr.forEach(element => {
    const optionTag = document.createElement('option');
    optionTag.value = element.title;
    optionTag.innerText = element.title;
    document.querySelector('#select-movies').appendChild(optionTag);
  });
};


// MOVIE DETAILS
const selectedMovieDetails = (selectedMovie) => {
  let htmlString = '';
  htmlString += `
          <h3>
            ${selectedMovie.title}
          </h3>
          <h4>
          ${selectedMovie.release_date}
        </h4>
        <p>
        ${selectedMovie.description}
      </p>
      `;
  document.getElementById('movie-details').innerHTML = htmlString;

};

//WATCHED MOVIES ///

// ALPHABETICAL SORT///
const sortByAlphabet = (a, b) => {
  if (a.title > b.title) {
    return 1;
  }
  if (a.title < b.title) {
    return -1;
  }
};

//WATCHED MOVIES DETAILS ///
async function watchedMovies() {
  watchedMoviesCollection.onSnapshot((querySnapshot) => {
    let htmlString = '';
    const watchedMovie = convertQuerySnapshotToRegularArray(querySnapshot);
    watchedMovie.sort(sortByAlphabet);
    watchedMovie.forEach((watchedMovie) => {
      htmlString += `
          <p>
            You watched "${watchedMovie.title}" 
          </p>
      `;

    });
    document.getElementById('watched-movies').innerHTML = htmlString;
  });
}


const watchedButton = document.getElementById("btn-watched");
const watchedList = document.querySelector("watched-movies");
watchedButton.addEventListener("click", watched);


async function watched(event) {
  console.log('clicked');
  event.preventDefault();
  const selectedMovie = document.getElementById("select-movies");
  const title = selectedMovie.value;
  console.log(selectedMovie.value);

  await watchedMoviesCollection.add({
    title: title,
    Date: new Date()
  });
}