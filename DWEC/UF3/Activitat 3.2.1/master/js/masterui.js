var masterui = ( function () {
    var acabado = false;
    var inicio = true;
    var jugada = [];
    
    //Función de control de dificultad en slider
    function slider() {
        config.pub_setDificultad(10);
        $("#slider").slider({
            value: 10,
            min: 1,
            max: 10,
            step: 1,
            slide: function ( event, ui ) {
                $("#dificultad").val(ui.value);
                config.pub_setDificultad(ui.value);
            }
        });
        $("#dificultad").val($("#slider").slider("value"));
    }               
    
    //Función para cambio de color de bola
    function cambioColorBola(){
        
        $(".selector").click(function(){
            var parent = $(this).attr("parent");
            var val = $(this).attr("class").split(" ")[1];
            $("#" + parent).removeClass("no I II III IV V VI");
            $("#" + parent).addClass(val);            
        });
    }
    
    //Función para iniciar/continuar con el juego
    function jugarPartida() {
        $("#btn-juego").click(function () {
            if (!acabado)
            {
                if (inicio)
                {
                    master.pub_generarFilaAleatoria();
                    inicio = false;
                }
                generarFila();
            }
            else
            {
                limpiarJugadas();
                limpiarBolas();
                
                acabado = true;
                inicio = true;
            }
        });
    }
    
    //Función para obtener el color de una bola recibida por parámetro
    function getClassBola(bola)
    {
        return document.getElementById(bola).getAttribute("class").valueOf();
    }
    
    //Función para obtener el número de intento en el que se encuentra el usuario
    function getNumIntento()
    {
        return document.getElementById("intento").textContent;
    }
    
    //Función que controla el número de intentos jugados y permite que se pueda
    //seguir jugando o no.
    function contador()
    {
        var numIntento = document.getElementById("intento").textContent;

        if (numIntento < config.pub_getDificultad())
        {
            numIntento++;
        }
        else
        {
            alert("Has acabado");
            acabado = true;
            numIntento = 1;
        }
        document.getElementById("intento").textContent = numIntento;
    }
    
    //Función que genera una fila de una partida jugada por el usuario
    function generarFila()
    {
        var fila = "";
        var resultados = [];
        
        fila += "<div class='clearfix fila text-center'>\n\
                    <div class='col-lg-12 col-md-12 col-sm-12 contenido-fila'>\n\
                    <div class='col-lg-1 col-md-1 col-sm-1 col-xs-1 paddingcero'>\n\
                    <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>";
        fila += "<div class='" + getClassBola("bola0") + "'></div>";
        fila += "</div>\n\
                    </div>\n\
                    <div class='col-xs-1 paddingcero' >\n\
                    <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>";
        fila += "<div class='" + getClassBola("bola1") + "'></div>";
        fila += "</div>\n\
                    </div>\n\
                    <div class='col-xs-1 paddingcero'>\n\
                    <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>";
        fila += "<div class='" + getClassBola("bola2") + "'></div>";
        fila += "</div>\n\
                    </div>\n\
                    <div class='col-xs-1 paddingcero' >\n\
                    <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>";
        fila += "<div class='" + getClassBola("bola3") + "'></div>";
        fila += "</div>\n\
                    </div>\n\
                    <div class='col-xs-1 paddingcero' >\n\
                    <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>";
        fila += "<div class='" + getClassBola("bola4") + "'></div>";
        fila += "</div>\n\
                    </div>\n\
                    <div class='col-xs-2'>"
        fila += "<span class='num-intento'>" + getNumIntento() + "</span></div>";
        fila += "<div class='col-xs-1'>\n\
                    <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>";
        resultados = master.pub_comprobarBolas(getJugada());
        
        fila += "<div class='" + resultados[0] + " bola'></div>";
        fila += "</div>\n\
                    </div>\n\
                    <div class='col-xs-1'>\n\
                    <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>";
        fila += "<div class='" + resultados[1] + " bola'></div>";
        fila += "</div>\n\
                    </div>\n\
                    <div class='col-xs-1'>\n\
                    <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>";
        fila += "<div class='" + resultados[2] + " bola'></div>";
        fila += "</div>\n\
                    </div>\n\
                    <div class='col-xs-1'>\n\
                    <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>";
        fila += "<div class='" + resultados[3] + " bola'></div>";
        fila += "</div>\n\
                    </div>\n\
                    <div class='col-xs-1'>\n\
                    <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>";
        fila += "<div class='" + resultados[4] + " bola'></div>";
        fila += "</div>\n\
                    </div>\n\
                    </div>\n\
                    </div>";

        contador();

        $("#jugadas").prepend(fila)
        limpiarBolas();
    }
    
    //Función para limpiar las jugadas anteriores
    function limpiarJugadas()
    {
        $("#jugadas").empty();
    }
    
    //Función para limpiar las bolas
    function limpiarBolas()
    {
        for(var i = 0; i < 5; i++)
        {
            $("#bola" + i).removeClass("I II III IV V VI");
            $("#bola" + i).addClass("no");   
        }
    }
    
    function getJugada()
    {
        var jugada = [];
        
        for(var i = 0; i < 6; i++)
        {
            jugada[i] = "bola"+i;
        }
        
        return jugada;
    }
    
    //Devolución de métodos públicos
    return{                 
        pub_slider : slider,
        pub_cambioColorBola : cambioColorBola,
        pub_jugarPartida : jugarPartida
    } 
}());