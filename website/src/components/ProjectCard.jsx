import React from "react";
const ProjectCard = ({
  ProjectImage,
  ProjectTitle,
  Description,
  ProjectLink,
  GithubLink,
  Tag,
  Key,
}) => {
  const handleClick = () => {
    console.log("ProjectLink", ProjectLink);
    window.open(ProjectLink, "_blank");
  };
  return (
    <div className="project" key={Key} onClick={handleClick}>
      <img src={ProjectImage} alt={ProjectTitle} />
      <div className="project-info">
        <h2>{ProjectTitle}</h2>
        <div className="row">
          <div className="tech">
            {Tag.map((tag, index) => (
              <span key={tag + index}>{tag}</span>
            ))}
          </div>
          <div className="links">
            <a href={ProjectLink} target="_blank">
              <i className="fa-solid fa-link"></i>
            </a>
            <a href={GithubLink} target="_blank">
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
        <p className="description">{Description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
