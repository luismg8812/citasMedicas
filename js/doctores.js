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
                data.push(datos[key].primerNombreDoctor + ' ' + datos[key].primerApellidoDoctor);
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
    var registroMedicoDoctor = document.getElementById('registroMedicoDoctor').value;
    var claveDoctor = document.getElementById('claveDoctor').value;
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
            registroMedicoDoctor: registroMedicoDoctor,
            user: user.uid,
            claveDoctor: claveDoctor
        });
    } else {
        refEditarDoctor = null;
        refDoctor = firebase.database().ref("doctores/" + identificacionDoctor);
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
            registroMedicoDoctor: registroMedicoDoctor,
            claveDoctor: claveDoctor,
            user: user.uid
        });
    }
    $("#crearDoctor").modal("hide");
}

function editarDoctor(btn) {
    var editar = btn.getAttribute("key");
    refEditarDoctor = firebase.database().ref("doctores/" + editar);
    refEditarDoctor.once('value').then(function (snap) {
        $("#crearDoctor").modal("show");
        document.getElementById('primerNombreDoctor').value = snap.val().primerNombreDoctor;
        document.getElementById('segundoNombreDoctor').value = snap.val().segundoNombreDoctor;
        document.getElementById('primerApellidoDoctor').value = snap.val().primerApellidoDoctor;
        document.getElementById('segundoApellidoDoctor').value = snap.val().segundoApellidoDoctor;
        document.getElementById('especialidadDoctor').value = snap.val().especialidadDoctor;
        document.getElementById('tipoIdentificacionDoctor').value = snap.val().tipoIdentificacionDoctor;
        document.getElementById('identificacionDoctor').value = snap.val().identificacionDoctor;
        document.getElementById('direccionDoctor').value = snap.val().direccionDoctor;
        document.getElementById('emailDoctor').value = snap.val().emailDoctor;
        document.getElementById('fijoDoctor').value = snap.val().fijoDoctor;
        document.getElementById('celularDoctor').value = snap.val().celularDoctor;
        document.getElementById('registroMedicoDoctor').value = snap.val().registroMedicoDoctor;
        document.getElementById('claveDoctor').value = snap.val().claveDoctor;
        //alert(result);
    });
}

function loginDoctor() {
    //alert("login doctor");
    var emailLoginDoctor = document.getElementById('emailLoginDoctor').value;
    var passwordLoginDoctor = document.getElementById('passwordLoginDoctor').value;
    var refDoctor = firebase.database().ref().child("doctores/");
    var resul = refDoctor.orderByChild("emailDoctor").equalTo(emailLoginDoctor).limitToFirst(1).on("value", function (snapshot) {
        var datos = snapshot.val();
        for (var key in datos) { 
            if(datos[key].claveDoctor==passwordLoginDoctor){
                sessionStorage.setItem("loginDoctor", datos[key].emailDoctor);
                $("#loginDoctorModal").modal("hide");
                //alert("logueado");
            }
        }
        
    });
}