function opcionMenu(op) {
    var key = op.id;
    switch (key) {
        case 'pacientes':
            $(document).ready(function () {
                $('#opciones').load('pages/pacientes/pacientes.html');
            });

            break;
        case 'agregarCita':
            $(document).ready(function () {
                $('#opciones').load('pages/citas/nuevaCita.html');
               // nuevaCita();
            });
            
            break;
            case 'buscarCitaPaciente':
            $(document).ready(function () {
                $('#opciones').load('pages/citas/citas.html');
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