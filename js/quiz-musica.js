(function () {
  /* ----------------------- ZONA DE PREGUNTAS Y RESPUESTAS (QUIZ) ----------------------- */
  function construyeQuiz() {
    // variable para almacenar quiz en html
    const mostrar = [];

    // por cada pregunta...
    preguntas.forEach((preguntaActual, posicion) => {
      // variable para almacenar posibles respuestas
      const respuestas = [];

      // y por cada respuesta..
      for (letra in preguntaActual.respuestas) {
        // ...agregar un radio button
        respuestas.push(
          `<label>
                <input type="radio" class="r" name="pregunta${posicion}" value="${letra}">
                ${letra} :
                ${preguntaActual.respuestas[letra]}
              </label>`
        );
      }

      mostrar.push(
        `<div class="slide">
              <div class="pregunta"> ${preguntaActual.pregunta} </div>
              <div class="respuestas"> ${respuestas.join("")} </div>
            </div>`
      );
    });

    // mostrar html
    quiz.innerHTML = mostrar.join("");
  }

  function muestraResultados() {
    const contenedorRespuestas = quiz.querySelectorAll(".respuestas");

    // número de respuestas correctas
    let numCorrectas = 0;

    // por cada pregunta...
    preguntas.forEach((preguntaActual, posicion) => {
      // encontrar la respuesta elegida
      const respuestaActual = contenedorRespuestas[posicion];
      const selector = `input[name=pregunta${posicion}]:checked`;
      const usuarioRespuesta = (respuestaActual.querySelector(selector) || {})
        .value;

      // si la respuesta es correcta
      if (usuarioRespuesta === preguntaActual.correcta) {
        // agregar al contador
        numCorrectas++;

        // color de respuestas correctas
        contenedorRespuestas[posicion].style.color = "lightgreen";
      }
      // si la respuesta está mal o en blanco
      else {
        // color de la respuesta incorrecta
        contenedorRespuestas[posicion].style.color = "red";
      }
    });

    // mostrar número de respuestas correctas y el total de preguntas
    resultados.innerHTML = `${numCorrectas} correctas de ${preguntas.length}`;
    puntos = numCorrectas;
  }

  function muestraTarjetas(n) {
    slides[tarjetaActual].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    tarjetaActual = n;
    if (tarjetaActual === 0) {
      anterior.style.display = "none";
    } else {
      anterior.style.display = "inline-block";
    }
    if (tarjetaActual === slides.length - 1) {
      siguiente.style.display = "none";
      enviar.style.display = "inline-block";
    } else {
      siguiente.style.display = "inline-block";
      enviar.style.display = "none";
    }
  }

  function muestraSiguiente() {
    muestraTarjetas(tarjetaActual + 1);
  }

  function muestraAnterior() {
    muestraTarjetas(tarjetaActual - 1);
  }

  // Variables
  const quiz = document.getElementById("quiz");
  const resultados = document.getElementById("resultado");
  const enviar = document.getElementById("enviar");
  const fecha = new Date();
  var puntos = 0;
  const hoy =
    fecha.getDate() +
    "/" +
    (fecha.getMonth() + 1) +
    "/" +
    fecha.getFullYear() +
    " " +
    fecha.getHours() +
    ":" +
    fecha.getMinutes() +
    ":" +
    fecha.getSeconds();
  const preguntas = [
    {
      pregunta: "Pregunta 1 super larga para mostrar cómo se acomoda en el div",
      respuestas: {
        a: "Respuesta a",
        b: "Respuesta b",
        c: "Respuesta c",
      },
      correcta: "c",
    },
    {
      pregunta: "Pregunta 2",
      respuestas: {
        a: "Respuesta a",
        b: "Respuesta b",
        c: "Respuesta c",
      },
      correcta: "b",
    },
    {
      pregunta: "Pregunta 3",
      respuestas: {
        a: "Respuesta a",
        b: "Respuesta b",
        c: "Respuesta c",
        d: "Respuesta d",
      },
      correcta: "d",
    },
  ];

  // Iniciando quiz
  construyeQuiz();

  // Paginación
  const anterior = document.getElementById("anterior");
  const siguiente = document.getElementById("siguiente");
  const slides = document.querySelectorAll(".slide");
  let tarjetaActual = 0;

  const iniciar = document.getElementById("iniciaConteo");

  // Mostrar las tarjetas de preguntas
  muestraTarjetas(tarjetaActual);

  /* ----------------------- ZONA DE TIEMPO TRANSCURRIDO ----------------------- */
  var invertalId = null;
  var contador = 0;

  function actualizar() {
    contador++;
    l = document.getElementById("contador-container");
    l.innerHTML = convertirSegundos(contador);
  }

  function iniciarContador() {
    intervalId = setInterval(actualizar, 1000); // Cada segundo
  }

  function detenerContador() {
    clearInterval(intervalId);
  }

  function convertirSegundos(seconds) {
    var hour = Math.floor(seconds / 3600);
    hour = hour < 10 ? "0" + hour : hour;
    var minute = Math.floor((seconds / 60) % 60);
    minute = minute < 10 ? "0" + minute : minute;
    var second = seconds % 60;
    second = second < 10 ? "0" + second : second;
    return hour + ":" + minute + ":" + second;
  }

  function deshabilitar() {
    x = document.getElementsByClassName("r");
    var i;
    for (i = 0; i < x.length; i++) {
      x[i].disabled = true;
    }
  }


  /* ----------------------- ZONA DE LOCAL STORAGE ----------------------- */
  var localStorageKeyName = 'data';

  function creaLocalStorage(){
      var nombre = "Usuario Prueba",
          puntaje = puntos,
          fecha = hoy,
          tiempo = contador,
          categoria = "Música";

      // Validate
      if (nombre.length === 0 || categoria.length === 0 || !parseInt(puntaje)) return;

      var user = {
          nombre: nombre,
          puntaje: puntaje,
          categoria: categoria,
          tiempo: tiempo,
          fecha: fecha
      };


      // Append to my localStorage
      appendObjectToLocalStorage(user);
  }

  function appendObjectToLocalStorage(obj) {
      var users = [],
          dataInLocalStorage = localStorage.getItem(localStorageKeyName);

      if (dataInLocalStorage !== null) {
          users = JSON.parse(dataInLocalStorage);
      }

      users.push(obj);

      localStorage.setItem(localStorageKeyName, JSON.stringify(users));

  }


  /* ----------------------- ZONA DE EVENT LISTENER ----------------------- */
  enviar.addEventListener("click", muestraResultados);
  enviar.addEventListener("click", detenerContador);
  enviar.addEventListener("click", deshabilitar);
  enviar.addEventListener("click", creaLocalStorage);
  anterior.addEventListener("click", muestraAnterior);
  siguiente.addEventListener("click", muestraSiguiente);
  iniciar.addEventListener("click", iniciarContador);
  console.log(hoy);
})();







