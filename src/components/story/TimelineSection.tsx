
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Lightbulb, Users, TrendingUp, Milestone, School, Building } from "lucide-react";

// Import the custom timeline component
import { Timeline, TimelineItem } from "@/components/story/Timeline";
import "./Timeline.css";

// Define the WaterDropIcon component first, before it's used
const WaterDropIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2.69l.56 5.59a10 10 0 1 0 10 11.12-4 4 0 0 1-8 0 5 5 0 0 1-10 0 10 10 0 0 0 10-11.12L12 2.69z" />
  </svg>
);

// Timeline items data
const timelineItems = [
  {
    year: "April 2025",
    title: "Initial Concept",
    description:
      "The idea for GreenRoutine emerged during an environmental hackathon. Our team brainstormed ways to help people track their daily environmental impact.",
    icon: <Lightbulb className="h-6 w-6" />,
    badge: "Idea",
  },
  {
    year: "April 2025",
    title: "Prototype Development",
    description:
      "We developed our first working prototype with basic features for tracking water usage and waste reduction. Initial testing with our team showed promising results.",
    icon: <Briefcase className="h-6 w-6" />,
    badge: "Development",
  },
  {
    year: "May 2025",
    title: "Alpha Testing",
    description:
      "GreenRoutine entered alpha testing with a small group of 25 environmentally-conscious users. We gathered valuable feedback and identified key areas for improvement.",
    icon: <Users className="h-6 w-6" />,
    badge: "Testing",
  },
  {
    year: "June 2025",
    title: "Feature Expansion",
    description:
      "Based on user feedback, we added carbon footprint calculation and personalized eco-tips. User engagement metrics showed increased daily app usage.",
    icon: <TrendingUp className="h-6 w-6" />,
    badge: "Growth",
  },
  {
    year: "June 2025",
    title: "Beta Release",
    description:
      "We launched our beta version to a wider audience of 100 users. New features included weekly eco-challenges and community leaderboards.",
    icon: <Milestone className="h-6 w-6" />,
    badge: "Milestone",
  },
  {
    year: "July 2025",
    title: "Water Conservation Partnership",
    description:
      "Partnered with local water conservation groups to enhance our water-saving recommendations and impact tracking features.",
    icon: <WaterDropIcon className="h-6 w-6" />,
    badge: "Partnership"
  },
  {
    year: "Future: August 2025",
    title: "Educational Institution Outreach",
    description: 
      "Our planned collaboration with schools and colleges will introduce environmental curriculum integration and campus sustainability programs.",
    icon: <School className="h-6 w-6" />,
    badge: "Education"
  },
  {
    year: "Future: September 2025",
    title: "Rural Development Initiative",
    description:
      "We aim to extend GreenRoutine to rural communities, providing sustainable farming practices and water conservation techniques tailored to agricultural needs.",
    icon: <Building className="h-6 w-6" />,
    badge: "Community"
  },
];

const TimelineSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Timeline>
        {timelineItems.map((item, index) => (
          <TimelineItem key={index}>
            <div className="timeline-badge">
              {item.badge && <Badge>{item.badge}</Badge>}
              {item.icon}
            </div>
            <div className="timeline-panel">
              <div className="timeline-heading">
                <h4 className="timeline-title">{item.title}</h4>
                <p>
                  <small className="text-muted-foreground">
                    <time>{item.year}</time>
                  </small>
                </p>
              </div>
              <div className="timeline-body">
                <p>{item.description}</p>
              </div>
            </div>
          </TimelineItem>
        ))}
      </Timeline>
    </motion.div>
  );
};

export default TimelineSection;
