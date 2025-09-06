import { useState, useEffect } from "react";
import { useAuth, type UserType } from "@/contexts/AuthProvider";
import { Link, useLocation } from "react-router-dom";
import User from "./User";
import { 
  Menu, 
  X, 
  LogOut,
  User as UserIcon,
  Sparkles,
} from "lucide-react";

const Header = () => {
  const { user, isAdmin, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const isActivePath = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 backdrop-blur border-b border-slate-200 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Left: Logo */}
          <Link to="/events" className="flex items-center gap-2">
            <img src="/icon.svg" alt="Ticket" className="w-8 h-8" />
            <span className="text-2xl font-bold text-slate-900">
              Event<span className="text-violet-600">X</span>
            </span>
          </Link>

          {/* Center: Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-slate-700 font-medium">
            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  <Link
                    to="/dashboard/insights"
                    className={`hover:text-violet-600 ${
                      isActivePath("/dashboard") ? "text-violet-600 font-semibold underline" : ""
                    }`}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/events"
                      className={`hover:text-violet-600 ${
                        isActivePath("/events") ? "text-violet-600 font-semibold underline" : ""
                      }`}
                    >
                      Events
                    </Link>
                    <Link
                      to="/tickets"
                      className={`hover:text-violet-600 ${
                        isActivePath("/tickets") ? "text-violet-600 font-semibold underline" : ""
                      }`}
                    >
                      My Tickets
                    </Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-violet-600 flex items-center gap-1">
                  <UserIcon className="w-4 h-4" /> Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-violet-600 to-pink-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Get Started
                </Link>
              </>
            )}
          </nav>

          {/* Right: User actions */}
          {isAuthenticated && (
            <div className="hidden lg:flex items-center gap-4">
              <div className="px-4 py-2 bg-slate-100 rounded-xl">
                <User user={user as UserType} />
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}

          {/* Mobile Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-xl bg-white shadow hover:bg-violet-100 transition"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-md border-t">
          <div className="px-6 py-6 space-y-4">
            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  <Link to="/dashboard/insights" onClick={closeMobileMenu} className="block">
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link to="/events" onClick={closeMobileMenu} className="block">Events</Link>
                    <Link to="/tickets" onClick={closeMobileMenu} className="block">My Tickets</Link>
                  </>
                )}
                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="flex items-center gap-2 text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMobileMenu} className="block">
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMobileMenu}
                  className="block bg-violet-600 text-white px-4 py-2 rounded-lg text-center"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
