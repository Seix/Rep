var config = (function (){
    
    var dif = 10;
    var repCol = true;
    var debug = false;
    var bolas = 4;
    var fila = ["I", "VI", "IV", "I"];

    return{
        pub_dificultad: dif,
        pub_repetirColores: repCol,
        pub_debug: debug,
        pub_cantidadBolas: bolas,
        pub_fila: fila
    }
}());