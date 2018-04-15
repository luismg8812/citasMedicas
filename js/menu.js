function opcionMenu(op) {
    var key = op.id;
    switch (key) {
        case 'pacientes':
            $(document).ready(function () {
                $('#opciones').load('pages/pacientes/pacientes.html');           
            });

            break;
            case 'doctores':
            $(document).ready(function () {
                $('#opciones').load('pages/doctores/doctores.html');           
            });

            break;

        case 'agregarCita':
            $(document).ready(function () {
                $('#opciones').load('pages/citas/nuevaCita.html');
            });

            break;
        case 'agendarCita':
            $(document).ready(function () {
                $('#opciones').load('pages/citas/nuevaCita.html');
            });
            break;
        case 'buscarCitaPaciente':
            $(document).ready(function () {
                $('#opciones').load('pages/citas/citas.html');
            });
            break;
        case 'citaDiaAuxiliar':
            $(document).ready(function () {
                $('#opciones').load('pages/citas/citasDiaAuxiliar.html');
            });
            break;
            case 'citaDiaDoctorOp':
            $(document).ready(function () {
                $('#opciones').load('pages/citas/citasDiaDoctor.html');
            });
            break;    
            
        case 'profecionales':
            $(document).ready(function () {
                $('#opciones').load('pages/usuarios/usuarios.html');
                cargarCamposProfecional();//foncion dentro del js de usuarios
            });
            break;

        default:
            $(document).ready(function () {
                $('#opciones').load('construccion.html');
            });
            break;
    }
    $("#navbarNavDropdown").collapse('hide');
}