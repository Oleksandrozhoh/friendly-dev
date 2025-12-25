import type { Project } from "../types";
import ProjectCard from "./ProjectCard";

const ProjectsList = ({ projects }: { projects: Project[] }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map((project: Project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectsList;
