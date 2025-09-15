// Typing effect in hero section
const typedText = ["a Web Developer.", "a Cybersecurity Enthusiast.", "a Frontend Specialist Plus backend"];
let index = 0;
let charIndex = 0;
const typingElement = document.querySelector(".typing");

function type() {
    if (!typingElement) return; // Exit if element doesn't exist

    if (charIndex < typedText[index].length) {
        typingElement.textContent += typedText[index].charAt(charIndex);
        charIndex++;
        setTimeout(type, 150);
    } else {
        setTimeout(erase, 2000); // Wait 2 seconds before erasing
    }
}

function erase() {
    if (!typingElement) return; // Exit if element doesn't exist

    if (charIndex > 0) {
        typingElement.textContent = typedText[index].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 100);
    } else {
        index = (index + 1) % typedText.length; // Move to the next string
        setTimeout(type, 500); // Wait 0.5 seconds before typing new string
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (typingElement) type(); // Start typing effect if element is present
});

// Theme toggle
const themeToggle = document.querySelector(".theme-toggle");
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        // Store user preference in localStorage
        if (document.body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
        } else {
            localStorage.setItem("theme", "dark");
        }
    });

    // Check for saved theme preference on load
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }
}

// Mobile navigation toggle
const menuToggle = document.querySelector(".menu-toggle");
const mobileNavOverlay = document.querySelector(".mobile-nav-overlay");
const mobileNavClose = document.querySelector(".mobile-nav-close");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

if (menuToggle && mobileNavOverlay && mobileNavClose) {
    menuToggle.addEventListener("click", () => {
        mobileNavOverlay.classList.add("open");
    });

    mobileNavClose.addEventListener("click", () => {
        mobileNavOverlay.classList.remove("open");
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileNavOverlay.classList.remove("open"); // Close nav when a link is clicked
        });
    });
}


// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate sections on scroll using Intersection Observer
const sections = document.querySelectorAll('.section-padding');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the section is visible
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Active link highlighting for navigation
const navLinks = document.querySelectorAll('.nav-link');
const sectionsForNav = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    sectionsForNav.forEach(section => {
        const sectionTop = section.offsetTop - 70; // Adjust for fixed header height
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});