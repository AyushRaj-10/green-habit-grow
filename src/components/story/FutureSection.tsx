
import { motion } from "framer-motion";
import GreenGrowthAnimation from "@/components/GreenGrowthAnimation";

const FutureSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="mt-20"
    >
      <h2 className="text-center mb-8">
        <span className="green-gradient-text">The Future of GreenRoutine</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-muted-foreground text-lg mb-6">
            We are committed to continuously improving GreenRoutine and
            expanding our impact. Our roadmap includes:
          </p>
          <ul className="list-disc list-inside text-muted-foreground">
            <li className="mb-2">
              Collaborating with educational institutions to create environmental
              awareness programs for students of all ages
            </li>
            <li className="mb-2">
              Developing specialized modules for rural communities focusing on
              sustainable farming practices and water conservation
            </li>
            <li className="mb-2">
              Integrating with smart home devices to automate energy and
              water conservation
            </li>
            <li className="mb-2">
              Creating community-led environmental initiatives that bring
              neighbors together for local conservation projects
            </li>
            <li className="mb-2">
              Expanding our educational resources to promote sustainable
              living across different cultural contexts
            </li>
          </ul>
        </div>
        <div>
          <GreenGrowthAnimation />
        </div>
      </div>
    </motion.div>
  );
};

export default FutureSection;
