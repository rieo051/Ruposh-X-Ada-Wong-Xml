// --- Configuration ---
const IG_USERNAME = "your_store_username"; // Replace with your actual IG handle



// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    initLenis();
    initCursor();
    runLoader();
    initNavbarScroll();
});

// --- Smooth Scrolling (Lenis) ---
function initLenis() {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
}

// --- Navbar Scroll ---
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// --- Custom Cursor ---
function initCursor() {
    const cursor = document.querySelector('.cursor');
    if(window.innerWidth < 768) return; // Skip on mobile

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    // Hover effect for buttons and cards
    const hoverElements = document.querySelectorAll('a, button, .game-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 2, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
        });
    });
}

// --- Loading Sequence & Animations ---
function runLoader() {
    // Simply wait for 1.5 seconds then reveal the site
    setTimeout(() => {
        revealSite();
    }, 1500);
}

function revealSite() {
    const tl = gsap.timeline();
    
    tl.to('#loader', {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
        delay: 0.2
    })
    .from('.hero-title, .hero-desc, .hero-buttons, .label', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
    }, "-=0.4");
}
