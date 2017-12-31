function opcionMenu(op) {
    var key = op.id;
    switch (key) {
        case 'pacientes':
            $(document).ready(function () {
                $('#opciones').load('pages/pacientes/pacientes.html');
            });
           
            break;
        case 'profecionales':
            $(document).ready(function () {
                $('#opciones').load('construccion.html');
            });
             // alert('entro a profecionales');
            break;

        default:
            break;
    }
    $("#navbarNavDropdown").collapse('hide');
}