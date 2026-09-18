// ===== Navigation =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll handler - add background to nav
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', String(navMenu.classList.contains('active')));
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    }
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            link.classList.toggle('active', scrollY >= top && scrollY < top + height);
        }
    });
}
window.addEventListener('scroll', updateActiveNav);

// ===== Fade-in on scroll =====
function setupScrollAnimations() {
    if (!window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Add fade-in class to elements
    const animTargets = document.querySelectorAll(
        '.service-card, .ai-card, .value-card, .cert-group, .stat-item, .contact-card, .hubzone-banner, .how-we-work'
    );
    animTargets.forEach(el => el.classList.add('fade-in'));



    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                

            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animTargets.forEach(el => observer.observe(el));
    
    // Also observe stat items
    document.querySelectorAll('.stat-item').forEach(el => observer.observe(el));
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = navbar.offsetHeight + 20;
            const top = target.offsetTop - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    setupScrollAnimations();
    updateActiveNav();
});
