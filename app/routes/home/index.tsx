import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The friendly dev | WELCOME" },
    {
      name: "description",
      content: "Portfolio website for a friendly developer",
    },
  ];
}

export default function Home() {
  console.log("Home page rendered");
  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page!</h1>
    </>
  );
}
