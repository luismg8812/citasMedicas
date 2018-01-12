function nuevaCita(){
   
   // 
}

function cargarCitas(){
    var user = firebase.auth().currentUser;
    var refCitas = firebase.database().ref().child("eventos/");
    var datos;
    var temp;
    var resul = refCitas.orderByChild("idProfecional").equalTo(user.uid).on("value", function (snapshot) {
         datos = snapshot.val();
         var eventos=[];
         for (var key in datos) {
            eventos.push(datos[key]);
            alert(eventos);
            console.log(datos[key]); 
         }
         $('#calendar').fullCalendar({
            dayClick: function(date, jsEvent, view) {

                alert('Clicked on: ' + date.format());
        
                alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
        
                alert('Current view: ' + view.name);
        
                // change the day's background color just for fun
                $(this).css('background-color', 'red');
        
            },
            eventSources:[ 
                eventos,
            ]   
           })
    });
        
//alert("carga citas");
}