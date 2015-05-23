var segregationui = (function () {

    var clickCounter;
    
    //Función que genera el tablero desde cero
    function mostrarEnTablero(tableroJuego)
    {
        //Limpiamos en contenido dentro del div #tableroJuegoSegregation
        $("#tableroJuegoSegregation").empty();
        var texto = "";
        
        texto += "<table id='tableroJuego' class='text-center' style='width: 310px;'>";
        var i = 0;
        var j = 0;
        
        //Empezamos a crear el tablero según el alto y ancho establecidos
        for (j = 0; j < config.pub_alto; j++)
        {
            //Nueva fila
            texto += "<tr fila='" + j + "'>";
            for (i = 0; i < config.pub_ancho; i++)
            {
                //Nueva columna, lo que correspondrería a una celda: nueva casilla
                texto += "<td class='casilla' columna='" + i + "'>";
                
                //Si en el objeto tablero hay bola, la representamos
                if (tableroJuego.matriz[i][j].bolaCasilla !== null)
                {
                    texto += "<div class='bola " + tableroJuego.matriz[i][j].bolaCasilla.color + " " +
                            tableroJuego.matriz[i][j].bolaCasilla.estado + "' />";
                }
            }
            texto += "</tr>";
        }
        texto += "</table>";
        
        //Finalmente escribimos el código resultante en el HTML.
        $("#tableroJuegoSegregation").append(texto);
    }
    
    //Función que actualiza las posiciones de las bolas en el tablero
    function actualizarBolasTablero(tableroJuego)
    {
        var i = 0;
        var j = 0;
        var tabla = $("#tableroJuego");
        
        //Recorremos las casillas de la tabla en el HTML y del objeto tablero
        for (j = 0; j < config.pub_alto; j++)
        {
            //Nos plantamos en la fila
            var fila = $(tabla).find("tr")[j];

            for (i = 0; i < config.pub_ancho; i++)
            {
                //Nos plantamos en la columna: casilla
                var casilla = $(fila).find(".casilla")[i];
                
                //Eliminamos el contenido anterior al de la casilla. Llegados
                //a este punto, no sabemos si ha cambiado el contenido o no, pero
                //este caso servirá para ambos casos
                $(casilla).empty();
                
                //Representamos la bola si es que esta existe en el objeto tablero
                if (tableroJuego.matriz[i][j].bolaCasilla !== null)
                {
                    var texto = "<div class='bola " + tableroJuego.matriz[i][j].bolaCasilla.color + " " +
                            tableroJuego.matriz[i][j].bolaCasilla.estado + "' />";
                    $(casilla).append(texto);
                }
            }
        }
    }

    //Función que controla los clicks del jugador en el tablero permitiendo
    //mover a un espacio la última bola seleccionada préviamente
    function seleccionarCasilla(){
        $(".casilla").click(function() {
            
            //Segundo caso, segundo click: cambiamos la bola de sitio,
            //volvemos a comprobar el estado de las bolas del tablero
            if ($(this).find(".bola").length === 0 && clickCounter === 1)
            {
                console.log("Mover bola");
                clickCounter = 0;
                //console.log("Casilla vacía");
                var x = $(this).attr("columna");
                var y = $(this).parent("tr").attr("fila");
                segregation.pub_moverACasilla(x, y);
                //Empieza a dejar de funcionar evento
                segregation.pub_comprobarBolas();
            }
            //Primer paso, primer click: simplemente nos guardamos la bola que
            //deseamos mover
            else
            {
                console.log("Seleccionar bola");
                clickCounter = 1;
                var x = $(this).attr("columna");
                var y = $(this).parent("tr").attr("fila");
                segregation.pub_seleccionBola(x, y);
            }
        });
    }

    /*
     *  Todos los controles Slider reiniciarán el juego para evitar conflictos
     *  entre los datos representados y los existentes
     */

    //Función para controlar la cantidad de bolas azules en el tablero
    function sliderBolasAzules() {

        $("#sliderBolasAzules").slider({
            value: config.pub_totalAzules,
            min: 5,
            max: config.pub_maxBolas,
            step: 1,
            slide: function(event, ui) {
                $("#cantidadBolasAzules").val(ui.value);
                config.pub_totalAzules = ui.value;
                segregation.pub_regenerarContenidoTablero();
            }
        });
        $("#cantidadBolasAzules").val($("#sliderBolasAzules").slider("value"));
    }
    
    //Función para controlar la cantidad de bolas verdes en el tablero
    function sliderBolasVerdes() {

        $("#sliderBolasVerdes").slider({
            value: config.pub_totalVerdes,
            min: 5,
            max: config.pub_maxBolas,
            step: 1,
            slide: function(event, ui) {
                $("#cantidadBolasVerdes").val(ui.value);
                config.pub_totalVerdes = ui.value;
                segregation.pub_regenerarContenidoTablero();
            }
        });
        $("#cantidadBolasVerdes").val($("#sliderBolasVerdes").slider("value"));
    }
    
    //Función para indicar con cuantas bolas verdes desea estar en contacto una
    //bola verde
    function sliderBolasVerdesQuierenVerdes() {

        $("#sliderBolasVerdesQuierenVerdes").slider({
            value: config.pub_verdes_verdes,
            min: 1,
            max: config.pub_maxParejas,
            step: 1,
            slide: function(event, ui) {
                $("#cantidadBolasVerdesQuierenVerdes").val(ui.value);
                config.pub_verdes_verdes = ui.value;
                segregation.pub_regenerarContenidoTablero();
            }
        });
        $("#cantidadBolasVerdesQuierenVerdes").val($("#sliderBolasVerdesQuierenVerdes").slider("value"));
    }
    
    //Función para indicar con cuantas bolas azules desea estar en contacto una
    //bola verde
    function sliderBolasVerdesQuierenAzules() {

        $("#sliderBolasVerdesQuierenAzules").slider({
            value: config.pub_verdes_azules,
            min: 0,
            max: config.pub_maxParejas,
            step: 1,
            slide: function(event, ui) {
                $("#cantidadBolasVerdesQuierenAzules").val(ui.value);
                config.pub_verdes_azules = ui.value;
                segregation.pub_regenerarContenidoTablero();
            }
        });
        $("#cantidadBolasVerdesQuierenAzules").val($("#sliderBolasVerdesQuierenAzules").slider("value"));
    }
    
    //Función para indicar con cuantas bolas azules desea estar en contacto una
    //bola azul
    function sliderBolasAzulesQuierenAzules() {

        $("#sliderBolasAzulesQuierenAzules").slider({
            value: config.pub_azules_azules,
            min: 1,
            max: config.pub_maxParejas,
            step: 1,
            slide: function(event, ui) {
                $("#cantidadBolasAzulesQuierenAzules").val(ui.value);
                config.pub_azules_azules = ui.value;
                segregation.pub_regenerarContenidoTablero();
            }
        });
        $("#cantidadBolasAzulesQuierenAzules").val($("#sliderBolasAzulesQuierenAzules").slider("value"));
    }
    
    //Función para indicar con cuantas bolas verdes desea estar en contacto una
    //bola azul
    function sliderBolasAzulesQuierenVerdes() {

        $("#sliderBolasAzulesQuierenVerdes").slider({
            value: config.pub_azules_verdes,
            min: 0,
            max: config.pub_maxParejas,
            step: 1,
            slide: function(event, ui) {
                $("#cantidadBolasAzulesQuierenVerdes").val(ui.value);
                config.pub_azules_verdes = ui.value;
                segregation.pub_regenerarContenidoTablero();
            }
        });
        $("#cantidadBolasAzulesQuierenVerdes").val($("#sliderBolasAzulesQuierenVerdes").slider("value"));
    }

    //Devolución de métodos públicos
    return{
        pub_mostrarEnTablero: mostrarEnTablero,
        pub_seleccionarCasilla: seleccionarCasilla,
        pub_actualizarBolasTablero: actualizarBolasTablero,
        pub_sliderBolasAzules: sliderBolasAzules,
        pub_sliderBolasVerdes: sliderBolasVerdes,
        pub_sliderBolasAzulesQuierenVerdes: sliderBolasAzulesQuierenVerdes,
        pub_sliderBolasAzulesQuierenAzules: sliderBolasAzulesQuierenAzules,
        pub_sliderBolasVerdesQuierenVerdes: sliderBolasVerdesQuierenVerdes,
        pub_sliderBolasVerdesQuierenAzules: sliderBolasVerdesQuierenAzules
    }
}());