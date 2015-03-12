var utils = (function () 
{
    //Función que recibe un entero y lo muetra como número romano (0-9) = (I-X)
    function numToRoman(num)
    {
        var val;
        switch(num)
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
        
    return
    {                 
        pub_numToRoman : numToRoman
    } 
}());