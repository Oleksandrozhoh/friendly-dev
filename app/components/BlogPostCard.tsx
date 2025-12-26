import { Link } from "react-router";
import type { BlogPostMeta } from "../types";

const BlogPostCard = ({ post }: { post: BlogPostMeta }) => {
  return (
    <li
      key={post.id}
      className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition"
    >
      <Link
        to={`/blog/${post.slug}`}
        className="text-2xl font-semibold text-blue-400 hover:underline"
      >
        {post.title}
      </Link>
      <p className="text-gray-300 mt-2">{post.excerpt}</p>
      <p className="text-sm text-gray-500 mt-1">
        {new Date(post.date).toLocaleDateString()}
      </p>
    </li>
  );
};

export default BlogPostCard;
