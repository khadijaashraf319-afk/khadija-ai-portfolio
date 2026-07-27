// ======================================
// Smooth Scrolling
// ======================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {

        const href = this.getAttribute("href");

        // Ignore empty "#"
        if (href === "#") return;

        e.preventDefault();

        const target = document.querySelector(href);

        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: "smooth"
            });
        }
    });
});

// ======================================
// Typing Animation
// ======================================

const words = [
    "AI Automation Developer",
    "Voice AI Builder",
    "Workflow Automation Expert",
    "Prompt Engineer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typingElement = document.getElementById("typing");

function type() {

    if (!typingElement) return;

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingElement.textContent = currentWord.substring(0, charIndex++);

        if (charIndex > currentWord.length) {
            deleting = true;
            setTimeout(type, 1200);
            return;
        }

    } else {

        typingElement.textContent = currentWord.substring(0, charIndex--);

        if (charIndex < 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

    }

    setTimeout(type, deleting ? 45 : 90);

}

type();


// ======================================
// DOM Elements
// ======================================

const navbar = document.querySelector(".navbar");
const topBtn = document.getElementById("topBtn");
const themeBtn = document.getElementById("themeToggle");
const loader = document.getElementById("loader");

const reveals = document.querySelectorAll(".reveal");
const serviceCards = document.querySelectorAll(".service-card");

const counters = document.querySelectorAll(".counter");
const statsSection = document.getElementById("stats");
let statsAnimated = false;

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

// ======================================
// Scroll Reveal
// ======================================

function revealSections() {

    reveals.forEach(section => {

        const windowHeight = window.innerHeight;
        const top = section.getBoundingClientRect().top;

        if (top < windowHeight - 120) {
            section.classList.add("active");
        }

    });

}


// ======================================
// Service Cards
// ======================================

function animateCards() {

    serviceCards.forEach((card, index) => {

        setTimeout(() => {

            card.classList.add("show");

        }, index * 180);

    });

}


// ======================================
// Counter Animation
// ======================================

function animateCounters() {

    counters.forEach(counter => {

        const target = parseInt(counter.dataset.target);

        let current = 0;

        const timer = setInterval(() => {

            current++;

            if (current >= target) {

                counter.innerHTML = target + "+";

                clearInterval(timer);

            } else {

                counter.innerHTML = current;

            }

        }, 80);

    });

}


// ======================================
// Loader
// ======================================
//console.log("Script loaded");

document.addEventListener("DOMContentLoaded", hideLoader);
   // console.log("DOM Loaded");
function hideLoader() {
    animateCards();
    revealSections();

    setTimeout(() => {
       // console.log("Removing loader");
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

        setTimeout(() => {
            loader.remove();
        }, 800);
    }, 1500);
}

// ======================================
// Dark Mode
// ======================================

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const icon = themeBtn.querySelector("i");

        if (document.body.classList.contains("dark-mode")) {

            icon.className = "fa-solid fa-sun";

        } else {

            icon.className = "fa-solid fa-moon";

        }

    });

}


// ======================================
// Scroll To Top
// ======================================

if (topBtn) {

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}

// ======================================
// Main Scroll Handler
// ======================================

window.addEventListener("scroll", () => {

    // Navbar Effect
    if (navbar) {

        if (window.scrollY > 60) {
            navbar.classList.add("scrolled");
            navbar.classList.add("navbar-small");
        } else {
            navbar.classList.remove("scrolled");
            navbar.classList.remove("navbar-small");
        }

    }

    // Reveal Sections
    revealSections();

    // Statistics Counter
    if (statsSection && !statsAnimated) {

        const top = statsSection.getBoundingClientRect().top;

        if (top < window.innerHeight - 120) {

            animateCounters();
            statsAnimated = true;

        }

    }

    // Scroll To Top Button
    if (topBtn) {

        if (window.scrollY > 500) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }

    }

    // Active Navigation
    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.id;
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});

