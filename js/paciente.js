
function crarPaciente() {
    var user = firebase.auth().currentUser;
    var nombrePaciente = document.getElementById('nombrePaciente').value;
    var fechaPaciente = document.getElementById('fechaPaciente').value;
    var sexoPaciente = document.getElementById('sexoPaciente').value;
    var estadoCivilPaciente = document.getElementById('estadoCivilPaciente').value;
    var EscolaridadPaciente = document.getElementById('EscolaridadPaciente').value;
    var tipoIdentificacionPaciente = document.getElementById('tipoIdentificacionPaciente').value;
    var identificacionPaciente = document.getElementById('identificacionPaciente').value;
    var religionPaciente = document.getElementById('religionPaciente').value;
    var direccionPaciente = document.getElementById('direccionPaciente').value;
    var emailPaciente = document.getElementById('emailPaciente').value;
    var fijoPaciente = document.getElementById('fijoPaciente').value;
    var celularPaciente = document.getElementById('celularPaciente').value;
    //alert("nombre: "+user.email);
    refPaciente = firebase.database().ref().child("pacientes/");
    refPaciente.push({
        nombrePaciente: nombrePaciente,
        fechaPaciente: fechaPaciente,
        sexoPaciente: sexoPaciente,
        estadoCivilPaciente: estadoCivilPaciente,
        EscolaridadPaciente: EscolaridadPaciente,
        tipoIdentificacionPaciente: tipoIdentificacionPaciente,
        identificacionPaciente: identificacionPaciente,
        religionPaciente: religionPaciente,
        direccionPaciente: direccionPaciente,
        emailPaciente: emailPaciente,
        fijoPaciente: fijoPaciente,
        celularPaciente: celularPaciente,
        user: user.email
    });
    $("#crearPaciente").modal("hide");
}

function buscarPacientes() {
    //alert("entra a buscar pacientes");
    var refPaciente = firebase.database().ref().child("pacientes/");
    var tablaPacientes = document.getElementById("tablaPacientes");
    var filasTablaPacientes ="";
    refPaciente.on("value", function (snap) {
        var datos = snap.val();
        for (var key in datos) {
            filasTablaPacientes += "<tr>"+
                                        "<td>"+datos[key].nombrePaciente +"</td>"+
                                        "<td>"+datos[key].identificacionPaciente +"</td>"+
                                        "<td>"+datos[key].sexoPaciente +"</td>" +
                                        "<td>"+datos[key].celularPaciente +"</td>" +
                                        "<td>"+datos[key].direccionPaciente +"</td>" +
                                    "</tr>";    
            //alert(datos[key].nombrePaciente);
        }
    tablaPacientes.innerHTML=filasTablaPacientes;    
    });
}

