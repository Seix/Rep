var events = (function () {
//http://www.w3schools.com/html/html5_webstorage.asp
    //Empieza todo el funcionamiento del juego
    function empezar() {
        $(document).ready(function () {
            masterui.pub_crearPanelJuego();
            masterui.pub_slider();
            masterui.pub_cambioColorBola();
            masterui.pub_jugarPartida();
            masterui.pub_filtrarTeclado();
            masterui.pub_modoDebug();
            masterui.pub_debugConfig();
        });
    }
    return {
        pub_empezar: empezar
    }
}());



