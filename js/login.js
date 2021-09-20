document.addEventListener("DOMContentLoaded", function () {
  if (
    sessionStorage.getItem("usuario") != "Prueba" ||
    sessionStorage.getItem("pass") != "12345"
  ) {
    window.location.href = "index.html";
  }
});

function cerrar() {
  sessionStorage.removeItem("usuario");
  sessionStorage.removeItem("pass");
  window.location.href = "index.html";
}
