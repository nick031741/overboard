document.addEventListener('DOMContentLoaded', () => {

    // 1. REVEAL АНИМАЦИИ
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.querySelector('strong')) {
                    entry.target.querySelectorAll('strong').forEach(counter => animateCounter(counter));
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 2. СЧЁТЧИК ЧИСЕЛ
    function animateCounter(el) {
        const text = el.innerText.trim();
        const isDecimal = text.includes('.');
        const target = parseFloat(text);
        if (isNaN(target)) return;
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const update = () => {
            current += step;
            if (current < target) {
                el.innerText = isDecimal ? current.toFixed(1) : Math.floor(current);
                requestAnimationFrame(update);
            } else {
                el.innerText = text;
            }
        };
        update();
    }

    // 3. ШАПКА ПРИ СКРОЛЛЕ
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 100);
    });

    // 4. ПЛАВНЫЙ СКРОЛЛ
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.pageYOffset - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. ФОРМА + ПОПАП УСПЕХ
    const form = document.getElementById('contactForm');
    const popup = document.getElementById('successPopup');
    const closeBtn = document.getElementById('popupClose');

    if (form && popup) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'ОТПРАВКА...';
            btn.style.opacity = '0.7';
            btn.style.pointerEvents = 'none';

            await new Promise(r => setTimeout(r, 1200));

            form.reset();
            btn.innerText = originalText;
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'all';
            popup.classList.add('active');
        });

        closeBtn.addEventListener('click', () => popup.classList.remove('active'));
        popup.addEventListener('click', (e) => { if (e.target === popup) popup.classList.remove('active'); });
    }

    // 6. СЛАЙДЕР ОТЗЫВОВ
    const track = document.getElementById('reviewsTrack');
    const dotsContainer = document.getElementById('reviewsDots');
    if (track && dotsContainer) {
        const cards = track.querySelectorAll('.review-card');
        const maxSteps = cards.length - 3;
        let current = 0;
        let autoTimer;

        for (let i = 0; i <= maxSteps; i++) {
            const dot = document.createElement('div');
            dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        }

        function goTo(idx) {
            current = Math.max(0, Math.min(idx, maxSteps));
            track.style.transform = `translateX(-${current * (cards[0].offsetWidth + 30)}px)`;
            dotsContainer.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === current));
        }

        function startAuto() { autoTimer = setInterval(() => goTo(current >= maxSteps ? 0 : current + 1), 4000); }
        function resetAuto() { clearInterval(autoTimer); startAuto(); }

        document.getElementById('reviewsNext').addEventListener('click', () => { goTo(current >= maxSteps ? 0 : current + 1); resetAuto(); });
        document.getElementById('reviewsPrev').addEventListener('click', () => { goTo(current <= 0 ? maxSteps : current - 1); resetAuto(); });

        startAuto();
    }

});