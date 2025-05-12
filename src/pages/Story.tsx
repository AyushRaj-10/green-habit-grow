
import { motion } from "framer-motion";
import ImageWithFallback from "@/components/ImageWithFallback";
import GreenGrowthAnimation from "@/components/GreenGrowthAnimation";
import { Badge } from "@/components/ui/badge";
import { Timeline, TimelineItem } from "@/components/ui/timeline";
import {
  Briefcase as BriefcaseIcon,
  Lightbulb as LightbulbIcon,
  Users as UsersIcon,
  WaterDrop as WaterDropIcon,
  TrendingUp as TrendingUpIcon,
  Milestone as MilestoneIcon,
} from "lucide-react";

const timelineItems = [
  {
    year: "2018",
    title: "Inception of GreenRoutine",
    description:
      "The idea for GreenRoutine was born out of a university project focused on sustainable living. Our founders envisioned a tool that could make eco-friendly habits accessible to everyone.",
    icon: <LightbulbIcon className="h-6 w-6" />,
    badge: "Idea",
  },
  {
    year: "2019",
    title: "First Prototype",
    description:
      "We developed our first prototype, a simple app that sent users daily reminders to conserve water and reduce waste. Initial user feedback was incredibly encouraging.",
    icon: <BriefcaseIcon className="h-6 w-6" />,
    badge: "Development",
  },
  {
    year: "2020",
    title: "Beta Launch",
    description:
      "GreenRoutine launched its beta program with 100 users. We introduced features like habit tracking and a carbon footprint calculator, gathering valuable data and insights.",
    icon: <UsersIcon className="h-6 w-6" />,
    badge: "Testing",
  },
  {
    year: "2021",
    title: "Public Release",
    description:
      "GreenRoutine was officially released on iOS and Android. We quickly gained traction, reaching 10,000 users within the first six months.",
    icon: <TrendingUpIcon className="h-6 w-6" />,
    badge: "Launch",
  },
  {
    year: "2022",
    title: "Feature Expansion",
    description:
      "We expanded GreenRoutine with new features like eco-challenges, a gamified leaderboard, and personalized sustainability tips. User engagement soared.",
    icon: <MilestoneIcon className="h-6 w-6" />,
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-center mb-8">
            <span className="green-gradient-text">
              Our Eco-System Partnerships
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1496442226666-8d4e6e50c364?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
                alt="Renewable Energy Initiatives"
                className="rounded-lg shadow-md"
                fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' text-anchor='middle' dominant-baseline='middle' fill='%23666'%3ERenewable Energy%3C/text%3E%3C/svg%3E"
              />
              <h3 className="mt-4">Renewable Energy Initiatives</h3>
              <p className="text-muted-foreground">
                Collaborating with energy providers to promote clean energy
                solutions.
              </p>
            </div>
            <div className="text-center">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1559548331-a9859874a44c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
                alt="Sustainable Agriculture Programs"
                className="rounded-lg shadow-md"
                fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' text-anchor='middle' dominant-baseline='middle' fill='%23666'%3ESustainable Farming%3C/text%3E%3C/svg%3E"
              />
              <h3 className="mt-4">Sustainable Agriculture Programs</h3>
              <p className="text-muted-foreground">
                Supporting farmers in adopting eco-friendly farming practices.
              </p>
            </div>
            <div className="text-center">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1560786499-b9c5ff564ddb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
                alt="Water Conservation Projects"
                className="rounded-lg shadow-md"
                fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' text-anchor='middle' dominant-baseline='middle' fill='%23666'%3EWater Conservation%3C/text%3E%3C/svg%3E"
              />
              <h3 className="mt-4">Water Conservation Projects</h3>
              <p className="text-muted-foreground">
                Investing in projects that conserve and protect our precious
                water resources.
              </p>
            </div>
          </div>
        </motion.div>

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
      </div>
    </div>
  );
};

// The custom WaterDropIcon was removed to fix the duplicate definition error

export default Story;
