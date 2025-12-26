import type { Route } from "./+types/index";
import type { Project } from "../../types";
import ProjectsList from "../../components/ProjectsList";
import { useState } from "react";
import Pagination from "../../components/Pagination";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  const data = await res.json();
  return { projects: data };
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as { projects: Project[] };

  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState("All");
  const projectsPerPage = 6;

  // catorories for filtering
  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

  // filter projects by category
  const filteredProjects =
    filterCategory === "All"
      ? projects
      : projects.filter((project) => project.category === filterCategory);

  // calculate total pages
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // get current page projects
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  return (
    <>
      <h2 className="text-3xl text-white font-bold mb-8 text-center">
        💼 Projects
      </h2>
      <div>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setFilterCategory(category);
              setCurrentPage(1); // reset to first page on filter change
            }}
            className={`mr-2 mb-4 px-4 py-2 rounded ${
              filterCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
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
