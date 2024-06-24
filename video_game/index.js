const readline = require('readline-sync');
const colors = require('colors');

//#region utils
function messageInfo(value) {
    return value.blue
}
function messageError(value) {
    return value.bgRed
}
function messageSuccess(value) {
    return value.bgGreen
}
function messageWarning(value) {
    return value.bgYellow
}
function clearText() {
    console.clear();
}
//#endregion utils
//#region Game
function showMenu() {
    clearText();
    console.log(messageInfo('----------------------'));
    console.log(messageInfo('1. Jugar Nueva Partida'));
    console.log(messageInfo('2. Instrucciones'));
    console.log(messageInfo('3. Salir'));
    console.log(messageInfo('----------------------'));
}

function showInstructions() {
    clearText();
    console.log(messageInfo('----------------------'));
    console.log(messageInfo('Instrucciones:'));
    console.log(messageInfo('El juego consiste en elegir entre Piedra, Papel o Tijera.'));
    console.log(messageInfo('La Piedra aplasta la Tijera.'));
    console.log(messageInfo('La Tijera corta el Papel.'));
    console.log(messageInfo('El Papel envuelve la Piedra.'));
    console.log(messageInfo('----------------------'));
    readline.question(messageInfo('Presiona Enter para continuar...'));
    /**
     * Quien gana?
     * Piedra   &&  Tijera  =   Piedra
     * Tijera   &&  Papel   =   Tijera
     * Papel    &&  Piedra  =   Papel
     * 
     */
}

function playGame() {
    clearText();
    console.log(messageInfo('----------------------'));
    console.log(messageInfo('1. Piedra'));
    console.log(messageInfo('2. Papel'));
    console.log(messageInfo('3. Tijera'));
    console.log(messageInfo('----------------------'));
    const opciones = ['Piedra', 'Papel', 'Tijera'];
    const eleccionUsuario = readline.question(messageInfo('Elige una opcion: '));

    clearText();
    const eleccionComputadora = Math.floor(Math.random() * 3) + 1;
    console.log(messageInfo(`Tu eliges: ${opciones[eleccionUsuario - 1]}`));
    console.log(messageInfo(`La computadora elige: ${opciones[eleccionComputadora - 1]}`));
    readline.question(messageInfo('Presiona Enter para continuar...'));

    clearText();
    if (eleccionUsuario == eleccionComputadora) {
        console.log(messageWarning('¡Empate!'));
    } else if ((eleccionUsuario == 1 && eleccionComputadora == 3) ||
        (eleccionUsuario == 2 && eleccionComputadora == 1) ||
        (eleccionUsuario == 3 && eleccionComputadora == 2)) {
        console.log(messageSuccess('!Ganaste!'));
    } else {
        console.log(messageError('!Perdiste!'));
    }

    readline.question(messageInfo('Presiona Enter para continuar...'));
}
//#endregion Game
function main() {
    let salir = false;
    while (!salir) {
        showMenu();
        const opcion = readline.question(messageInfo('Elige una opcion: '));
        switch (opcion) {
            case '1':
                playGame();
                break;
            case '2':
                showInstructions();
                break;
            case '3':
                salir = true;
                console.log(messageInfo('Saliendo del juego...'));
                break;
            default:
                console.log(messageInfo('Opcion no valida, intenta de nuevo.'));
        }
    }
}

main();
