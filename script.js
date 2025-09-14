// Configura tu WhatsApp aquí (sin +, solo número con indicativo país)
const WA_NUMBER = '573001112233';

function openWA() {
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Duoclick, quiero una web profesional')}`;
    window.open(url, '_blank');
}

function sendWhatsApp(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value.trim();
    const message = document.getElementById('message').value.trim();

    const text = `Hola Duoclick 👋%0A\nSoy ${name}.%0AEmail: ${email}%0AWhatsApp: ${phone || 'N/A'}%0AServicio: ${service}%0A\nMensaje:%0A${message || '—'}`;
    window.open(`httpshttps://wa.me/${WA_NUMBER}?text=${text}`, '_blank');
    return false;
}

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

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
}, { threshold: .12 });

// Observar reveals y masks
document.querySelectorAll('.reveal, .mask, .line').forEach((el, i) => {
    if (el.classList.contains('line')) el.dataset.delay = i * 200; // delay escalonado
    io.observe(el);
});

// Menu toggle
const nav = document.querySelector('.nav');
document.querySelector('.menu-toggle').addEventListener('click', () => nav.classList.toggle('open'));

// ====== SCROLL TEXT SEQUENCE ======
(function () {
    const section = document.querySelector('.scroll-text');
    const words = document.querySelectorAll('.scroll-words .word');
    if (!section || !words.length) return;

    const totalWords = words.length;

    function updateWords() {
        const rect = section.getBoundingClientRect();
        const scrollY = window.innerHeight - rect.top;
        const progress = Math.min(1, Math.max(0, scrollY / rect.height));

        // índice de palabra según progreso
        const index = Math.min(totalWords - 1, Math.floor(progress * totalWords));

        words.forEach((w, i) => w.classList.toggle('active', i === index));
    }

    window.addEventListener('scroll', updateWords, { passive: true });
    window.addEventListener('resize', updateWords);
    updateWords();
})();
