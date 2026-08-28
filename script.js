/**
 * DUOCLICK — INTERACTIVE SCRIPTS & CORE LOGIC
 * High Conversion Tech Agency Engine
 */

const CONFIG = {
  whatsappNumber: "573122882557",
  defaultMsg: "Hola Duoclick! 👋 Me gustaría recibir más información y cotizar una solución para mi negocio.",
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Actualizar año en el footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Efecto de texto dinámico en el Hero
  initDynamicHeadline();

  // 3. Cotizador Interactivo Express
  initProjectEstimator();

  // 4. Filtro interactivo del Portafolio
  initPortfolioFilter();

  // 5. Contadores Numéricos Animados
  initAnimatedCounters();

  // 6. Efecto 3D Tilt en el Mockup del Hero
  initHeroTilt();

  // 7. Menú Móvil
  initMobileMenu();

  // 8. Formulario de Contacto Directo
  initContactForm();

  // 9. Scroll Reveal Animations
  initScrollReveal();
});

/* ==========================================================================
   2. TEXTO DINÁMICO HERO (Typewriter / Rotator)
   ========================================================================== */
function initDynamicHeadline() {
  const textEl = document.getElementById("typed-text");
  if (!textEl) return;

  const phrases = [
    "Páginas Web",
    "Bots de WhatsApp",
    "Software a Medida",
    "Tiendas Online",
    "Dashboards SaaS",
  ];

  let phraseIndex = 0;
  let charIndex = phrases[0].length;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
      textEl.textContent = currentPhrase.substring(0, charIndex);
      typingSpeed = 50;
    } else {
      charIndex++;
      textEl.textContent = currentPhrase.substring(0, charIndex);
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2200; // Pausa al completar la frase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Breve pausa antes de la siguiente palabra
    }

    setTimeout(typeLoop, typingSpeed);
  }

  // Iniciar después de 1.5s
  setTimeout(typeLoop, 1500);
}

/* ==========================================================================
   3. COTIZADOR INTERACTIVO EXPRESS
   ========================================================================== */
function initProjectEstimator() {
  const optionBtns = document.querySelectorAll("#project-type-options .option-btn");
  const addonCheckboxes = document.querySelectorAll("#addons-options input[type='checkbox']");
  const summaryTypeEl = document.getElementById("summary-project-type");
  const summaryTimeEl = document.getElementById("summary-time");
  const sendBtn = document.getElementById("send-estimate-btn");

  if (!optionBtns.length || !sendBtn) return;

  let state = {
    selectedType: "Landing Page",
    estimatedTime: "3-5 días hábiles",
    addons: ["Integración WhatsApp Pro", "SEO Técnico y Posicionamiento", "Hosting & Dominio Configurado"],
  };

  // Selección de tipo de proyecto
  optionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      optionBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      state.selectedType = btn.dataset.type || "Personalizado";
      state.estimatedTime = (btn.dataset.time || "3-7 días") + " hábiles";

      if (summaryTypeEl) summaryTypeEl.textContent = state.selectedType;
      if (summaryTimeEl) summaryTimeEl.textContent = state.estimatedTime;
    });
  });

  // Selección de checkboxes de addons
  addonCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      state.addons = Array.from(addonCheckboxes)
        .filter((i) => i.checked)
        .map((i) => i.value);
    });
  });

  // Enviar configuración armada a WhatsApp
  sendBtn.addEventListener("click", () => {
    const addonsList = state.addons.length > 0
      ? state.addons.map((a) => `• ${a}`).join("%0A")
      : "• Configuración estándar";

    const msg = `Hola Duoclick! 👋%0A%0AHe armado una cotización express en su sitio web:%0A%0A*📌 Tipo de Solución:* ${state.selectedType}%0A*⏱️ Tiempo Estimado:* ${state.estimatedTime}%0A%0A*⚙️ Extras y Requerimientos:*%0A${addonsList}%0A%0A¿Podríamos coordinar detalles y costos? ¡Gracias!`;

    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`, "_blank");
  });
}

/* ==========================================================================
   4. FILTRO DE PORTAFOLIO
   ========================================================================== */
function initPortfolioFilter() {
  const filterTabs = document.querySelectorAll(".filter-tab");
  const cards = document.querySelectorAll(".portfolio-card");

  if (!filterTabs.length || !cards.length) return;

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const filterValue = tab.dataset.filter;

      cards.forEach((card) => {
        const category = card.dataset.category;
        if (filterValue === "all" || category === filterValue) {
          card.style.display = "block";
          card.style.animation = "fadeInCard 0.4s ease forwards";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* ==========================================================================
   5. CONTADORES NUMÉRICOS ANIMADOS
   ========================================================================== */
function initAnimatedCounters() {
  const counters = document.querySelectorAll(".counter");
  if (!counters.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          counters.forEach((counter) => {
            const target = +counter.getAttribute("data-target");
            const duration = 1600; // ms
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                counter.textContent = (target >= 50 ? "+" : "") + target;
                clearInterval(timer);
              } else {
                counter.textContent = (target >= 50 ? "+" : "") + Math.floor(current);
              }
            }, stepTime);
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  const heroStats = document.querySelector(".hero-stats-bar");
  if (heroStats) observer.observe(heroStats);
}

/* ==========================================================================
   6. EFECTO 3D TILT EN HERO MOCKUP
   ========================================================================== */
function initHeroTilt() {
  const tiltCard = document.getElementById("hero-tilt");
  if (!tiltCard || window.innerWidth < 1024) return;

  const container = tiltCard.closest(".hero-visual");
  if (!container) return;

  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  container.addEventListener("mouseleave", () => {
    tiltCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
}

/* ==========================================================================
   7. MENÚ MÓVIL
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", isOpen);
  });

  // Cerrar al hacer clic en un enlace del menú
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });
}

/* ==========================================================================
   8. FORMULARIO DE CONTACTO
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById("wa-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim() || "No provisto";
    const service = document.getElementById("service").value;
    const msg = document.getElementById("message").value.trim() || "Sin mensaje adicional";

    const text = `Hola Duoclick! 👋%0A%0A*🚀 Nueva Solicitud de Proyecto Web*%0A👤 *Nombre:* ${name}%0A✉️ *Email:* ${email}%0A📱 *WhatsApp:* ${phone}%0A🎯 *Servicio:* ${service}%0A📝 *Detalles:* ${msg}`;

    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${text}`, "_blank");
  });
}

/* ==========================================================================
   10. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  reveals.forEach((el) => observer.observe(el));
}
