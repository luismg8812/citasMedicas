function guardarHistoriaClinica() {

    var m = moment().format();
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

        usoDrogas: $('#usoDrogasPacienteHv').prop('checked')
    });
    var refConsultas = firebase.database().ref("consultas/");
    refConsultas.push({
        evolucion: $("#enfermedadActualPacienteHv").val(),
        fecha: m,
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
function imprimirHv() {
    var texto = "ormally, both your asses would be dead as fucking fried chicken, but you happen to pull this shit while I'm in a transitional period so I don't wanna kill you, I wanna help you. But I can't give you this case, it don't belong to me. Besides, I've already been through too much shit this morning over this case to hand it over to your dumb ass.";
    var pdf = new jsPDF('p', 'pt', 'letter');
    pdf.setFont('arial');
    source = $('#content')[0];

    // we support special element handlers. Register them with jQuery-style 
    // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
    // There is no support for any other type of selectors 
    // (class, of compound) at this time.
    specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector
        '#bypassme': function (element, renderer) {
            // true = "handled elsewhere, bypass text extraction"
            return true
        }
    };
    margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
    };
    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case
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
                console.log(datos['nombreProfecional']);
                pdf.text(datos['nombreProfecional'], 50, 50);
                pdf.setFontSize(fontSizeText);
                pdf.setFontType('normal');
                pdf.text(datos['nombreProfecional'], 50, 50);
                pdf.save('Test.pdf');
            });
           
            
        }, margins
    );

}

function alinearTexto(texto){
    alert(texto);
}

function buscarHistoriasClinicas(){
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