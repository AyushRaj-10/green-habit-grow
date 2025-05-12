
import { motion } from "framer-motion";
import TimelineSection from "@/components/story/TimelineSection";
import MissionVisionSection from "@/components/story/MissionVisionSection";
import PartnershipsSection from "@/components/story/PartnershipsSection";
import FutureSection from "@/components/story/FutureSection";

const Story = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-900/30 dark:to-green-900/10">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="mb-4">
            <span className="green-gradient-text">Our Story</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From a university project to a global movement, discover the journey
            of GreenRoutine and our commitment to a sustainable future.
          </p>
        </motion.div>

        {/* Timeline Section */}
        <TimelineSection />

        {/* Mission and Vision Section */}
        <MissionVisionSection />

        {/* Partnerships Section */}
        <PartnershipsSection />

        {/* Future Section */}
        <FutureSection />
      </div>
    </div>
  );
};

export default Story;
