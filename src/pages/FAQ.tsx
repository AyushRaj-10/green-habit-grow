
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import {
  Search,
  ChevronDown,
  ChevronRight,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does GreenRoutine help reduce water usage?",
    answer: "GreenRoutine provides personalized reminders based on your daily routine to help you conserve water. For example, it can remind you to turn off the tap while brushing teeth or suggest shorter showers. Our calculator also helps you track and visualize your water savings over time.",
    category: "Features"
  },
  {
    question: "Are the eco-challenges difficult to complete?",
    answer: "Our eco-challenges are designed to be accessible for everyone, regardless of where you are in your sustainability journey. We offer challenges at different difficulty levels, from beginner-friendly tasks like avoiding single-use plastics for a day to more advanced challenges like going zero-waste for a week.",
    category: "Challenges"
  },
  {
    question: "How accurate is the CO₂ emissions calculator?",
    answer: "Our calculator uses industry-standard metrics and formulas to provide reasonably accurate estimates of your carbon footprint based on your reported activities. While not as precise as professional carbon audits, it gives you a good understanding of your environmental impact and areas for improvement.",
    category: "Calculator"
  },
  {
    question: "Can I use GreenRoutine on multiple devices?",
    answer: "Absolutely! GreenRoutine is designed to work seamlessly across devices. Create an account once, and you can access your personalized reminders, challenges, and progress tracking on your smartphone, tablet, or computer.",
    category: "Account"
  },
  {
    question: "Is my personal data secure with GreenRoutine?",
    answer: "Yes, we take data privacy very seriously. We only collect the information necessary to provide you with personalized sustainability recommendations. Your data is encrypted and never sold to third parties. You can review our complete privacy policy in the app settings.",
    category: "Privacy"
  },
  {
    question: "How do the reminders work? Will I get too many notifications?",
    answer: "Our reminders are fully customizable. You set when and how often you want to receive them. You can also group reminders for similar activities or pause them temporarily. We've designed the system to be helpful without being overwhelming.",
    category: "Features"
  },
  {
    question: "What if I miss a day in a challenge?",
    answer: "Don't worry! We understand that sustainability is a journey. If you miss a day, you can simply pick up where you left off. Most challenges are designed to be flexible, and many users find that even partial completion leads to lasting habit changes.",
    category: "Challenges"
  },
  {
    question: "How do I earn points on the leaderboard?",
    answer: "You earn points by completing eco-challenges, logging sustainable actions, achieving personal goals, and maintaining consistent habits. Special achievements and community contributions can also earn you bonus points. The leaderboard resets monthly to give everyone a fresh chance to climb the ranks.",
    category: "Leaderboard"
  },
  {
    question: "Can I suggest new features or challenges?",
    answer: "Absolutely! We love user input. You can suggest new features or challenges through the 'Feedback' section in the app settings. Many of our best features, including several challenges and the CO₂ calculator, came from user suggestions.",
    category: "General"
  },
  {
    question: "Is GreenRoutine free to use?",
    answer: "GreenRoutine offers a free version with all essential features including basic reminders, challenges, and impact tracking. We also offer a premium version with additional features like advanced statistics, exclusive challenges, and personalized sustainability coaching.",
    category: "General"
  },
  {
    question: "How can I delete my account if I no longer wish to use GreenRoutine?",
    answer: "You can delete your account at any time through the Privacy & Data section in your account settings. This will permanently remove all your personal information from our servers, though anonymized aggregate data may be retained for analytical purposes.",
    category: "Account"
  },
  {
    question: "Can businesses or organizations use GreenRoutine?",
    answer: "Yes! We offer special plans for businesses and organizations looking to improve their sustainability practices or engage employees in environmental initiatives. Contact our team through the website for more information on corporate partnerships.",
    category: "General"
  }
];

const categories = [...new Set(faqs.map(faq => faq.category))];

const FAQ = () => {
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    question: ""
  });
  const { toast } = useToast();

  const toggleQuestion = (question: string) => {
    if (expandedQuestion === question) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(question);
    }
  };

  const handleSubmit = () => {
    if (!contactForm.name || !contactForm.email || !contactForm.question) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Question Submitted",
      description: "We'll get back to you as soon as possible!"
    });

    setContactForm({
      name: "",
      email: "",
      question: ""
    });
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = activeCategory === null || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-900/30 dark:to-green-900/10">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="mb-4">
              <span className="green-gradient-text">Frequently Asked Questions</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find answers to common questions about GreenRoutine and sustainable living.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(null)}
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>

          <div className="space-y-4 mb-16">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border bg-card rounded-lg overflow-hidden"
                >
                  <div
                    className="cursor-pointer p-4 flex justify-between items-center"
                    onClick={() => toggleQuestion(faq.question)}
                  >
                    <h3 className="font-medium text-lg">{faq.question}</h3>
                    {expandedQuestion === faq.question ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedQuestion === faq.question ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="p-4 pt-0 bg-muted/30">
                      <p className="text-muted-foreground">{faq.answer}</p>
                      <div className="mt-3 flex items-center">
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center p-12 border border-dashed rounded-lg">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No questions found</h3>
                <p className="text-muted-foreground mb-4">
                  No FAQs match your current search.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory(null);
                  }}
                >
                  Reset Search
                </Button>
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-green-900/10 rounded-xl p-8 shadow-sm"
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-4">Still Have Questions?</h2>
                <p className="mb-6 text-muted-foreground">
                  Can't find what you're looking for? Feel free to reach out and we'll get back to you as soon as possible.
                </p>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <Input 
                      id="name" 
                      placeholder="Your name" 
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Your email address" 
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label htmlFor="question" className="block text-sm font-medium mb-1">
                      Your Question
                    </label>
                    <Textarea 
                      id="question" 
                      placeholder="Type your question here..." 
                      rows={4}
                      value={contactForm.question}
                      onChange={(e) => setContactForm({...contactForm, question: e.target.value})}
                    />
                  </div>
                  <Button onClick={handleSubmit} className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Submit Question
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-center">
                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-4">Common Resources</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="text-primary hover:underline flex items-center">
                        <ChevronRight className="h-4 w-4 mr-2" />
                        Getting Started Guide
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline flex items-center">
                        <ChevronRight className="h-4 w-4 mr-2" />
                        Sustainability Tips
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline flex items-center">
                        <ChevronRight className="h-4 w-4 mr-2" />
                        Challenge Examples
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline flex items-center">
                        <ChevronRight className="h-4 w-4 mr-2" />
                        Troubleshooting Guide
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline flex items-center">
                        <ChevronRight className="h-4 w-4 mr-2" />
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
