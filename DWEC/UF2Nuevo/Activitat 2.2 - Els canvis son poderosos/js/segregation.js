var segregation = (function () {

    var tableroJuego = null;
    var casillaJugada = null;

    //Clase Bola
    function Bola(color) {
        this.color = color;
        this.estado = "sad";
        
        //Extenso sistema de comprobación de cualquier posición dentro de un tablero
        //con los elementos de su alrededor.
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
        
        //Posición Norte respecto a la posición recibida
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
        //Posición Sur respecto a la posición recibida
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
        //Posición Este respecto a la posición recibida
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
        //Posición Oeste respecto a la posición recibida
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
        //Posición Nordeste respecto a la posición recibida
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
        //Posición Suresye respecto a la posición recibida
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
        //Posición Suroeste respecto a la posición recibida
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
        //Posición Noroeste respecto a la posición recibida
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

    //Clase Casilla
    function Casilla(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.bolaCasilla = null;
    }

    //Clase Tablero
    function Tablero() {
        this.matriz = new Array(config.pub_ancho);
        for (var i = 0; i < config.pub_ancho; i++) {
            this.matriz[i] = new Array(config.pub_alto);
            for (var j = 0; j < config.pub_alto; j++) {
                this.matriz[i][j] = new Casilla(i, j);
            }
        }
    }
    
    //Constructor de la clase Segregation (este espacio de nombres)
    function Segregation()
    {
        tableroJuego = new Tablero();
        generarAzules();
        generarVerdes();
        comprobarBolas();
        segregationui.pub_mostrarEnTablero(tableroJuego);
    }
    
    //Función para reconfigurar el contenido del tablero de juego según los 
    //cambios efectuados por el usuario
    function regenerarContenidoTablero()
    {
        eliminarBolasTablero();
        generarAzules();
        generarVerdes();
        comprobarBolas();
        segregationui.pub_actualizarBolasTablero(tableroJuego);
    }
    
    //Función para guardarse una bola
    function seleccionBola(posX, posY)
    {
        //console.log("Selecciono bola: casilla (" + posX + ", " + posY + ")");
        casillaJugada = tableroJuego.matriz[posX][posY];
    }
    
    //Función para cambiar de posición en el tablero una bola guardada
    function moverACasilla(newX, newY)
    {
        if(casillaJugada !== null)
        {
            //console.log("Intento mover bola: destino (" + newX + ", " + newY + ")");
            tableroJuego.matriz[newX][newY].bolaCasilla = casillaJugada.bolaCasilla;
            tableroJuego.matriz[casillaJugada.posX][casillaJugada.posY].bolaCasilla = null;
        }
    }
    
    //Función que genera y coloca aleatóriamente una cantidad de bolas Azules
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

    //Función que genera y coloca aleatóriamente una cantidad de bolas Verdes
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
    
    //Función que elimina las bolas del objeto tablero
    function eliminarBolasTablero(){
        for(var i = 0; i < config.pub_ancho; i++)
        {
            for(var j = 0; j < config.pub_ancho; j++)
            {
                tableroJuego.matriz[i][j].bolaCasilla = null;
            }
        }
    }
    
    //Función que hace la comprobación de todas las bolas del objeto tablero
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