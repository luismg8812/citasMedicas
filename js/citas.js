function crearCita() {
    var identificacionPaciente = document.getElementById("pacienteSelect").getAttribute("key");
    var nombrePaciente = document.getElementById("pacienteSelect").getAttribute("nombre");
    var diaCita = document.getElementById("dia").value;
    var inicioCita = document.getElementById("inicio").value;
    var finCita = document.getElementById("fin").value;
    var motivoCita = document.getElementById("textNuevaCitaPaciete").value;

    var user = firebase.auth().currentUser;
    if (identificacionPaciente == null || identificacionPaciente == '') {
        alert("Debe seleccionar un paciente");
        return;
    }
    var idEvento = document.getElementById("idEvento").value;
    if (idEvento != '') {
        alert("editar evento");
    } else {
        var refPaciente = firebase.database().ref().child("eventos/");
        refPaciente.push({
            editable: 'true',
            end: diaCita + " " + finCita,
            idProfecional: user.uid,
            idPaciente: identificacionPaciente,
            start: diaCita + " " + inicioCita,
            title: nombrePaciente,
            motivo: motivoCita,
            id: diaCita + inicioCita + identificacionPaciente
        });
    }

    $("#crearCitaModal").modal("hide");
    //alert("Cita creada Exitosamente");
    cargarDespuesGuardar();
}

function cargarDespuesGuardar() {
    var user = firebase.auth().currentUser;
    var refCitas = firebase.database().ref().child("eventos/");
    var resul = refCitas.orderByChild("idProfecional").equalTo(user.uid).on("value", function (snapshot) {
        datos = snapshot.val();
        var eventos = [];
        for (var key in datos) {
            eventos.push(datos[key]);
        }
        $('#calendar').fullCalendar('removeEvents');
        $('#calendar').fullCalendar('addEventSource', eventos);
        $('#calendar').fullCalendar('refetchEvents');
    });
}

function cargarCitas() {
    var user = firebase.auth().currentUser;
    var refCitas = firebase.database().ref().child("eventos/");
    var datos;
    var resul = refCitas.orderByChild("idProfecional").equalTo(user.uid).on("value", function (snapshot) {
        datos = snapshot.val();
        var eventos = [];
        for (var key in datos) {
            eventos.push(datos[key]);
            // alert(eventos);
            // console.log(datos[key]);
        }
        $('#calendar').fullCalendar({
            header: {
                center: 'title',
                left: 'month,agendaWeek,agendaDay,listDay' // buttons for switching between views
            },
            dayClick: function (date, jsEvent, view) {
                // alert('Clicked on: ' + date.format());
                //  alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                // alert('Current view: ' + view.name);
                // change the day's background color just for fun
                // var diaCita = document.getElementById("dia").value;
                // var inicioCita = document.getElementById("inicio").value;
                // var finCita = document.getElementById("fin").value;
                switch (view.name) {
                    case 'month':
                        $(this).css('background-color', 'red');
                        break;

                    default:

                        break;
                }
                $("#crearCitaModal").modal("show");
                document.getElementById("idEvento").value = "";
            },
            eventClick: function (calEvent, jsEvent, view) {
                $("#crearCitaModal").modal("show");
                document.getElementById("idEvento").value = calEvent.id;
                document.getElementById("pacienteSelect").setAttribute("key", calEvent.idPaciente);
                document.getElementById("pacienteSelect").setAttribute("nombre", calEvent.title);
                document.getElementById("pacienteSelect").innerHTML = calEvent.title;
                document.getElementById("textNuevaCitaPaciete").value = calEvent.motivo;
                var res = calEvent.start.format().split("T");
                var fin = calEvent.end.format().split("T");
                console.log(fin);
                document.getElementById("dia").value
                switch (view.name) {
                    case 'month':
                        document.getElementById("dia").value = res[0];
                        $(this).css('background-color', 'red');
                        break;
                    case 'agendaWeek':
                        document.getElementById("dia").value = res[0];

                        break;
                    case 'agendaDay':
                        document.getElementById("dia").value = res[0];
                        document.getElementById("inicio").value = res[1];
                        document.getElementById("fin").value = fin[1];
                        break;
                    case 'list':
                        document.getElementById("dia").value = res[0];
                        document.getElementById("inicio").value = res[1];
                        document.getElementById("fin").value = fin[1];
                        break;

                    default:

                        break;
                }
                //alert('Event: ' + calEvent.idPaciente);
                //alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                //alert('View: ' + view.name);
                // change the border color just for fun
                $(this).css('border-color', 'red');

            },
            eventSources: [
                eventos,
            ]
        })
    });

    //alert("carga citas");
}
function buscarPacienteCita() {
    //alert("busca citaPaciente");
    var identificacionBusquedaPaciente = document.getElementById("pacienteId").value;
    if (identificacionBusquedaPaciente == '') {
        return;
    }

    var filasTablaPacientes = "";
    var refPaciente;
    var tablaPacientesCita = document.getElementById("tablaPacientesCita");
    refPaciente = firebase.database().ref().child("pacientes/");
    var resul = refPaciente.orderByChild("identificacionPaciente").equalTo(identificacionBusquedaPaciente).limitToFirst(1).on("value", function (snapshot) {
        var datos = snapshot.val();
        for (var key in datos) {
            //<a href="#" class="list-group-item list-group-item-action" id="prueba" onclick="selectPacienteCita(this)">Dapibus ac facilisis in</a>
            filasTablaPacientes += '<a href="#" class="list-group-item list-group-item-action" id="' + datos[key].identificacionPaciente + '" nombre="' + datos[key].nombrePaciente + '" onclick="selectPacienteCita(this)">' + datos[key].nombrePaciente + ' </a>';
        }
        tablaPacientesCita.innerHTML = filasTablaPacientes;
    });

}

function selectPacienteCita(paciente) {
    var nombrePaciente = paciente.getAttribute("nombre");
    var identificacionPaciente = paciente.getAttribute("id");
    document.getElementById("pacienteSelect").innerHTML = nombrePaciente;
    document.getElementById("pacienteSelect").setAttribute("nombre", nombrePaciente);
    document.getElementById("pacienteSelect").setAttribute("key", identificacionPaciente);
    document.getElementById("tablaPacientesCita").innerHTML = "";
    //alert(nombrePaciente);
}