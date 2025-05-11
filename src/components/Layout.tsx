
import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Leaf, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Reminders", path: "/reminders" },
    { name: "Challenges", path: "/challenges" },
    { name: "Calculator", path: "/calculator" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Story", path: "/story" },
    { name: "Reviews", path: "/reviews" },
    { name: "Founders", path: "/founders" },
    { name: "FAQ", path: "/faq" },
  ];

  const handleLogin = () => {
    toast({
      title: "Coming soon!",
      description: "Login functionality will be available soon.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-green-900/80 backdrop-blur shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link
              to="/"
              className="flex items-center gap-2 text-primary font-bold text-xl"
            >
              <Leaf className="h-6 w-6" />
              <span className="green-gradient-text">GreenRoutine</span>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "text-primary bg-primary/10"
                      : "text-foreground/80 hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                onClick={handleLogin}
                variant="default"
                className="ml-4"
                size="sm"
              >
                Login
              </Button>
            </nav>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t">
            <div className="container mx-auto px-4 pt-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/80 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                onClick={handleLogin}
                variant="default"
                className="w-full mt-4"
              >
                Login
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-green-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
                <Leaf className="h-6 w-6" />
                <span>GreenRoutine</span>
              </div>
              <p className="text-green-100">
                Making sustainability a daily routine, one green habit at a time.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.slice(0, 6).map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-green-100 hover:text-white hover:underline transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <p className="text-green-100 mb-4">
                Join our community to make a greener tomorrow.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-green-200">
                  Twitter
                </a>
                <a href="#" className="text-white hover:text-green-200">
                  Instagram
                </a>
                <a href="#" className="text-white hover:text-green-200">
                  Facebook
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-200">
            <p>&copy; {new Date().getFullYear()} GreenRoutine. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
