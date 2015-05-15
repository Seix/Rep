var events = (function () {

    //Empieza todo el funcionamiento del juego
    function empezar() {
        $(document).ready(function () {
            segregation.pub_crearTablero();
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



