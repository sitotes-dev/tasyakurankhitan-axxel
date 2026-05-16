// Preloader & Core Interactivity
const handlePreloader = () => {
    const preloader = document.getElementById('preloader');
    if (preloader && window.gsap) {
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.8,
            onComplete: () => {
                preloader.style.display = 'none';
            }
        });
    }
};

window.addEventListener('load', handlePreloader);

// Setup core listeners (Cover & Open Button) immediately
const setupCoreInteractivity = () => {
    const btnOpen = document.getElementById('btn-open');
    const cover = document.getElementById('cover');
    const mainInvitation = document.getElementById('main-invitation');
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    let isMusicPlaying = false;

    if (btnOpen) {
        btnOpen.addEventListener('click', () => {
            document.body.classList.remove('is-locked');
            cover.classList.add('is-opened');
            
            setTimeout(() => {
                mainInvitation.classList.add('show');
                if (typeof initTilt === 'function') initTilt();
                
                if (bgMusic) {
                    bgMusic.play().then(() => {
                        isMusicPlaying = true;
                        musicToggle.classList.add('rotating');
                    }).catch(e => console.log("Auto-play blocked by browser."));
                }
                
                if (window.gsap) {
                    gsap.from(".hero-name", { y: 50, opacity: 0, duration: 1.2, delay: 0.4, ease: "power3.out" });
                    gsap.from(".hero-frame", { 
                        scale: 0.9, 
                        opacity: 0, 
                        duration: 1.2, 
                        delay: 0.6, 
                        ease: "power2.out",
                        force3D: true,
                        onComplete: () => {
                            gsap.to(".hero-frame", {
                                y: -10,
                                duration: 2.5,
                                repeat: -1,
                                yoyo: true,
                                ease: "sine.inOut",
                                force3D: true
                            });
                        }
                    });
                }
            }, 300);
        });
    }

    if (musicToggle && bgMusic) {
        musicToggle.addEventListener('click', () => {
            if (isMusicPlaying) {
                bgMusic.pause();
                musicToggle.classList.remove('rotating');
            } else {
                bgMusic.play();
                musicToggle.classList.add('rotating');
            }
            isMusicPlaying = !isMusicPlaying;
        });
    }
    
    // Set Guest Name from URL
    const urlParams = new URLSearchParams(window.location.search);
    const toGuest = urlParams.get('to');
    if (toGuest) {
        const guestEl = document.getElementById('guest-name');
        if (guestEl) guestEl.innerText = toGuest;
    }
};

document.addEventListener('DOMContentLoaded', setupCoreInteractivity);

// Navigation and Scroll handling (Wait for modular sections if necessary, but try immediately)
window.addEventListener('sectionsLoaded', () => {
    const mainNav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (mainNav) {
            if (window.scrollY > 100) {
                mainNav.classList.add('scrolled');
            } else {
                mainNav.classList.remove('scrolled');
            }
        }
    });

    const navLinks = document.querySelectorAll('.nav-link');
    const offcanvasElement = document.getElementById('offcanvasNavbar');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (bsOffcanvas) {
                bsOffcanvas.hide();
            }
            
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    const offset = 80;
                    const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
