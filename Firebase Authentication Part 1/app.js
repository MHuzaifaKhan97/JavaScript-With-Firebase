signUp = () => {
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    firebase.auth().createUserWithEmailAndPassword(email.value,password.value)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error Code: "+errorCode);
        console.log("Error Message: "+errorMessage);
    });
}

logIn = () => {
    let email = document.getElementById('signInEmail');
    let password = document.getElementById('signInPassword');
    console.log(email.value,password.value)
    firebase.auth().signInWithEmailAndPassword(email.value,password.value)
    .then((result) => {
        console.log("Logged In Successfully")
        console.log(result);
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error Code: "+errorCode);
        console.log("Error Message: "+errorMessage);
    });
}