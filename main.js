const ready = (fn) =>
  document.readyState !== "loading"
    ? fn()
    : document.addEventListener("DOMContentLoaded", fn);

// 1) Mostrar / Ocultar resúmenes
window.toggleResumen = function (id) {
  const resumen = document.getElementById(id);
  if (!resumen) return;
  const cur = resumen.style.display;
  resumen.style.display = (cur === "none" || cur === "") ? "block" : "none";
};

// 2) Botón "Volver arriba"
function handleScrollTopVisibility() {
  const btnTop = document.getElementById("btnTop");
  if (!btnTop) return;
  const y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  btnTop.style.display = y > 100 ? "block" : "none";
}
window.scrollTopFunction = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// 3) Buscador de artículos
function activarBuscador() {
  const buscador = document.getElementById("buscador");
  if (!buscador) return;
  buscador.addEventListener("input", function () {
    const filtro = this.value.toLowerCase();
    document.querySelectorAll("#articulos .card").forEach((card) => {
      const texto = card.innerText.toLowerCase();
      card.style.display = texto.includes(filtro) ? "block" : "none";
    });
  });
}

// 4) Modo oscuro/claro + almacenamiento en localStorage
window.toggleModo = function () {
  document.body.classList.toggle("bg-dark");
  document.body.classList.toggle("text-white");
  const dark = document.body.classList.contains("bg-dark");
  localStorage.setItem("modoOscuro", dark ? "1" : "0");
};
function aplicarModoGuardado() {
  const dark = localStorage.getItem("modoOscuro") === "1";
  if (dark) {
    document.body.classList.add("bg-dark", "text-white");
  }
}

// 5) Reloj
function activarReloj() {
  const reloj = document.getElementById("reloj");
  if (!reloj) return;
  setInterval(() => {
    reloj.textContent = new Date().toLocaleString();
  }, 1000);
}

// 6) Contador de artículos
function contarArticulos() {
  const contador = document.getElementById("contador");
  if (!contador) return;
  const total = document.querySelectorAll("#articulos .card").length;
  contador.textContent = `Total de artículos: ${total}`;
}

// 7) Hover en título
function activarEfectoTitulo() {
  const titulo = document.getElementById("tituloBase");
  if (!titulo) return;
  titulo.addEventListener("mouseover", () => (titulo.style.color = "blue"));
  titulo.addEventListener("mouseout", () => (titulo.style.color = "rgba(222,6,6,0.8)"));
}

// 9) Animación de tarjetas
function animarTarjetas() {
  const cards = document.querySelectorAll("#articulos .card");
  if (!cards.length) return;
  cards.forEach((c, i) => setTimeout(() => c.classList.add("show"), i * 200));
}

// 10) Contador de visitas
function contarVisitas() {
  const visitasEl = document.getElementById("visitas");
  if (!visitasEl) return;
  let visitas = localStorage.getItem("visitasBase1") || 0;
  visitas = parseInt(visitas) + 1;
  localStorage.setItem("visitasBase1", visitas);
  visitasEl.textContent = `Visitas a esta página: ${visitas}`;
}

// 11) Descargar títulos de artículos en TXT
window.descargarArticulos = function () {
  let titulos = [];
  document.querySelectorAll("#articulos .card-title").forEach((el) => {
    titulos.push(el.textContent);
  });
  const blob = new Blob([titulos.join("\n")], { type: "text/plain" });
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = "articulos.txt";
  enlace.click();
};

// ===== Init =====
ready(() => {
  aplicarModoGuardado();
  handleScrollTopVisibility();
  window.addEventListener("scroll", handleScrollTopVisibility);

  activarBuscador();
  activarReloj();
  contarArticulos();
  activarEfectoTitulo();
  animarTarjetas();
  contarVisitas();
});
