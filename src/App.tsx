
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Reminders from "./pages/Reminders";
import Challenges from "./pages/Challenges";
import Calculator from "./pages/Calculator";
import Leaderboard from "./pages/Leaderboard";
import Founders from "./pages/Founders";
import Story from "./pages/Story";
import Reviews from "./pages/Reviews";
import FAQ from "./pages/FAQ";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="reminders" element={<Reminders />} />
            <Route path="challenges" element={<Challenges />} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="founders" element={<Founders />} />
            <Route path="story" element={<Story />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
