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
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
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

// ===== Stat Counter Animation =====
function animateStats() {
    const stats = document.querySelectorAll('.stat-number[data-target]');
    stats.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        const duration = 2000;
        const start = performance.now();
        
        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = Math.round(eased * target);
            stat.textContent = current.toLocaleString();
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
}

// ===== Fade-in on scroll =====
function setupScrollAnimations() {
    // Add fade-in class to elements
    const animTargets = document.querySelectorAll(
        '.service-card, .ai-card, .value-card, .cert-group, .testimonial-card, .stat-item, .contact-card, .hubzone-banner, .how-we-work'
    );
    animTargets.forEach(el => el.classList.add('fade-in'));

    let statsAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger stat animation when stats come into view
                if (entry.target.classList.contains('stat-item') && !statsAnimated) {
                    statsAnimated = true;
                    animateStats();
                }
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animTargets.forEach(el => observer.observe(el));
    
    // Also observe stat items
    document.querySelectorAll('.stat-item').forEach(el => observer.observe(el));
}

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // If using Formspree, submit normally
        // For now, show success message (replace with actual form endpoint)
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'var(--green)';
                submitBtn.style.borderColor = 'var(--green)';
                this.reset();
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.borderColor = '';
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
        }).catch(() => {
            // Fallback: mailto
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            const service = formData.get('service');
            const subject = `Website Inquiry from ${name}`;
            const body = `Name: ${name}\nEmail: ${email}\nService: ${service}\n\n${message}`;
            window.location.href = `mailto:Andre@MirzayanConsulting.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            submitBtn.innerHTML = '<i class="fas fa-envelope"></i> Opening Email...';
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    });
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
