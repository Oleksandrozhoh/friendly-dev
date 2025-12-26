import type { Project } from "../types";
import ProjectsList from "./ProjectsList";

type FeaturedProjectProps = {
  projects: Project[];
  count: number;
};

const FeaturedProject = ({ projects, count = 2 }: FeaturedProjectProps) => {
  const featuredProjects = projects.slice(0, count);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-200">
        🚀 Featured Projects
      </h2>
      <ProjectsList projects={featuredProjects} />
    </section>
  );
};

export default FeaturedProject;
