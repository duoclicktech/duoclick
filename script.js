/* ==========================================================================
   CONFIGURACIÓN GLOBAL DE DUOCLICK
   ========================================================================== */
const CONFIG = {
  // 👉 CAMBIA AQUÍ EL NÚMERO DE WHATSAPP (Solo números, con indicativo de país)
  // Al cambiarlo aquí, se actualizarán automáticamente todos los botones, enlaces y formularios del sitio.
  whatsappNumber: "573215843543",
};

/**
 * Genera la URL completa de WhatsApp con el número global configurado.
 * @param {string} message - Mensaje o texto a enviar (opcional)
 * @returns {string} URL completa de https://wa.me/...
 */
function getWhatsAppUrl(message = "") {
  const phone = (CONFIG.whatsappNumber || "").replace(/\D/g, "");
  if (!message) return `https://wa.me/${phone}`;
  let encoded = message;
  try {
    const decoded = decodeURIComponent(message);
    encoded = encodeURIComponent(decoded);
  } catch (e) {
    encoded = encodeURIComponent(message);
  }
  return `https://wa.me/${phone}?text=${encoded}`;
}

/**
 * Abre directamente WhatsApp con el número global y mensaje opcional.
 * @param {string} message - Mensaje o texto a enviar
 */
function openWhatsApp(message = "") {
  const url = getWhatsAppUrl(message);
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Sincroniza y actualiza automáticamente todos los enlaces de WhatsApp
 * que existan en la página (los que tengan data-wa-text o apunten a wa.me).
 */
function updateAllWhatsAppLinks() {
  document.querySelectorAll('a[href*="wa.me"], a[data-wa-text]').forEach((link) => {
    const customText = link.getAttribute("data-wa-text");
    if (customText !== null) {
      link.href = getWhatsAppUrl(customText);
    } else if (link.href.includes("wa.me")) {
      try {
        const urlObj = new URL(link.href);
        const currentText = urlObj.searchParams.get("text") || "";
        link.href = getWhatsAppUrl(currentText);
      } catch (err) {
        const match = link.href.match(/[?&]text=([^&]+)/);
        const currentText = match ? match[1] : "";
        link.href = getWhatsAppUrl(currentText);
      }
    }
  });

  // Actualizar también el número en los datos estructurados Schema.org si existen
  const schemaScript = document.querySelector('script[type="application/ld+json"]');
  if (schemaScript) {
    try {
      const data = JSON.parse(schemaScript.textContent);
      data.telephone = `+${CONFIG.whatsappNumber.replace(/\D/g, "")}`;
      schemaScript.textContent = JSON.stringify(data, null, 2);
    } catch (e) { }
  }
}

// Exponer funciones globales en window para que se puedan llamar desde cualquier parte
window.CONFIG = CONFIG;
window.getWhatsAppUrl = getWhatsAppUrl;
window.openWhatsApp = openWhatsApp;
window.updateAllWhatsAppLinks = updateAllWhatsAppLinks;

document.addEventListener("DOMContentLoaded", () => {
  // 0. Sincronizar todos los enlaces de WhatsApp con el número global
  updateAllWhatsAppLinks();

  // 1. Año en footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Typewriter en Hero (Soluciones que antojan)
  initDynamicHeadline();

  // 3. Menú Móvil
  initMobileMenu();

  // 4. Formulario de Contacto / Solución -> WhatsApp
  initContactForm();

  // 5. Scroll Reveal
  initScrollReveal();

  // 6. WhatsApp Flotante con Scroll Reveal
  initWhatsAppFab();

  // 7. Efecto 3D Tilt en Desktop Mockup
  initHeroTilt();

  // 8. Carrusel Móvil de Proyectos / Casos de Éxito
  initProjectsCarousel();
});

// Asegurar que cualquier clic dinámico en un enlace de WhatsApp use el número activo
document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href*="wa.me"], a[data-wa-text]');
  if (!link) return;
  const customText = link.getAttribute("data-wa-text");
  if (customText !== null) {
    link.href = getWhatsAppUrl(customText);
  } else if (link.href.includes("wa.me")) {
    try {
      const urlObj = new URL(link.href);
      const currentText = urlObj.searchParams.get("text") || "";
      link.href = getWhatsAppUrl(currentText);
    } catch (err) { }
  }
});

/* ==========================================================================
   TYPEWRITER HERO (SOLUCIONES DE ALTO IMPACTO)
   ========================================================================== */
function initDynamicHeadline() {
  const textEl = document.getElementById("typed-text");
  if (!textEl) return;

  const phrases = [
    "impulsan tu negocio",
    "multiplican tus ventas",
    "automatizan tu operación",
    "hacen crecer tu empresa",
  ];

  let phraseIndex = 0;
  let charIndex = phrases[0].length;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
      textEl.textContent = currentPhrase.substring(0, charIndex);
      typingSpeed = 40;
    } else {
      charIndex++;
      textEl.textContent = currentPhrase.substring(0, charIndex);
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 350;
    }

    setTimeout(typeLoop, typingSpeed);
  }

  setTimeout(typeLoop, 1000);
}

/* ==========================================================================
   MENÚ MÓVIL
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", isOpen);
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });
}

/* ==========================================================================
   FORMULARIO DE CONTACTO -> WHATSAPP
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("wa-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;

    const message = `Hola Duoclick! 👋%0A%0A*🚀 Solicitud de Cotización con Especialista:*%0A👤 *Nombre / Empresa:* ${encodeURIComponent(name)}%0A📱 *WhatsApp:* ${encodeURIComponent(phone)}%0A🎯 *Solución de interés:* ${encodeURIComponent(service)}%0A%0A_Deseo hablar con un especialista para cotizar mi proyecto y definir la mejor solución para mi empresa._`;

    openWhatsApp(message);
  });
}

/* ==========================================================================
   SCROLL REVEAL (INTERSECTION OBSERVER)
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
      rootMargin: "0px 0px -30px 0px",
    }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   WHATSAPP FAB (APARECE CON SCROLL DE FORMA NATURAL)
   ========================================================================== */
function initWhatsAppFab() {
  const fab = document.querySelector(".wa-fab");
  if (!fab) return;

  const threshold = 180;

  function onScroll() {
    if (window.scrollY > threshold) {
      fab.classList.add("visible");
    } else {
      fab.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   HERO 3D TILT EFFECT (DESKTOP)
   ========================================================================== */
function initHeroTilt() {
  const container = document.querySelector(".hero-visual");
  const tiltCard = document.getElementById("hero-tilt");
  if (!container || !tiltCard) return;

  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  container.addEventListener("mouseleave", () => {
    tiltCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
}

/* ==========================================================================
   CARRUSEL MÓVIL DE PROYECTOS / CASOS DE ÉXITO (INFINITO & TÁCTIL)
   ========================================================================== */
function initProjectsCarousel() {
  const grid = document.querySelector(".projects-grid");
  const dots = document.querySelectorAll(".projects-carousel-dots .carousel-dot");
  const prevBtn = document.getElementById("proj-prev-btn");
  const nextBtn = document.getElementById("proj-next-btn");
  const projectsSection = document.getElementById("proyectos");

  if (!grid || !dots.length) return;

  const originalCards = Array.from(grid.querySelectorAll(".project-card:not(.is-clone)"));
  if (originalCards.length !== 3) return;

  // 1. Crear clones para scroll infinito continuo (3 clones antes y 3 clones después)
  if (!grid.querySelector(".is-clone")) {
    const beforeClones = originalCards.map(c => {
      const clone = c.cloneNode(true);
      clone.classList.add("is-clone");
      return clone;
    });
    const afterClones = originalCards.map(c => {
      const clone = c.cloneNode(true);
      clone.classList.add("is-clone");
      return clone;
    });

    // Insertar en orden [0, 1, 2] antes del primer elemento
    beforeClones.reverse().forEach(clone => grid.insertBefore(clone, grid.firstChild));
    afterClones.forEach(clone => grid.appendChild(clone));
  }

  const allCards = Array.from(grid.querySelectorAll(".project-card"));
  const SET_SIZE = 3; // 3 proyectos reales
  let activeLogicalIndex = 0; // 0, 1, o 2
  let currentCardIndex = SET_SIZE; // Empezar en el conjunto central (índice 3: Browlash real)
  let autoplayTimer = null;
  let resumeTimer = null;
  let isInteracting = false;
  let isNormalizing = false;
  const AUTOPLAY_INTERVAL = 3800; // 3.8 segundos por tarjeta

  function getCardStep() {
    if (allCards.length < 2) return 0;
    const r0 = allCards[0].getBoundingClientRect();
    const r1 = allCards[1].getBoundingClientRect();
    return Math.abs(r1.left - r0.left);
  }

  function scrollToCardIndex(index, smooth = true) {
    if (index < 0) index = 0;
    if (index >= allCards.length) index = allCards.length - 1;
    currentCardIndex = index;

    const targetCard = allCards[currentCardIndex];
    if (targetCard) {
      const gridRect = grid.getBoundingClientRect();
      const cardRect = targetCard.getBoundingClientRect();
      const currentScroll = grid.scrollLeft;
      const offset = cardRect.left - gridRect.left;
      const targetScroll = currentScroll + offset - (grid.clientWidth - cardRect.width) / 2;

      grid.scrollTo({
        left: targetScroll,
        behavior: smooth ? "smooth" : "instant"
      });
    }

    activeLogicalIndex = ((currentCardIndex % SET_SIZE) + SET_SIZE) % SET_SIZE;
    updateDots(activeLogicalIndex);
  }

  function updateDots(logicalIdx) {
    dots.forEach((dot, idx) => {
      const isActive = idx === logicalIdx;
      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  // Inicializar posición en el conjunto central al cargar en móvil
  function initMobilePosition() {
    if (window.innerWidth <= 768) {
      currentCardIndex = SET_SIZE;
      scrollToCardIndex(SET_SIZE, false);
    }
  }

  // Normalización invisible al deslizar con el dedo a los extremos
  function normalizePosition() {
    if (isNormalizing || window.innerWidth > 768) return;
    const step = getCardStep();
    if (!step) return;

    // Si llegó a los clones anteriores (índices 0, 1, 2), saltar silenciosamente al centro
    if (currentCardIndex < SET_SIZE) {
      isNormalizing = true;
      currentCardIndex += SET_SIZE;
      grid.scrollTo({
        left: grid.scrollLeft + (SET_SIZE * step),
        behavior: "instant"
      });
      setTimeout(() => { isNormalizing = false; }, 50);
    }
    // Si llegó a los clones posteriores (índices 6, 7, 8), saltar silenciosamente al centro
    else if (currentCardIndex >= SET_SIZE * 2) {
      isNormalizing = true;
      currentCardIndex -= SET_SIZE;
      grid.scrollTo({
        left: grid.scrollLeft - (SET_SIZE * step),
        behavior: "instant"
      });
      setTimeout(() => { isNormalizing = false; }, 50);
    }
  }

  // Autoplay continuo hacia la izquierda (siempre avanza)
  function startAutoplay() {
    stopAutoplay();
    if (window.innerWidth > 768 || isInteracting) return;
    autoplayTimer = setInterval(() => {
      scrollToCardIndex(currentCardIndex + 1, true);
    }, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function pauseAndResumeAutoplay() {
    stopAutoplay();
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      isInteracting = false;
      startAutoplay();
    }, 5000);
  }

  // Clic en los puntos indicadores (dots)
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      isInteracting = true;
      pauseAndResumeAutoplay();
      const targetLogical = parseInt(dot.getAttribute("data-index"), 10);
      scrollToCardIndex(SET_SIZE + targetLogical, true);
    });
  });

  // Botones Anterior / Siguiente
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      isInteracting = true;
      pauseAndResumeAutoplay();
      scrollToCardIndex(currentCardIndex - 1, true);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      isInteracting = true;
      pauseAndResumeAutoplay();
      scrollToCardIndex(currentCardIndex + 1, true);
    });
  }

  // Interacción táctil con el dedo (swipe)
  grid.addEventListener("touchstart", () => {
    isInteracting = true;
    stopAutoplay();
  }, { passive: true });

  grid.addEventListener("touchend", () => {
    pauseAndResumeAutoplay();
  }, { passive: true });

  grid.addEventListener("mouseenter", () => {
    stopAutoplay();
  });

  grid.addEventListener("mouseleave", () => {
    if (!isInteracting) startAutoplay();
  });

  // Sincronización al deslizar con el dedo (touch swipe / scroll)
  let scrollTimeout;
  grid.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (isNormalizing) return;
      const gridRect = grid.getBoundingClientRect();
      const gridCenter = gridRect.left + gridRect.width / 2;

      let closestIdx = 0;
      let minDiff = Infinity;

      allCards.forEach((card, idx) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const diff = Math.abs(gridCenter - cardCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });

      currentCardIndex = closestIdx;
      activeLogicalIndex = ((closestIdx % SET_SIZE) + SET_SIZE) % SET_SIZE;
      updateDots(activeLogicalIndex);

      // Normalizar para que el scroll sea infinito y nunca termine
      normalizePosition();
    }, 60);
  }, { passive: true });

  // Iniciar en la posición correcta al cargar
  setTimeout(initMobilePosition, 100);

  // Iniciar autoplay solo cuando la sección de proyectos esté visible
  if ("IntersectionObserver" in window && projectsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startAutoplay();
        } else {
          stopAutoplay();
        }
      });
    }, { threshold: 0.2 });
    observer.observe(projectsSection);
  } else {
    startAutoplay();
  }

  // Manejar cambio de tamaño de pantalla
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      stopAutoplay();
    } else {
      initMobilePosition();
      startAutoplay();
    }
  }, { passive: true });
}

/* ==========================================================================
   TSPARTICLES — INTERACTIVE PARTICLE NETWORK BACKGROUND
   Efecto visual premium: Red de nodos conectados con estética Dark Tech
   ========================================================================== */
function initParticlesBackground() {
  if (typeof tsParticles === "undefined") return;

  tsParticles.load("tsparticles", {
    fullScreen: false,
    fpsLimit: 60,
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          area: 900,
        },
      },
      color: {
        value: ["#f43f5e", "#fb7185", "#64748b", "#38bdf8"],
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: { min: 0.15, max: 0.5 },
        animation: {
          enable: true,
          speed: 0.8,
          minimumValue: 0.1,
          sync: false,
        },
      },
      size: {
        value: { min: 1, max: 3 },
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.5,
          sync: false,
        },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#f43f5e",
        opacity: 0.12,
        width: 1,
        triangles: {
          enable: true,
          opacity: 0.02,
        },
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: "none",
        random: true,
        straight: false,
        outModes: {
          default: "out",
        },
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 180,
          links: {
            opacity: 0.35,
            color: "#f43f5e",
          },
        },
        push: {
          quantity: 3,
        },
      },
    },
    detectRetina: true,
    background: {
      color: "transparent",
    },
  });
}

// Inicializar partículas cuando tsParticles esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    // Esperar un momento para que tsParticles (defer) se cargue
    setTimeout(initParticlesBackground, 100);
  });
} else {
  setTimeout(initParticlesBackground, 100);
}
