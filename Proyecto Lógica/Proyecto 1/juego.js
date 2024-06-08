document.addEventListener("DOMContentLoaded", function() {

    // Se seleccionan varios elementos del DOM que se usarán para mostrar y actualizar el puntaje, las elecciones, mensaje y botones.
    const puntosUsuarioSpan = document.getElementById("puntos-usuario");
    const puntosComputadoraSpan = document.getElementById("puntos-computadora");
    const eleccionUsuarioSpan = document.getElementById("eleccion-usuario");
    const eleccionComputadoraSpan = document.getElementById("eleccion-computadora");
    const mensajeDiv = document.getElementById("mensaje");
    const ganaPuntoP = document.getElementById("gana-punto");
    const reiniciarBtn = document.getElementById("reiniciar");
    const botonesArmas = document.querySelectorAll(".arma");

    // Variables para mantener el puntaje de usuario y la computadora
    let puntosUsuario = 0;
    let puntosComputadora = 0;

    // Aqui se encuentran todas las opciones posibles del juego y las reglas que definen qué opciones ganan contra cuáles.
    const opciones = ["piedra🪨", "papel📋", "tijera✂️", "fuego🔥", "agua💧", "esponja🧽", "aire💨"];
    const reglas = {
        "piedra🪨": ["tijera✂️", "esponja🧽", "fuego🔥"],
        "papel📋": ["piedra🪨", "agua💧", "aire💨"],
        "tijera✂️": ["papel📋", "esponja🧽", "aire💨"],
        "fuego🔥": ["tijera✂️", "papel📋", "esponja🧽"],
        "agua💧": ["fuego🔥", "piedra🪨", "tijera✂️"],
        "esponja🧽": ["agua💧", "papel📋", "aire💨"],
        "aire💨": ["fuego🔥", "agua💧", "piedra🪨"]
    };

    // Manejo y funcionamiento del click en los botones de las armas
    botonesArmas.forEach(boton => {
        boton.addEventListener("click", () => {
            if (puntosUsuario >= 5 || puntosComputadora >= 5) {
                return; // Indicasion si el juego ya terminó, no hacer nada
            }
            const eleccionUsuario = boton.id; // La elección del usuario es el ID del botón
            const eleccionComputadora = opciones[Math.floor(Math.random() * opciones.length)]; // Elección aleatoria de la computadora

            eleccionUsuarioSpan.textContent = eleccionUsuario; // Mostrar la elección del usuario
            eleccionComputadoraSpan.textContent = eleccionComputadora; // Mostrar la elección de la computadora

            if (eleccionUsuario === eleccionComputadora) {
                ganaPuntoP.textContent = "¡Es un empate!";
            } else if (reglas[eleccionUsuario].includes(eleccionComputadora)) {
                puntosUsuario++; // Incrementar el puntaje del usuario
                puntosUsuarioSpan.textContent = puntosUsuario; // Actualizar la visualización del puntaje del usuario
                ganaPuntoP.textContent = "¡Ganaste un punto! 🔥";
            } else {
                puntosComputadora++;
                puntosComputadoraSpan.textContent = puntosComputadora; 
                ganaPuntoP.textContent = "¡La computadora gana un punto! 😢";
            }

            mensajeDiv.classList.remove("disabled"); // Mostrar mensajes de seleccion de arma y resultados de juego 

            if (puntosUsuario >= 5 || puntosComputadora >= 5) {
                ganaPuntoP.textContent += puntosUsuario >= 5 ? " ¡Ganaste el juego! 🎉" : " La computadora ganó el juego. 😭";
                reiniciarBtn.classList.remove("disabled"); // Habilitar el botón de reiniciar juego
            }
        });
    });

    // Instrucciones al dar click al boton de reinicio de juego
    reiniciarBtn.addEventListener("click", () => {
        puntosUsuario = 0; // Restablecer el puntaje del usuario
        puntosComputadora = 0; // Restablecer el puntaje de la computadora
        puntosUsuarioSpan.textContent = puntosUsuario; // Actualizar la visualización del puntaje del usuario
        puntosComputadoraSpan.textContent = puntosComputadora; // Actualizar la visualización del puntaje de la computadora
        mensajeDiv.classList.add("disabled"); // Ocultar el mensaje
        reiniciarBtn.classList.add("disabled"); // Deshabilitar el botón de reiniciar juego
    });
});
