import type { Project } from "../types";
import ProjectCard from "./ProjectCard";
import { AnimatePresence, motion } from "framer-motion";

const ProjectsList = ({ projects }: { projects: Project[] }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div layout className="grid gap-6 sm:grid-cols-2">
          {projects.map((project: Project) => (
            <motion.div layout key={project.id}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ProjectsList;
