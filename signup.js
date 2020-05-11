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



// Initialize Firebase
firebase.initializeApp(firebaseConfig);


$("#btn-signup").click(function () {

    let email = $("#email").val();
    let password = $("#password").val();
    let confirmPassword = $("#confirmPassword").val();


    if (email != "" && password != "" && confirmPassword != "") {
        if (password == confirmPassword) {
            let result = firebase.aut().createUser(email, password, confirmPassword);

            result.catch(function (error) {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);

                window.alert("Message : " + errorMessage);
            });

        } else {
            window.alert("Passwords do not match with each other");
        }

    } else {
        window.alert("Form is incomplete. Please fill out all fields");
    }
});