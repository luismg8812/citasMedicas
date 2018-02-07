
var refEditarPaciente;
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
    if (refEditarPaciente != null) {
        refEditarPaciente.set({
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
            user: user.uid
        });

    } else {
        refEditarPaciente = null;
        refPaciente = firebase.database().ref("pacientes/"+identificacionPaciente);
        refPaciente.set({
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
            user: user.uid
        });
        var refHistoriasClinicas = firebase.database().ref("historiasClinicas/"+identificacionPaciente);
        refHistoriasClinicas.set({
            alcoholicas:' ',
            alergias: ' ',
            alimentacion:' ',
            antecedentesFamiliares: ' ',
            antecedentesSociales: ' ',
            fuma:' ',
            idPaciente:identificacionPaciente,
            idProfecional: user.uid,
            usoDrogas: ' '
        });
    }
    $("#crearPaciente").modal("hide");
}

function buscarPacientes() {
    var user = firebase.auth().currentUser;
    //alert("entra a buscar pacientes");
    var identificacionBusquedaPaciente = document.getElementById("identificacionBusquedaPaciente").value;
    var refPaciente;
    var filasTablaPacientes = "";
    if (identificacionBusquedaPaciente != '') {
        var tablaPacientes = document.getElementById("tablaPacientes");
        refPaciente = firebase.database().ref().child("pacientes/");
        var resul = refPaciente.orderByChild("identificacionPaciente").equalTo(identificacionBusquedaPaciente).limitToFirst(1).on("value", function (snapshot) {
            var datos = snapshot.val();
            for (var key in datos) {
                if(user.uid!==datos[key].user){
                    var botonEdit = ' <button type="button" key="' + key + '" onclick="editarPaciente(this)" > <i class=\"fa fa-pencil\" aria-hidden=\"true\" ></i> </button>';
                var botonVer = ' <button type="button" key="' + key + '" onclick="editarPaciente(this)" > <i class=\"fa fa-search\" aria-hidden=\"true\" ></i> </button>';
                filasTablaPacientes += "<tr>" +
                    "<td>" + botonEdit + " </td>" +
                    "<td>" + datos[key].nombrePaciente + "</td>" +
                    "<td>" + datos[key].identificacionPaciente + "</td>" +
                    //"<td>" + datos[key].sexoPaciente + "</td>" +
                    //"<td>" + datos[key].celularPaciente + "</td>" +
                    //"<td>" + datos[key].direccionPaciente + "</td>" +
                    "</tr>";
                }
                
            }
            tablaPacientes.innerHTML = filasTablaPacientes;    
        });

    } else {
        refPaciente = firebase.database().ref().child("pacientes/");
        var tablaPacientes = document.getElementById("tablaPacientes");
        filasTablaPacientes = "";
        var user = firebase.auth().currentUser;
        refPaciente.once("value", function (snap) {
            var datos = snap.val();
            for (var key in datos) {
                if (datos[key].user == user.uid) {
                    //alert(key);
                    var botonEdit = ' <button type="button" key="' + key + '" onclick="editarPaciente(this)" > <i class=\"fa fa-pencil\" aria-hidden=\"true\" ></i> </button>';
                    var botonVer = ' <button type="button" key="' + key + '" onclick="editarPaciente(this)" > <i class=\"fa fa-search\" aria-hidden=\"true\" ></i> </button>';
                    //alert(botonEdit);
                    filasTablaPacientes += "<tr>" +
                        "<td>" + botonEdit + " </td>" +
                        "<td>" + datos[key].nombrePaciente + "</td>" +
                        "<td>" + datos[key].identificacionPaciente + "</td>" +
                        //"<td>" + datos[key].sexoPaciente + "</td>" +
                        //"<td>" + datos[key].celularPaciente + "</td>" +
                        //"<td>" + datos[key].direccionPaciente + "</td>" +
                        "</tr>";
                    //alert(datos[key].nombrePaciente);
                }

            }
            tablaPacientes.innerHTML = filasTablaPacientes;
        });
    }

}

function editarPaciente(btn) {
    var editar = btn.getAttribute("key");
    refEditarPaciente = firebase.database().ref("pacientes/" + editar);
    refEditarPaciente.once('value').then(function (snap) {
        $("#crearPaciente").modal("show");
        document.getElementById('nombrePaciente').value = snap.val().nombrePaciente;
        document.getElementById('sexoPaciente').value = snap.val().sexoPaciente;
        document.getElementById('estadoCivilPaciente').value = snap.val().estadoCivilPaciente;
        document.getElementById('EscolaridadPaciente').value = snap.val().EscolaridadPaciente;
        document.getElementById('tipoIdentificacionPaciente').value = snap.val().tipoIdentificacionPaciente;
        document.getElementById('identificacionPaciente').value = snap.val().identificacionPaciente;
        document.getElementById('religionPaciente').value = snap.val().religionPaciente;
        document.getElementById('direccionPaciente').value = snap.val().direccionPaciente;
        document.getElementById('emailPaciente').value = snap.val().emailPaciente;
        document.getElementById('fijoPaciente').value = snap.val().fijoPaciente;
        document.getElementById('celularPaciente').value = snap.val().celularPaciente;
        //alert(result);
    });
}
