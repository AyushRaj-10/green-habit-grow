
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { 
  Award, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Users, 
  Trophy
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "easy" | "medium" | "hard";
  participants: number;
  impact: string;
  points: number;
  progress: number;
  joined: boolean;
  tags: string[];
}

const challenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "Plastic-Free Week",
    description: "Avoid using single-use plastics for an entire week. This includes plastic bags, bottles, straws, and food packaging.",
    duration: "7 days",
    difficulty: "medium",
    participants: 1245,
    impact: "Prevent ~2kg of plastic waste",
    points: 150,
    progress: 0,
    joined: false,
    tags: ["waste", "beginner-friendly"]
  },
  {
    id: "challenge-2",
    title: "5-Minute Shower Challenge",
    description: "Limit your showers to 5 minutes or less for two weeks. Track your water usage and compare it to your previous consumption.",
    duration: "14 days",
    difficulty: "easy",
    participants: 2567,
    impact: "Save ~500L of water",
    points: 100,
    progress: 0,
    joined: false,
    tags: ["water", "beginner-friendly"]
  },
  {
    id: "challenge-3",
    title: "Zero Food Waste Month",
    description: "Plan your meals and use all your food before it spoils. Compost any unavoidable food scraps.",
    duration: "30 days",
    difficulty: "hard",
    participants: 876,
    impact: "Reduce ~10kg CO₂ emissions",
    points: 300,
    progress: 0,
    joined: false,
    tags: ["waste", "advanced"]
  },
  {
    id: "challenge-4",
    title: "Power-Down Evenings",
    description: "Turn off all non-essential electronics after 8pm. Use candlelight or energy-efficient lighting instead.",
    duration: "10 days",
    difficulty: "medium",
    participants: 1087,
    impact: "Save ~5kWh electricity",
    points: 200,
    progress: 0,
    joined: false,
    tags: ["energy", "intermediate"]
  }
];

const difficultyColors = {
  easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
};

const Challenges = () => {
  const [activeChallenges, setActiveChallenges] = useState<Challenge[]>(challenges);
  const [filter, setFilter] = useState<string>("all");
  const { toast } = useToast();

  const handleJoinChallenge = (id: string) => {
    setActiveChallenges(
      activeChallenges.map(challenge =>
        challenge.id === id
          ? { ...challenge, joined: true }
          : challenge
      )
    );

    toast({
      title: "Challenge Joined!",
      description: "You've successfully joined the challenge. Good luck!",
    });
  };

  const handleUpdateProgress = (id: string, increment: number) => {
    setActiveChallenges(
      activeChallenges.map(challenge =>
        challenge.id === id
          ? { 
              ...challenge, 
              progress: Math.min(100, challenge.progress + increment) 
            }
          : challenge
      )
    );

    const challenge = activeChallenges.find(c => c.id === id);
    const newProgress = Math.min(100, (challenge?.progress || 0) + increment);
    
    if (newProgress === 100) {
      toast({
        title: "Challenge Completed! 🎉",
        description: `You've earned ${challenge?.points} points!`,
      });
    } else {
      toast({
        title: "Progress Updated",
        description: `You're now at ${newProgress}% completion.`,
      });
    }
  };

  const filteredChallenges = filter === "all" 
    ? activeChallenges 
    : filter === "joined" 
      ? activeChallenges.filter(c => c.joined) 
      : activeChallenges.filter(c => c.tags.includes(filter));

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
              <span className="green-gradient-text">Eco-Challenges</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Push yourself to develop new sustainable habits with our fun and impactful eco-challenges.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex justify-center flex-wrap gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                All Challenges
              </Button>
              <Button
                variant={filter === "joined" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("joined")}
              >
                My Challenges
              </Button>
              <Button
                variant={filter === "water" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("water")}
              >
                Water
              </Button>
              <Button
                variant={filter === "energy" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("energy")}
              >
                Energy
              </Button>
              <Button
                variant={filter === "waste" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("waste")}
              >
                Waste
              </Button>
              <Button
                variant={filter === "beginner-friendly" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("beginner-friendly")}
              >
                Beginner
              </Button>
            </div>
          </motion.div>

          <div className="space-y-6">
            {filteredChallenges.length > 0 ? (
              filteredChallenges.map((challenge) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden">
                    <CardHeader className="pb-2 border-b">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle>{challenge.title}</CardTitle>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded ${difficultyColors[challenge.difficulty]}`}>
                              {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                            </span>
                          </div>
                          <CardDescription>{challenge.description}</CardDescription>
                        </div>
                        <div className="text-center bg-primary/10 px-3 py-2 rounded-md">
                          <Trophy className="h-5 w-5 text-primary mx-auto mb-1" />
                          <span className="block text-sm font-semibold">{challenge.points}</span>
                          <span className="block text-xs text-muted-foreground">points</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{challenge.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{challenge.participants.toLocaleString()} participants</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                          <span>{challenge.impact}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {challenge.tags.map(tag => (
                          <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                      </div>

                      {challenge.joined && (
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Your progress</span>
                            <span className="text-sm">{challenge.progress}%</span>
                          </div>
                          <Progress value={challenge.progress} className="h-2" />
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      {!challenge.joined ? (
                        <Button onClick={() => handleJoinChallenge(challenge.id)} className="w-full">
                          Join Challenge
                        </Button>
                      ) : (
                        <div className="flex gap-2 w-full">
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handleUpdateProgress(challenge.id, 10)}
                          >
                            <Clock className="mr-2 h-4 w-4" />
                            Log Progress
                          </Button>
                          
                          <Button 
                            variant="default"
                            className="flex-1"
                            disabled={challenge.progress >= 100}
                            onClick={() => handleUpdateProgress(challenge.id, 100 - challenge.progress)}
                          >
                            <Award className="mr-2 h-4 w-4" />
                            Complete
                          </Button>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center p-12 border border-dashed rounded-lg">
                <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No challenges found</h3>
                <p className="text-muted-foreground mb-4">
                  {filter === "joined" 
                    ? "You haven't joined any challenges yet." 
                    : "No challenges match your current filter."}
                </p>
                <Button onClick={() => setFilter("all")}>
                  View All Challenges
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
