
import { motion } from "framer-motion";
import ImageWithFallback from "@/components/ImageWithFallback";

const timelineEvents = [
  {
    year: "2025",
    month: "April",
    title: "The Idea is Born",
    description: "The concept of GreenRoutine emerged during a college hackathon focused on climate solutions. Led by Ayush, a full stack developer and Arpita, a product lead, the team recognized that sustainable habits needed better technological support.",
    image: "https://images.unsplash.com/photo-1677442135726-3675b7cce5e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    year: "2025",
    month: "May",
    title: "First Prototype",
    description: "After weeks of research and development, the team created the first working prototype of GreenRoutine with basic reminder functionality.",
    image: "https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    year: "2025",
    month: "July",
    title: "Beta Launch",
    description: "GreenRoutine launched in beta with 100 early users. The feedback was overwhelmingly positive, with users reporting water and energy savings.",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    year: "2025",
    month: "August",
    title: "Community Growth",
    description: "The user base grew to 1,000 members. The team added the challenges feature based on user suggestions.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    year: "2025",
    month: "September",
    title: "Partnership with EcoWater",
    description: "GreenRoutine established its first corporate partnership with EcoWater to provide users with discounts on water-saving devices and support the Clean Water Initiative.",
    image: "https://images.unsplash.com/photo-1541956064527-8ec4809a580f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    year: "2025",
    month: "October",
    title: "5,000 Users Milestone",
    description: "GreenRoutine celebrated reaching 5,000 users and documented a collective saving of over 1 million liters of water.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    year: "2025",
    month: "November",
    title: "New Features Launch",
    description: "The team launched the CO₂ calculator and improved the gamification system with new badges and rewards.",
    image: "https://images.unsplash.com/photo-1566908829550-e6551b00979b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    year: "2025",
    month: "December",
    title: "School Programs",
    description: "GreenRoutine began partnering with local schools to introduce sustainability habits to children through interactive challenges.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  },
  {
    year: "2026",
    month: "January",
    title: "Today and Beyond",
    description: "Now with over 10,000 users worldwide, GreenRoutine continues to grow and evolve, with plans to expand into corporate sustainability programs and community-led initiatives.",
    image: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
  }
];

const impactStats = [
  { value: "1.2M", label: "Liters of water saved" },
  { value: "50K", label: "kWh of energy conserved" },
  { value: "75K", label: "kg of CO₂ emissions reduced" },
  { value: "12K", label: "Eco-challenges completed" },
];

const quotes = [
  { text: "Small changes in daily habits create massive impacts over time. GreenRoutine has helped thousands discover this simple truth.", author: "Ayush Raj, Co-founder & Full Stack Developer" },
  { text: "The most sustainable action is the one you actually do, day after day. Our goal is to make those actions easy, rewarding, and part of your routine.", author: "Arpita Singh, Co-founder & Head of Product" },
  { text: "Our partnership with EcoWater has allowed us to directly impact water conservation efforts while providing tangible benefits to our users.", author: "Maya Patel, Partnerships Director" },
  { text: "When we make sustainability personal and measurable, we create both motivation and accountability. That's the power of GreenRoutine.", author: "Dr. James Chen, Environmental Advisor" }
];

const Story = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-900/30 dark:to-green-900/10">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="mb-4">
            <span className="green-gradient-text">Our Journey</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            The story of GreenRoutine's growth from a college project to a global sustainability platform.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-24"
        >
          <div className="p-8 md:p-12 bg-white dark:bg-green-900/10 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Our Mission</h2>
            <p className="text-lg mb-6">
              At GreenRoutine, we believe that small, consistent actions can lead to significant environmental impact. Our mission is to make sustainability an effortless part of everyday life by providing personalized, easy-to-follow routines that help people reduce their ecological footprint.
            </p>
            <p className="text-lg mb-6">
              We're creating a world where being environmentally conscious is not just something people aspire to, but something they practice every day through simple habits. By gamifying eco-friendly behaviors and building a supportive community, we make the journey toward sustainability engaging and rewarding.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
              {quotes.map((quote, index) => (
                <blockquote key={index} className="border-l-4 border-primary pl-4 py-2 italic text-muted-foreground">
                  "{quote.text}"
                  <footer className="mt-2 font-semibold">— {quote.author}</footer>
                </blockquote>
              ))}
            </div>
            
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4">Clean Water Initiative</h3>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/2">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" 
                    alt="Clean water project" 
                    className="rounded-lg shadow-md w-full h-64 object-cover"
                  />
                </div>
                <div className="md:w-1/2">
                  <p className="text-lg">
                    Through our partnership with EcoWater, we've launched the Clean Water Initiative, helping communities gain access to clean water while promoting water conservation habits. For every 1,000 water-saving challenges completed by our users, we fund a water filtration system for communities in need.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl font-bold text-center mb-16"
          >
            <span className="green-gradient-text">Our Timeline</span>
          </motion.h2>
          
          <div className="relative">
            {/* Timeline center line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-200 dark:bg-green-800"></div>
            
            {/* Timeline events */}
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`relative mb-16 ${
                  index % 2 === 0 ? "md:ml-0" : "md:mr-0"
                }`}
              >
                <div className="flex flex-col md:flex-row items-center">
                  {/* Date marker - visible only on mobile */}
                  <div className="md:hidden bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {event.month} {event.year}
                  </div>
                  
                  {/* Content for left-side events (even) */}
                  {index % 2 === 0 && (
                    <>
                      <div className="w-full md:w-1/2 md:pr-12 md:text-right">
                        <div className="hidden md:block bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-2">
                          {event.month} {event.year}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                        <p className="text-muted-foreground">{event.description}</p>
                      </div>
                      
                      {/* Center dot */}
                      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-1 items-center justify-center w-8 h-8 rounded-full bg-green-600 border-4 border-green-100 dark:border-green-900">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      
                      {/* Image for even-indexed events */}
                      <div className="w-full md:w-1/2 md:pl-12 mt-4 md:mt-0">
                        <ImageWithFallback 
                          src={event.image} 
                          alt={event.title} 
                          className="rounded-lg w-full max-h-64 object-cover shadow-md"
                        />
                      </div>
                    </>
                  )}
                  
                  {/* Content for right-side events (odd) */}
                  {index % 2 === 1 && (
                    <>
                      {/* Image for odd-indexed events */}
                      <div className="w-full md:w-1/2 md:pr-12 md:text-right">
                        <ImageWithFallback 
                          src={event.image} 
                          alt={event.title}
                          className="rounded-lg w-full max-h-64 object-cover shadow-md md:ml-auto"
                        />
                      </div>
                      
                      {/* Center dot */}
                      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-1 items-center justify-center w-8 h-8 rounded-full bg-green-600 border-4 border-green-100 dark:border-green-900">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      
                      <div className="w-full md:w-1/2 md:pl-12 mt-4 md:mt-0">
                        <div className="hidden md:block bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-2">
                          {event.month} {event.year}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                        <p className="text-muted-foreground">{event.description}</p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="green-gradient-text">Our Impact So Far</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-green-900/10 p-6 rounded-xl shadow-sm text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-6">
            <span className="green-gradient-text">Join Our Story</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Every user who joins GreenRoutine contributes to our collective impact on the environment. We're excited to see where the next chapter of our journey takes us, and we'd love for you to be a part of it.
          </p>
          <div className="inline-block bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors">
            <a href="/" className="flex items-center gap-2">
              Start Your Green Journey
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Story;
