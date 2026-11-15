
/* =========================
   PASSWORD SETTINGS
========================= */

// CHANGE YOUR PASSWORD HERE
const SITE_PASSWORD = "sandra2026";

// Session key shared by homepage and project pages
const SESSION_KEY = "portfolio_access_granted";


/* =========================
   PASSWORD AUTHENTICATION
========================= */

const passwordScreen =
    document.getElementById("password-screen");

const portfolioApp =
    document.getElementById("portfolio-app");

const passwordForm =
    document.getElementById("password-form");

const passwordInput =
    document.getElementById("password-input");

const passwordError =
    document.getElementById("password-error");


// Check whether visitor has already entered password
function checkAccess() {

    const hasAccess =
        sessionStorage.getItem(SESSION_KEY) === "true";

    if (hasAccess) {

        passwordScreen.hidden = true;
        portfolioApp.hidden = false;

    } else {

        passwordScreen.hidden = false;
        portfolioApp.hidden = true;

    }

}


// Handle password submission
if (passwordForm) {

    passwordForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const enteredPassword = passwordInput.value;

        if (enteredPassword === SITE_PASSWORD) {

            // Save access for this browser tab session
            sessionStorage.setItem(SESSION_KEY, "true");

            passwordError.textContent = "";

            passwordScreen.hidden = true;
            portfolioApp.hidden = false;

            passwordInput.value = "";

        } else {

            passwordError.textContent =
                "Incorrect password. Please try again.";

            passwordInput.value = "";
            passwordInput.focus();

        }

    });

}


// Check access when page loads
checkAccess();


/* =========================
   PORTFOLIO PROJECT DATA
========================= */

const projects = [

    {
        id: "project-01",
        title: "MSI Marketing Campaign",
        category: "Graphic Design",
        year: "2026",

        cover: "images/project-01.jpg",

        description:
            "A collection of marketing campaigns, digital graphics, and visual communication created for MSI.",

        gallery: [
            "images/project-01.jpg",
            "images/project-02.jpg"
        ]
    },

    {
        id: "project-02",
        title: "E-Commerce Photography",
        category: "Photography",
        year: "2025",

        cover: "images/project-02.jpg",

        description:
            "Product photography and image direction focused on creating engaging e-commerce experiences.",

        gallery: [
            "images/project-02.jpg",
            "images/project-03.jpg"
        ]
    },

    {
        id: "project-03",
        title: "Web Design & Development",
        category: "Web Design",
        year: "2025",

        cover: "images/project-03.jpg",

        description:
            "A digital design project exploring layout, visual hierarchy, and user experience.",

        gallery: [
            "images/project-03.jpg",
            "images/project-04.jpg"
        ]
    },

    {
        id: "project-04",
        title: "Brand Identity",
        category: "Branding",
        year: "2024",

        cover: "images/project-04.jpg",

        description:
            "Visual identity exploration including typography, color systems, and brand applications.",

        gallery: [
            "images/project-04.jpg",
            "images/project-05.jpg"
        ]
    },

    {
        id: "project-05",
        title: "Digital Campaign",
        category: "Art Direction",
        year: "2024",

        cover: "images/project-05.jpg",

        description:
            "Creative direction and digital assets for a multi-channel marketing campaign.",

        gallery: [
            "images/project-05.jpg",
            "images/project-06.jpg"
        ]
    },

    {
        id: "project-06",
        title: "Interaction Design",
        category: "UI / UX",
        year: "2023",

        cover: "images/project-06.jpg",

        description:
            "An exploration of interface design, interaction patterns, and digital experiences.",

        gallery: [
            "images/project-06.jpg",
            "images/project-01.jpg"
        ]
    }

];


/* =========================
   PROJECT NAVIGATION
========================= */

const projectList =
    document.getElementById("project-list");

if (projectList) {

    projectList.innerHTML = projects.map(project => `

        <li>
            <a href="project.html?project=${project.id}">
                ${project.title}
            </a>
        </li>

    `).join("");

}


/* =========================
   HOMEPAGE GALLERY
========================= */

const projectGrid =
    document.getElementById("project-grid");

const projectCount =
    document.getElementById("project-count");

if (projectGrid) {

    projectGrid.innerHTML = projects.map(project => `

        <a
            href="project.html?project=${project.id}"
            class="project-card"
        >

            <div class="project-image">

                <img
                    src="${project.cover}"
                    alt="${project.title}"
                    loading="lazy"
                >

            </div>

            <div class="project-info">

                <span class="project-title">
                    ${project.title}
                </span>

                <span class="project-category">
                    ${project.category}
                </span>

            </div>

        </a>

    `).join("");


    if (projectCount) {

        projectCount.textContent =
            `${String(projects.length).padStart(2, "0")} PROJECTS`;

    }

}


/* =========================
   INDIVIDUAL PROJECT PAGE
========================= */

const projectContent =
    document.getElementById("project-content");

if (projectContent) {

    const params =
        new URLSearchParams(window.location.search);

    const projectId =
        params.get("project");

    const project =
        projects.find(item => item.id === projectId);


    if (project) {

        document.title =
            `${project.title} — Your Name`;


        projectContent.innerHTML = `

            <a href="index.html" class="back-link">
                ← BACK TO ALL PROJECTS
            </a>

            <h1 class="project-detail-title">
                ${project.title}
            </h1>

            <div class="project-meta">

                <span>${project.category}</span>

                <span>${project.year}</span>

            </div>

            <p class="project-description">
                ${project.description}
            </p>

            <img
                class="project-hero"
                src="${project.cover}"
                alt="${project.title}"
            >

            <div class="project-gallery">

                ${project.gallery.map((image, index) => `

                    <img
                        src="${image}"
                        alt="${project.title} — Image ${index + 1}"
                        loading="lazy"
                    >

                `).join("")}

            </div>

        `;

    } else {

        projectContent.innerHTML = `

            <a href="index.html" class="back-link">
                ← BACK TO ALL PROJECTS
            </a>

            <h1>Project not found.</h1>

        `;

    }

}
/* =========================
   CUSTOM ORANGE CURSOR
========================= */
const cursor = document.createElement("div");
cursor.classList.add("custom-cursor");
document.body.appendChild(cursor);

document.addEventListener("mousemove", function(event) {
    cursor.style.left = event.clientX + "px";
    cursor.style.top = event.clientY + "px";

    const clickable = event.target.closest(
        "a, button, input, select, textarea, [role='button']"
    );

    cursor.classList.toggle("hover", !!clickable);
});


const card = document.createElement("a");
card.className = "project-card";
card.href = `project.html?project=${project.id}`;

card.innerHTML = `
    <img
        src="${project.cover}"
        alt="${project.title}"
        class="project-image"
    >
    <div class="project-title">${project.title}</div>
`;

gallery.appendChild(card);
