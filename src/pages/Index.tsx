import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { 
  Check, 
  ArrowRight,
  User, 
  Calendar,
  Calculator,
  Award,
  Leaf, 
  Heart,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingScreen from "@/components/LoadingScreen";

// Mock reviews data
const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    content: "GreenRoutine has completely transformed how I approach sustainability. The reminders are so helpful and I've cut my water usage by 30%!",
    rating: 5
  },
  {
    id: 2,
    name: "David Chen",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    content: "I'm now saving over 1000 liters of water per month thanks to GreenRoutine's suggestions and habit tracking. The app makes it so easy to be mindful.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Patel",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    content: "The eco-challenges are fun and motivating. I never realized how easy it could be to live more sustainably. My favorite was the zero-waste week!",
    rating: 4
  },
  {
    id: 4,
    name: "Michael Torres",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    content: "As someone who was skeptical about these kinds of apps, I'm impressed. GreenRoutine taught me how small changes can make a big difference for our planet.",
    rating: 5
  },
  {
    id: 5,
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    content: "The impact calculator is eye-opening! Seeing the actual numbers helped my family reduce our carbon footprint by nearly 20% in just two months.",
    rating: 5
  }
];

// Mock sponsors data
const sponsors = [
  { id: 1, name: "EcoTech", logo: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" },
  { id: 2, name: "GreenLife", logo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" },
  { id: 3, name: "EarthFirst", logo: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" },
  { id: 4, name: "CleanWater", logo: "https://images.unsplash.com/photo-1532192307507-9d4d630fde6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" },
];

// Mock FAQ data
const faqs = [
  {
    id: 1,
    question: "How does GreenRoutine help reduce water usage?",
    answer: "GreenRoutine provides personalized reminders based on your daily routine to help you conserve water. For example, it can remind you to turn off the tap while brushing teeth or suggest shorter showers. Our calculator also helps you track and visualize your water savings over time."
  },
  {
    id: 2,
    question: "Are the eco-challenges difficult to complete?",
    answer: "Our eco-challenges are designed to be accessible for everyone, regardless of where you are in your sustainability journey. We offer challenges at different difficulty levels, from beginner-friendly tasks like avoiding single-use plastics for a day to more advanced challenges like going zero-waste for a week."
  },
  {
    id: 3,
    question: "How accurate is the CO₂ emissions calculator?",
    answer: "Our calculator uses industry-standard metrics and formulas to provide reasonably accurate estimates of your carbon footprint based on your reported activities. While not as precise as professional carbon audits, it gives you a good understanding of your environmental impact and areas for improvement."
  },
  {
    id: 4,
    question: "Can I use GreenRoutine on multiple devices?",
    answer: "Absolutely! GreenRoutine is designed to work seamlessly across devices. Create an account once, and you can access your personalized reminders, challenges, and progress tracking on your smartphone, tablet, or computer."
  }
];

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [currentReview, setCurrentReview] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [userCount, setUserCount] = useState(9750);
  const [waterSaved, setWaterSaved] = useState(0);
  const { toast } = useToast();
  const treeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-rotate reviews
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animate user counter
    const interval = setInterval(() => {
      setUserCount(prev => {
        const newCount = prev + Math.floor(Math.random() * 3);
        if (newCount >= 10000) {
          clearInterval(interval);
          return 10000;
        }
        return newCount;
      });
    }, 800);

    // Animate water saved
    const waterInterval = setInterval(() => {
      setWaterSaved(prev => {
        const newAmount = prev + Math.random() * 5;
        return parseFloat(newAmount.toFixed(1));
      });
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(waterInterval);
    };
  }, []);

  const handleSubscribe = () => {
    toast({
      title: "Thank you for subscribing!",
      description: "We'll send you updates on new features and sustainability tips.",
    });
  };

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-10"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 py-20 md:py-32 relative z-10"
        >
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-bold text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="green-gradient-text">
                Make Sustainability Part of Your Daily Routine
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-green-800 dark:text-green-100"
            >
              Personalized reminders, fun challenges, and real impact tracking to help you build greener habits.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-4 pt-6"
            >
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <Link to="/reminders">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/story">Our Mission</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-green-900 to-transparent"></div>
      </section>

      {/* Live User Stats */}
      <section className="bg-white dark:bg-green-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-muted-foreground text-sm uppercase font-semibold">Growing Community</p>
              <div className="text-4xl md:text-5xl font-bold text-primary my-2">
                {userCount.toLocaleString()}
              </div>
              <p className="text-muted-foreground">Users Worldwide</p>
            </motion.div>
            
            <div className="hidden md:block h-16 w-px bg-border"></div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <p className="text-muted-foreground text-sm uppercase font-semibold">Our Impact</p>
              <div className="text-4xl md:text-5xl font-bold text-primary my-2">
                {waterSaved.toLocaleString()} M
              </div>
              <p className="text-muted-foreground">Liters of Water Saved</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="section-padding bg-green-50 dark:bg-green-900/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="mb-4">
              <span className="green-gradient-text">Core Features</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Discover how GreenRoutine helps you build sustainable habits and make a positive impact on the environment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full glass-card">
                <CardHeader>
                  <div className="bg-green-100 dark:bg-green-800/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <User className="text-primary h-6 w-6" />
                  </div>
                  <CardTitle>Personalized Eco-Reminders</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Get timely reminders tailored to your daily routine, helping you save water, energy, and reduce waste.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="gap-2">
                    <Link to="/reminders">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full glass-card">
                <CardHeader>
                  <div className="bg-green-100 dark:bg-green-800/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Award className="text-primary h-6 w-6" />
                  </div>
                  <CardTitle>Gamified Leaderboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Earn points for eco-friendly actions and compete with friends on our motivating sustainability leaderboard.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="gap-2">
                    <Link to="/leaderboard">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full glass-card">
                <CardHeader>
                  <div className="bg-green-100 dark:bg-green-800/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Calendar className="text-primary h-6 w-6" />
                  </div>
                  <CardTitle>Eco-Challenges</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Take on weekly and monthly challenges to push your sustainability efforts and develop new green habits.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="gap-2">
                    <Link to="/challenges">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="h-full glass-card">
                <CardHeader>
                  <div className="bg-green-100 dark:bg-green-800/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Calculator className="text-primary h-6 w-6" />
                  </div>
                  <CardTitle>Impact Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Track your CO₂ emissions and water usage to see the real impact of your sustainable lifestyle choices.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="gap-2">
                    <Link to="/calculator">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tree Animation Placeholder - In a real implementation, this would use Three.js */}
      <section className="relative py-24 bg-gradient-to-b from-green-50 to-white dark:from-green-900/30 dark:to-green-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <span className="green-gradient-text">Watch Your Impact Grow</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              As you build sustainable habits, see your positive environmental impact blossom.
            </motion.p>
          </div>
          
          <motion.div 
            ref={treeRef}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="tree-container relative mx-auto"
          >
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <svg width="200" height="400" viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Tree trunk */}
                <rect x="90" y="250" width="20" height="150" fill="#8B5E3C" />
                
                {/* Tree leaves - simplified representation */}
                <circle cx="100" cy="200" r="80" fill="#4CAF50" opacity="0.9" />
                <circle cx="70" cy="150" r="50" fill="#66BB6A" opacity="0.8" />
                <circle cx="130" cy="150" r="50" fill="#66BB6A" opacity="0.8" />
                <circle cx="100" cy="100" r="60" fill="#81C784" opacity="0.7" />
              </svg>
            </div>
            <div className="text-center mt-8">
              <p className="text-lg text-muted-foreground">
                This would be an interactive Three.js animation in the full implementation
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Water Usage Prompt */}
      <section className="section-padding bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 dark:bg-green-800/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg"
            >
              <div className="text-center mb-8">
                <h2 className="mb-4">
                  <span className="green-gradient-text">How much water do you use daily?</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  The average person uses around 150 liters of water per day. See how your usage compares and find ways to conserve.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl text-center">
                  <h3 className="text-xl font-semibold mb-2">Shower</h3>
                  <p className="text-4xl font-bold text-blue-500 mb-2">70L</p>
                  <p className="text-muted-foreground text-sm">Per 7-minute shower</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl text-center">
                  <h3 className="text-xl font-semibold mb-2">Washing Machine</h3>
                  <p className="text-4xl font-bold text-blue-500 mb-2">45L</p>
                  <p className="text-muted-foreground text-sm">Per load</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl text-center">
                  <h3 className="text-xl font-semibold mb-2">Toilet Flush</h3>
                  <p className="text-4xl font-bold text-blue-500 mb-2">9L</p>
                  <p className="text-muted-foreground text-sm">Per flush</p>
                </div>
              </div>
              
              <div className="text-center">
                <Button asChild size="lg">
                  <Link to="/calculator">
                    Calculate Your Water Usage
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* User Reviews - Updated */}
      <section id="reviews" className="section-padding bg-white dark:bg-green-900/10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="mb-4">
              <span className="green-gradient-text">What Our Users Say</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of people who are making a difference with GreenRoutine.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto relative h-[320px] md:h-[250px]">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ 
                  opacity: index === currentReview ? 1 : 0,
                  x: index === currentReview ? 0 : 100,
                  zIndex: index === currentReview ? 10 : 0
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="glass-card p-6 md:p-8 h-full">
                  <div className="flex flex-col md:flex-row gap-6 md:items-center h-full">
                    <div className="flex-shrink-0">
                      <img 
                        src={review.avatar} 
                        alt={review.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80";
                        }}
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <p className="italic text-lg mb-4">{review.content}</p>
                      <p className="font-semibold">{review.name}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentReview ? 'bg-primary scale-125' : 'bg-primary/30'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link to="/reviews">
                View All Reviews
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-padding bg-green-50 dark:bg-green-900/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="mb-4">
              <span className="green-gradient-text">Frequently Asked Questions</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Get answers to common questions about GreenRoutine.
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: faq.id * 0.1 }}
                className="glass-card overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full text-left p-6 flex justify-between items-center"
                >
                  <h3 className="text-lg font-medium">{faq.question}</h3>
                  <div className={`transform transition-transform ${expandedFaq === faq.id ? 'rotate-45' : ''}`}>
                    <Plus className="h-5 w-5 text-primary" />
                  </div>
                </button>
                
                <div
                  className={`px-6 transition-all duration-300 ease-in-out ${
                    expandedFaq === faq.id ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button asChild variant="outline">
              <Link to="/faq">
                View All FAQs
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="section-padding bg-white dark:bg-green-900/10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="mb-4">
              <span className="green-gradient-text">Supported By</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Partners who share our vision for a sustainable future.
            </p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
            {sponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              >
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name} 
                  className="h-12 w-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-lg md:text-xl text-green-100 mb-10 max-w-2xl mx-auto">
              Join thousands of others who are building sustainable habits and making a positive impact on our planet.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-green-800 hover:bg-green-100">
                <Link to="/reminders">
                  Start Your Green Journey
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
                <Link to="/story">
                  Learn More About Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const Plus = ({ className }: { className?: string }) => (
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
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default Index;
