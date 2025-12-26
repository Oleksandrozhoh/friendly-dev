import type { Project } from "~/types";
import type { Route } from "./+types/index";
import FeaturedProject from "~/components/FeaturedProject";
import AboutPreview from "~/components/AboutPreview";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The friendly dev | WELCOME" },
    {
      name: "description",
      content: "Portfolio website for a friendly developer",
    },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  const data = await res.json();
  return { projects: data };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  return (
    <>
      <FeaturedProject projects={loaderData.projects} count={2} />
      <AboutPreview />
    </>
  );
};

export default HomePage;
