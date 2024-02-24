import projects from "../assets/projects.js";
import ProjectCard from "../components/ProjectCard";
const Project = () => {
  return (
    <section className="project-section" id="projects">
      <div className="project-header">
        <div className="head">
          <h1 className="bg-title">PROJECTS</h1>
          <h1 className="title">Projects</h1>
        </div>
        <form id="searchForm">
          <input
            id="search"
            type="text"
            placeholder="Enter projects to search"
          />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
      <div className="projects">
        {projects.map((project,index) => {
          return (
            <ProjectCard
              ProjectImage={project.img}
              ProjectTitle={project.title}
              Description={project.description}
              ProjectLink={project["project-link"]}
              GithubLink={project["github-link"]}
              Tag={project.tags}
              Key={project.title+index}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Project;
