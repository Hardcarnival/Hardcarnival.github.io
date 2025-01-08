// zmienia kolorystyke
let changeTheme = document.querySelector(".change-theme")

const root = document.documentElement
const rootStyles = getComputedStyle(document.documentElement);

const color = rootStyles.getPropertyValue('--color')
const lightColor = rootStyles.getPropertyValue('--light-color')
const darkColor = rootStyles.getPropertyValue('--dark-color')

const white = rootStyles.getPropertyValue('--white').trim();
const lightThemeLightColor = rootStyles.getPropertyValue('--light-theme-light-color').trim();
const lightThemeDarkColor = rootStyles.getPropertyValue('--light-theme-dark-color').trim();

const dark = rootStyles.getPropertyValue('--dark').trim();
const darkThemeLightColor = rootStyles.getPropertyValue('--dark-theme-light-color').trim();
const darkThemeDarkColor = rootStyles.getPropertyValue('--dark-theme-dark-color').trim();


// otwiera liste zmiany kolorystyki
let toggleTheme = document.querySelector(".toggle-theme")

gsap.set(toggleTheme, {
    y: -300
})

toggleTheme.addEventListener("mouseenter", () => {
    gsap.to(toggleTheme, {
        ease: "power1.inOut",
        duration: 0.2,
        y: -300,
        maxHeight: "205px",
    });
});

toggleTheme.addEventListener("mouseleave", () => {
    gsap.to(toggleTheme, {
        ease: "power1.inOut",
        duration: 0.2,
        y: -300,
        maxHeight: 59,
    });
});
///////////////////

applyTheme = () => {
    let selectedTheme = localStorage.getItem("selectedTheme")

    if (selectedTheme === "dark-theme") {
        root.style.setProperty("--color", white)
        root.style.setProperty("--light-color", darkThemeLightColor)
        root.style.setProperty("--dark-color", darkThemeDarkColor)

    } else if (selectedTheme === "light-theme") {

        root.style.setProperty("--color", dark)
        root.style.setProperty("--light-color", lightThemeLightColor)
        root.style.setProperty("--dark-color", lightThemeDarkColor)

    }
}

document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();

    if (key === 'd') {
        localStorage.setItem("selectedTheme", "dark-theme");
        applyTheme();
    } else if (key === 'l') {
        localStorage.setItem("selectedTheme", "light-theme");
        applyTheme();
    }
});

applyTheme()

let themeList = document.querySelector(".theme-list")

themeList.addEventListener("click", (e) => {
    let selectedTheme = e.target.closest(".theme");

    if (selectedTheme.classList.contains("dark-theme")) {
        localStorage.setItem("selectedTheme", "dark-theme");
    } else if (selectedTheme.classList.contains("light-theme")) {
        localStorage.setItem("selectedTheme", "light-theme");
    }

    applyTheme()
})
//////////////

// ukrywa pasek boczny
let sidebar = document.querySelector(".sidebar")
let closeSidebar = document.querySelector(".close-sidebar-button")
let arrow = document.querySelector(".arrow")

let sidebarClosed = false;

closeSidebar.addEventListener("click", () => {
    if (!sidebarClosed) {
        if (sidebar.offsetWidth <= 250) {
            gsap.to(sidebar, {
                x: "-250px",
                duration: 0.3,
            });
        } else {
            gsap.to(sidebar, {
                x: "-20vw",
                duration: 0.3,
            });
        }
        gsap.to(arrow, {
            rotation: "-180deg",
        });
    } else {
        gsap.to(sidebar, {
            x: "0",
            duration: 0.3,
        });
        gsap.to(arrow, {
            rotation: "0deg",
        });
    }

    sidebarClosed = !sidebarClosed;
})
//

// zmienia położenie przycisku, w zależności od rozmiaru ekranu
function handleSidebarResize() {
    let sidebar = document.querySelector(".sidebar");
    let closeSidebar = document.querySelector(".close-sidebar-button");

    let sidebarWidth = sidebar.offsetWidth;

    if (sidebarWidth <= 250) {
        closeSidebar.style.transform = "translateX(134px)";
        gsap.to(arrow, {
        });
    } else if (sidebarClosed) {
        closeSidebar.style.transform = "translateX(10.6vw)";
        gsap.to(arrow, {
            rotation: "-180deg",
        });
    } else {
        closeSidebar.style.transform = "translateX(10.6vw)";
    }
}

handleSidebarResize()

window.addEventListener("resize", handleSidebarResize);
//

// ukrywa sidebar, jeśli jest on 250px lub mniej
function handleMediaQueryChange(mediaQueryList) {
    const sidebar = document.querySelector('.sidebar');

    if (mediaQueryList.matches) {
        gsap.to(".sidebar", {
            x: -sidebar.offsetWidth,
            duration: 0.3,
        });
        gsap.to(arrow, {
            rotation: "-180deg",
        });
    } else if (sidebarClosed) {
        gsap.to(".sidebar", {
            x: "-20vw",
        });
        gsap.to(arrow, {
            rotation: "-180deg",
        });
    } else {
        gsap.to(".sidebar", {
            x: 0,
        });
        gsap.to(arrow, {
            rotation: "0deg",
        });
    };


}

const mediaQuery = window.matchMedia('(max-width: 1250px)');

mediaQuery.addEventListener('change', () => {
    handleMediaQueryChange(mediaQuery);
});
//

// ładuje obrazki po kolei, co 0.3s
document.addEventListener("DOMContentLoaded", function () {
    let images = document.querySelectorAll(".image");

    images.forEach(function (image, index) {
        setTimeout(function () {
            image.classList.add("image-reveal");
        }, index * 100);
    });
});
//
