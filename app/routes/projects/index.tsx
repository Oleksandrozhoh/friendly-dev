import type { Route } from "./+types/index";
import type { Project } from "../../types";
import ProjectsList from "../../components/ProjectsList";
import { useState } from "react";
import Pagination from "../../components/Pagination";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch("http://localhost:4000/projects");
  if (!res.ok) throw new Error("Failed to fetch projects");
  const data = await res.json();
  return { projects: data };
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as { projects: Project[] };

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  // calculate total pages
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  // get current page projects
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  return (
    <>
      <h2 className="text-3xl text-white font-bold mb-8 text-center">
        💼 Projects
      </h2>
      <ProjectsList projects={currentProjects} />
      {
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      }
    </>
  );
};

export default ProjectsPage;
