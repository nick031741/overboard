document.addEventListener('DOMContentLoaded', () => {

    // ШАПКА ПРИ СКРОЛЛЕ
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 80);
    });

    // КНОПКИ ПОВОДОВ
    document.querySelectorAll('.occasion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.occasion-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // СЧЁТЧИК КОРЗИНЫ (заглушка)
    const cartBtn = document.getElementById('cartBtn');
    const cartCount = cartBtn.querySelector('.cart-count');
    let count = 0;

    document.querySelector('.hero-card-btn').addEventListener('click', () => {
        count++;
        cartCount.textContent = count;
        cartCount.style.transform = 'scale(1.4)';
        setTimeout(() => cartCount.style.transform = 'scale(1)', 200);
    });

    // ПАРАЛЛАКС НА HERO-КАРТОЧКАХ при движении мыши
    const heroSection = document.querySelector('.hero');
    const cards = document.querySelectorAll('.hero-card');

    heroSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (clientX - cx) / cx;
        const dy = (clientY - cy) / cy;

        cards.forEach((card, i) => {
            const depth = i === 0 ? 12 : 8;
            card.style.transform = `translate(${dx * depth * -1}px, calc(-60% + ${dy * depth * -1}px))`;
            if (i === 1) card.style.transform = `translate(${dx * depth * -1}px, ${dy * depth * -1}px)`;
        });
    });

    heroSection.addEventListener('mouseleave', () => {
        cards[0].style.transform = 'translateY(-60%)';
        cards[1].style.transform = 'translateY(0)';
    });

});