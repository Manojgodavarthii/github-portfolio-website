/* ==========================================================================
   TOKYO NIGHT PORTFOLIO - LOGIC & INTERACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navbar) {
        mobileToggle.addEventListener('click', () => {
            navbar.classList.toggle('open');
            const icon = mobileToggle.querySelector('i');
            if (navbar.classList.contains('open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar && navbar.classList.contains('open')) {
                navbar.classList.remove('open');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
    });

    // --- Typewriter Effect ---
    const typewriterElement = document.getElementById('typewriter');
    const words = [
        "AI & Deep Learning Enthusiast.",
        "Computer Engineering Graduate.",
        "Full-Stack Developer.",
        "Machine Learning Builder."
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 100;

    function typeEffect() {
        if (!typewriterElement) return;

        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 50; // faster backspacing
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 100; // standard typing speed
        }

        // Handle word completion / typing transitions
        if (!isDeleting && charIndex === currentWord.length) {
            typeDelay = 2000; // pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeDelay = 500; // small pause before next word
        }

        setTimeout(typeEffect, typeDelay);
    }

    // Initialize Typewriter
    if (typewriterElement) {
        typeEffect();
    }

    // --- Copy Profile Code to Clipboard ---
    const copyBtn = document.getElementById('copy-profile-btn');
    const profileCode = document.getElementById('profile-code');

    if (copyBtn && profileCode) {
        copyBtn.addEventListener('click', () => {
            // Get text content (strip html tags inside highlighted code)
            const textToCopy = profileCode.textContent;
            
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    // Visual feedback
                    const icon = copyBtn.querySelector('i');
                    icon.className = 'fas fa-check';
                    copyBtn.style.color = '#9ece6a'; // green feedback
                    
                    setTimeout(() => {
                        icon.className = 'far fa-copy';
                        copyBtn.removeAttribute('style');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        });
    }

    // --- Active Link Highlighter on Scroll ---
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Adjust threshold for detection
            if (window.scrollY >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
