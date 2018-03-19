function guardarHistoriaClinica() {
   
    $('#fumaPacienteHv').prop('checked');
    $('#alcoholPacienteHv').prop('checked');
    $('#usoDrogasPacienteHv').prop('checked');
    $("#tipoAlimentacionPacienteHv").val();
    $("#medicamentosPacienteHv").val();
    $("#alergiasPacienteHv").val();
    $("#socialesPacienteHv").val();
    $("#familiaresPacienteHv").val();
    $("#identificacionPacienteHv").val();
    //alert($("#identificacionPacienteHv").val());
    var m = moment().format();
    //alert(m);
    var refHistoriasClinicas = firebase.database().ref("historiasClinicas/"+$("#identificacionPacienteHv").val());
        refHistoriasClinicas.update({
            alcoholicas:$('#alcoholPacienteHv').prop('checked'),
            alergias: $("#alergiasPacienteHv").val(),
            alimentacion:$("#tipoAlimentacionPacienteHv").val(),
            antecedentesFamiliares: $("#familiaresPacienteHv").val(),
            antecedentesSociales:$("#socialesPacienteHv").val(),
            fuma:$('#fumaPacienteHv').prop('checked'),
            usoDrogas: $('#usoDrogasPacienteHv').prop('checked')
        });
        var refConsultas = firebase.database().ref("consultas/");
        refConsultas.push({
            evolucion: $("#enfermedadActualPacienteHv").val(),
            fecha:m,
            identificacionPaciente:$("#identificacionPacienteHv").val(),
            motivoConsulta:$("#motivoConsultaPacienteHv").val()

        });
   
}

function traeConsultas() {
    var filasConsultas = "";
    var identificacionBusquedaPaciente = document.getElementById("idHistoriaClinica").value;
    var refConsulta = firebase.database().ref().child("consultas/");
    var resul = refConsulta.orderByChild("identificacionPaciente").equalTo(identificacionBusquedaPaciente).on("value", function (snapshot) {
        var datos = snapshot.val();
        var numConsultas = 0;
        for (var key in datos) {
            filasConsultas+=   '<div class="form-group row mb-0">'
            +'<label for="fechaConsulta_'+numConsultas+'" class="col-sm-3 col-md-3 col-form-label">Fecha Consulta:</label>'
            +'<div class="col-sm-12 col-md-3">'
            +    '<input readonly class="form-control-plaintext" id="fechaConsulta_'+numConsultas+'" value="'+datos[key].fecha+'">'
            +'</div>'
            +'</div>'
            +'<div class="form-group row mb-0">'
            +  '<label for="motivoConsulta_'+numConsultas+'" class="col-sm-3 col-form-label">Motivo Consulta: </label>'
            +  '<div class="col-sm-12 col-md-3">'
            +     '<input readonly class="form-control-plaintext" id="motivoConsulta_'+numConsultas+'" value="'+datos[key].motivoConsulta+'">'
            +  '</div>'
            +'</div>'
            +'<div class="form-group row">'
            +  '<label for="evolucionConsulta_'+numConsultas+'" class="col-sm-3 col-form-label">Evolución: </label>'
            +  '<div class="col-sm-12 col-md-3">'
            +     '<input readonly class="form-control-plaintext" id="evolucionConsulta_'+numConsultas+'" value="'+datos[key].evolucion+'">'
            +  '</div>'
            +'</div> <br/>';
            numConsultas++;
        }
        document.getElementById('consultas').innerHTML = filasConsultas;
    });


}