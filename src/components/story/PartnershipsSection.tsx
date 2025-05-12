
import { motion } from "framer-motion";
import ImageWithFallback from "@/components/ImageWithFallback";

const PartnershipsSection = () => {
  return (
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
  );
};

export default PartnershipsSection;
