/* =========================================
   PREGUNTAS
========================================= */

let preguntas = [
    {
        pregunta: "7 × 6 = ?",
        correcta: 42,
        respuestas: [42, 35, 48, 54, 60, 24, 56, 72]
    },

    {
        pregunta: "9 × 5 = ?",
        correcta: 45,
        respuestas: [30, 45, 54, 36, 40, 63, 25, 49]
    },

    {
        pregunta: "12 + 18 = ?",
        correcta: 30,
        respuestas: [20, 25, 30, 32, 36, 40, 28, 42]
    },

    {
        pregunta: "8 × 8 = ?",
        correcta: 64,
        respuestas: [48, 56, 64, 72, 81, 32, 24, 54]
    },

    {
        pregunta: "100 - 37 = ?",
        correcta: 63,
        respuestas: [53, 60, 63, 67, 73, 57, 43, 70]
    }
];


/* =========================================
   VARIABLES
========================================= */

let nivelActual = 0;

let puntos = 0;

/* AHORA SON 20 SEGUNDOS */
let tiempo = 20;

let temporizador;

let jugando = true;

let saltando = false;


/* Posición */

let x = 3;
let y = 50;


/* Velocidad */

let velocidad = 0.22;


/* =========================================
   TECLAS
========================================= */

let teclas = {
    arriba: false,
    abajo: false,
    izquierda: false,
    derecha: false
};


/* =========================================
   ELEMENTOS
========================================= */

let dinosaurio =
    document.querySelector("#dinosaurio");

let pregunta =
    document.querySelector("#pregunta");

let nivel =
    document.querySelector("#nivel");

let puntosTexto =
    document.querySelector("#puntos");

let tiempoTexto =
    document.querySelector("#tiempo");

let cajaTiempo =
    document.querySelector("#cajaTiempo");

let mensaje =
    document.querySelector("#mensaje");

let respuestas =
    document.querySelectorAll(".respuesta");

let pantallaGanador =
    document.querySelector("#pantallaGanador");

let pantallaPerder =
    document.querySelector("#pantallaPerder");

let motivoPerder =
    document.querySelector("#motivoPerder");

let puntosGanador =
    document.querySelector("#puntosGanador");


/* =========================================
   COMENZAR
========================================= */

cargarNivel();

animarMovimiento();


/* =========================================
   CARGAR NIVEL
========================================= */

function cargarNivel() {

    clearInterval(temporizador);

    jugando = true;

    tiempo = 20;

    x = 3;
    y = 50;

    teclas.arriba = false;
    teclas.abajo = false;
    teclas.izquierda = false;
    teclas.derecha = false;

    dinosaurio.style.left = x + "%";
    dinosaurio.style.top = y + "%";

    nivel.innerHTML =
        (nivelActual + 1) + " / 5";

    puntosTexto.innerHTML =
        puntos.toString().padStart(4, "0");

    pregunta.innerHTML =
        preguntas[nivelActual].pregunta;

    tiempoTexto.innerHTML =
        tiempo;

    mensaje.innerHTML =
        "ENCUENTRA LA RESPUESTA";

    mensaje.classList.add("mostrar");

    setTimeout(function() {

        mensaje.classList.remove("mostrar");

    }, 1500);

    cajaTiempo.classList.remove("peligro");


    /* =====================================
       COLOCAR RESPUESTAS
    ===================================== */

    for (
        let i = 0;
        i < respuestas.length;
        i++
    ) {

        respuestas[i].innerHTML =
            preguntas[nivelActual].respuestas[i];

        respuestas[i].classList.remove(
            "correcta"
        );

        respuestas[i].classList.remove(
            "incorrecta"
        );

    }


    iniciarTemporizador();
}


/* =========================================
   TEMPORIZADOR
========================================= */

function iniciarTemporizador() {

    temporizador =
        setInterval(function() {

            tiempo--;

            tiempoTexto.innerHTML =
                tiempo;


            if (tiempo <= 10) {

                cajaTiempo.classList.add(
                    "peligro"
                );

            }


            /*
                MUY IMPORTANTE:

                AQUÍ NO SE REVISA
                NINGUNA RESPUESTA.

                SOLO CUANDO LLEGA A 0
                SE REVISA LA POSICIÓN.
            */

            if (tiempo <= 0) {

                clearInterval(
                    temporizador
                );

                revisarPosicion();

            }

        }, 1000);
}


/* =========================================
   MOVIMIENTO SUAVE
========================================= */

function animarMovimiento() {

    if (jugando) {

        if (teclas.derecha) {
            x = x + velocidad;
        }

        if (teclas.izquierda) {
            x = x - velocidad;
        }

        if (teclas.arriba) {
            y = y - velocidad;
        }

        if (teclas.abajo) {
            y = y + velocidad;
        }


        /* LIMITES */

        if (x < 0) {
            x = 0;
        }

        if (x > 93) {
            x = 93;
        }

        if (y < 2) {
            y = 2;
        }

        if (y > 82) {
            y = 82;
        }


        /* ACTUALIZAR */

        dinosaurio.style.left =
            x + "%";

        dinosaurio.style.top =
            y + "%";


        /* MIRAR HACIA EL LADO */

        if (teclas.izquierda) {

            dinosaurio
                .querySelector(".personaje")
                .style.transform =
                "scaleX(-1)";

        }

        if (teclas.derecha) {

            dinosaurio
                .querySelector(".personaje")
                .style.transform =
                "scaleX(1)";

        }

    }


    requestAnimationFrame(
        animarMovimiento
    );
}


/* =========================================
   TECLAS PRESIONADAS
========================================= */

document.addEventListener(
    "keydown",
    function(evento) {

        if (jugando == false) {
            return;
        }


        let tecla =
            evento.key.toLowerCase();


        if (
            tecla == "w" ||
            tecla == "a" ||
            tecla == "s" ||
            tecla == "d" ||
            tecla == "arrowup" ||
            tecla == "arrowdown" ||
            tecla == "arrowleft" ||
            tecla == "arrowright" ||
            evento.code == "Space"
        ) {

            evento.preventDefault();

        }


        /* DERECHA */

        if (
            tecla == "d" ||
            tecla == "arrowright"
        ) {

            teclas.derecha = true;

        }


        /* IZQUIERDA */

        if (
            tecla == "a" ||
            tecla == "arrowleft"
        ) {

            teclas.izquierda = true;

        }


        /* ARRIBA */

        if (
            tecla == "w" ||
            tecla == "arrowup"
        ) {

            teclas.arriba = true;

        }


        /* ABAJO */

        if (
            tecla == "s" ||
            tecla == "arrowdown"
        ) {

            teclas.abajo = true;

        }


        /* SALTAR */

        if (
            evento.code == "Space" &&
            saltando == false
        ) {

            saltar();

        }

    }
);


/* =========================================
   TECLAS SOLTADAS
========================================= */

document.addEventListener(
    "keyup",
    function(evento) {

        let tecla =
            evento.key.toLowerCase();


        if (
            tecla == "d" ||
            tecla == "arrowright"
        ) {

            teclas.derecha = false;

        }


        if (
            tecla == "a" ||
            tecla == "arrowleft"
        ) {

            teclas.izquierda = false;

        }


        if (
            tecla == "w" ||
            tecla == "arrowup"
        ) {

            teclas.arriba = false;

        }


        if (
            tecla == "s" ||
            tecla == "arrowdown"
        ) {

            teclas.abajo = false;

        }

    }
);


/* =========================================
   SALTAR
========================================= */

function saltar() {

    saltando = true;

    dinosaurio.classList.add(
        "saltando"
    );

    setTimeout(function() {

        dinosaurio.classList.remove(
            "saltando"
        );

        saltando = false;

    }, 420);
}


/* =========================================
   REVISAR POSICIÓN
========================================= */

function revisarPosicion() {

    jugando = false;

    mensaje.innerHTML =
        "⏱ TIEMPO TERMINADO";

    mensaje.classList.add("mostrar");


    /* Rectángulo del dinosaurio */

    let dinoRect =
        dinosaurio.getBoundingClientRect();


    /* Centro del dinosaurio */

    let centroX =
        dinoRect.left +
        dinoRect.width / 2;

    let centroY =
        dinoRect.top +
        dinoRect.height / 2;


    let encontro = false;


    /*
        AQUÍ Y SOLO AQUÍ
        SE REVISA EN QUÉ RESPUESTA
        TERMINÓ EL DINOSAURIO.
    */

    for (
        let i = 0;
        i < respuestas.length;
        i++
    ) {

        let casilla =
            respuestas[i].getBoundingClientRect();


        if (

            centroX >= casilla.left &&

            centroX <= casilla.right &&

            centroY >= casilla.top &&

            centroY <= casilla.bottom

        ) {

            encontro = true;

            comprobarRespuesta(
                respuestas[i]
            );

            break;

        }

    }


    /* No estaba sobre ninguna */

    if (encontro == false) {

        perder(
            "Terminó el tiempo y no estabas sobre ninguna respuesta."
        );

    }

}


/* =========================================
   COMPROBAR RESPUESTA
========================================= */

function comprobarRespuesta(casilla) {

    let valor =
        Number(casilla.innerHTML);

    let correcta =
        preguntas[nivelActual].correcta;


    /* =====================================
       CORRECTA
    ===================================== */

    if (valor == correcta) {

        casilla.classList.add(
            "correcta"
        );

        mensaje.innerHTML =
            "🟢 ¡CORRECTO!";

        mensaje.classList.add(
            "mostrar"
        );

        puntos =
            puntos + 100;

        puntosTexto.innerHTML =
            puntos.toString().padStart(4, "0");


        setTimeout(function() {

            siguienteNivel();

        }, 1200);

    }


    /* =====================================
       INCORRECTA
    ===================================== */

    else {

        casilla.classList.add(
            "incorrecta"
        );

        mensaje.innerHTML =
            "🔴 ¡INCORRECTO!";

        mensaje.classList.add(
            "mostrar"
        );


        setTimeout(function() {

            perder(
                "La respuesta correcta era " +
                correcta + "."
            );

        }, 800);

    }

}


/* =========================================
   SIGUIENTE NIVEL
========================================= */

function siguienteNivel() {

    nivelActual++;

    if (nivelActual >= 5) {

        ganar();

    }

    else {

        cargarNivel();

    }

}


/* =========================================
   GANAR
========================================= */

function ganar() {

    clearInterval(
        temporizador
    );

    jugando = false;

    puntosGanador.innerHTML =
        puntos +
        " PUNTOS";

    pantallaGanador.style.display =
        "flex";

}


/* =========================================
   PERDER
========================================= */

function perder(texto) {

    clearInterval(
        temporizador
    );

    jugando = false;

    motivoPerder.innerHTML =
        texto;

    pantallaPerder.style.display =
        "flex";

}


/* =========================================
   REINICIAR
========================================= */

function reiniciar() {

    clearInterval(
        temporizador
    );

    nivelActual = 0;

    puntos = 0;

    tiempo = 20;

    x = 3;

    y = 50;

    teclas.arriba = false;
    teclas.abajo = false;
    teclas.izquierda = false;
    teclas.derecha = false;

    pantallaGanador.style.display =
        "none";

    pantallaPerder.style.display =
        "none";

    cargarNivel();

}