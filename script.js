const CONFIG = {
  whatsappNumber: "573122882557",
  defaultMsg:
    "Hola Duoclick, me gustaría recibir más información sobre sus servicios.",
};

document.getElementById("year").textContent = new Date().getFullYear();

const contactForm = document.getElementById("wa-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim() || "No provisto",
      service: document.getElementById("service").value.trim(),
      msg:
        document.getElementById("message").value.trim() ||
        "Sin mensaje adicional",
    };

    const text = `Hola Duoclick! 👋%0A%0A*Nueva Solicitud Web*%0A👤 Nombre: ${data.name}%0A✉️ Email: ${data.email}%0A📱 WhatsApp: ${data.phone}%0A🚀 Interés: ${data.service}%0A📝 Mensaje: ${data.msg}`;

    window.open(
      `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`,
      "_blank",
    );
  });
}

const waFab = document.getElementById("wa-fab-btn");
if (waFab) {
  waFab.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.defaultMsg)}`;
}

const observerOptions = {
  threshold: 0.12,
  rootMargin: "0px 0px -50px 0px",
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in");
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  document.querySelectorAll(".menu a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
}

(function () {
  const container = document.querySelector(".scroll-container");
  const track = document.querySelector(".cards-track");
  const viewport = document.querySelector(".scroll-cards");

  if (!container || !track || !viewport) return;

  function setHeight() {
    const viewportH = window.innerHeight;
    const extraScroll = Math.max(track.scrollWidth - window.innerWidth, 0);
    container.style.height = viewportH + extraScroll + "px";
  }

  function onScroll() {
    const rect = container.getBoundingClientRect();
    const viewportH = window.innerHeight;

    const maxScroll = container.offsetHeight - viewportH;

    const progress = Math.min(Math.max(-rect.top / maxScroll, 0), 1);

    const moveX = (track.scrollWidth - window.innerWidth) * progress;
    track.style.transform = `translate3d(-${moveX}px, 0, 0)`;
  }

  window.addEventListener("resize", setHeight);
  window.addEventListener("scroll", onScroll, { passive: true });

  setHeight();
  onScroll();
})();

if (window.innerWidth > 1024 && !("ontouchstart" in window)) {
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    document.body.style.setProperty("--x", e.clientX + "px");
    document.body.style.setProperty("--y", e.clientY + "px");
  });

  const interactables = document.querySelectorAll(
    "a, button, input, textarea, summary",
  );
  interactables.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursor.style.backgroundColor = "rgba(225, 29, 72, 0.1)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursor.style.backgroundColor = "transparent";
    });
  });
}
