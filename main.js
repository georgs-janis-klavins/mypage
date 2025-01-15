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

    // Add scroll animation for timeline items
    function handleTimelineAnimation() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const triggerBottom = window.innerHeight * 0.9;

        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;

            if (itemTop < triggerBottom) {
                item.classList.add('animate');
            } else {
                item.classList.remove('animate');
            }
        });
    }

    window.addEventListener('scroll', handleTimelineAnimation);
    window.addEventListener('load', handleTimelineAnimation);

    // Wind Animation
    const canvas = document.getElementById('windCanvas');
    const ctx = canvas.getContext('2d');
    const particles = [];

    function initCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    class WindParticle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() * 2) + 1;
            this.speedY = (Math.random() - 0.5) * 0.2;
            this.opacity = Math.random() * 0.15 + 0.05;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) {
                this.x = 0;
            }
            if (this.y < 0 || this.y > canvas.height) {
                this.y = Math.random() * canvas.height;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(37, 99, 235, ${this.opacity * 0.8})`;
            ctx.fill();
        }
    }

    function initWindAnimation() {
        initCanvas();
        
        // Create particles
        for (let i = 0; i < 200; i++) {
            particles.push(new WindParticle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animate);
        }

        animate();
    }

    window.addEventListener('resize', () => {
        initCanvas();
        particles.length = 0;
        for (let i = 0; i < 200; i++) {
            particles.push(new WindParticle());
        }
    });
    initWindAnimation();
});
