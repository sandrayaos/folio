
/* =====================================
   PASSWORD SCREEN
===================================== */

const SITE_PASSWORD = "sand";
const SESSION_KEY = "portfolio_access_granted";

const passwordForm = document.getElementById("password-form");
const passwordInput = document.getElementById("password-input");
const passwordScreen = document.getElementById("password-screen");
const passwordError = document.getElementById("password-error");
const portfolioApp = document.getElementById("portfolio-app");

function unlockPortfolio() {
    if (passwordScreen) {
        passwordScreen.hidden = true;
    }

    if (portfolioApp) {
        portfolioApp.hidden = false;
    }
}

// Check whether the visitor already entered the password
if (sessionStorage.getItem(SESSION_KEY) === "true") {
    unlockPortfolio();
}

if (passwordForm) {
    passwordForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (passwordInput.value === SITE_PASSWORD) {
            sessionStorage.setItem(SESSION_KEY, "true");
            unlockPortfolio();
        } else {
            if (passwordError) {
                passwordError.textContent = "Incorrect password. Please try again.";
            }

            passwordInput.value = "";
            passwordInput.focus();
        }
    });
}


/* =====================================
   PROJECT INFORMATION
===================================== */


const projects = [
  {
    id: "project-01",
    title: "Project One",
    category: "Graphic Design",
    year: "2026",

    // Homepage thumbnail
    cover: "images/project-01.jpg",

    description: "Project description goes here.",

    // Individual project page images
    hero: "images/project-01-hero.jpg",

    details: [
      "images/project-01-detail-1.jpg",
      "images/project-01-detail-2.jpg"
    ]
  },

  {
    id: "project-02",
    title: "Project Two",
    category: "Branding",
    year: "2026",
    cover: "images/project-02.jpg",
    description: "Project description goes here.",
    hero: "images/project-02-hero.jpg",
    details: [
      "images/project-02-detail-1.jpg",
      "images/project-02-detail-2.jpg"
    ]
  },

  {
    id: "project-03",
    title: "Project Three",
    category: "Web Design",
    year: "2025",
    cover: "images/project-03.jpg",
    description: "Project description goes here.",
    hero: "images/project-03-hero.jpg",
    details: [
      "images/project-03-detail-1.jpg",
      "images/project-03-detail-2.jpg"
    ]
  },

  {
    id: "project-04",
    title: "Project Four",
    category: "Photography",
    year: "2025",
    cover: "images/project-04.jpg",
    description: "Project description goes here.",
    hero: "images/project-04-hero.jpg",
    details: [
      "images/project-04-detail-1.jpg",
      "images/project-04-detail-2.jpg"
    ]
  },

  {
    id: "project-05",
    title: "Project Five",
    category: "UI/UX Design",
    year: "2025",
    cover: "images/project-05.jpg",
    description: "Project description goes here.",
    hero: "images/project-05-hero.jpg",
    details: [
      "images/project-05-detail-1.jpg",
      "images/project-05-detail-2.jpg"
    ]
  },

  {
    id: "project-06",
    title: "Project Six",
    category: "Digital Design",
    year: "2025",
    cover: "images/project-06.jpg",
    description: "Project description goes here.",
    hero: "images/project-06-hero.jpg",
    details: [
      "images/project-06-detail-1.jpg",
      "images/project-06-detail-2.jpg"
    ]
  }
];



/* =====================================
   HOMEPAGE PROJECT NAVIGATION
===================================== */

const projectList = document.getElementById("project-list");

if (projectList) {
    projects.forEach(function (project) {
        const link = document.createElement("a");

        link.href = `project.html?project=${project.id}`;
        link.textContent = project.title;
        link.className = "project-nav-link";

        projectList.appendChild(link);
    });
}


/* =====================================
   HOMEPAGE PROJECT GALLERY
===================================== */

const projectGrid = document.getElementById("project-grid");

if (projectGrid) {
    projects.forEach(function (project) {
        const card = document.createElement("a");

        card.className = "project-card";
        card.href = `project.html?project=${project.id}`;

        card.innerHTML = `
            <img
                src="${project.cover}"
                alt="${project.title}"
                class="project-image"
                loading="lazy"
            >

            <div class="project-title">
                ${project.title}
            </div>
        `;

        projectGrid.appendChild(card);
    });
}


/* =====================================
   INDIVIDUAL PROJECT PAGE
===================================== */

const projectContent = document.getElementById("project-content");

if (projectContent) {

    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("project");

    const currentProject = projects.find(function (project) {
        return project.id === projectId;
    });

    if (currentProject) {

        projectContent.innerHTML = `
            <div class="project-detail">

                <h1>${currentProject.title}</h1>

                <p class="project-meta">
                    ${currentProject.category} / ${currentProject.year}
                </p>

                <p class="project-description">
                    ${currentProject.description}
                </p>

                <div class="project-gallery">
                    ${currentProject.gallery.map(function (image) {
                        return `
                            <img
                                src="${image}"
                                alt="${currentProject.title}"
                                class="project-detail-image"
                                loading="lazy"
                            >
                        `;
                    }).join("")}
                </div>

                <a href="index.html" class="back-link">
                    Back to Projects
                </a>

            </div>
        `;

    } else {
        projectContent.innerHTML = `
            <p>Project not found.</p>
            <a href="index.html">Back to Projects</a>
        `;
    }
}


/* =====================================
   CUSTOM CURSOR
===================================== */

const cursor = document.createElement("div");

cursor.classList.add("custom-cursor");
document.body.appendChild(cursor);

document.addEventListener("mousemove", function (event) {

    cursor.style.left = event.clientX + "px";
    cursor.style.top = event.clientY + "px";

    const clickable = event.target.closest(
        "a, button, input, select, textarea, [role='button']"
    );

    cursor.classList.toggle("hover", !!clickable);

});


/* =====================================
   HIDE CUSTOM CURSOR ON TOUCH DEVICES
===================================== */

if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
    cursor.style.display = "none";
}
