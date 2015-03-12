var master = (function ()
{
    /*
     * Comprobar contador OK KO, no funciona si bolas != 5 y hay problemas con
     * repetición de bolas
     */
    
    var filaAleatoria = [];
    var filaUsuario = [];
    var bolasOk = [];
    //var filaAleatoriaExtra = [];
    //var filaUsuarioExtra = [];
    var aciertos;

    //Función para generar una fila aleatoria
    function generarFilaAleatoria()
    {
        //Llenamos el array aleatorio
        if (config.pub_debug)
        {
            filaAleatoria.push("I", "VI", "IV", "I", "no");
            console.log("Fila aleatoria: " + filaAleatoria);
        }
        else
        {
            while (filaAleatoria.length < config.pub_cantidadBolas)
            {
                aciertos = 0;

                //Generamos un número aleatorio y lo convertimos a número romano
                //para hacerlo coincidir con la clase que necesitaremos
                var ran = Math.floor(Math.random() * 6);
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
        }
    }

    //Contador de bolas de la jugada que cumplen con color y posición respecto
    //al array aleatorio
    function cuantasBolasOk()
    {
        var count = 0;
        for (var i = 0; i < config.pub_cantidadBolas; i++)
        {
            var j = 0;
            var encontrada = false;

            while (j < config.pub_cantidadBolas && !encontrada)
            {
                if (filaUsuario[i] === filaAleatoria[j] && i === j)
                {
                    encontrada = true;
                    bolasOk.push(filaUsuario[i]);
                    count++;
                }
                j++;
            }
        }

        return count;
    }

    //Contador de bolas de la jugada que aparecen en el array aleatorio
    function cuantasBolasKo()
    {
        var count = 0;
        for (var i = 0; i < config.pub_cantidadBolas; i++)
        {
            var j = 0;
            var encontrado = false;
            while (j < config.pub_cantidadBolas && !encontrado)
            {
                if (filaUsuario[i] === filaAleatoria[j] && /*$.inArray(filaAleatoria[i], bolasOk)*/ filaUsuario[i] != filaAleatoria[i])
                {
                    count++;
                    encontrado = true;
                }
                j++;
            }
        }
        return count;
    }

    //Función que compara las bolas generadas aleatoriamente al principio del
    //juego con las de la jugada del usuario proporcionando la pista al usuario.
    function comprobarBolas()
    {
        var resultado = [];

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

        while (resultado.length <= 5)
        {
            resultado.push("no");
        }

        return resultado;
    }
    
    function isAcertado()
    {
        var result = false;

        if (aciertos === 5)
        {
            result = true;
        }
        return result;
    }
    
    function setFilaUsuario(fila)
    {
        filaUsuario = fila;
    }

    return{
        pub_comprobarBolas: comprobarBolas,
        pub_generarFilaAleatoria: generarFilaAleatoria,
        pub_setFilaUsuario: setFilaUsuario,
        pub_isAcertado: isAcertado
    }
}());