import React from 'react';
import projects from '../components/projects';
import styles from '../styles/Projects.module.css';

const Projects = () => {
  return (
    <section id='projects' className={styles.projectsSection}>
      <h1 className='text-center font-bold text-3xl my-5'>Our Projects</h1>
      
      <div className={styles.projectsContainer}>
        {projects.map((project, index) => (
          <div key={index} className={styles.projectItem}>
            <img src={project.img} alt={project.title} className={styles.projectImage} />
            <div className={styles.projectDetails}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className={styles.tags}>
                {project.tags.map((tag, idx) => (
                  <span key={idx} className={styles.tag}>{tag}</span>
                ))}
              </div>
              <div className={styles.links}>
                <a href={project.githublink} target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href={project.projectLink} target="_blank" rel="noopener noreferrer">Live Project</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
