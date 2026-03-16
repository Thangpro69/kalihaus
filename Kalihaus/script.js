document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // --- Language Toggle (EN <-> VI / ZH) ---
    let currentLang = 'en';

    function applyLanguage(lang) {
        document.querySelectorAll('[data-en]').forEach(el => {
            const text = el.getAttribute('data-' + lang);
            if (text) el.textContent = text;
        });
        // Toggle class so CSS can fix typography for non-Latin scripts
        document.body.classList.toggle('lang-foreign', lang !== 'en');
        currentLang = lang;
    }

    const langViBtn = document.getElementById('lang-vi');
    const langZhBtn = document.getElementById('lang-zh');

    if (langViBtn) {
        langViBtn.addEventListener('click', () => {
            applyLanguage(currentLang === 'vi' ? 'en' : 'vi');
        });
    }

    if (langZhBtn) {
        langZhBtn.addEventListener('click', () => {
            applyLanguage(currentLang === 'zh' ? 'en' : 'zh');
        });
    }
});
