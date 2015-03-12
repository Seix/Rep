var masterui = (function () {
    var inicio = true;
    var resultados = [];
    var numIntento;

    //Función de control de dificultad en slider
    function slider() {

        $("#slider").slider({
            value: config.pub_propDificultad(),
            min: 1,
            max: 10,
            step: 1,
            slide: function (event, ui) {
                $("#dificultad").val(ui.value);
                config.pub_setPropDificultad(ui.value);
            }
        });
        $("#dificultad").val($("#slider").slider("value"));
    }

    //Función para cambio de color de bola
    function cambioColorBola() {
        $(".selector").click(function () {
            var parent = $(this).attr("parent");
            var val = $(this).attr("class").split(" ")[1];
            $("#" + parent).removeClass("no I II III IV V VI");
            $("#" + parent).addClass(val);
        });
    }

    //Función para iniciar/continuar con el juego
    function jugarPartida() {
        $("#btn-juego").click(function () {
            if (inicio)
            {
                inicializarJuego();
                master.pub_generarFilaAleatoria();
                inicio = false;
            }

            getFilaUsuariohtml();
            resultados = master.pub_comprobarBolas();
            numIntento++;
            generarFila();

            if (acabado() || master.pub_isAcertado())
            {
                if (master.pub_isAcertado())
                {
                    alert("¡¡Has ganado!!");
                }
                else
                {
                    alert("Has perdido");
                }

                reiniciarJuego();
            }
            estadoBoton();
        });
    }

    //Función que genera una fila de una partida jugada por el usuario
    function generarFila()
    {
        var fila = "";

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

        $("#jugadas").prepend(fila);
        setNumIntento();
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

    function setNumIntento()
    {
        document.getElementById("intento").textContent = numIntento;
    }

    //Función que controla el número de intentos jugados y permite que se pueda
    //seguir jugando o no.
    function acabado()
    {
        numIntento = document.getElementById("intento").textContent;
        var estado = false;

        if (numIntento > config.pub_propDificultad())
        {
            estado = true;
            document.getElementById("intento").textContent = 1
        }
        return estado;
    }

    function getFilaUsuariohtml()
    {
        var jugada = [];

        for (var i = 0; i < 5; i++)
        {
            jugada[i] = (getClassBola("bola" + i)).split(" ")[1];
        }
        master.pub_setFilaUsuario(jugada);
    }

    //Función para limpiar las jugadas anteriores
    function limpiarJugadas()
    {
        $("#jugadas").empty();
    }

    //Función para limpiar las bolas
    function limpiarBolas()
    {
        for (var i = 0; i < 5; i++)
        {
            $("#bola" + i).removeClass("I II III IV V VI");
            $("#bola" + i).addClass("no");
        }
    }

    function reiniciarJuego()
    {
        limpiarJugadas();
        limpiarBolas();
        inicio = true;
        numIntento = 1;
        setNumIntento();
    }
    
    function inicializarJuego()
    {
        limpiarJugadas();
        inicio = true;
        numIntento = 1;
        setNumIntento();
    }

    function estadoBoton()
    {
        var btnTxt = document.getElementById("btn-juego").textContent;

        if (btnTxt == "Empezar a jugar" && !acabado)
        {
            document.getElementById("btn-juego").textContent = "Comprobar jugada";
        }
        else if (btnTxt == "Comprobar jugada" && acabado)
        {
            document.getElementById("btn-juego").textContent = "Reinicar juego";
        }
        else if (btnTxt == "Reiniciar juego")
        {
            document.getElementById("btn-juego").textContent = "Empezar a jugar";
        }

    }
    
    function filtrarTeclado()
    {
        $("#txtbx-juego").keypress(function(key)
        {
            if(key.wich === 13)
            {
                var texto = document.getElementById("txtbx-juego").textContent;
                //else if (/^[0-6]+$/.test(cadena))
                if($.inArray("[a-zA-Z6-9]", texto) !== -1)
                {
                   convertirCadena(texto); 
                }
                else
                {
                    alert("Datos introducidos incorrectos");
                }
            }
        });
    }
    
    function convertirCadena(texto)
    {
        var filaCon = [];
        for(var i = 0; i < texto.length; i++)
        {
            filaCon.push(master.pub_numToRoman(texto[i]));
        }
    }
    
    
    
    
    
    
    
    
    
    function filtrarTeclado()
    {
        //Entraremos dentro cuando le demos a Enter
        if(event.keyCode == 13){
            var cadena = document.getElementById(event.data.campo).value;        
            
            //La primera comprobacion sera si la cadena esta vacia
            if (cadena == "") {
                alert('Escribe un número.');
            }
            
            //La segunda comprobacion es si la cadena es menor a 5
            else if (cadena.length < 5) {
                alert('No has escrito el número entero.');
            }
            
            //La siguiente comprobacion es una expresion regular que entrara 
            //si la cadena solo tiene valores del 0-6 si es asi ejecuta otra funcion
            else if (/^[0-6]+$/.test(cadena)) {
                cadenacolores(cadena);
            }
            
            //Si no hay alguna cosa correcta salta un alert
            else {
                alert('Escribe bien el número.');
            } 
        }
    }

    //Devolución de métodos públicos
    return{
        pub_slider: slider,
        pub_cambioColorBola: cambioColorBola,
        pub_jugarPartida: jugarPartida,
        pub_filtrarTeclado : filtrarTeclado
    }
}());