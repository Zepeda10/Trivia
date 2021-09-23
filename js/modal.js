const closeEls = document.querySelectorAll("[data-close]");
  const isVisible = "is-visible";

  window.onload = function (e) {
    document.getElementsByClassName('respuestas')[0].style.visibility = "hidden";
    document.getElementsByClassName('pregunta')[0].style.visibility = "hidden";
    document.getElementById("modal1").classList.add(isVisible); 
  };

  function cerrarModal(){
    document.getElementById("modal1").classList.remove(isVisible);
    document.getElementsByClassName('respuestas')[0].style.visibility = "visible"; 
    document.getElementsByClassName('pregunta')[0].style.visibility = "visible"; 
  }

  function cancelar(){
    window.location.href = "inicio.html";
  }