document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        const hero = canvas.parentElement;
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 0.8 + 0.3;
            this.speedX = Math.random() * 0.3 - 0.15;
            this.speedY = Math.random() * 0.3 - 0.15;
            this.opacity = Math.random() * 0.5 + 0.5;
            this.glowSize = this.size * 2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0 || 
                this.y > canvas.height || this.y < 0) {
                this.reset();
            }
        }

        draw() {
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.glowSize
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
            gradient.addColorStop(0.4, `rgba(255, 255, 255, ${this.opacity * 0.4})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity + 0.3})`;
            ctx.fill();
        }
    }

    class ShootingStar {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = canvas.width * (0.7 + Math.random() * 0.3);
            this.y = canvas.height * Math.random() * 0.4;
            this.length = Math.random() * 80 + 100;
            this.speed = Math.random() * 8 + 12;
            this.opacity = 1;
            this.active = true;
            this.angleX = this.speed * (0.5 + Math.random() * 0.8);
            this.angleY = this.speed * (0.3 + Math.random() * 0.8);
        }

        update() {
            this.x -= this.angleX;
            this.y += this.angleY;
            this.opacity -= 0.008;

            if (this.x < -this.length || this.y > canvas.height || this.opacity <= 0) {
                this.active = false;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(
                this.x + this.length * (this.angleX / this.speed),
                this.y - this.length * (this.angleY / this.speed)
            );
            
            const gradient = ctx.createLinearGradient(
                this.x, this.y,
                this.x + this.length * (this.angleX / this.speed),
                this.y - this.length * (this.angleY / this.speed)
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    let shootingStar = null;

    function createShootingStar() {
        const delay = Math.random() * 4000 + 2000;
        setTimeout(() => {
            shootingStar = new ShootingStar();
            createShootingStar();
        }, delay);
    }

    createShootingStar();

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'lighter';
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        if (shootingStar && shootingStar.active) {
            shootingStar.update();
            shootingStar.draw();
        }

        ctx.globalCompositeOperation = 'source-over';
        requestAnimationFrame(animate);
    }

    animate();
}); 