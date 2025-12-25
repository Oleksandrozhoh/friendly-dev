import type { Route } from "./+types/index";
import type { Project } from "../../types";
import ProjectsList from "../../components/ProjectsList";

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
  return (
    <>
      <h2 className="text-3xl text-white font-bold mb-8 text-center">
        💼 Projects
      </h2>
      <ProjectsList projects={projects} />
    </>
  );
};

export default ProjectsPage;
