
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
            user: user.email
        });
        alert("editar");
    } else {
        refEditarPaciente = null;
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
        alert("nuevo");
    }
    $("#crearPaciente").modal("hide");
}

function buscarPacientes() {
    //alert("entra a buscar pacientes");
    var identificacionBusquedaPaciente = document.getElementById("identificacionBusquedaPaciente").value;
    var refPaciente;
    if (identificacionBusquedaPaciente != '') {
        refPaciente = firebase.database().ref().child("pacientes/");
    } else {
        refPaciente = firebase.database().ref().child("pacientes/");
    }
    var tablaPacientes = document.getElementById("tablaPacientes");
    var filasTablaPacientes = "";

    refPaciente.once("value", function (snap) {
        var datos = snap.val();
        for (var key in datos) {
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
        tablaPacientes.innerHTML = filasTablaPacientes;
    });
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
