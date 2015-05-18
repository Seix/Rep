var events = (function () {

    //Empieza todo el funcionamiento del juego
    function empezar() {
        $(document).ready(function () {
            //Primera función, inicializa por primera vez el juego: se encarga
            //de generar el tablero según el tamaño establecido
            segregation.pub_crearTablero();
            
            //Resto de funciones para controlar las acciones del usuario con la 
            //interfaz web
            segregationui.pub_seleccionarCasilla();
            segregationui.pub_sliderBolasAzules();
            segregationui.pub_sliderBolasVerdes();
            segregationui.pub_sliderBolasAzulesQuierenVerdes();
            segregationui.pub_sliderBolasAzulesQuierenAzules();
            segregationui.pub_sliderBolasVerdesQuierenVerdes();
            segregationui.pub_sliderBolasVerdesQuierenAzules();
        });
    }
    return {
        pub_empezar: empezar
    }
}());



