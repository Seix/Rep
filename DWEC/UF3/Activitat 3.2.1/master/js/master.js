var master = (function()
    {
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
            if(config.pub_propDebug)
            {
                filaAleatoria.push("I", "VI", "IV", "I", "no");
                console.log("Fila aleatoria: " + filaAleatoria);
            }
            else
            {
                while (filaAleatoria.length < 5)
                {
                    aciertos = 0;

                    //Generamos un número aleatorio y lo convertimos a número romano
                    //para hacerlo coincidir con la clase que necesitaremos
                    var ran = Math.floor(Math.random() * 6);
                    var clase = numToRoman(ran);

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
            }
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
            for (var i = 0; i < 5; i++)
            {
                var j = 0;

                while (j < 5)
                {
                    if (filaUsuario[i] === filaAleatoria[j] && $.inArray(filaAleatoria[i], bolasOk) === -1)
                    {
                        count++;
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
            //filaAleatoriaExtra = filaAleatoria;
            //filaUsuarioExtra = filaUsuario;

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

        //Función que recibe un entero y lo muetra como número romano (0-9) = (I-X)
        function numToRoman(num)
        {
            var val;
            switch (num)
            {
                case 0:
                    val = "I";
                    break;
                case 1:
                    val = "II";
                    break;
                case 2:
                    val = "III";
                    break;
                case 3:
                    val = "IV";
                    break;
                case 4:
                    val = "V";
                    break;
                case 5:
                    val = "VI";
                    break;
                case 6:
                    val = "VII";
                    break;
                case 7:
                    val = "VIII";
                    break;
                case 8:
                    val = "IX";
                    break;
                case 9:
                    val = "X";
                    break;
            }
            return val;
        }

        return{
            pub_comprobarBolas: comprobarBolas,
            pub_generarFilaAleatoria: generarFilaAleatoria,
            pub_setFilaUsuario: setFilaUsuario,
            pub_isAcertado: isAcertado,
            pub_numToRoman: numToRoman
        }
    }());