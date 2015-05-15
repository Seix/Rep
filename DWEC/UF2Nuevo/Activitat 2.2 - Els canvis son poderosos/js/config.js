var config = (function (){
    
    var alto = 10;
    var ancho = 10;
    var totalAzules = Math.round((alto * ancho) / 4);
    var totalVerdes = Math.round((alto * ancho) / 4);
    var azules_azules = 1;
    var azules_verdes = 1;
    var verdes_azules = 1;
    var verdes_verdes = 1;
    
    var maxBolas = Math.round((alto * ancho) / 4);
    var maxParejas = 4;

    return{
        pub_alto: alto,
        pub_ancho: ancho,
        pub_totalAzules: totalAzules,
        pub_totalVerdes: totalVerdes,
        pub_azules_azules: azules_azules,
        pub_azules_verdes: azules_verdes,
        pub_verdes_azules: verdes_azules,
        pub_verdes_verdes: verdes_verdes,
        pub_maxBolas: maxBolas,
        pub_maxParejas: maxParejas
    }
}());