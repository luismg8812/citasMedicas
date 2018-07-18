function guardarHistoriaClinica() {

    var m = moment().format($("#fechaConsultaHv").val());
    
    //alert(m);
    var refHistoriasClinicas = firebase.database().ref("historiasClinicas/" + $("#identificacionPacienteHv").val());
    refHistoriasClinicas.update({
        alcoholicas: $('#alcoholPacienteHv').prop('checked'),
        alergias: $("#alergiasPacienteHv").val(),
        alimentacion: $("#tipoAlimentacionPacienteHv").val(),
        antecedentesFamiliares: $("#familiaresPacienteHv").val(),
        antecedentesSociales: $("#socialesPacienteHv").val(),
        fuma: $('#fumaPacienteHv').prop('checked'),
        sesionesHv: $("#sesionesHv").val(),
        medicoRemiteHv: $("#medicoRemiteHv").val(),
        planManejoHv: $("#planManejoHv").val(),
        medicamentosPacienteHv: $("#medicamentosPacienteHv").val(),
        usoDrogas: $('#usoDrogasPacienteHv').prop('checked')
    });
    var doctor = sessionStorage.getItem("loginDoctor");
    console.log(doctor);
    var refConsultas = firebase.database().ref("consultas/");
    refConsultas.push({
        evolucion: $("#enfermedadActualPacienteHv").val(),
        fecha: m,
        identificacionDoctor: doctor,
        identificacionPaciente: $("#identificacionPacienteHv").val(),
        diagnosticoPacienteHv: $("#diagnosticoPacienteHv").val(),

        motivoConsulta: $("#motivoConsultaPacienteHv").val()

    });
    $('#opciones').load('pages/citas/citasDiaDoctor.html');
}

function traeConsultas() {
    var filasConsultas = "";
    var identificacionBusquedaPaciente = document.getElementById("idHistoriaClinica").value;
    var refConsulta = firebase.database().ref().child("consultas/");
    var resul = refConsulta.orderByChild("identificacionPaciente").equalTo(identificacionBusquedaPaciente).on("value", function (snapshot) {
        var datos = snapshot.val();
        var numConsultas = 0;
        for (var key in datos) {
            filasConsultas += '<div class="form-group row mb-0">'
                + '<label for="fechaConsulta_' + numConsultas + '" class="col-sm-3 col-md-3 col-form-label">Fecha Consulta:</label>'
                + '<div class="col-sm-12 col-md-9">'
                + '<input readonly class="form-control" id="fechaConsulta_' + numConsultas + '" value="' + datos[key].fecha + '">'
                + '</div>'
                + '</div>'
                + '<div class="form-group row mb-0">'
                + '<label for="motivoConsulta_' + numConsultas + '" class="col-sm-3 col-form-label">Motivo Consulta: </label>'
                + '<div class="col-sm-12 col-md-9">'
                + '<textarea class="form-control" readonly id="motivoConsulta_' + numConsultas + '" rows="2" style="height: 200px;line-height:15px">' + datos[key].motivoConsulta + '</textarea>'
                + '</div>'
                + '</div>'
                + '<div class="form-group row mb-0">'
                + '<label for="motivoConsulta_' + numConsultas + '" class="col-sm-3 col-form-label">Diagnóstico: </label>'
                + '<div class="col-sm-12 col-md-9">'
                + '<textarea class="form-control" readonly id="diagnostico_' + numConsultas + '" rows="2" style="height: 200px;line-height:15px">' + datos[key].diagnosticoPacienteHv + '</textarea>'
                + '</div>'
                + '</div>'
                + '<div class="form-group row">'
                + '<label for="evolucionConsulta_' + numConsultas + '" class="col-sm-3 col-form-label">Evolución: </label>'
                + '<div class="col-sm-12 col-md-9">'
                + '<textarea class="form-control" readonly id="evolucionConsulta_' + numConsultas + '" rows="2" style="height: 200px;line-height:15px">' + datos[key].evolucion + '</textarea>'
                + '</div>'
                + '</div> <br/>';
            diagnosticoPacienteHv
            numConsultas++;
        }
        document.getElementById('consultas').innerHTML = filasConsultas;
    });

}


function imprimirFormulacion() {
    var pdf = new jsPDF('p', 'pt', 'letter');
    pdf.setFont('arial');
    source = $('#content')[0];
    specialElementHandlers = {
        '#bypassme': function (element, renderer) {
            return true
        }
    };
    margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
    };
    pdf.fromHTML(
        source, // HTML string or DOM elem ref.
        margins.left, // x coord
        margins.top, { // y coord
            'width': margins.width, // max width of content on PDF
            'elementHandlers': specialElementHandlers
        },
        function (dispose) {
            var fontSizeTitle = 20;
            var fontSizeText = 12;
            var user = firebase.auth().currentUser;
            var refUsuarios = firebase.database().ref("usuarios/" + user.uid);
            refUsuarios.once("value", function (snap) {
                var datos = snap.val();
                pdf.setFontSize(fontSizeTitle);
                pdf.setFontType('bold')
                pdf.text(datos['nombreProfecional'], 50, 50);
                pdf.setFontSize(fontSizeText);
                pdf.setFontType('normal');
                pdf.text('Dirección: ' + datos['direccionProfecional'], 50, 60);
                pdf.text('Celular: ' + datos['celularProfecional'], 50, 70);
                pdf.text('Fijo: ' + datos['fijoProfecional'], 50, 80);
                pdf = splictTexto(pdf, 'R:/  ' + $("#formulacion").val(), 50, 100);
                pdf.save('Formula' + datos['nombreProfecional'] + '.pdf');
            });
        }, margins
    );
}

function imprimirHistoriaClinica() {
    var pdf = new jsPDF('p', 'pt', 'letter');
    pdf.setFont('arial');
    source = $('#content')[0];
    specialElementHandlers = {
        '#bypassme': function (element, renderer) {
            return true
        }
    };
    margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
    };
    pdf.fromHTML(
        source, // HTML string or DOM elem ref.
        margins.left, // x coord
        margins.top, { // y coord
            'width': margins.width, // max width of content on PDF
            'elementHandlers': specialElementHandlers
        },
        function (dispose) {
            var fontSizeTitle = 20;
            var fontSizeText = 12;
            var user = firebase.auth().currentUser;
            var generoPaciente = "";
            var edadPacienteHv = "";
            var nombrePacienteHv = "";
            var estadoCivilPaciente = "";
            var escolaridadPaciente = "";
            var direccionPaciente = "";
            var celularPaciente = "";
            var medicoRemiteHv ="";
            var sesionesHv = "";
            var antecedentesSociales = "";
            var identificacionBusquedaPaciente = document.getElementById("idHistoriaClinica").value;
            var refPaciente = firebase.database().ref("pacientes/" + identificacionBusquedaPaciente).once('value').then(function (sn) {
                var dato = sn.val();
                edadPacienteHv = dato['fechaPaciente']
                estadoCivilPaciente = dato['estadoCivilPaciente'];
                generoPaciente = dato['sexoPaciente'];
                escolaridadPaciente = dato['EscolaridadPaciente'];
                direccionPaciente = dato['direccionPaciente'];
                celularPaciente = dato['celularPaciente'];
                nombrePacienteHv = dato['primerNombrePaciente'] + ' ' + dato['segundoNombrePaciente'] + ' ' + dato['primerApellidoPaciente'];
            });
            var refHistoriasClinicas = firebase.database().ref("historiasClinicas/" + identificacionBusquedaPaciente).once('value').then(function (snapshot1) {
                var datos1 = snapshot1.val();
                //$("#fechaConsultaHv").val(new Date);
                sesionesHv=datos1['sesionesHv'];
                //$("#planManejoHv").val(datos1['planManejoHv']);
                medicoRemiteHv=datos1['medicoRemiteHv'];
                // $("#edadPacienteHv").val(calcularEdad(edadPacienteHv));
                // $("#nombrePacienteHv").val(nombrePacienteHv);
                // $("#identificacionPacienteHv").val(calEvent.idPaciente);
                // $("#generoPacienteHv").val(generoPaciente);
                // $("#motivoConsultaPacienteHv").val(calEvent.motivo);
                // $("#idHistoriaClinica").val(calEvent.idPaciente);
                // $('#fumaPacienteHv').prop('checked', datos1['fuma']);
                // $('#alcoholPacienteHv').prop('checked', datos1['alcoholicas']);
                // $('#usoDrogasPacienteHv').prop('checked', datos1['usadrogas']);
                // $("#tipoAlimentacionPacienteHv").val(datos1['alimentacion']);
                // $("#medicamentosPacienteHv").val(datos1['medicamentosPacienteHv']);
                // $("#alergiasPacienteHv").val(datos1['alergias']);
                antecedentesSociales=datos1['antecedentesSociales'];
                //$("#familiaresPacienteHv").val(datos1['antecedentesFamiliares']);
            });

            var refUsuarios = firebase.database().ref("usuarios/" + user.uid);
            refUsuarios.once("value", function (snap) {
                var datos = snap.val();
                pdf.setFontSize(fontSizeTitle);
                pdf.setFontType('bold')
                pdf.text(datos['nombreProfecional'], 50, 50);
                pdf.setFontSize(fontSizeText);
                pdf.setFontType('arial');
                pdf.text('NIT: ' + datos['identificacionProfecional'] + " FISIOTERAPEUTA - CLARA XIMENA MAZABEL C", 50, 60);
                pdf.text('Dirección: ' + datos['direccionProfecional'] + "; TELEFONO: " + datos['celularProfecional'], 50, 70);

                pdf.text('                 EVOLUCIÓN DE INGRESO – TERAPIA FISICA', 50, 100);
                pdf.text('', 50, 110);
                pdf.text('Nombres y apellidos: ' + nombrePacienteHv, 50, 120);
                pdf.text('Fecha de Nacimiento: ' + edadPacienteHv + ';  Edad: ' + calcularEdad(edadPacienteHv) + ';  Documento de identidad: ' + identificacionBusquedaPaciente, 50, 130);
                pdf.text('Género: ' + generoPaciente + ';  Estado Civil: ' + estadoCivilPaciente, 50, 140);
                pdf.text('Escolarida: ' + escolaridadPaciente + ';  Dirección: ' + direccionPaciente + ';  Teléfono: ' + celularPaciente, 50, 150);
                pdf.text('Médico Remitente: '+medicoRemiteHv, 50, 170);
                pdf.text('Número de Sesiones: '+sesionesHv, 50, 180);
                pdf = splictTexto(pdf, 'ANTECEDENTES: ' + antecedentesSociales, 50, 190);
                var height = pdf.internal.pageSize.height;
                console.log(pdf);
                pdf.save('Historia_clinica' + datos['nombreProfecional'] + '.pdf');
                
            });
        }, margins
    );
}

function splictTexto(pdf, texto, x, y) {
    var lines = [];
    var tope = 100;
    var topeY = 700;
    var i;
    var linea = '';
    var yInicio = y;
    for (i = 0; i < texto.length; i++) {
        if ((linea.length >= tope && texto[i] == ' ') || texto[i] == '\n') {
            lines.push(linea);
            linea = '';
        } else {
            linea += texto[i];
        }
    }
    lines.push(linea);
    for (var indice in lines) {
        pdf.text(lines[indice], x, y);
        y += 10;
        if (y > topeY) {
            y = yInicio;
            pdf.addPage();
        }
    }
    console.log(lines);
    return pdf;


}

function alinearTexto(texto) {
    alert(texto);
}

function buscarHistoriasClinicas() {
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