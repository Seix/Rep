var master = (function ()
{
    var filaAleatoria = [];
    var filaUsuario = [];
    var aciertos;

    //Función para generar una fila aleatoria
    function generarFilaAleatoria()
    {
        //Llenamos el array aleatorio
        while (filaAleatoria.length < 5)
        {
            aciertos = 0;
            
            //Generamos un número aleatorio y lo convertimos a número romano
            //para hacerlo coincidir con la clase que necesitaremos
            var ran = Math.floor(Math.random() * 6);
            var clase = utils.pub_numToRoman(ran);
            
            //Comprobamos en el fichero de configuración si puede o no
            //repetirse un mismo color antes de guardar un valor
            if (!config.pub_propRepetirColores())
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

    //Contador de bolas de la jugada que cumplen con color y posición respecto
    //al array aleatorio
    function cuantasBolasOk()
    {
        var count = 0;

        for (var i = 0; i < 5; i++)
        {
            var j = 0;
            var encontrada = false;

            while (j < 5 && !encontrada)
            {
                if (filaUsuario[i] === filaAleatoria[j] && i === j)
                {
                    encontrada = true;
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
        var encontradas = [];

        for (var i = 0; i < 5; i++)
        {
            var j = 0;

            while (j < 5)
            {
                if (filaUsuario[i] === filaAleatoria[j] && $.inArray(filaUsuario[i], encontradas) === -1)
                {
                    count++;
                    encontradas.push(filaUsuario[i]);
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

    function setFilaUsuario(fila)
    {
        filaUsuario = fila;
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


    return{
        pub_comprobarBolas: comprobarBolas,
        pub_generarFilaAleatoria: generarFilaAleatoria,
        pub_setFilaUsuario: setFilaUsuario,
        pub_isAcertado: isAcertado
    }
}());