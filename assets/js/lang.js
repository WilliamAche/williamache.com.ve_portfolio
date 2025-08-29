// ===============================
// Configuración inicial
// ===============================
let currentLang = "es"; // Por defecto español

// Diccionario de traducción
const translations = {
  es: {
    Resumen: "Resumen",
    Trabajos: "Trabajos",
    Habilidades: "Habilidades",
    "Curriculum Vitae (CV)": "Curriculum Vitae (CV)",
    "Correo Electrónico": "Correo Electrónico",
    Teléfono: "Teléfono",
    Ubicación: "Ubicación",
    "Desarrollador Web": "Desarrollador Web",
    cvFile:
      "./assets/docs/Curriculum Vitae CV - William Ache - Full Stack Laravel - Español.pdf",
  },
  en: {
    Resumen: "Summary",
    Trabajos: "Work",
    Habilidades: "Skills",
    "Curriculum Vitae (CV)": "Curriculum Vitae (CV)",
    "Correo Electrónico": "Email",
    Teléfono: "Phone",
    Ubicación: "Location",
    "Desarrollador Web": "Web Developer",
    cvFile:
      "./assets/docs/Curriculum Vitae CV - William Ache - Full Stack Laravel - English.pdf",
  },
};

// ===============================
// Función para traducir página
// ===============================
function translatePage(lang) {
  document.querySelectorAll("[data-translate]").forEach((el) => {
    const key = el.getAttribute("data-translate");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Cambiar archivo del CV según idioma
  const cvLink = document.querySelector(".cv-link");
  if (cvLink) {
    cvLink.setAttribute("href", translations[lang].cvFile);
  }
}

// ===============================
// Inicializar selector de idioma
// ===============================
function updateLanguageSelector() {
  const langSelector = document.querySelector(".language-selector");
  langSelector.innerHTML = "";

  if (currentLang === "es") {
    langSelector.innerHTML = `
      <a href="#" class="language-link" data-lang="en">
        <img src="./assets/images/united-states.svg" alt="English" width="30" />
      </a>
    `;
  } else {
    langSelector.innerHTML = `
      <a href="#" class="language-link" data-lang="es">
        <img src="./assets/images/spain.svg" alt="Español" width="30" />
      </a>
    `;
  }

  // Reasignar el listener
  const newLink = document.querySelector(".language-link");
  newLink.addEventListener("click", function (e) {
    e.preventDefault();
    currentLang = currentLang === "es" ? "en" : "es";
    updateLanguageSelector();
    translatePage(currentLang);
  });
}

// ===============================
// Inicialización
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  translatePage(currentLang);
  updateLanguageSelector();
});
