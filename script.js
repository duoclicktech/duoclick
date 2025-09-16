// Configura tu WhatsApp aquí (sin +, solo número con indicativo país)
const WHATSAPP_NUMBER = '573001112233';

function openWA() {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola Duoclick, quiero una web profesional')}`;
    window.open(url, '_blank');
}

function getWhatsAppLink(message = '') {
    const base = `https://wa.me/${WHATSAPP_NUMBER}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
document.querySelectorAll('[data-whatsapp]').forEach(el => {
    const msg = el.dataset.whatsapp || '';
    el.setAttribute('href', getWhatsAppLink(msg));
});


function sendWhatsApp(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value.trim();
    const message = document.getElementById('message').value.trim();

    const text = `Hola Duoclick 👋%0A\nSoy ${name}.%0AEmail: ${email}%0AWhatsApp: ${phone || 'N/A'}%0AServicio: ${service}%0A\nMensaje:%0A${message || '—'}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank');
    return false;
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Año dinámico
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll (reveal + mask + lines)
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            if (e.target.classList.contains('line')) {
                // efecto escalonado
                setTimeout(() => e.target.classList.add('show'), e.target.dataset.delay || 0);
            } else {
                e.target.classList.add('in', 'show');
            }
            io.unobserve(e.target);
        }
    });
}, {
    threshold: .12
});

// Observar reveals y masks
document.querySelectorAll('.reveal, .mask, .line').forEach((el, i) => {
    if (el.classList.contains('line')) el.dataset.delay = i * 200; // delay escalonado
    io.observe(el);
});

// Menu toggle
const nav = document.querySelector('.nav');
document.querySelector('.menu-toggle').addEventListener('click', () => nav.classList.toggle('open'));

// Cursor efecto (solo para PC, podría ser buena idea desactivarlo en móvil)
if (!('ontouchstart' in window)) {
    const cursor = document.createElement("div");
    cursor.classList.add("cursor");
    const cursorInner = document.createElement("div");
    cursorInner.classList.add("cursor-inner");
    document.body.appendChild(cursor);
    document.body.appendChild(cursorInner);

    document.addEventListener("mousemove", e => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorInner.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    document.addEventListener("mousemove", e => {
        document.body.style.setProperty("--x", e.clientX + "px");
        document.body.style.setProperty("--y", e.clientY + "px");
    });
}


// ====== SCROLL CARDS ======
(function () {
    const container = document.querySelector('.scroll-container');
    const track = document.querySelector('.cards-track');
    const viewport = document.querySelector('.scroll-cards');
    if (!container || !track || !viewport) return;

    function setHeight() {
        const viewportH = window.innerHeight;
        const extraScroll = Math.max(track.scrollWidth - window.innerWidth, 0);
        const maxExtra = window.innerHeight * 1.2; // nunca más de 120% de la altura de pantalla
        container.style.height = viewportH + Math.min(extraScroll, maxExtra) + 'px';
    }

    function onScroll() {
        const rect = container.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const maxScroll = container.offsetHeight - viewportH;
        const progress = Math.min(Math.max(-rect.top / maxScroll, 0), 1);
        const moveX = (track.scrollWidth - window.innerWidth) * progress;
        track.style.transform = `translateX(-${moveX}px)`;
    }

    window.addEventListener('resize', setHeight);
    window.addEventListener('scroll', onScroll, { passive: true });

    setHeight();
    onScroll();
})();

