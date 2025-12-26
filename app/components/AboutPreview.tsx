import { Link } from "react-router";

const AboutPreview = () => {
  return (
    <section className="mt-12 p-10 flex flex-col md:flex-row items-center gap-8 bg-gray-900">
      <img
        src="/images/profile.jpg"
        alt="Alex's Profile Picture"
        className="w-40 h-40 rounded-full object-cover border-4 border-blue-400"
      />
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">👋 About Me</h2>
        <p className="text-gray-200">
          I'm a passionate software engineer with various areas of expertise. I
          love building web applications, exploring new technologies!
        </p>
        <Link
          to="/about"
          className="inline-block text-blue-400 hover:underline mt-4"
        >
          Learn more about me
        </Link>
      </div>
    </section>
  );
};

export default AboutPreview;
