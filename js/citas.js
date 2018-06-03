function crearCita() {
    var identificacionPaciente = document.getElementById("pacienteId").value;
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
    if (idEvento == '') {
        idEvento = diaCita + inicioCita + identificacionPaciente;
        idEvento = idEvento.replace("-", ":");
    }

    var refEditarPacienteTemp = firebase.database().ref("pacientes/" + identificacionPaciente);
    refEditarPacienteTemp.once("value", function (snap) {
        var datos = snap.val();
        refEvento = firebase.database().ref("eventos/" + idEvento);
        refEvento.set({
            editable: 'true',
            end: diaCita + " " + finCita,
            idProfecional: user.uid,
            idPaciente: identificacionPaciente,
            start: diaCita + " " + inicioCita,
            title: datos['primerNombrePaciente'] + ' ' + datos['primerApellidoPaciente'] + '-' + identificacionPaciente,
            motivo: motivoCita,
            id: idEvento,
            confirmada: false,
            costo: 0
        });
    });
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

function cargarDespuesGuardarCitasAux() {
    var user = firebase.auth().currentUser;
    var refCitas = firebase.database().ref().child("eventos/");
    var resul = refCitas.orderByChild("idProfecional").equalTo(user.uid).on("value", function (snapshot) {
        datos = snapshot.val();
        var eventos = [];
        for (var key in datos) {
            if (!datos[key].confirmada) {
                eventos.push(datos[key]);
            }
        }
        $('#calendarAux').fullCalendar('removeEvents');
        $('#calendarAux').fullCalendar('addEventSource', eventos);
        $('#calendarAux').fullCalendar('refetchEvents');
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
            eventDrop: function (event, delta, revertFunc) {
                //alert("funcionalidad en construcción");
                //alert(event.title + " was dropped on " + event.start.format());

                if (!confirm("Esta seguro de editar la cita?")) {
                    revertFunc();
                } else {
                    refEvento = firebase.database().ref("eventos/" + event.id);
                    refEvento.set({
                        end: event.end.format(),
                        start: event.start.format(),
                        editable: 'true',
                        idProfecional: event.idProfecional,
                        idPaciente: event.idPaciente,
                        title: event.title,
                        motivo: event.motivo,
                        id: event.id,
                        confirmada: false,
                        costo: 0

                    });
                }

            },
            dayClick: function (date, jsEvent, view) {
                switch (view.name) {
                    case 'month':
                        $(this).css('background-color', 'red');
                        break;

                    default:

                        break;
                }
                $("#crearCitaModal").modal("show");
                var user = firebase.auth().currentUser;
                var refPaciente = firebase.database().ref().child("pacientes/");
                var filasTablaPacientes = ' ';
                refPaciente.once("value", function (snap) {
                    var datos = snap.val();
                    for (var key in datos) {
                        if (datos[key].user == user.uid) {
                            var nombre = datos[key].primerNombrePaciente + ' ' + datos[key].primerApellidoPaciente;
                            filasTablaPacientes = filasTablaPacientes + '  <option value="' + datos[key].identificacionPaciente + '">' + nombre + '</option>';
                        }
                    }
                    document.getElementById("browsers").innerHTML = filasTablaPacientes;
                });

                var res = date.format().split("T");
                document.getElementById("dia").value = res[0];
                document.getElementById("pacienteId").value = "";
                document.getElementById("inicio").value = "";
                document.getElementById("fin").value = "";
                document.getElementById("textNuevaCitaPaciete").value = "";
                document.getElementById("idEvento").value = "";
            },
            eventClick: function (calEvent, jsEvent, view) {
                $("#crearCitaModal").modal("show");
                document.getElementById("idEvento").value = calEvent.id;
                document.getElementById("pacienteId").value = calEvent.idPaciente;
                // document.getElementById("pacienteSelect").innerHTML = calEvent.title;
                document.getElementById("textNuevaCitaPaciete").value = calEvent.motivo;
                var res = calEvent.start.format().split("T");
                var fin = calEvent.end.format().split("T");
                console.log(fin);
                document.getElementById("dia").value
                var refPaciente = firebase.database().ref().child("pacientes/");
                var filasTablaPacientes = ' ';
                refPaciente.once("value", function (snap) {
                    var datos = snap.val();
                    for (var key in datos) {
                        if (datos[key].user == user.uid) {
                            var nombre = datos[key].primerNombrePaciente + ' ' + datos[key].primerApellidoPaciente;
                            filasTablaPacientes = filasTablaPacientes + '  <option value="' + datos[key].identificacionPaciente + '">' + nombre + '</option>';
                        }
                    }
                    document.getElementById("browsers").innerHTML = filasTablaPacientes;
                });
                switch (view.name) {
                    case 'month':
                        document.getElementById("dia").value = res[0];
                        document.getElementById("inicio").value = res[1];
                        document.getElementById("fin").value = fin[1];
                        $(this).css('background-color', 'red');
                        break;
                    case 'agendaWeek':
                        document.getElementById("dia").value = res[0];
                        document.getElementById("inicio").value = res[1];
                        document.getElementById("fin").value = fin[1];

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
                $(this).css('border-color', 'red');

            },
            eventSources: [
                eventos,
            ]
        })
    });

    //alert("carga citas");
}

function buscarcitasPaciente() {
    var user = firebase.auth().currentUser;
    var pacienteBusquedaCita = document.getElementById("pacienteBusquedaCita").value;
    if (pacienteBusquedaCita == '') {
        return;
    }
    var filasTablaPacientes = "";
    refCitas = firebase.database().ref().child("eventos/");
    var resul = refCitas.orderByChild("idPaciente").equalTo(pacienteBusquedaCita).on("value", function (snapshot) {
        var datos = snapshot.val();
        for (var key in datos) {
            // if(){

            // }
            var botonEdit = ' <button type="button" key="' + key + '" onclick="editarPaciente(this)" > <i class=\"fa fa-pencil\" aria-hidden=\"true\" ></i> </button>';
            var botonVer = ' <button type="button" key="' + key + '" onclick="editarPaciente(this)" > <i class=\"fa fa-trash\" aria-hidden=\"true\" ></i> </button>';
            filasTablaPacientes += "<tr>" +
                "<td>" + botonEdit + botonVer + " </td>" +
                "<td>" + datos[key].title + "</td>" +
                "<td>" + datos[key].idPaciente + "</td>" +
                //"<td>" + datos[key].sexoPaciente + "</td>" +
                //"<td>" + datos[key].celularPaciente + "</td>" +
                //"<td>" + datos[key].direccionPaciente + "</td>" +
                "</tr>";
        }
        tablaCitas.innerHTML = filasTablaPacientes;
    });
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

function calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
}

function cargarCitasDiaDoctor() {
    var user = firebase.auth().currentUser;
    var refCitas = firebase.database().ref().child("eventos/");
    var datos;
    var resul = refCitas.orderByChild("idProfecional").equalTo(user.uid).on("value", function (snapshot) {
        datos = snapshot.val();
        var eventos = [];
        for (var key in datos) {
            if (datos[key].confirmada) {
                //alert("confirmada");
                eventos.push(datos[key]);
            }
        }
        $('#calendarDoctor').fullCalendar({
            defaultView: 'listDay',
            eventSources: [
                eventos,
            ],
            eventClick: function (calEvent, jsEvent, view) {
                $(document).ready(function () {
                    try {
                        if (sessionStorage.getItem("loginDoctor") != null) {
                            goHistorioaClinica(calEvent);
                        } else {
                            $('#opciones').load('pages/doctores/loginDoctor.html'); 
                        }
                    } catch (error) {
                        $('#opciones').load('pages/citas/citasDiaDoctor.html');
                    }
                });
            }
        });
    });
}

function goHistorioaClinica(calEvent) {
    $('#opciones').load('pages/historiasClinicas/historiasClinicas.html');

    var generoPaciente = "";
    var edadPacienteHv = "";
    var nombrePacienteHv = "";
    var refPaciente = firebase.database().ref("pacientes/" + calEvent.idPaciente).once('value').then(function (sn) {
        var dato = sn.val();
        edadPacienteHv = dato['fechaPaciente']
        generoPaciente = dato['sexoPaciente'];
        nombrePacienteHv = dato['primerNombrePaciente'] + ' ' + dato['segundoNombrePaciente'] + ' ' + dato['primerApellidoPaciente'];
    });

    var refHistoriasClinicas = firebase.database().ref("historiasClinicas/" + calEvent.idPaciente).once('value').then(function (snapshot1) {
        var datos1 = snapshot1.val();
        $("#fechaConsultaHv").val(new Date);
        $("#sesionesHv").val(datos1['sesionesHv']);
        $("#planManejoHv").val(datos1['planManejoHv']);
        $('#medicoRemiteHv').val(datos1['medicoRemiteHv']);
        $("#edadPacienteHv").val(calcularEdad(edadPacienteHv));
        $("#nombrePacienteHv").val(nombrePacienteHv);
        $("#identificacionPacienteHv").val(calEvent.idPaciente);
        $("#generoPacienteHv").val(generoPaciente);
        $("#motivoConsultaPacienteHv").val(calEvent.motivo);
        $("#idHistoriaClinica").val(calEvent.idPaciente);
        $('#fumaPacienteHv').prop('checked', datos1['fuma']);
        $('#alcoholPacienteHv').prop('checked', datos1['alcoholicas']);
        $('#usoDrogasPacienteHv').prop('checked', datos1['usadrogas']);
        $("#tipoAlimentacionPacienteHv").val(datos1['alimentacion']);
        $("#medicamentosPacienteHv").val(datos1['medicamentosPacienteHv']);
        $("#alergiasPacienteHv").val(datos1['alergias']);
        $("#socialesPacienteHv").val(datos1['antecedentesSociales']);
        $("#familiaresPacienteHv").val(datos1['antecedentesFamiliares']);
    });
}

function cargarCitasDiaAux() {
    var user = firebase.auth().currentUser;
    var refCitas = firebase.database().ref().child("eventos/");
    var datos;
    var resul = refCitas.orderByChild("idProfecional").equalTo(user.uid).on("value", function (snapshot) {
        datos = snapshot.val();
        var eventos = [];
        console.log(datos);
        for (var key in datos) {

            if (!datos[key].confirmada) {

                eventos.push(datos[key]);
            }

            // alert(eventos);
            // console.log(datos[key]);
        }
        $('#calendarAux').fullCalendar({
            defaultView: 'listDay',
            eventSources: [
                eventos,
            ],
            eventClick: function (calEvent, jsEvent, view) {
                $("#confirmarCita").modal("show");
                document.getElementById("idCitaDiaAux").value = calEvent.id;
                document.getElementById("costoCita").value = calEvent.costo;
            }
        });
    });

}

function guardarConfirmacion() {

    var id = document.getElementById("idCitaDiaAux").value;
    var costoCita = document.getElementById("costoCita").value;
    refEvento = firebase.database().ref("eventos/" + id);
    //alert("confirmada: "+costoCita);

    refEvento.update({
        confirmada: true,
        costo: costoCita
    });
    $("#confirmarCita").modal("hide");
    cargarDespuesGuardarCitasAux()
}