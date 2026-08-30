document.addEventListener("DOMContentLoaded", function () {

    var menuButton = document.getElementById("menuButton");
    var navMenu = document.getElementById("navMenu");
    var backToTop = document.getElementById("backToTop");
    var header = document.querySelector(".header");
    var navLinks = document.querySelectorAll(".nav a");
    var sections = document.querySelectorAll("section[id]");

    /* Mobile Menu */
    if (menuButton && navMenu) {
        menuButton.onclick = function () {
            navMenu.classList.toggle("open");
        };
    }

    /* Close mobile menu */
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].onclick = function () {
            if (navMenu) {
                navMenu.classList.remove("open");
            }
        };
    }

    /* Header */
    function updateHeader() {
        if (!header) {
            return;
        }

        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    /* Back to top */
    function updateBackToTop() {
        if (!backToTop) {
            return;
        }

        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    }

    /* Active navigation */
    function updateActiveLink() {
        var currentSection = "";

        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            var sectionTop = section.offsetTop - 200;
            var sectionBottom = sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                currentSection = section.id;
                break;
            }
        }

        for (var j = 0; j < navLinks.length; j++) {
            navLinks[j].classList.remove("active");

            var linkTarget = navLinks[j].getAttribute("href");

            if (linkTarget === "#" + currentSection) {
                navLinks[j].classList.add("active");
            }
        }

        if (window.scrollY < 300) {
            for (var k = 0; k < navLinks.length; k++) {
                navLinks[k].classList.remove("active");
            }

            var homeLink = document.querySelector('.nav a[href="#home"]');

            if (homeLink) {
                homeLink.classList.add("active");
            }
        }
    }

    /* Smooth scrolling */
    var internalLinks = document.querySelectorAll('a[href^="#"]');

    for (var x = 0; x < internalLinks.length; x++) {
        internalLinks[x].onclick = function (event) {
            var targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            var targetElement = document.querySelector(targetId);

            if (!targetElement) {
                return;
            }

            event.preventDefault();

            var headerHeight = 0;

            if (header) {
                headerHeight = header.offsetHeight;
            }

            var position =
                targetElement.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                15;

            window.scrollTo({
                top: position,
                behavior: "smooth"
            });
        };
    }

    /* Back to top click */
    if (backToTop) {
        backToTop.onclick = function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        };
    }

    /* Scroll events */
    window.addEventListener("scroll", function () {
        updateHeader();
        updateBackToTop();
        updateActiveLink();
    });

    /* Initial state */
    updateHeader();
    updateBackToTop();
    updateActiveLink();

});