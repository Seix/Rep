var events = (function () {

    //Empieza todo el funcionamiento del juego
    function empezar() {
        $(document).ready(function () {
            masterui.pub_crearPanelJuego();
            masterui.pub_slider();
            masterui.pub_cambioColorBola();
            masterui.pub_jugarPartida();
            masterui.pub_filtrarTeclado();
        });
    }
    return {
        pub_empezar: empezar
    }
}());



