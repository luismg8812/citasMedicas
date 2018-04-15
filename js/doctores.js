var refEditarDoctor;

function buscarDoctores() {
    var user = firebase.auth().currentUser;
   
    var refDoctor;
    var filasTablaDoctores = "";
    refDoctor = firebase.database().ref().child("doctores/");
    var tableDoctores = $('#tableDoctorJquery').DataTable();
    refDoctor.once("value", function (snap) {
        var datos = snap.val();
        for (var key in datos) {
           
            if (datos[key].user == user.uid) {
                //alert(datos[key].user+"entra a buscar doctores2:"+user.uid);
                //alert(key);
                var data = [];
                var botonEdit = ' <button type="button" key="' + key + '" onclick="editarDoctor(this)" > <i class=\"fa fa-pencil\" aria-hidden=\"true\" ></i> </button>';
                var botonVer = ' <button type="button" key="' + key + '" onclick="editarDoctor(this)" > <i class=\"fa fa-search\" aria-hidden=\"true\" ></i> </button>';
                //alert(botonEdit);
                data.push(botonEdit);
                data.push(datos[key].primerNombreDoctor + ' ' + datos[key].primerApellidoctor);
                data.push(datos[key].identificacionDoctor);
                tableDoctores.row.add(data).draw();
            }
        }


        // tablaPacientes.innerHTML = filasTablaPacientes;
    });
}

function crearDoctor() {
    var user = firebase.auth().currentUser;
    var primerNombreDoctor = document.getElementById('primerNombreDoctor').value;
    var segundoNombreDoctor = document.getElementById('segundoNombreDoctor').value;
    var primerApellidoDoctor = document.getElementById('primerApellidoDoctor').value;
    var segundoApellidoDoctor = document.getElementById('segundoApellidoDoctor').value;
    var especialidadDoctor = document.getElementById('especialidadDoctor').value;
    var tipoIdentificacionDoctor = document.getElementById('tipoIdentificacionDoctor').value;
    var identificacionDoctor = document.getElementById('identificacionDoctor').value;
    var direccionDoctor = document.getElementById('direccionDoctor').value;
    var emailDoctor = document.getElementById('emailDoctor').value;
    var fijoDoctor = document.getElementById('fijoDoctor').value;
    var celularDoctor = document.getElementById('celularDoctor').value;
    if (refEditarDoctor != null) {
        refEditarDoctor.set({
            primerNombreDoctor: primerNombreDoctor,
            segundoNombreDoctor: segundoNombreDoctor,
            primerApellidoDoctor: primerApellidoDoctor,
            segundoApellidoDoctor: segundoApellidoDoctor,
            especialidadDoctor: especialidadDoctor,
            tipoIdentificacionDoctor: tipoIdentificacionDoctor,
            identificacionDoctor: identificacionDoctor,
            direccionDoctor: direccionDoctor,
            emailDoctor: emailDoctor,
            fijoDoctor: fijoDoctor,
            celularDoctor: celularDoctor,
            user: user.uid
        });
    } else {
        refEditarDoctor = null;
        refDoctor = firebase.database().ref("doctores/"+identificacionDoctor);
        refDoctor.set({
            primerNombreDoctor: primerNombreDoctor,
            segundoNombreDoctor: segundoNombreDoctor,
            primerApellidoDoctor: primerApellidoDoctor,
            segundoApellidoDoctor: segundoApellidoDoctor,
            especialidadDoctor: especialidadDoctor,
            tipoIdentificacionDoctor: tipoIdentificacionDoctor,
            identificacionDoctor: identificacionDoctor,
            direccionDoctor: direccionDoctor,
            emailDoctor: emailDoctor,
            fijoDoctor: fijoDoctor,
            celularDoctor: celularDoctor,
            user: user.uid
        });
    }
    $("#crearDoctor").modal("hide");
}