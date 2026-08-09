import projects from "./projects.js";

/* =============================
   Search Handling
============================= */

const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get("s");

const projectsDiv = document.getElementsByClassName("projects")[0];
const searchInput = document.getElementById("search");
const searchForm = document.getElementById("searchForm");
const searchMessage = document.getElementById("searchMessage");

function renderProjects(projectList) {
    projectsDiv.innerHTML = "";

    if (projectList.length === 0) {
        projectsDiv.innerHTML = "<p>No projects found.</p>";
        return;
    }

    for (let project of projectList) {
        const project_div = document.createElement("div");
        project_div.className = "project";

        const img = document.createElement("img");
        img.src = project.img;
        project_div.appendChild(img);

        const project_info = document.createElement("div");
        project_info.className = "project-info";

        const heading = document.createElement("h2");
        heading.innerHTML = project.title;
        project_info.appendChild(heading);

        const row = document.createElement("div");
        row.className = "row";

        const tech = document.createElement("div");
        tech.className = "tech";

        for (let t of project.tags) {
            const span = document.createElement("span");
            span.innerHTML = t;
            tech.appendChild(span);
        }

        row.appendChild(tech);

        const links = document.createElement("div");
        links.className = "links";

        const project_link = document.createElement("a");
        project_link.href = project["project-link"];
        project_link.innerHTML = `<i class="fa-solid fa-link"></i>`;
        project_link.target = "_blank";
        links.appendChild(project_link);

        const github_link = document.createElement("a");
        github_link.href = project["github-link"];
        github_link.innerHTML = `<i class="fa-brands fa-github"></i>`;
        github_link.target = "_blank";
        links.appendChild(github_link);

        row.appendChild(links);
        project_info.appendChild(row);

        const desc = document.createElement("p");
        desc.className = "description";
        desc.innerHTML = project.description;
        project_info.appendChild(desc);

        project_div.appendChild(project_info);
        projectsDiv.appendChild(project_div);
    }
}

let filteredProjects = projects;

if (searchQuery && searchQuery.trim() !== "") {
    filteredProjects = projects.filter((project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    searchInput.value = searchQuery;
}

renderProjects(filteredProjects);

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const query = searchInput.value.trim();
    searchMessage.textContent = "";

    if (query === "") {
        window.location = "/index.html";
        return;
    }

    if (query.length > 40) {
        searchMessage.textContent = "Search must be under 40 characters.";
        return;
    }

    const hasLetter = /[a-zA-Z]/.test(query);
    const onlyValidChars = /^[a-zA-Z0-9\s]+$/.test(query);

    if (!hasLetter || !onlyValidChars) {
        searchMessage.textContent = "Please enter valid text.";
        return;
    }

    window.location = `/index.html?s=${encodeURIComponent(query)}`;
});

/* =============================
   Contributors Section
============================= */

fetch("https://api.github.com/repos/TusharKesarwani/Front-End-Projects/contributors?per_page=50")
    .then(response => response.json())
    .then(data => {
        const contributors = data.map(contributor => ({
            username: contributor.login,
            avatarUrl: contributor.avatar_url,
            profileUrl: contributor.html_url
        }));

        const contributorsList = document.querySelector("#contributors-list");

        contributors.forEach(contributor => {
            const li = document.createElement("li");
            li.innerHTML = `
                <a href="${contributor.profileUrl}" target="_blank">
                    <img src="${contributor.avatarUrl}" alt="${contributor.username}">
                </a>
            `;
            contributorsList.appendChild(li);
        });
    });

/* =============================
   Scroll Button
============================= */

function calculateScrollValue() {
    const scrollProgress = document.getElementById("progress");
    const pos = document.documentElement.scrollTop;
    const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollValue = Math.round((pos * 100) / calcHeight);

    if (pos > 100) {
        scrollProgress.style.display = "grid";
    } else {
        scrollProgress.style.display = "none";
    }

    scrollProgress.onclick = () => {
        document.documentElement.scrollTop = 0;
    };

    scrollProgress.style.background =
        `conic-gradient(#0D4360 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
}

window.onscroll = calculateScrollValue;
window.onload = calculateScrollValue;