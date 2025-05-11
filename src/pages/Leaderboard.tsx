
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Award,
  Trophy,
  Medal,
  Star,
  Filter,
  ArrowUpDown,
  Search,
  Leaf
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import ImageWithFallback from "@/components/ImageWithFallback";

// Custom icon components
const Droplets = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
    <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
  </svg>
);

const Lightbulb = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="9" y1="18" x2="15" y2="18" />
    <line x1="10" y1="22" x2="14" y2="22" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8A6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
  </svg>
);

const Trash = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

const Users = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

interface User {
  id: string;
  name: string;
  avatar: string;
  points: number;
  badges: string[];
  challengesCompleted: number;
  rank: number;
  joinDate: string;
}

const users: User[] = [
  {
    id: "user1",
    name: "Emma Thompson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    points: 2450,
    badges: ["Water Saver", "Energy Master", "Zero Waste"],
    challengesCompleted: 12,
    rank: 1,
    joinDate: "2023-05-15"
  },
  {
    id: "user2",
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    points: 2120,
    badges: ["Water Saver", "Plastic Fighter"],
    challengesCompleted: 9,
    rank: 2,
    joinDate: "2023-06-20"
  },
  {
    id: "user3",
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    points: 1980,
    badges: ["Energy Master", "Community Leader"],
    challengesCompleted: 8,
    rank: 3,
    joinDate: "2023-04-10"
  },
  {
    id: "user4",
    name: "David Rodriguez",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    points: 1780,
    badges: ["Water Saver", "Energy Master"],
    challengesCompleted: 7,
    rank: 4,
    joinDate: "2023-07-05"
  },
  {
    id: "user5",
    name: "Jennifer Lee",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    points: 1650,
    badges: ["Zero Waste", "Community Leader"],
    challengesCompleted: 6,
    rank: 5,
    joinDate: "2023-08-15"
  },
  {
    id: "user6",
    name: "Robert Kim",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    points: 1520,
    badges: ["Plastic Fighter"],
    challengesCompleted: 5,
    rank: 6,
    joinDate: "2023-09-01"
  },
  {
    id: "user7",
    name: "Lisa Wilson",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    points: 1380,
    badges: ["Water Saver"],
    challengesCompleted: 4,
    rank: 7,
    joinDate: "2023-08-20"
  }
];

const badges = [
  { name: "Water Saver", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200", icon: <Droplets className="h-3 w-3 mr-1" /> },
  { name: "Energy Master", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200", icon: <Lightbulb className="h-3 w-3 mr-1" /> },
  { name: "Zero Waste", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200", icon: <Leaf className="h-3 w-3 mr-1" /> },
  { name: "Plastic Fighter", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200", icon: <Trash className="h-3 w-3 mr-1" /> },
  { name: "Community Leader", color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200", icon: <Users className="h-3 w-3 mr-1" /> },
];

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<User[]>(users);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBadge, setFilterBadge] = useState<string | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    
    if (e.target.value === "") {
      setLeaderboardData(users);
    } else {
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setLeaderboardData(filtered);
    }
  };

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    
    const sorted = [...leaderboardData].sort((a, b) => {
      return newOrder === "asc" 
        ? a.points - b.points 
        : b.points - a.points;
    });
    
    setLeaderboardData(sorted);
  };

  const handleFilterBadge = (badge: string | null) => {
    setFilterBadge(badge);
    
    if (badge === null) {
      setLeaderboardData(users);
    } else {
      const filtered = users.filter(user => 
        user.badges.includes(badge)
      );
      setLeaderboardData(filtered);
    }
  };

  const getBadgeStyle = (badgeName: string) => {
    const badge = badges.find(b => b.name === badgeName);
    return badge ? badge.color : "";
  };

  const getBadgeIcon = (badgeName: string) => {
    const badge = badges.find(b => b.name === badgeName);
    return badge ? badge.icon : null;
  };

  const rankStyles = (rank: number) => {
    switch(rank) {
      case 1:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200";
      case 2:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      case 3:
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const rankIcon = (rank: number) => {
    switch(rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Award className="h-5 w-5 text-gray-500" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-500" />;
      default:
        return <Star className="h-5 w-5 text-muted-foreground" />;
    }
  };

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
              <span className="green-gradient-text">Gamified Leaderboard</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See how your sustainability efforts stack up against others and get motivated to climb the ranks.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          >
            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/50 mb-2">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                </div>
                <CardTitle className="text-base">1st Place</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-yellow-200 dark:border-yellow-800">
                      <ImageWithFallback 
                        src={users[0]?.avatar} 
                        alt={users[0]?.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mt-3">{users[0]?.name}</h3>
                  <p className="font-bold text-2xl text-yellow-500 mt-1">
                    {users[0]?.points.toLocaleString()} pts
                  </p>
                  <div className="flex flex-wrap justify-center gap-1 mt-2">
                    {users[0]?.badges.slice(0, 2).map((badge) => (
                      <div 
                        key={badge} 
                        className={`text-xs px-2 py-0.5 rounded-full flex items-center ${getBadgeStyle(badge)}`}
                      >
                        {getBadgeIcon(badge)}
                        {badge}
                      </div>
                    ))}
                    {users[0]?.badges.length > 2 && (
                      <div className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                        +{users[0]?.badges.length - 2}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 mb-2">
                  <Award className="h-6 w-6 text-gray-500" />
                </div>
                <CardTitle className="text-base">2nd Place</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700">
                      <ImageWithFallback 
                        src={users[1]?.avatar} 
                        alt={users[1]?.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mt-3">{users[1]?.name}</h3>
                  <p className="font-bold text-xl text-gray-500 mt-1">
                    {users[1]?.points.toLocaleString()} pts
                  </p>
                  <div className="flex flex-wrap justify-center gap-1 mt-2">
                    {users[1]?.badges.slice(0, 2).map((badge) => (
                      <div 
                        key={badge} 
                        className={`text-xs px-2 py-0.5 rounded-full flex items-center ${getBadgeStyle(badge)}`}
                      >
                        {getBadgeIcon(badge)}
                        {badge}
                      </div>
                    ))}
                    {users[1]?.badges.length > 2 && (
                      <div className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                        +{users[1]?.badges.length - 2}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader className="pb-2">
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50 mb-2">
                  <Medal className="h-6 w-6 text-amber-500" />
                </div>
                <CardTitle className="text-base">3rd Place</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-amber-200 dark:border-amber-800">
                      <ImageWithFallback 
                        src={users[2]?.avatar} 
                        alt={users[2]?.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mt-3">{users[2]?.name}</h3>
                  <p className="font-bold text-xl text-amber-500 mt-1">
                    {users[2]?.points.toLocaleString()} pts
                  </p>
                  <div className="flex flex-wrap justify-center gap-1 mt-2">
                    {users[2]?.badges.slice(0, 2).map((badge) => (
                      <div 
                        key={badge} 
                        className={`text-xs px-2 py-0.5 rounded-full flex items-center ${getBadgeStyle(badge)}`}
                      >
                        {getBadgeIcon(badge)}
                        {badge}
                      </div>
                    ))}
                    {users[2]?.badges.length > 2 && (
                      <div className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                        +{users[2]?.badges.length - 2}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle>Sustainability Heroes</CardTitle>
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Select value={filterBadge || ""} onValueChange={(value) => handleFilterBadge(value || null)}>
                        <SelectTrigger className="w-full md:w-40">
                          <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            <span>Filter</span>
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Badges</SelectItem>
                          {badges.map((badge) => (
                            <SelectItem key={badge.name} value={badge.name}>
                              <div className="flex items-center">
                                {badge.icon}
                                {badge.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={handleSort}
                      >
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboardData.length > 0 ? (
                    leaderboardData.map((user) => (
                      <div 
                        key={user.id}
                        className="flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-green-900/10 shadow-sm"
                      >
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${rankStyles(user.rank)}`}>
                          {user.rank <= 3 ? rankIcon(user.rank) : user.rank}
                        </div>
                        
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <ImageWithFallback 
                            src={user.avatar} 
                            alt={user.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div>
                              <h3 className="font-semibold">{user.name}</h3>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {user.badges.map((badge) => (
                                  <div 
                                    key={badge} 
                                    className={`text-xs px-2 py-0.5 rounded-full flex items-center ${getBadgeStyle(badge)}`}
                                  >
                                    {getBadgeIcon(badge)}
                                    {badge}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">{user.points.toLocaleString()} points</div>
                              <div className="text-xs text-muted-foreground">{user.challengesCompleted} challenges completed</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Trophy className="h-12 w-12 mx-auto mb-2 text-muted-foreground/50" />
                      <p>No users match your search criteria</p>
                      <Button 
                        variant="link" 
                        onClick={() => {
                          setSearchTerm("");
                          setFilterBadge(null);
                          setLeaderboardData(users);
                        }}
                      >
                        Reset filters
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <p className="text-sm text-muted-foreground">
                  Showing {leaderboardData.length} of {users.length} users
                </p>
                <Button variant="outline" size="sm">
                  View All Rankings
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
