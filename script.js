/**
 * DUOCLICK — HIGH CONVERSION ENGINE
 * Ultra-lean, fast-loading scripts for paid ads & organic traffic
 */

const CONFIG = {
  whatsappNumber: "573122882557",
};

document.addEventListener("DOMContentLoaded", () => {
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

    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${message}`, "_blank");
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
