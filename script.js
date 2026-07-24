let vueltas = JSON.parse(localStorage.getItem("vueltas")) || [];
let temaClaro = false;

function showSection(id) {
  document.querySelectorAll("main section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  actualizarDashboard();
  actualizarHistorial();
  actualizarEstadisticas();
}

// Guardar vuelta
document.getElementById("lapForm").addEventListener("submit", e => {
  e.preventDefault();
  const circuito = document.getElementById("circuito").value.trim();
  const auto = document.getElementById("auto").value.trim();
  const categoria = document.getElementById("categoria").value;
  const pp = document.getElementById("pp").value;
  const potencia = document.getElementById("potencia").value;
  const fecha = document.getElementById("fecha").value;
  const tiempo = document.getElementById("tiempo").value.trim();

