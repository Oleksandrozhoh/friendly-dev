import type { Route } from "./+types/details";
import type { Project } from "../../types";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

export async function clientLoader({
  request,
  params,
}: Route.ClientLoaderArgs): Promise<Project> {
  const { id } = params;
  const res = await fetch(`http://localhost:4000/projects/${id}`);
  if (!res.ok)
    throw new Response("Failed to fetch project details", { status: 404 });
  const project: Project = await res.json();
  return project;
}

function HydrateFallback() {
  return <div>Loading project details...</div>;
}

const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const project = loaderData as Project;
  return (
    <>
      <Link
        to="/projects"
        className="flex items-center text-blue-400 hover:text-blue-600 mb-6 transition"
      >
        <FaArrowLeft className="mr-2" /> Back to Projects
      </Link>
      <div className="grid gap-8 md:grid-cols-2 items-start">
        <div>
          <img
            src={project.image}
            alt={project.title}
            className="rounded-lg shadow-md w-full"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-blue-400 mb-4">
            {project.title}
          </h1>
          <p className="text-gray-300 text-sm mb-4">
            {new Date(project.date).toLocaleDateString()} * {project.category}
          </p>
          <p className="text-gray-300 mb-6">{project.description}</p>
          <p>
            <a
              href={project.url}
              target="_blank"
              className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition"
            >
              Visit Project →
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsPage;
