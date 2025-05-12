
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Lightbulb, Users, TrendingUp, Milestone } from "lucide-react";

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
    year: "2018",
    title: "Inception of GreenRoutine",
    description:
      "The idea for GreenRoutine was born out of a university project focused on sustainable living. Our founders envisioned a tool that could make eco-friendly habits accessible to everyone.",
    icon: <Lightbulb className="h-6 w-6" />,
    badge: "Idea",
  },
  {
    year: "2019",
    title: "First Prototype",
    description:
      "We developed our first prototype, a simple app that sent users daily reminders to conserve water and reduce waste. Initial user feedback was incredibly encouraging.",
    icon: <Briefcase className="h-6 w-6" />,
    badge: "Development",
  },
  {
    year: "2020",
    title: "Beta Launch",
    description:
      "GreenRoutine launched its beta program with 100 users. We introduced features like habit tracking and a carbon footprint calculator, gathering valuable data and insights.",
    icon: <Users className="h-6 w-6" />,
    badge: "Testing",
  },
  {
    year: "2021",
    title: "Public Release",
    description:
      "GreenRoutine was officially released on iOS and Android. We quickly gained traction, reaching 10,000 users within the first six months.",
    icon: <TrendingUp className="h-6 w-6" />,
    badge: "Launch",
  },
  {
    year: "2022",
    title: "Feature Expansion",
    description:
      "We expanded GreenRoutine with new features like eco-challenges, a gamified leaderboard, and personalized sustainability tips. User engagement soared.",
    icon: <Milestone className="h-6 w-6" />,
    badge: "Growth",
  },
  {
    year: "2023",
    title: "EcoWater Partnership",
    description:
      "Partnered with EcoWater to expand our water conservation initiatives across three continents.",
    icon: <WaterDropIcon className="h-6 w-6" />,
    badge: "Partnership"
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
