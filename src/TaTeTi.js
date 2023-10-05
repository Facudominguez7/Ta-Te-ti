//Cuando turno es 1, le toca a cruz
let turno = 1;
//array de las dos posibles fichas
let fichas = ["O", "X"];
//indica el numero de fichas puestas
let puestas = 0;
//Indica si la partida ha terminado
let partidaAcabada = false;
let empate = false;
let textoVictoria = document.getElementById("textoVictoria");

let botones = Array.from(document.getElementsByTagName("button"));

//Se añade a los botones el evento click
botones.forEach((x) => x.addEventListener("click", ponerFicha));

function ponerFicha(event) {
  let botonPulsado = event.target; //target representa el evento que ha sido tocado
  //Comprobación de que la partida no haya terminado y que el boton no haya sido pulsado previamente
  if (!partidaAcabada && botonPulsado.innerHTML == "") {
    //se coloca una cruz en el turno 1
    botonPulsado.innerHTML = fichas[turno];
    //se incrementa el numero de fichas
    puestas += 1;

    //Comprobación estado de la partida
    let estadoPartida = estado();
    if(estadoPartida == 0 && puestas == 9){
      empate = true;
    }
    if (estadoPartida == 0) {
      cambiarTurno();
      if (puestas < 9) {
        ia();
        estadoPartida = estado();
        puestas += 1;
        cambiarTurno();
      }
    }

    if (empate){
      textoVictoria.innerHTML = "Empate!";
      partidaAcabada = true;
      textoVictoria.style.visibility = "visible";
    }

    if (estadoPartida == 1) {
      textoVictoria.style.visibility = "visible";
      partidaAcabada = true;
    } else if (estadoPartida == -1) {
      textoVictoria.innerHTML = "Has perdido ;(";
      partidaAcabada = true;
      textoVictoria.style.visibility = "visible";
    }
  }
}



//Si el turno es x se lo pasa a o
function cambiarTurno() {
  if (turno == 1) {
    turno = 0;
  } else {
    turno = 1;
  }
}

function estado() {
  //Indica en que fila o en que diagonal se ha producido la victoria  
  posicionVictoria = 0;
  // 0 si la partida continua, -1 si gana la cpu, 1 si gano yo
  nEstado = 0;

  //Funcion que comprueba si los elementos son iguales
  function sonIguales(...args) {
    valores = args.map((x) => x.innerHTML);
    //No puede ser cadena vacía
    if (valores[0] != "" && valores.every((x, i, arr) => x === arr[0])) {
      args.forEach((x) => (x.style.backgroundColor = "Fuchsia"));
      return true;
    } else {
      return false;
    }
    
  }

  //Comprobamos si hay alguna linea
  if (sonIguales(botones[0], botones[1], botones[2])) {
    posicionVictoria = 1;
  } else if (sonIguales(botones[3], botones[4], botones[5])) {
    posicionVictoria = 2;
  } else if (sonIguales(botones[6], botones[7], botones[8])) {
    posicionVictoria = 3;
  } else if (sonIguales(botones[0], botones[3], botones[6])) {
    posicionVictoria = 4;
  } else if (sonIguales(botones[1], botones[4], botones[7])) {
    posicionVictoria = 5;
  } else if (sonIguales(botones[2], botones[5], botones[8])) {
    posicionVictoria = 6;
  } else if (sonIguales(botones[0], botones[4], botones[8])) {
    posicionVictoria = 7;
  } else if (sonIguales(botones[2], botones[4], botones[6])) {
    posicionVictoria = 8;
  }

  //Comprobamos quien ha ganado
  if (posicionVictoria > 0) {
    if (turno == 1) {
      nEstado = 1;
    } else {
      nEstado = -1;
    } 
  }

  return nEstado;
}

function ia() {
  function aleatorio(min, max) {
    //al numero minimo se suma la distancia entre el max y el min + 1 y lo multiplica por un numero aleatorio
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  
  let valores = botones.map((x) => x.innerHTML);
  let pos = -1;
  
    let n = aleatorio(0, botones.length - 1);
    while (valores[n] != "") {
      n = aleatorio(0, botones.length - 1);
    }
    pos = n;
  

  botones[pos].innerHTML = "O";
  return pos;
}
