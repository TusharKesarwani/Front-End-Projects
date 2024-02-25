import Load from "../components/Load";
import projects from "../assets/projects.js";
import ProjectCard from "../components/ProjectCard";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
const Project = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [content, setContent] = useState(projects);
  const [isLoading, setIsLoading] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      setTimeout(() => {
        const filteredProjects = projects.filter((project) => {
          return project.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        });
        setContent(filteredProjects);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isLoading ? (
        <Load/>
      ) : (
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
            {content.map((project, index) => {
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
      )}
    </>
  );
};

export default Project;
