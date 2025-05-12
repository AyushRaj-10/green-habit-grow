
import { motion } from "framer-motion";

const MissionVisionSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="mb-4">
            <span className="green-gradient-text">Our Mission</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            To empower individuals to make sustainable choices every day,
            creating a healthier planet for future generations.
          </p>
        </div>
        <div>
          <h2 className="mb-4">
            <span className="green-gradient-text">Our Vision</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            To be the leading platform for sustainable living, inspiring
            millions to adopt eco-friendly habits and reduce their
            environmental impact.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MissionVisionSection;
