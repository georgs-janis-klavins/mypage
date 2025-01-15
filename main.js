document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(() => {
            nav.classList.toggle('nav-scrolled', window.scrollY > 50);
        });
    });

    // Benefit cards interaction
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    benefitCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            benefitCards.forEach(c => c.setAttribute('data-checked', 'false'));
            card.setAttribute('data-checked', 'true');
        });
        
        card.addEventListener('mouseleave', () => {
            card.setAttribute('data-checked', 'false');
        });
    });
});
