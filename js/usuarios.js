
var refUsuario;
var keyusuario;
function cargarCamposProfecional() {
    var user = firebase.auth().currentUser;
    refUsuario = firebase.database().ref("usuarios/" + user.uid);
    refUsuario.once('value').then(function (snap) {
        if (snap.val() != null) {
            console.log("carga campos profecional: " + snap.val().nombreProfecional);
            document.getElementById('nombreProfecional').value = snap.val().nombreProfecional;
            document.getElementById('especialidadProfecional').value = snap.val().especialidadProfecional;
            document.getElementById('identificacionProfecional').value = snap.val().identificacionProfecional;
            document.getElementById('direccionProfecional').value = snap.val().direccionProfecional;
            document.getElementById('celularProfecional').value = snap.val().celularProfecional;
            document.getElementById('fijoProfecional').value = snap.val().fijoProfecional;
            document.getElementById('emailProfecional').value = user.email;
        };
    });

    //alert(refUsuario);
    // alert("carga campos profecional");
}

function guardarUsuario() {
    // var nombreProfecional = document.getElementById('nombreProfecional').value;
    // var especialidadProfecional = document.getElementById('especialidadProfecional').value;
    // var identificacionProfecional = document.getElementById('identificacionProfecional').value;
    // var direccionProfecional = document.getElementById('direccionProfecional').value;
    // var celularProfecional = document.getElementById('celularProfecional').value;
    // var celularProfecional = document.getElementById('celularProfecional').value;
    // var fijoProfecional = document.getElementById('fijoProfecional').value;
    // var emailProfecional = document.getElementById('emailProfecional').value;
    // var passwordProfecional = document.getElementById('passwordProfecional').value;
    var user = firebase.auth().currentUser;
    refUsuario = firebase.database().ref("usuarios/" + user.uid);
    refUsuario.set({
        nombreProfecional: document.getElementById('nombreProfecional').value,
        especialidadProfecional: document.getElementById('especialidadProfecional').value,
        identificacionProfecional: document.getElementById('identificacionProfecional').value,
        direccionProfecional: document.getElementById('direccionProfecional').value,
        celularProfecional: document.getElementById('celularProfecional').value,
        celularProfecional: document.getElementById('celularProfecional').value,
        fijoProfecional: document.getElementById('fijoProfecional').value,
        idProfecional: user.uid
    });
   

    console.log("guardo usuario");

     user.updateEmail(document.getElementById('emailProfecional').value).then(function () {
         console.log(" guardo mail");
     }).catch(function (error) {
         console.log("error guardando mail");
     });
     if (passwordProfecional != '') {
         user.updatePassword(document.getElementById('passwordProfecional').value).then(function () {
             console.log(" guardo password");
         }).catch(function (error) {
             console.log("error guardo password");
         });
     }
    alert("Opciones guardadas exitosamente");
}