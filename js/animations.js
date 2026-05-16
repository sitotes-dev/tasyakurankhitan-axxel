// Initialize GSAP, AOS, and Parallax
const initCoreAnimations = () => {
    if (window.gsap) gsap.registerPlugin(ScrollTrigger);

    if (window.AOS) {
        AOS.init({
            duration: 2000, // Lebih lambat (Slow)
            once: true,
            easing: 'ease-out-quad'
        });
    }

    if (window.VanillaTilt) {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 5, // Kurangi kemiringan agar tidak brutal
            speed: 400,
            glare: true,
            "max-glare": 0.1,
        });
    }
};

document.addEventListener('DOMContentLoaded', initCoreAnimations);

window.addEventListener('sectionsLoaded', () => {
    if (window.AOS) AOS.refresh();
    
    // Deep Perspective Parallax (Super smooth)
    gsap.to(".layer-1", {
        y: -120, scale: 1.1,
        scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: 1.5 }
    });
    gsap.to(".layer-2", {
        y: 80, scale: 0.9,
        scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: 1.5 }
    });
    gsap.to(".layer-3", {
        y: -180, rotation: 15,
        scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: 2 }
    });
    gsap.to(".hero-frame", {
        y: 40,
        scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: 1 }
    });

    // Slow Reveal Animations
    const revealElements = document.querySelectorAll('[data-gsap-reveal]');
    revealElements.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 95%",
                toggleActions: "play none none none"
            },
            y: 30, // Jarak gerakan lebih pendek
            opacity: 0,
            duration: 2.5, // Durasi jauh lebih lama (Slow)
            ease: "power2.out"
        });
    });

    if (window.Fancybox) {
        Fancybox.bind("[data-fancybox]", {
            dragToClose: false,
            Toolbar: {
                display: {
                    left: ["infobar"],
                    middle: [],
                    right: ["iterateZoom", "slideshow", "fullScreen", "download", "thumbs", "close"],
                },
            },
        });
    }
});

const initTilt = () => {
    if (window.VanillaTilt) {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.1,
        });
    }
};
