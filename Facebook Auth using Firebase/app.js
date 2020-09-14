const facebookLogIN = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        var user = result.user;
        // console.log(user)
        console.log(user.displayName)
        window.location = "./success.html"
        // ...
    }).catch(function (error) {
        console.log(error.message)
    });
}
const facebookLogOut = () => {
    firebase.auth().signOut()
    .then(() => console.log('Success'))
    .catch((err) => console.log(err))
    window.location = "./index.html"
}