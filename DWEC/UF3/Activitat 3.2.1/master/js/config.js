var config = (function () 
{
    //N�mero de intentos. Inicialmente a 10
    var dif = 10;
    //Permitir reperici�n de colores al generar autom�ticamente.
    var repCol = true;
    
    function propDificultad()
    {
        return dif;
    }
    
    function setPropDificultad(valor)
    {
        dif = valor;
        console.log("Dificultad: " + dif);
    }
    
    function propRepetirColores()
    {
        return repCol;
    }
    
    function setPropRepetirColores(valor)
    {
        repetirColores = valor;
        console.log("Repeticion de colores: " + repCol);
    }
    
    return{                 
        pub_setPropDificultad : setPropDificultad,
        pub_propDificultad : propDificultad,
        pub_setPropRepetirColores : setPropRepetirColores,
        pub_propRepetirColores : propRepetirColores
    } 
}());