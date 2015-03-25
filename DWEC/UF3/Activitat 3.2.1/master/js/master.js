var master = (function ()
{
    var filaAleatoria = [];
    var filaUsuario = [];
    var filaAleatoriaExtra = [];
    var filaUsuarioExtra = [];
    var aciertos;

    //Función para generar una fila aleatoria
    function generarFilaBolas()
    {
        //Llenamos el array aleatorio
        if (config.pub_debug)
        {
            filaAleatoria = config.pub_fila;
            console.log("Fila aleatoria: " + filaAleatoria);
        }
        else
        {
            while (filaAleatoria.length < config.pub_cantidadBolas)
            {
                aciertos = 0;

                //Generamos un número aleatorio y lo convertimos a número romano
                //para hacerlo coincidir con la clase que necesitaremos
                var ran = Math.floor(Math.random() * 6) +1;
                var clase = utils.pub_numToRoman(ran);

                //Comprobamos en el fichero de configuración si puede o no
                //repetirse un mismo color antes de guardar un valor
                if (!config.pub_repetirColores)
                {
                    if ($.inArray(clase, filaAleatoria) === -1) {

                        filaAleatoria.push(clase);
                    }
                }
                else
                {
                    filaAleatoria.push(clase);
                }
            }
            console.log("Fila aleatoria: " + filaAleatoria);
            config.pub_fila = filaAleatoria;
        }
    }

    //Contador de bolas de la jugada que cumplen con color y posición respecto
    //al array aleatorio
    function cuantasBolasOk()
    {
        var count = 0;
        for (var i = filaUsuarioExtra.length -1; i >= 0 ; i--)
        {
            if (filaUsuarioExtra[i] === filaAleatoriaExtra[i])
            {
                filaAleatoriaExtra.splice(i, 1);
                filaUsuarioExtra.splice(i, 1);
                count++;
            }
        }

        return count;
    }

    //Contador de bolas de la jugada que aparecen en el array aleatorio
    function cuantasBolasKo()
    {
        var count = 0;
        for (var i = filaUsuarioExtra.length -1; i >= 0 ; i--)
        {
            var j =  filaAleatoriaExtra.length -1;
            var encontrado = false;
            while (j >= 0 && !encontrado)
            {
                if (filaUsuarioExtra[i] === filaAleatoriaExtra[j])
                {
                    count++;
                    encontrado = true;
                    filaUsuarioExtra.splice(i, 1);
                    filaAleatoriaExtra.splice(j, 1);
                }
                j--;
            }
        }
        return count;
    }

    //Función que compara las bolas generadas aleatoriamente al principio del
    //juego con las de la jugada del usuario proporcionando la pista al usuario.
    function comprobarBolas()
    {
        var resultado = [];
        filaAleatoriaExtra = [].concat(filaAleatoria);
        filaUsuarioExtra = [].concat(filaUsuario);

        var bolaOk = cuantasBolasOk();
        var bolaKo = cuantasBolasKo();

        aciertos = bolaOk;

        for (var i = 0; i < bolaOk; i++)
        {
            resultado.push("ok");
        }

        for (var i = 0; i < bolaKo; i++)
        {
            resultado.push("ko");
        }

        while (resultado.length <= config.pub_cantidadBolas)
        {
            resultado.push("no");
        }

        return resultado;
    }
    
    //Función que compara el número de aciertos con la cantidad de bolas del juego
    function isAcertado()
    {
        var result = false;

        if (aciertos === config.pub_cantidadBolas)
        {
            result = true;
        }
        return result;
    }
    
    //Función que setea la fila introducida por el usuario
    function setFilaUsuario(fila)
    {
        filaUsuario = fila;
    }

    return{
        pub_comprobarBolas: comprobarBolas,
        pub_generarFilaBolas: generarFilaBolas,
        pub_setFilaUsuario: setFilaUsuario,
        pub_isAcertado: isAcertado
    }
}());