import projects from "../assets/projects.js";
import ProjectCard from "../components/ProjectCard";
import React, { useEffect, useRef } from "react";
const Project = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("searching");
    if (searchQuery && searchQuery !== "") {
      setSearchQuery(searchQuery);
    }
    
    const searchText = document.getElementById("search");
    console.log(searchText.value, searchQuery);
    if (searchText.value === (searchQuery ? searchQuery : "")) {
      return;
    }
    window.location = `/index.html?s=${searchText.value}`;
  };

  return (
    <section className="project-section" id="projects">
      <div className="project-header">
        <div className="head">
          <h1 className="bg-title">PROJECTS</h1>
          <h1 className="title">Projects</h1>
        </div>
        <form id="searchForm" onSubmit={handleSearch}>
          <input
            id="search"
            type="text"
            placeholder="Enter projects to search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
      <div className="projects">
        {projects.map((project, index) => {
          return (
            <ProjectCard
              ProjectImage={project.img}
              ProjectTitle={project.title}
              Description={project.description}
              ProjectLink={project["project-link"]}
              GithubLink={project["github-link"]}
              Tag={project.tags}
              key={project.title + index}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Project;
