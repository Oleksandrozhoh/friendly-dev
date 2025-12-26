import type { Route } from "./+types/index";
import type { BlogPostMeta } from "../../types";
import { useState } from "react";
import Pagination from "~/components/Pagination";
import BlogPostCard from "../../components/BlogPostCard";
import { supabase } from "../../lib/supabase.server";

export async function loader(): Promise<{
  posts: BlogPostMeta[];
}> {
  const { data, error } = await supabase.from("blog_posts").select("*");
  if (error) throw new Error("Failed to fetch blog posts from database");
  return { posts: data };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const { posts } = loaderData;

  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort posts by date in descending order
  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // Calculate the indices for slicing the posts array
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        📝 Blog
      </h2>
      <input
        type="text"
        placeholder="Search blog posts..."
        className="w-full p-3 mb-6 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => {
          setSearchQuery(e.target.value.toLowerCase());
        }}
      />
      {currentPosts.length === 0 ? (
        <p className="text-gray-400 text-center text-xl my-12 font-semibold">
          No blog posts found.
        </p>
      ) : (
        <>
          <ul className="space-y-6">
            {currentPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </ul>
        </>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default BlogPage;
