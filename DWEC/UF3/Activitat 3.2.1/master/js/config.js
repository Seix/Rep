var config = ( function () 
{
    var dificulad;
    
    function setDificultad(nivel)
    {
        dificultad = nivel;
    }
    
    function getDificultad()
    {
        return dificultad;
    }
    
    return{                 
        pub_getDificultad : getDificultad,
        pub_setDificultad : setDificultad
    } 
}());