var events = (function () {

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
            console.log("Para entrar en modo debug haz doble click en el título de la página.");
            console.error("Dejan de funcionar los selectores al cambiar el número de bolas desde el modo debug");
        });
    }
    return {
        pub_empezar: empezar
    }
}());



