"use strict";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD04u2sMUv-aSD4XE7KbjtXdEeNF_If4r8",
    authDomain: "dev-2-18d9a.firebaseapp.com",
    databaseURL: "https://dev-2-18d9a.firebaseio.com",
    projectId: "dev-2-18d9a",
    storageBucket: "dev-2-18d9a.appspot.com",
    messagingSenderId: "240723600280",
    appId: "1:240723600280:web:11f2ef75a81c007796c1ed",
    measurementId: "G-0DYEYLL4DD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth.Auth.Persistence.LOCAL;



// LOG IN//
let login = document.getElementById("btn-login");
if (login) {
    login.addEventListener('click', logInButton);
}

function logInButton() {
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

//LOG OUT //
let logout = document.getElementById("btn-logout");
if (logout) {
    logout.addEventListener('click', logOutButton);
}

function logOutButton() {
    firebase.auth().signOut();

}

// SIGN UP///
let signUp = document.getElementById("btn-signup");
if (signUp) {
    signUp.addEventListener('click', signUpButton);
}

function signUpButton() {
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