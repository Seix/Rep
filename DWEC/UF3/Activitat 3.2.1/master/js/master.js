var master = (function()
{
    var filaAleatoria = [];
    var filaUsuario = [];

    //Función para generar una fila aleatoria
    function generarFilaAleatoria()
    {
        for (var i = 0; i < 5; i++)
        {
            var clase = "";
            switch (Math.floor(Math.random() * 6))
            {
                case 0:
                    clase = "I";
                    break;
                case 1:
                    clase = "II";
                    break;
                case 2:
                    clase = "III";
                    break;
                case 3:
                    clase = "IV";
                    break;
                case 4:
                    clase = "V";
                case 5:
                    clase = "VI";
                    break;
            }
            filaAleatoria[i] = clase;
        }
        console.log("Fila aleatoria: " + filaAleatoria);
    }

    function comprobarBolas(bolas)
    {
        var existen = [];
        var existenPlus = [];
        var nada = [];
        var final = [];

        for (var i = 0; i < 5; i++)
        {
            res = comprobarBola(bolas[i]);

            if (res == "no")
            {
                nada.push(res);
            }
            else if (res == "ko")
            {
                existen.push(res);
            }
            else if (res == "ok")
            {
                existenPlus.push(res);
            }
        }

        if (existenPlus.length > 0)
        {
            final.push.apply(final, existenPlus);
        }
        if (existen.length > 0)
        {
            final.push.apply(final, existen);
        }
        if (nada.length > 0)
        {
            final.push.apply(final, nada);
        }

        return final;
    }
    
    function comprobarBolas()
    {
        var resultado = [];
        
        for(var i = 0; i < 5; i++)
        {
            var res = "no";
            
            for(var j = 0; j < 5; i++)
            {
                if(filaUsuario[i] == filaAleatoria[j])
                {
                    res = "ko";
                    
                    if(i == j)
                    {
                       res = "ok"; 
                    }
                }
                resultado.push(res);
            }
        }
        
        return resultado;
    }
    
    function comprobarBola(bola)
    {
        var num = bola[4];
        console.log(bola + " : " + num);
        var res = "no";
        var i = 0;
        var claseBola = document.getElementById(bola).getAttribute("class").valueOf().split(" ")[1];

        while (i < 5 && res == "no")
        {
            if (filaAleatoria[i] == claseBola)
            {
                res = "ko";

                if (num == i)
                {
                    res = "ok";
                }
            }
            i++;
        }
        console.log("Resultado comprobación: Bola " + num + " + clase " + claseBola + " = " + res);
        return res;
    }

    function setFilaUsuario(fila)
    {
        filaUsuario = fila;
    }

    return{
        pub_comprobarBolas: comprobarBolas,
        pub_generarFilaAleatoria: generarFilaAleatoria,
        pub_setFilaUsuario: setFilaUsuario
    }
}());