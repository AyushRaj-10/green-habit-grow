
import { motion } from "framer-motion";
import { 
  Github,
  Linkedin,
  Mail,
  Twitter
} from "lucide-react";

const foundersData = [
  {
    id: 1,
    name: "Ayush Raj",
    role: "Co-Founder & Full Stack Developer",
    image: "/lovable-uploads/47cd217f-ad3c-4d7b-bb27-f6b4055bd7db.png",
    bio: "Ayush is an expert in full stack development and the technical visionary behind GreenRoutine. With his deep knowledge of environmental science and cutting-edge software development, he architected the platform that makes sustainability accessible to everyone.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      email: "ayush@greenroutine.com"
    }
  },
  {
    id: 2,
    name: "Arpita Pai",
    role: "Co-Founder & Head of Product",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    bio: "Arpita oversees all product development and operations at GreenRoutine. Her expertise in product management and vision for sustainable technology has been instrumental in creating our intuitive platform that helps users develop eco-friendly habits effectively.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      email: "arpita@greenroutine.com"
    }
  },
  {
    id: 3,
    name: "Astuti Singh",
    role: "Co-Founder & UX Designer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    bio: "With a background in UX design and environmental advocacy, Astuti ensures that GreenRoutine is not only effective but also engaging and intuitive to use. She leads our user research and experience design initiatives.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      email: "astuti@greenroutine.com"
    }
  },
  {
    id: 4,
    name: "Arti Pikhan",
    role: "Co-Founder & Head of Community",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    bio: "Arti is responsible for building and nurturing the GreenRoutine community. She organizes sustainability challenges, manages partnerships, and ensures that users feel supported and motivated on their green journey.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
      email: "arti@greenroutine.com"
    }
  }
];

const Founders = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-900/30 dark:to-green-900/10">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="mb-4">
              <span className="green-gradient-text">Meet Our Founders</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              GreenRoutine was founded by four brilliant students from Dayananda Sagar College of Engineering who share a passion for sustainability and technology.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {foundersData.map((founder, index) => (
              <motion.div
                key={founder.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col md:flex-row gap-6 items-center md:items-start"
              >
                <div className="w-64 h-64 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
                  <img 
                    src={founder.image} 
                    alt={founder.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h2 className="text-2xl font-semibold">{founder.name}</h2>
                  <p className="text-primary font-medium mb-3">{founder.role}</p>
                  <p className="text-muted-foreground mb-4">{founder.bio}</p>
                  
                  <div className="flex justify-center md:justify-start space-x-3">
                    <a 
                      href={founder.social.twitter} 
                      className="p-2 rounded-full hover:bg-muted transition-colors" 
                      aria-label={`${founder.name}'s Twitter`}
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a 
                      href={founder.social.linkedin} 
                      className="p-2 rounded-full hover:bg-muted transition-colors" 
                      aria-label={`${founder.name}'s LinkedIn`}
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a 
                      href={founder.social.github} 
                      className="p-2 rounded-full hover:bg-muted transition-colors" 
                      aria-label={`${founder.name}'s GitHub`}
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a 
                      href={`mailto:${founder.social.email}`} 
                      className="p-2 rounded-full hover:bg-muted transition-colors" 
                      aria-label={`Email ${founder.name}`}
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-green-900/10 rounded-xl p-8 shadow-sm max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-semibold mb-4 text-center">Our Story</h2>
            <div className="space-y-4">
              <p>
                GreenRoutine began as an innovative idea in April 2025 at Dayananda Sagar College of Engineering. What started as a simple app to track water usage quickly evolved into a comprehensive platform for sustainable living.
              </p>
              <p>
                Ayush, Arpita, Astuti, and Arti, all passionate about environmental conservation, realized that while many people wanted to live more sustainably, they often lacked the tools and motivation to make lasting changes. They combined their diverse skills in technology, design, and environmental science to create a solution.
              </p>
              <p>
                The founding team spent months researching behavioral psychology to understand how habits form and change. They discovered that small, consistent actions combined with positive reinforcement could lead to significant lifestyle changes. This insight became the core philosophy of GreenRoutine.
              </p>
              <p>
                Today, GreenRoutine has grown from a college project to a thriving community of over 10,000 users worldwide, all working together to create a more sustainable future through their daily habits.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Founders;
