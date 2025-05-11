
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import {
  Star,
  ThumbsUp,
  MessageSquare,
  Filter,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
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

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  likes: number;
  comments: number;
  liked: boolean;
  tags: string[];
}

const reviews: Review[] = [
  {
    id: "review1",
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    rating: 5,
    date: "2024-04-15",
    content: "GreenRoutine has completely transformed how I approach sustainability. The reminders are so helpful! I've managed to reduce my water usage by 30% and my energy bills are noticeably lower. The challenges keep me motivated to try new eco-friendly practices.",
    likes: 24,
    comments: 3,
    liked: false,
    tags: ["Water Saver", "Energy Tips"]
  },
  {
    id: "review2",
    name: "David Chen",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    rating: 5,
    date: "2024-04-02",
    content: "I'm now saving over 1000 liters of water per month thanks to GreenRoutine's suggestions and habit tracking. The app makes sustainability feel achievable and not overwhelming. I love how I can see the direct impact of my habits on the environment and my wallet.",
    likes: 18,
    comments: 2,
    liked: false,
    tags: ["Water Saver", "Money Saving"]
  },
  {
    id: "review3",
    name: "Emily Patel",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    rating: 4,
    date: "2024-03-24",
    content: "The eco-challenges are fun and motivating. I never realized how easy it could be to live more sustainably. The leaderboard adds a competitive element that keeps me coming back. I'd love to see more community features in the future!",
    likes: 15,
    comments: 1,
    liked: false,
    tags: ["Challenges", "Community"]
  },
  {
    id: "review4",
    name: "Michael Rodriguez",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    rating: 5,
    date: "2024-03-18",
    content: "As a parent, I've been using GreenRoutine to teach my kids about environmental responsibility. The gamification aspects make it fun for them, and they're proud of the badges they earn. It's become a family activity to complete challenges together.",
    likes: 32,
    comments: 5,
    liked: false,
    tags: ["Family Friendly", "Education"]
  },
  {
    id: "review5",
    name: "Jennifer Lee",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    rating: 4,
    date: "2024-03-10",
    content: "The CO₂ calculator has been eye-opening. I had no idea how much impact small changes could have. Being able to visualize my savings in terms of trees planted or water conserved makes abstract concepts much more tangible. Great motivation!",
    likes: 21,
    comments: 2,
    liked: false,
    tags: ["CO2 Calculator", "Visualization"]
  },
  {
    id: "review6",
    name: "Robert Kim",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    rating: 5,
    date: "2024-02-28",
    content: "I've tried several sustainability apps, but GreenRoutine stands out because it's so personalized. The reminders sync perfectly with my daily routine, which means I'm much more likely to follow through. The UI is clean and intuitive too.",
    likes: 17,
    comments: 0,
    liked: false,
    tags: ["User Experience", "Personalization"]
  }
];

const allTags = [...new Set(reviews.flatMap(review => review.tags))];

const Reviews = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>(reviews);
  const [filterRating, setFilterRating] = useState<string>("all");
  const [filterTag, setFilterTag] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    content: ""
  });
  const { toast } = useToast();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    applyFilters(e.target.value, filterRating, filterTag);
  };

  const handleFilterRating = (value: string) => {
    setFilterRating(value);
    applyFilters(searchTerm, value, filterTag);
  };

  const handleFilterTag = (value: string) => {
    setFilterTag(value);
    applyFilters(searchTerm, filterRating, value);
  };

  const applyFilters = (search: string, rating: string, tag: string) => {
    let filtered = [...reviews];
    
    // Apply search filter
    if (search) {
      filtered = filtered.filter(review => 
        review.content.toLowerCase().includes(search.toLowerCase()) || 
        review.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Apply rating filter
    if (rating !== "all") {
      const ratingValue = parseInt(rating);
      filtered = filtered.filter(review => review.rating === ratingValue);
    }
    
    // Apply tag filter
    if (tag !== "all") {
      filtered = filtered.filter(review => review.tags.includes(tag));
    }
    
    setReviewsList(filtered);
  };

  const handleLike = (id: string) => {
    setReviewsList(
      reviewsList.map(review =>
        review.id === id
          ? { 
              ...review, 
              liked: !review.liked, 
              likes: review.liked ? review.likes - 1 : review.likes + 1 
            }
          : review
      )
    );
  };

  const handleSubmitReview = () => {
    if (newReview.name.trim() === "" || newReview.content.trim() === "") {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Review Submitted",
      description: "Thank you for sharing your experience with GreenRoutine!",
    });
    
    setNewReview({
      name: "",
      rating: 5,
      content: ""
    });
  };

  const getFormattedDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
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
              <span className="green-gradient-text">User Reviews</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See what our community has to say about their experience with GreenRoutine.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Filter Reviews</CardTitle>
                <CardDescription>
                  Find specific reviews or browse by rating and topic.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="relative">
                      <Input
                        placeholder="Search reviews..."
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Select value={filterRating} onValueChange={handleFilterRating}>
                      <SelectTrigger>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4" />
                          <SelectValue placeholder="Filter by rating" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Ratings</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                        <SelectItem value="4">4 Stars</SelectItem>
                        <SelectItem value="3">3 Stars</SelectItem>
                        <SelectItem value="2">2 Stars</SelectItem>
                        <SelectItem value="1">1 Star</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Select value={filterTag} onValueChange={handleFilterTag}>
                      <SelectTrigger>
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          <SelectValue placeholder="Filter by topic" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Topics</SelectItem>
                        {allTags.map(tag => (
                          <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="space-y-6 mb-12">
            {reviewsList.length > 0 ? (
              reviewsList.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img 
                              src={review.avatar} 
                              alt={review.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{review.name}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {getFormattedDate(review.date)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mt-2 mb-4">{review.content}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {review.tags.map(tag => (
                          <div 
                            key={tag} 
                            className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full"
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleLike(review.id)}
                          className={`flex items-center gap-2 ${review.liked ? 'text-primary' : ''}`}
                        >
                          <ThumbsUp className="h-4 w-4" fill={review.liked ? "currentColor" : "none"} />
                          <span>{review.likes}</span>
                        </Button>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MessageSquare className="h-4 w-4" />
                          <span>{review.comments}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center p-12 border border-dashed rounded-lg">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No reviews found</h3>
                <p className="text-muted-foreground mb-4">
                  No reviews match your current search or filters.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setFilterRating("all");
                    setFilterTag("all");
                    setReviewsList(reviews);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Share Your Experience</CardTitle>
                <CardDescription>
                  Let us know how GreenRoutine has helped you on your sustainability journey.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium mb-1 block">
                      Name
                    </label>
                    <Input 
                      id="name" 
                      placeholder="Your name"
                      value={newReview.name}
                      onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Rating
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setNewReview({...newReview, rating: value})}
                          className="focus:outline-none"
                        >
                          <Star 
                            className={`h-6 w-6 ${value <= newReview.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="review" className="text-sm font-medium mb-1 block">
                      Your Review
                    </label>
                    <Textarea 
                      id="review" 
                      placeholder="Share your experience with GreenRoutine..."
                      rows={4}
                      value={newReview.content}
                      onChange={(e) => setNewReview({...newReview, content: e.target.value})}
                    />
                  </div>
                  
                  <Button onClick={handleSubmitReview} className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
