var events = (function () {

    function empezar() {
        $(document).ready(function () {
            masterui.pub_slider();
            masterui.pub_cambioColorBola();
            masterui.pub_jugarPartida();
        });
    }
    return {
        pub_empezar: empezar
    }
}());



