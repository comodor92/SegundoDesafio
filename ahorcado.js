var palabras = ["crema", "estrella", "guitarra", "plastico", "sonido", "rueda", "perro", "llaves", "camisa", "sillon", "teclado", "escuela", "pantalla", "tenedor", "mensaje", "cohete", "edificio", "parlante", "colegio", "granizo", "pestaña", "lampara", "monitor", "musica", "hombre", "tornillo", "abuela", "satelite", "templo", "navaja", "martillo", "libros", "lapiz", "lapicera", "aluminio", "letra", "ventana", "libreria"];
var gameOn = true;
// vistas
var inicio = document.querySelector("#inicio");
var ingresopalabra = document.querySelector("#ingresopalabra");
var jugar = document.querySelector("#jugar");
var enigma = "";

// botones
var iniciar = document.querySelector("#iniciar");
var agregar = document.querySelector("#agregar");
var guardar = document.querySelector("#guardar");
var cancelar = document.querySelector("#cancelar");
var nuevo = document.querySelector("#nuevo");
var desistir = document.querySelector("#desistir");

// inicio
iniciar.addEventListener("click", function() {
  inicio.classList.add("invisible");
  jugar.classList.remove("invisible");
  limpiar();
  dibujarHorca();
  gameOn = true;
  elegirpalabra();
  agregardiv();

});

agregar.addEventListener("click", function() {
  inicio.classList.add("invisible");
  ingresopalabra.classList.remove("invisible");
});

// ingreso de palabra

guardar.addEventListener("click", function() {
  var entrada = document.querySelector("#entrada");
  palabras.push(entrada.value);
  ingresopalabra.classList.add("invisible");
  jugar.classList.remove("invisible");
  limpiar();
  dibujarHorca();
  gameOn = true;
  elegirpalabra();
  agregardiv();
});

cancelar.addEventListener("click", function() {
  ingresopalabra.classList.add("invisible");
  inicio.classList.remove("invisible");
});


// jugar

nuevo.addEventListener("click", function(){
  limpiar();
  dibujarHorca();
  gameOn = true;
  elegirpalabra();
  agregardiv();
});

desistir.addEventListener("click", function() {
  jugar.classList.add("invisible");
  inicio.classList.remove("invisible");
});


function elegirpalabra(){
  var indice = Math.round(Math.random() * (palabras.length - 1));
  return enigma = palabras[indice];
}

function limpiar(){
  document.getElementById("palabra").innerHTML = "";
  document.getElementById("fallos").innerHTML = "";
  document.getElementById("cartel").innerText = "";
  lapiz.clearRect(0, 0, 630, 350);
  intentos = [];
  errores = 0;
  aciertos = 0;
}


function agregardiv(){
  for(let i = 0; i <enigma.length; i++){
    let letra = document.createElement("div");
    letra.innerText = enigma[i];
    document.getElementById("palabra").appendChild(letra);
    }
}

function cartel(titulo){
  document.getElementById("cartel").innerText = titulo;
}



let intentos = [];
let errores = 0;
let aciertos = 0;

document.addEventListener("keydown", function(event) {
  let x = event.key;
  let letras = /[A-Za-z]/;
  if(gameOn){
    if (x.length == 1 && letras.test(x)){
      if(!intentos.includes(x)){
        intentos.push(x);
        if(enigma.includes(x)){
          indices(x);
          aciertos++;
          ganaste(aciertos);
        } else {
            errores++;
            dibujar(errores);
            perdiste(errores);
            let letra = document.createElement("div");
            letra.innerText = x;
            document.getElementById("fallos").appendChild(letra);
          }
      }
      }
      
    }
  }
  )

function aparece(x){
  let div = document.getElementById("palabra");
  div.getElementsByTagName("div")[x].style.color = "black";
}

function indices(x){
  let inicio = 0;
  let indice = 0;
  while(indice >= 0){
    indice = enigma.indexOf(x,inicio);
    if (indice == -1){
      break;
    }
    aparece(indice);
    inicio = indice + 1;
  }
}

function ganaste(x){
  let aciertos = [];
  for(let x = 0; x < enigma.length; x++){
    if(!aciertos.includes(enigma[x])){
      aciertos.push(enigma[x]);
    }
  }
  if(x == aciertos.length){
    cartel("Ganaste!");
    gameOn = false;
  }

}

function perdiste(x){
  if(x == 6){
    cartel("Game Over");
    gameOn = false;
  }
}
let canvas = document.getElementById("dibujo");
let lapiz = canvas.getContext("2d");

function dibujarHorca(){
  lapiz.beginPath();
  lapiz.moveTo(70, 140);
  lapiz.lineTo(200, 140);
  lapiz.moveTo(130, 140);
  lapiz.lineTo(130, 10);
  lapiz.lineTo(200, 10);
  lapiz.lineTo(200, 40);
  lapiz.lineWidth = 2;
  lapiz.stroke();
}

function dibujar(error){
  let cuerpo = {
    2:[200, 60, 200, 100],
    3:[200, 60, 190, 80],
    4:[200, 60, 210, 80],
    5:[200, 100, 190, 120],
    6:[200, 100, 210, 120]
  };

  if(error == 1){
    lapiz.beginPath();
    lapiz.arc(200, 50, 10, 0, 2 * Math.PI);
    lapiz.lineWidth = 2;
    lapiz.stroke();
  } else {
    lapiz.beginPath();
    lapiz.moveTo(cuerpo[error][0], cuerpo[error][1]);
    lapiz.lineTo(cuerpo[error][2], cuerpo[error][3]);
    lapiz.lineWidth = 2;
    lapiz.stroke();
  }
}