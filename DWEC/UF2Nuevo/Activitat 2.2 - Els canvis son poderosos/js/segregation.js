var segregation = (function () {

    var tableroJuego = null;
    var casillaJugada = null;

    function Bola(color) {
        this.color = color;
        this.estado = "sad";

        this.comprobarEstado = function (x, y, tab) {
            var verdesCount = 0;
            var azulesCount = 0;

            /*
             *  O e e e O
             *  e X X X e
             *  e X X X e
             *  O e e e O
             */

            //Casos X
            if (x > 0 && x < config.pub_ancho - 1 && y > 0 && y < config.pub_alto - 1)
            {
                //console.log("Caso X (" + x + ", " + y + ")");
                /*
                 *  1 2 3
                 *  4 X 5
                 *  6 7 8
                 */

                //1
                if (comprobarNW(tab, x, y) !== "") {                    
                    if(comprobarNW(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarNW(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                //2
                if (comprobarN(tab, x, y) !== "") {                    
                    if(comprobarN(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarN(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                //3
                if (comprobarNE(tab, x, y) !== "") {                    
                    if(comprobarNE(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarNE(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                //4
                if (comprobarW(tab, x, y) !== "") {                    
                    if(comprobarW(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarW(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                //5
                if (comprobarE(tab, x, y) !== "") {                    
                    if(comprobarE(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarE(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                //6
                if (comprobarSW(tab, x, y) !== "") {                    
                    if(comprobarSW(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarSW(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                //7
                if (comprobarS(tab, x, y) !== "") {                    
                    if(comprobarS(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarS(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                //8
                if (comprobarSE(tab, x, y) !== "") {                    
                    if(comprobarSE(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarSE(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
            }
            //Casos O
            else if (x === 0 && y === 0) 
            {
                //console.log("Caso O - NW (" + x + ", " + y + ")");
                /*
                 *  O 1
                 *  2 3
                 */

                if (comprobarE(tab, x, y) !== "") {                    
                    if(comprobarE(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarE(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                if (comprobarS(tab, x, y) !== "") {                    
                    if(comprobarS(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarS(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                if (comprobarSE(tab, x, y) !== "") {                    
                    if(comprobarSE(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarSE(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
            }
            else if (x === config.pub_ancho - 1 && y === 0)
            {
                //console.log("Caso O - NE (" + x + ", " + y + ")");
                /*
                 *  1 O
                 *  2 3
                 */

                if (comprobarW(tab, x, y) !== "") {                    
                    if(comprobarW(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarW(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                if (comprobarSW(tab, x, y) !== "") {                    
                    if(comprobarSW(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarSW(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                if (comprobarS(tab, x, y) !== "") {                    
                    if(comprobarS(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarS(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
            }
            else if(x === 0 && y === config.pub_alto - 1)
            {
                //console.log("Caso O - SW (" + x + ", " + y + ")");
                /*
                 *  1 2
                 *  0 3
                 */
                
                if (comprobarN(tab, x, y) !== "") {                    
                    if(comprobarN(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarN(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                if (comprobarNE(tab, x, y) !== "") {                    
                    if(comprobarNE(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarNE(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                if (comprobarE(tab, x, y) !== "") {                    
                    if(comprobarE(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarE(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
            }
            else if(x === 0 && y === config.pub_alto - 1)
            {
                //console.log("Caso X - SE (" + x + ", " + y + ")");
                /*
                 *  1 2
                 *  3 0
                 */
                
                if (comprobarNW(tab, x, y) !== "") {                    
                    if(comprobarNW(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarNW(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                if (comprobarN(tab, x, y) !== "") {                    
                    if(comprobarN(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarN(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                if (comprobarSW(tab, x, y) !== "") {                    
                    if(comprobarSW(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarSW(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
            }
            //Casos e
            else if(x === 0 && y > 0 && y < config.pub_alto -1)
            {
                //console.log("Caso e - W (" + x + ", " + y + ")");
                /*
                 *  1 2
                 *  e 3
                 *  4 5
                 */
                
                if (comprobarN(tab, x, y) !== "") {                    
                    if(comprobarN(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarN(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                if (comprobarNE(tab, x, y) !== "") {                    
                    if(comprobarNE(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarNE(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                if (comprobarE(tab, x, y) !== "") {                    
                    if(comprobarE(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarE(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                if (comprobarS(tab, x, y) !== "") {                    
                    if(comprobarS(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarS(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                if (comprobarSE(tab, x, y) !== "") {                    
                    if(comprobarSE(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarSE(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
            }
            else if(x === config.pub_ancho - 1 && y > 0 && y < config.pub_alto -1)
            {
                //console.log("Caso e - E (" + x + ", " + y + ")");
                /*
                 *  1 2
                 *  3 e
                 *  4 5
                 */
                
               if (comprobarNW(tab, x, y) !== "") {                    
                    if(comprobarNW(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarNW(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                if (comprobarN(tab, x, y) !== "") {                    
                    if(comprobarN(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarN(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                if (comprobarW(tab, x, y) !== "") {                    
                    if(comprobarW(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarW(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                if (comprobarSW(tab, x, y) !== "") {                    
                    if(comprobarSW(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarSW(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                if (comprobarS(tab, x, y) !== "") {                    
                    if(comprobarS(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarS(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
            }
            else if(y === 0 && x > 0 && x < config.pub_ancho -1)
            {
                //console.log("Caso e - N (" + x + ", " + y + ")");
                /*
                 *  1 e 2
                 *  3 4 5
                 */
                
                if (comprobarW(tab, x, y) !== "") {                    
                    if(comprobarW(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarW(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                if (comprobarE(tab, x, y) !== "") {                    
                    if(comprobarE(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarE(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                if (comprobarSW(tab, x, y) !== "") {                    
                    if(comprobarSW(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarSW(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                if (comprobarS(tab, x, y) !== "") {                    
                    if(comprobarS(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarS(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                if (comprobarSE(tab, x, y) !== "") {                    
                    if(comprobarSE(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarSE(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
            }
            else if(y === config.pub_alto - 1 && x > 0 && x < config.pub_ancho -1)
            {
                //console.log("Caso e - S (" + x + ", " + y + ")");
                /*
                 *  1 2 3
                 *  4 e 5
                 */
                
                if (comprobarNW(tab, x, y) !== "") {                    
                    if(comprobarNW(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarNW(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                if (comprobarN(tab, x, y) !== "") {                    
                    if(comprobarN(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarN(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                if (comprobarNE(tab, x, y) !== "") {                    
                    if(comprobarNE(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarNE(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                if (comprobarW(tab, x, y) !== "") {                    
                    if(comprobarW(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarW(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
                if (comprobarE(tab, x, y) !== "") {                    
                    if(comprobarE(tab, x, y) === "verde"){
                        verdesCount++;
                    }
                    else if(comprobarE(tab, x, y) === "azul"){
                        azulesCount++;
                    }
                }
            }

            if ( (verdesCount >= config.pub_verdes_verdes && azulesCount >= config.pub_verdes_azules) ||
                 (verdesCount >= config.pub_azules_verdes && azulesCount >= config.pub_azules_azules)) {
                this.estado = "happy";
            }
            else
            {
                this.estado = "sad";
            }
            //console.log("Bola (" + x + ", " + y + ") = " + this.estado + "(" + tab.matriz[x][y].bolaCasilla.color + ")");
        }
    
        function comprobarN(tabl, x, y)
        {
            var color = "";
            if (tabl.matriz[x][y - 1].bolaCasilla !== null) {
                if (tabl.matriz[x][y - 1].bolaCasilla.color === "I") {
                    color = "verde";
                }
                else if(tabl.matriz[x][y - 1].bolaCasilla.color === "II"){
                    color = "azul";
                }
            }
            return color;
        }
        function comprobarS(tabl, x, y)
        {
            var color = "";
            if (tabl.matriz[x][Number(y) + 1].bolaCasilla !== null) {
                if (tabl.matriz[x][Number(y) + 1].bolaCasilla.color === "I") {
                    color = "verde";
                }
                else if (tabl.matriz[x][Number(y) + 1].bolaCasilla.color === "II"){
                    color = "azul";
                }
            }
            return color;
        }
        function comprobarE(tabl, x, y)
        {
            var color = "";
            if (tabl.matriz[Number(x) + 1][y].bolaCasilla !== null) {
                if (tabl.matriz[Number(x) + 1][y].bolaCasilla.color === "I") {
                    color = "verde";
                }
                else if (tabl.matriz[Number(x) + 1][y].bolaCasilla.color === "II"){
                    color = "azul";
                }
            }
            return color;
        }
        function comprobarW(tabl, x, y)
        {
            var color = "";
            if (tabl.matriz[x - 1][y].bolaCasilla !== null) {
                if (tabl.matriz[x - 1][y].bolaCasilla.color === "I") {
                    color = "verde";
                }
                else if (tabl.matriz[x - 1][y].bolaCasilla.color === "II"){
                    color = "azul";
                }
            }
            return color;
        }
        function comprobarNE(tabl, x, y)
        {
            var color = "";
            if (tabl.matriz[Number(x) + 1][y - 1].bolaCasilla !== null) {
                if (tabl.matriz[Number(x) + 1][y - 1].bolaCasilla.color === "I") {
                    color = "verde";
                }
                else if (tabl.matriz[Number(x) + 1][y - 1].bolaCasilla.color === "II"){
                    color = "azul";
                }
            }
            return color;
        }
        function comprobarSE(tabl, x, y)
        {
            var color = "";
            if (tabl.matriz[Number(x) + 1][Number(y) + 1].bolaCasilla !== null) {
                if (tabl.matriz[Number(x) + 1][Number(y) + 1].bolaCasilla.color === "I") {
                    color = "verde";
                }
                else if (tabl.matriz[Number(x) + 1][Number(y) + 1].bolaCasilla.color === "II"){
                    color = "azul";
                }
            }
            return color;
        }
        function comprobarSW(tabl, x, y)
        {
            var color = "";
            if (tabl.matriz[x - 1][Number(y) + 1].bolaCasilla !== null) {
                if (tabl.matriz[x - 1][Number(y) + 1].bolaCasilla.color === "I") {
                    color = "verde";
                }
                else if (tabl.matriz[x - 1][Number(y) + 1].bolaCasilla.color === "II"){
                    color = "azul";
                }
            }
            return color;
        }
        function comprobarNW(tabl, x, y)
        {
            var color = "";
            if (tabl.matriz[x - 1][y - 1].bolaCasilla !== null) {
                if (tabl.matriz[x - 1][y - 1].bolaCasilla.color === "I") {
                    color = "verde";
                }
                else if (tabl.matriz[x - 1][y - 1].bolaCasilla.color === "II"){
                    color = "azul";
                }
            }
            return color;
        }
    
    }

    function Casilla(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.bolaCasilla = null;
    }

    function Tablero() {
        this.matriz = new Array(config.pub_ancho);
        for (var i = 0; i < config.pub_ancho; i++) {
            this.matriz[i] = new Array(config.pub_alto);
            for (var j = 0; j < config.pub_alto; j++) {
                this.matriz[i][j] = new Casilla(i, j);
            }
        }

        this.getCasilla = function (x, y) {
            return this.matriz[x][y];
        }
    }

    function Segregation()
    {
        tableroJuego = new Tablero();
        generarAzules();
        generarVerdes();
        comprobarBolas();
        segregationui.pub_mostrarEnTablero(tableroJuego);
    }
    
    function regenerarContenidoTablero()
    {
        eliminarBolasTablero();
        generarAzules();
        generarVerdes();
        comprobarBolas();
        segregationui.pub_actualizarBolasTablero(tableroJuego);
    }
    
    function seleccionBola(posX, posY)
    {
        //console.log("Selecciono bola: casilla (" + posX + ", " + posY + ")");
        casillaJugada = tableroJuego.matriz[posX][posY];
    }

    function moverACasilla(newX, newY)
    {
        if(casillaJugada !== null)
        {
            //console.log("Intento mover bola: destino (" + newX + ", " + newY + ")");
            tableroJuego.matriz[newX][newY].bolaCasilla = casillaJugada.bolaCasilla;
            tableroJuego.matriz[casillaJugada.posX][casillaJugada.posY].bolaCasilla = null;
        }
    }

    function generarAzules() {
        var bolas = 0;
        while (bolas < config.pub_totalAzules) {
            var x = Math.floor(Math.random() * config.pub_ancho);
            var y = Math.floor(Math.random() * config.pub_alto);

            if (tableroJuego.matriz[x][y].bolaCasilla === null) {
                tableroJuego.matriz[x][y].bolaCasilla = new Bola("II");
                bolas++;
            }
        }
    }

    function generarVerdes() {
        var bolas = 0;
        while (bolas < config.pub_totalVerdes) {
            var x = Math.floor(Math.random() * config.pub_ancho);
            var y = Math.floor(Math.random() * config.pub_alto);

            if (tableroJuego.matriz[x][y].bolaCasilla === null) {
                tableroJuego.matriz[x][y].bolaCasilla = new Bola("I");
                bolas++;
            }
        }
    }
    
    function eliminarBolasTablero(){
        for(var i = 0; i < config.pub_ancho; i++)
        {
            for(var j = 0; j < config.pub_ancho; j++)
            {
                tableroJuego.matriz[i][j].bolaCasilla = null;
            }
        }
    }
    

    function comprobarBolas() {
        for (var i = 0; i < config.pub_ancho; i++) {
            for (var j = 0; j < config.pub_alto; j++) {
                //console.log("Casilla: (" + i + "," + j + ")");
                if (tableroJuego.matriz[i][j].bolaCasilla !== null) {
                    tableroJuego.matriz[i][j].bolaCasilla.comprobarEstado(i, j, tableroJuego);
                    //console.log("Bola encontrada");
                }
            }
        }
        segregationui.pub_actualizarBolasTablero(tableroJuego);
        //segregationui.pub_mostrarEnTablero(tableroJuego);
    }

    return{
        pub_crearTablero: Segregation,
        pub_comprobarBolas: comprobarBolas,
        pub_seleccionBola: seleccionBola,
        pub_moverACasilla: moverACasilla,
        pub_regenerarContenidoTablero: regenerarContenidoTablero
    }
}());