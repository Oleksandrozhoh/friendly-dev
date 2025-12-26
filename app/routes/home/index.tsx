import type { Project } from "~/types";
import type { Route } from "./+types/index";
import FeaturedProject from "~/components/FeaturedProject";
import AboutPreview from "~/components/AboutPreview";
import type { BlogPostMeta } from "../../types";
import BlogPostCard from "../../components/BlogPostCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The friendly dev | WELCOME" },
    {
      name: "description",
      content: "Portfolio website for a friendly developer",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs): Promise<{
  projects: Project[];
  postsMeta: BlogPostMeta[];
}> {
  const url = new URL("/posts-meta.json", request.url);

  const [projectsResponse, postsMetaResponse] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/projects`),
    fetch(url.toString()),
  ]);

  if (!projectsResponse.ok) {
    throw new Error("Failed to fetch projects");
  }
  if (!postsMetaResponse.ok) {
    throw new Error("Failed to fetch blog posts metadata");
  }

  const [projects, postsMeta] = await Promise.all([
    projectsResponse.json(),
    postsMetaResponse.json(),
  ]);

  const latestPostsMeta = postsMeta
    .sort(
      (a: BlogPostMeta, b: BlogPostMeta) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 3);
  return { projects: projects, postsMeta: latestPostsMeta };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  return (
    <>
      <FeaturedProject projects={loaderData.projects} count={2} />
      <AboutPreview />
      <ul className="space-y-6 mt-12">
        <h2 className="text-2xl font-bold text-white mb-8">
          📝 Latest Blog Posts
        </h2>
        {loaderData.postsMeta.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </ul>
    </>
  );
};

export default HomePage;
