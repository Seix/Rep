var config = (function (){
    
    var dif = 10;
    var repCol = true;
    var debug = false;
    var bolas = 5;
    var fila = ["I", "VI", "IV", "I", "V"];

    return{
        pub_dificultad: dif,
        pub_repetirColores: repCol,
        pub_debug: debug,
        pub_cantidadBolas: bolas,
        pub_fila: fila
    }
}());