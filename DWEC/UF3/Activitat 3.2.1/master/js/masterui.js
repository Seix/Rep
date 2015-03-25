var masterui = (function() {

    var inicio = true;
    var resultados = [];
    var numIntento;

    //Funci�n de control de dificultad en slider, determina el n�mero de intentos
    function slider() {

        $("#slider").slider({
            value: config.pub_dificultad,
            min: 1,
            max: 10,
            step: 1,
            slide: function(event, ui) {
                $("#dificultad").val(ui.value);
                config.pub_dificultad = ui.value;
            }
        });
        $("#dificultad").val($("#slider").slider("value"));
    }

    //Funci�n para cambio de color de bola con el selector de color
    function cambioColorBola() {
        $(".selector").click(function() {
            var parent = $(this).attr("parent");
            var val = $(this).attr("class").split(" ")[1];
            $("#" + parent).removeClass("no I II III IV V VI");
            $("#" + parent).addClass(val);
        });
    }

    //Funci�n que captura el evento del bot�n de juego
    function jugarPartida() {
        $("#btn-juego").click(function()
        {
            partida();
        });
    }

    //Funci�n para iniciar/continuar con el juego
    function partida() {
        if (inicio)
        {
            inicializarJuego();
            master.pub_generarFilaBolas();
            inicio = false;
            $("#slider").slider("disable");
        }
        
        //Obtenemos fila introducida por el usuario
        getFilaUsuariohtml();
        //Recuperamos los resultados de comprobar la fila del usuario con la 
        //generada en la partida
        resultados = master.pub_comprobarBolas();
        numIntento++;
        //Mostramos el resultado de la comparaci�n (pistas)
        generarFila();

        //Vamos comprobando si la partida ha finalizado o no seg�n el l�mite
        //de intentos o si ha descubierto el c�digo oculto
        if (acabado() || master.pub_isAcertado())
        {
            if (master.pub_isAcertado())
            {
                alert("��Has ganado!!");
            }
            else
            {
                alert("Has perdido");
            }
            datosLocales(master.pub_isAcertado());
            reiniciarJuego();
        }
        //Cambiamos el texto del bot�n seg�n en el punto en el que se encuentre el usuario
        estadoBoton();
    }

    //Funci�n que genera una fila de una partida jugada por el usuario as� como
    //los resultados de �sta
    function generarFila()
    {
        var fila = "";

        fila += "<div class='clearfix fila text-center'>\n\
                    <div class='col-lg-12 col-md-12 col-sm-12 contenido-fila'>";
        
        //Generamos los elementos Bola introducidos por el usuario
        for (var i = 0; i < config.pub_cantidadBolas; i++)
        {
            fila += "<div class='col-xs-1 paddingcero'>\n\
                            <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>\n\
                                <div class='" + getClassBola("bola" + i) + "'></div>\n\
                            </div>\n\
                        </div>";
        }
        
        //Generamos n�mero de intento jugado
        fila += "<div class='col-xs-2'>\n\
                            <span class='num-intento'>" + getNumIntento() + "</span>\n\
                        </div>";

        //Generamos los elementos Bola que dan pista al usuario
        for (var i = 0; i < config.pub_cantidadBolas; i++)
        {
            fila += "<div class='col-xs-1'>\n\
                            <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>\n\
                                <div class='" + resultados[i] + " bola'></div>\n\
                            </div>\n\
                        </div>";
        }

        fila += "</div>\n\
                </div>";

        //Escribimos en el HTML todo el c�digo generado
        $("#jugadas").prepend(fila);
        //Establecemos el n�mero de intento para el siguiente intento
        setNumIntento();
    }

    //Funci�n para obtener el color de una bola recibida por par�metro
    function getClassBola(bola)
    {
        return document.getElementById(bola).getAttribute("class").valueOf();
    }

    //Funci�n para obtener el n�mero de intento en el que se encuentra el usuario
    function getNumIntento()
    {
        return document.getElementById("intento").textContent;
    }

    //Modifica el n�mero de intento en el panel de juego
    function setNumIntento()
    {
        document.getElementById("intento").textContent = numIntento;
    }

    //Funci�n que controla el n�mero de intentos jugados y permite que se pueda
    //seguir jugando o no.
    function acabado()
    {
        numIntento = document.getElementById("intento").textContent;
        var estado = false;

        if (numIntento > config.pub_dificultad)
        {
            estado = true;
            document.getElementById("intento").textContent = 1
        }
        return estado;
    }

    //Funci�n para obtener la fila del usuario desde el HTML
    function getFilaUsuariohtml()
    {
        var jugada = [];

        for (var i = 0; i < config.pub_cantidadBolas; i++)
        {
            jugada[i] = (getClassBola("bola" + i)).split(" ")[1];
        }
        master.pub_setFilaUsuario(jugada);
    }

    //Funci�n para limpiar las jugadas anteriores
    function limpiarJugadas()
    {
        $("#jugadas").empty();
    }

    //Funci�n para limpiar las bolas
    function limpiarBolas()
    {
        for (var i = 0; i < config.pub_cantidadBolas; i++)
        {
            $("#bola" + i).removeClass("I II III IV V VI");
            $("#bola" + i).addClass("no");
        }
    }

    //Inicializa, limpia y setea variables para el inicio una nueva partida
    function reiniciarJuego()
    {
        limpiarJugadas();
        limpiarBolas();
        inicio = true;
        numIntento = 1;
        setNumIntento();
        $("#slider").slider("enable");
    }

    //Inicializa, limpia y setea variables para el inicio del juego
    function inicializarJuego()
    {
        limpiarJugadas();
        inicio = true;
        numIntento = 1;
        setNumIntento();
    }

    //Funci�n que cambia el texto del bot�n seg�n el estado del juego
    function estadoBoton()
    {
        if (!inicio && !acabado())
        {
            document.getElementById("btn-juego").textContent = "Comprobar jugada";
        }
        else if (inicio)
        {
            document.getElementById("btn-juego").textContent = "Empezar a jugar";
        }

    }

    //Funci�n que filtra los datos introducidos en el campo de texto del panel
    //de juego
    function filtrarTeclado()
    {
        $("#txtbx-juego").keydown(function(key)
        {
            if (key.keyCode === 13)
            {
                var texto = document.getElementById("txtbx-juego").value;

                if (/^[0-6]+$/.test(texto))
                {
                    var colores = utils.pub_convertToRoman(texto);
                    colorearBolas(colores);
                    partida();
                }
                else
                {
                    alert("Solo valores num�ricos de 0-6");
                }
            }
        });
    }

    //Funci�n que cambia el color de las bolas a partir de un array recibido
    //por par�metro
    function colorearBolas(colores)
    {
        for (var i = 0; i < colores.length; i++)
        {
            $("#bola" + i).removeClass("no I II III IV V VI");
            $("#bola" + i).addClass(colores[i]);
        }
    }

    //Funci�n que crea el panel de juego necesario para la cantidad de bolas configuradas
    function crearPanelJuego()
    {
        var texto = "";
        $("#filaJugada").empty();

        //Generamos conjunto Bola-Selector seg�n la cantidad de Bolas que va a ser jugada cada partida
        for (var i = 0; i < config.pub_cantidadBolas; i++)
        {
            texto += "<div class='col-xs-1 paddingcero'>\n\
                        <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>\n\
                            <div id='bola" + i + "' class='no bola'></div>\n\
                            </div>\n\
                        <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 selector-group'>\n\
                            <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 paddingcero'>\n\
                                <div class='col-md-4 I selector' parent=bola" + i + ">1</div>\n\
                                <div class='col-md-4 II selector' parent=bola" + i + ">2</div>\n\
                                <div class='col-md-4 III selector' parent=bola" + i + ">3</div>\n\
                            </div>\n\
                            <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 paddingcero'>\n\
                                <div class='col-md-4 IV selector' parent=bola" + i + ">4</div>\n\
                                <div class='col-md-4 V selector' parent=bola" + i + ">5</div>\n\
                                <div class='col-md-4 VI selector' parent=bola" + i + ">6</div>\n\
                            </div>\n\
                        </div>\n\
                    </div>";
        }

        texto += "<div class='col-xs-2'><span id='intento' class='num-intento'>1</span></div>\n\
                    <div class='col-xs-1'></div>\n\
                    <div class='col-xs-1'></div>\n\
                    <div class='col-xs-3'>\n\
                        <button id='btn-juego' class='btn-primary btn-juego'>Empezar a jugar</button>\n\
                    </div>";

        $("#filaJugada").append(texto);
        
        //Limpiamos campos de juego r�pido y fila oculta del modo debug a ""
        $("#txtbx-juego").prop("maxlength", config.pub_cantidadBolas);
        $("#config-bolas").prop("maxlength", config.pub_cantidadBolas);
    }
    
    //Usamos LocalStorage para guardar la cantidad de partidas jugadas y el
    //resultado de la �ltima
    function datosLocales(acertado)
    {
        var contador = localStorage.getItem("Contador");

        if (contador === 'undefined')
        {
            contador = 0;
            localStorage.setItem("Contador", contador);
        }
        else
        {
            contador++;
            localStorage.setItem("Contador", contador);
        }

        if (acertado)
        {
            localStorage.setItem("Partida", contador + " Ganada");
        }
        else
        {
            localStorage.setItem("Partida", contador + " Perdida");
        }
    }


    //Funci�n que activa/desactiva modo debug cuando el usuario hace doble click
    //en el t�tulo de la p�gina
    function modoDebug()
    {
        $("#titulo").on("dblclick", (function()
        {
            if (config.pub_debug == false)
            {
                config.pub_debug = true;
                alert("Activado modo debug");
                reiniciarJuego();
            }
            else
            {
                config.pub_debug = false;
                alert("Desactivado modo debug");
                reiniciarJuego();
            }
            herramientas();
        }));
    }

    //Funci�n que muestra o no las herramientas del modo debug
    function herramientas()
    {
        if (config.pub_debug)
        {
            $("#herramientas").show();
        }
        else
        {
            $("#herramientas").hide();
        }
    }

    //Pendiente de probar: Funci�n que captura los eventos/valores introducidos en las
    //herramientas de debug
    function debugConfig()
    {
        //Cambiamos configuraci�n de cantidad de bolas de la partida
        $("#config-num-bolas").keydown(function(key)
        {
            //Si el c�digo de tecla es el de "Enter"...
            if (key.keyCode === 13)
            {
                var val = document.getElementById("config-num-bolas").value;
                //Filtramos valores
                if (/[2-8]/.test(val))
                {
                    config.pub_cantidadBolas = val;
                    crearPanelJuego();
                    
                    $("#txtbx-juego").prop("value", "");
                    $("#config-bolas").prop("value", "");
                    pub_cambioColorBola();
                }
                else
                {
                    alert("Solo valores num�ricos (2-8)");
                }
            }
        });

        //Cambiamos configuraci�n de la fila oculta introducida manualmente en
        //modo debug
        $("#config-bolas").keydown(function(key)
        {
            if (key.keyCode === 13)
            {
                var texto = document.getElementById("config-bolas").value;

                if (/^[0-6]+$/.test(texto))
                {
                    var colores = utils.pub_convertToRoman(texto);
                    config.pub_fila = colores;
                }
                else
                {
                    alert("Solo valores num�ricos de 0-6");
                }
            }
        });
        
        //Cambiamos configuraci�n para permitir o no repetici�n de colores en la
        //fila oculta
        $("#config-rep-bolas").change(function()
        {
            pub_repetirColores = $(this).prop('checked');
        });
    }

    //Devoluci�n de m�todos p�blicos
    return{
        pub_slider: slider,
        pub_cambioColorBola: cambioColorBola,
        pub_jugarPartida: jugarPartida,
        pub_filtrarTeclado: filtrarTeclado,
        pub_crearPanelJuego: crearPanelJuego,
        pub_modoDebug: modoDebug,
        pub_debugConfig: debugConfig
    }
}());