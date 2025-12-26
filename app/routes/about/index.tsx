const AboutPage = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto px-6 py-16 bg-gray-900">
        {/* Intro section */}
        <div className="flex flex-col md:flex-row md:items-start items-center gap-10 mb-12">
          <img
            src="/images/profile.jpg"
            alt="Alex's Profile Picture"
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-400"
          />
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Hey, I'm Alex! 👋
            </h1>
            <p className="text-gray-300 text-lg">
              I'm a passionate software engineer with various areas of
              expertise. I love building web applications, exploring new
              technologies!
            </p>
          </div>
        </div>
        {/* Bio section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-200 mb-4">My story</h2>
          <p className="text-gray-300 leading-relaxed">
            Migrated from a different field in 2019, I quickly fell in love with
            coding. Since then, I've worked on numerous projects, honing my
            skills in various areas of software development. I worked for
            several years as QA / SDET engineer, then transitioned to working on
            infrastructure as a devops engineer. Now, I focus on full-stack
            development! I beleive my adaptability and diverse background make
            me a well-rounded developer.
          </p>
        </div>

        {/* Skills section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-200 mb-4">Skills</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            {[
              "JavaScript / TypeScript / Java / C#",
              "React, Node.js",
              "HTML5 & CSS3 / Tailwind CSS",
              "RESTful APIs",
              "Version Control (Git & GitHub)",
              "Kubernetes / Docker / CI/CD",
              "Selenium / Playwright",
            ].map((skill) => (
              <li
                key={skill}
                className="bg-gray-700 px-3 py-1 rounded-md inline-block mr-4"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
