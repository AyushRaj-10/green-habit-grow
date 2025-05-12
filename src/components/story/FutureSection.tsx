
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
            <li>Developing AI-powered personalized sustainability plans</li>
            <li>
              Integrating with smart home devices to automate energy and
              water conservation
            </li>
            <li>
              Partnering with local communities to support grassroots
              environmental initiatives
            </li>
            <li>
              Expanding our educational resources to promote sustainable
              living
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
