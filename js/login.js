function ingresar() {
  console.log('entra a registrar');
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  console.log(email);
 // console.log(password);
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    var errorEspanol = '1';
    console.log(errorCode);
    console.log(errorMessage);
    switch (errorCode) {
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        errorEspanol = 'Error, clave o usuario invalidos';
        break;
      default:
        errorEspanol = 'Error en autenticación, contacte a su proveedor'
        break;
    }

    $("#myModal").modal();
    $(document).ready(function () {
      document.getElementById('errorLogin').innerHTML = errorEspanol;
    });
    // ...
  });

}

function observador() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log('usuario logueado');
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      goMenu();
      // ...
    } else {
      console.log('usuario no logueado');
      // User is signed out.
      // ...
    }
  });
}
function goMenu() {
  $(document).ready(function () {
    $('.menu').load('pages/menu/menu.html');
  });
  // window.location.assign("pages/menu/menu.html");
  // window.location="pages/menu/menu.html";
  //var irmenu = document.getElementById('menu');
  // irmenu.innerHTML='va al menu';
}

function cerrarSesision() {
  firebase.auth().signOut().then(function () {
    sessionStorage.removeItem('loginDoctor');
    location.reload();
  }).catch(function (error) {
    // An error happened.
  });

}
observador();