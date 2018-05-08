
var refEditarPaciente;
function crarPaciente() {
    var user = firebase.auth().currentUser;
    var primerNombrePaciente = document.getElementById('primerNombrePaciente').value;
    var segundoNombrePaciente = document.getElementById('segundoNombrePaciente').value;
    var primerApellidoPaciente = document.getElementById('primerApellidoPaciente').value;
    var segundoApellidoPaciente = document.getElementById('segundoApellidoPaciente').value;
    var barrioPaciente = document.getElementById('barrioPaciente').value;
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
            primerNombrePaciente: primerNombrePaciente,
            segundoNombrePaciente: segundoNombrePaciente,
            primerApellidoPaciente: primerApellidoPaciente,
            segundoApellidoPaciente: segundoApellidoPaciente,
            barrioPaciente: barrioPaciente,
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
        refPaciente = firebase.database().ref("pacientes/" + identificacionPaciente);
        refPaciente.set({
            primerNombrePaciente: primerNombrePaciente,
            segundoNombrePaciente: segundoNombrePaciente,
            primerApellidoPaciente: primerApellidoPaciente,
            segundoApellidoPaciente: segundoApellidoPaciente,
            barrioPaciente: barrioPaciente,
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
        var refHistoriasClinicas = firebase.database().ref("historiasClinicas/" + identificacionPaciente);
        refHistoriasClinicas.set({
            alcoholicas: false,
            alergias: false,
            alimentacion: ' ',
            antecedentesFamiliares: ' ',
            antecedentesSociales: ' ',
            fuma: false,
            idPaciente: identificacionPaciente,
            idProfecional: user.uid,
            usoDrogas: ' '
        });
    }
    $("#crearPaciente").modal("hide");
}

function buscarPacientes() {
    var user = firebase.auth().currentUser;
    //alert("entra a buscar pacientes");

    var refPaciente;
    var filasTablaPacientes = "";

    refPaciente = firebase.database().ref().child("pacientes/");

    var table = $('#tablePacientesJquery').DataTable();

    filasTablaPacientes = "";
    var user = firebase.auth().currentUser;
    refPaciente.once("value", function (snap) {
        var datos = snap.val();
        for (var key in datos) {
            if (datos[key].user == user.uid) {
                //alert(key);
                var data = [];
                var botonEdit = ' <button type="button" key="' + key + '" onclick="editarPaciente(this)" > <i class=\"fa fa-pencil\" aria-hidden=\"true\" ></i> </button>';
                var botonVer = ' <button type="button" key="' + key + '" onclick="editarPaciente(this)" > <i class=\"fa fa-search\" aria-hidden=\"true\" ></i> </button>';
                //alert(botonEdit);
                data.push(botonEdit);
                data.push(datos[key].primerNombrePaciente + ' ' + datos[key].primerApellidoPaciente);
                data.push(datos[key].identificacionPaciente);

                table.row.add(data).draw();
            }

        }

        // tablaPacientes.innerHTML = filasTablaPacientes;
    });


}

function editarPaciente(btn) {
    var editar = btn.getAttribute("key");
    refEditarPaciente = firebase.database().ref("pacientes/" + editar);
    refEditarPaciente.once('value').then(function (snap) {
        $("#crearPaciente").modal("show");
        document.getElementById('primerNombrePaciente').value = snap.val().primerNombrePaciente;
        document.getElementById('segundoNombrePaciente').value = snap.val().segundoNombrePaciente;
        document.getElementById('primerApellidoPaciente').value = snap.val().primerApellidoPaciente;
        document.getElementById('segundoApellidoPaciente').value = snap.val().segundoApellidoPaciente;
        document.getElementById('barrioPaciente').value = snap.val().barrioPaciente;
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

function limpiarCrearPaciente(btn) {
    //alert("aqui llega");
    $("#crearPaciente").modal("show");
        document.getElementById('primerNombrePaciente').value = '';
        document.getElementById('segundoNombrePaciente').value = '';
        document.getElementById('primerApellidoPaciente').value = '';
        document.getElementById('segundoApellidoPaciente').value = '';
        document.getElementById('barrioPaciente').value = '';
        document.getElementById('sexoPaciente').value = '';
        document.getElementById('estadoCivilPaciente').value = '';
        document.getElementById('EscolaridadPaciente').value = '';
        document.getElementById('tipoIdentificacionPaciente').value = '';
        document.getElementById('identificacionPaciente').value = '';
        document.getElementById('religionPaciente').value = '';
        document.getElementById('direccionPaciente').value = '';
        document.getElementById('emailPaciente').value = '';
        document.getElementById('fijoPaciente').value = '';
        document.getElementById('celularPaciente').value = '';
}
