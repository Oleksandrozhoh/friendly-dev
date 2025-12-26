import type { Route } from "./+types/details";
import type { BlogPostMeta } from "../../types";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router";

export async function loader({
  request,
  params,
}: Route.LoaderArgs): Promise<{ blogPost: string; meta: BlogPostMeta }> {
  const { slug } = params;

  // Validate the slug (user controlled input - always validate!)
  if (
    !slug ||
    slug.includes("..") ||
    slug.includes("/") ||
    slug.includes("\\") ||
    !slug.match(/^[a-zA-Z0-9-_]+$/)
  ) {
    throw new Error("Invalid blog post slug");
  }

  const blogPost = await import(`../../blogPosts/${slug}.md?raw`);

  if (!blogPost) throw new Error("Blog post not found");

  const url = new URL("/posts-meta.json", request.url);
  const response = await fetch(url.toString());
  if (!response.ok) throw new Error("Failed to fetch blog posts metadata");
  const postsMeta: BlogPostMeta[] = await response.json();

  const currentPostMeta = postsMeta.find((post) => post.slug === slug);
  if (!currentPostMeta) throw new Error("Blog post metadata not found");

  return { blogPost: blogPost.default, meta: currentPostMeta };
}

const BlogDetails = ({ loaderData }: Route.ComponentProps) => {
  if (!loaderData) return null; // or a loading/error state
  const { blogPost, meta } = loaderData as {
    blogPost: string;
    meta: BlogPostMeta;
  };
  return (
    <>
      <h2 className="text-3xl font-bold text-blue-400 mb-4">{meta.title}</h2>
      <p className="text-sm text-gray-500 mb-8">
        {new Date(meta.date).toLocaleDateString()}
      </p>
      <div className="prose prose-invert max-w-none mb-12 bg-gray-900 rounded-lg p-6">
        <ReactMarkdown>{blogPost}</ReactMarkdown>
      </div>
      <Link to="/blog" className="text-blue-400 hover:underline mt-8 block">
        ← Back to Blog
      </Link>
    </>
  );
};

export default BlogDetails;
