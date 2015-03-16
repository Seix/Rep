var utils = (function ()
{
    
    //Función para convertir un array de enteros introducida a numeros romanos
    function convertToRoman(texto)
    {
        var filaCon = [];
        for (var i = 0; i < texto.length; i++)
        {
            filaCon.push(numToRoman(texto[i]));
        }
        return filaCon;
    }
    
    //Función que recibe un entero y lo muetra como número romano (0-9) = (I-X)
    function numToRoman(num)
    {
        var val;
        if(num == 0 || num == "0")
        {
            val = "no";
        }
        else if(num == 1 || num == "1")
        {
            val = "I";
        }
        else if(num == 2 || num == "2")
        {
            val = "II";
        }
        else if(num == 3 || num == "3")
        {
            val = "III";
        }
        else if(num == 4 || num == "4")
        {
            val = "IV";
        }
        else if(num == 5 || num == "5")
        {
            val = "V";
        }
        else if(num == 6 || num == "6")
        {
            val = "VI";
        }
        else if(num == 7 || num == "7")
        {
            val = "VII";
        }
        else if(num == 8 || num == "8")
        {
            val = "VIII";
        }
        else if(num == 9 || num == "9")
        {
            val = "IX";
        }
   
        return val;
    }

    return{
        pub_convertToRoman: convertToRoman,
        pub_numToRoman: numToRoman
    }
}());