let vueltas = JSON.parse(localStorage.getItem("vueltas")) || [];
let temaClaro = false;

// Mostrar secciones
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
  const vuelta = {
    circuito: document.getElementById("circuito").value.trim(),
    auto: document.getElementById("auto").value.trim(),
    categoria: document.getElementById("categoria").value,
    pp: document.getElementById("pp").value,
    potencia: document.getElementById("potencia").value,
    fecha: document.getElementById("fecha").value,
    tiempo: document.getElementById("tiempo").value.trim(),
    posicion: document.getElementById("posicion").value,
    notas: document.getElementById("notas").value.trim()
  };
  vueltas.push(vuelta);
  localStorage.setItem("vueltas", JSON.stringify(vueltas));
  e.target.reset();
  actualizarDashboard();
  actualizarHistorial();
  actualizarEstadisticas();
  alert("✅ Vuelta guardada");
});

// Dashboard
function actualizarDashboard() {
  document.getElementById("totalVueltas").textContent = vueltas.length;
  if (vueltas.length > 0) {
    const tiempos = vueltas.map(v => convertirTiempo(v.tiempo)).filter(t => !isNaN(t));
    const mejor = Math.min(...tiempos);
    const promedio = tiempos.reduce((a,b)=>a+b,0)/tiempos.length;
    document.getElementById("mejorTiempo").textContent = formatearTiempo(mejor);
    document.getElementById("promedioTiempo").textContent = formatearTiempo(promedio);
    document.getElementById("ultimaSesion").textContent = vueltas[vueltas.length-1].fecha;
    const circuitosUnicos = [...new Set(vueltas.map(v=>v.circuito))];
    document.getElementById("totalCircuitos").textContent = circuitosUnicos.length;
  }
}

// Historial
function actualizarHistorial() {
  const tbody = document.querySelector("#tablaHistorial tbody");
  tbody.innerHTML = "";
  let filtroCircuito = document.getElementById("buscarCircuito").value.toLowerCase();
  let filtroAuto = document.getElementById("buscarAuto").value.toLowerCase();

  vueltas.filter(v => 
    v.circuito.toLowerCase().includes(filtroCircuito) &&
    v.auto.toLowerCase().includes(filtroAuto)
  ).forEach((v,i)=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${v.circuito}</td>
      <td>${v.auto}</td>
      <td>${v.tiempo}</td>
      <td>${v.fecha}</td>
      <td>
        <button onclick="editarVuelta(${i})">✏️</button>
        <button onclick="eliminarVuelta(${i})">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function editarVuelta(i) {
  const v = vueltas[i];
  document.getElementById("circuito").value = v.circuito;
  document.getElementById("auto").value = v.auto;
  document.getElementById("categoria").value = v.categoria;
  document.getElementById("pp").value = v.pp;
  document.getElementById("potencia").value = v.potencia;
  document.getElementById("fecha").value = v.fecha;
  document.getElementById("tiempo").value = v.tiempo;
  document.getElementById("posicion").value = v.posicion;
  document.getElementById("notas").value = v.notas;
  eliminarVuelta(i);
  showSection("registro");
}

function eliminarVuelta(i) {
  if (confirm("
