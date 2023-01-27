import projects from "./projects.js";

const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get('s');

let filteredProjects = (searchQuery && searchQuery != "") ? projects.filter((project) => project.title.toLowerCase().includes(searchQuery.toLowerCase())) : projects;

// displaying filtered projects
const projects_div = document.getElementsByClassName("projects")[0]
for (let project of filteredProjects) {
    const project_div = document.createElement("div");
    project_div.className="project";

    const img = document.createElement("img")
    img.src = project.img;
    project_div.appendChild(img);

    const project_info = document.createElement("div");
    project_info.className = "project-info";
    const heading = document.createElement("h2");
    heading.innerHTML = project.title;
    project_info.appendChild(heading);
    
    const row = document.createElement("div");
    row.className="row";
    const tech = document.createElement("tech");
    tech.className="tech";

    for (let t of project.tags) {
        const span = document.createElement("span");
        span.innerHTML = t;
        tech.appendChild(span);
    }

    row.appendChild(tech);

    const links = document.createElement("div");
    links.className = "links";

    const project_link = document.createElement("a");
    project_link.href = project['project-link'];
    project_link.innerHTML = `<i class="fa-solid fa-link"></i>`;
    project_link.target="_blank"
    links.appendChild(project_link);

    const github_link = document.createElement("a");
    github_link.href = project['github-link'];
    github_link.innerHTML = `<i class="fa-brands fa-github"></i>`;
    github_link.target="_blank"
    links.appendChild(github_link);

    row.appendChild(links);
    project_info.appendChild(row);

    const desc = document.createElement('p');
    desc.className="description";
    desc.innerHTML=project.description;
    project_info.appendChild(desc);

    project_div.appendChild(project_info);
    projects_div.appendChild(project_div);
}

// For search query form

if (searchQuery && searchQuery != "")
    document.getElementById("search").value = searchQuery

const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit",(e) => {
    const searchText = document.getElementById("search");
    e.preventDefault();
    
    if (searchText.value == (searchQuery ? searchQuery : "")) {
        return;
    }

    window.location = `/index.html?s=${searchText.value}`;
})

// For contributors list

fetch("https://api.github.com/repos/TusharKesarwani/Front-End-Projects/contributors?per_page=50", {
        headers: {
            'Authorization': ''
        }
    }).then(response => response.json())
    .then(data => {
        // Extract the data for each contributor
        const contributors = data.map(contributor => ({
            username: contributor.login,
            avatarUrl: contributor.avatar_url
        }));

        // Create and append HTML elements to display the contributors
        const contributorsList = document.querySelector("#contributors-list");
        contributors.forEach(contributor => {
            const li = document.createElement("li");
            li.innerHTML = `<img src="${contributor.avatarUrl}" alt="${contributor.username}">`;
            contributorsList.appendChild(li);
        });
    });