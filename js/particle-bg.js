const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = []; // Holds each particle

// Settings
const particleAmount = 4;

// Rearrange the canvas each time you resize your window 
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].checkLocation();
    }
});

// Move particles up or down depending on scroll
window.addEventListener('scroll', (e) => {
    if(this.oldScroll > this.scrollY) {
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].up();
        }
    }
    else {
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].down();
        }
    }

    this.oldScroll = this.scrollY;
})

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 100 + 300;
        this.speedX = Math.random() * 1 - .5; // -.5 to .5
        this.speedY = Math.random() * 1 - .5;
        this.hsl = Math.floor(Math.random() * 40 + 160); 
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x + this.size >= canvas.width) {
            this.x -= 3;
            this.speedX = -this.speedX;
        }
        if (this.x - this.size <= 0) {
            this.x += 3;
            this.speedX = Math.abs(Math.random() * 1 - .5);
        }
        if (this.y + this.size >= canvas.height) {
            this.y -= 3;
            this.speedY = -this.speedY;
        }
        if (this.y - this.size <= 0) {
            this.y += 3;
            this.speedY = Math.abs(Math.random() * 1 - .5);
        }
    }
    draw() {
        ctx.fillStyle = `hsla(${this.hsl}, 100%, 50%, 20%)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    up() {
        this.y += 5;

        if (this.y > canvas.height) {
            this.y -= 5;
        }
    }
    down() {
        this.y -= 5;

        if (this.y < 0) {
            this.y += 5;
        }
    }
    checkLocation() {
        if (this.x > canvas.width) {
            this.x -= 6;
        }
        if (this.y > canvas.height) {
            this.y -= 6;
        }
    }
}

// Adds each new particle created to particlesArray
function init() {
    for (let i = 0; i < particleAmount; i++) {
        particlesArray.push(new Particle())
    }
}
init();

function check100Particle() {
    while (particlesArray.length <= particleAmount) {
        particlesArray.push(new Particle());
    }
}

// Each particle constructor in particlesArray, run the update and draw method
function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    check100Particle();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();

    requestAnimationFrame(animate);
}
animate();