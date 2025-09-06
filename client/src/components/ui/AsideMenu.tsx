import React, { useState } from "react";
import {
  Calendar,
  LayoutDashboard,
  Settings,
  Ticket,
  Users,
  BarChart3,
  Headphones,
  Bell,
  ChevronDown,
  ChevronRight,
  Megaphone,
  FolderOpen,
  UserCog,
  LogOut,
  Plus,
  Sparkles,
  Menu,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export interface SidebarProps {
  className?: string;
}

export interface NavItem {
  icon: React.ElementType;
  label: string;
  href?: string;
  badge?: string;
  isNew?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

const AsideMenu: React.FC<SidebarProps> = ({ className = "" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeRoute = location.pathname.split("/").pop();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "Main Navigation",
    "Support & Management",
    "Additional Features",
    "Account Management",
  ]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionTitle)
        ? prev.filter((title) => title !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    // ✅ Clear authentication (customize this to your needs)
    localStorage.removeItem("token");
    sessionStorage.clear();

    // ✅ Redirect to login page
    navigate("/login");
  };

  const navSections: NavSection[] = [
    {
      title: "Main Navigation",
      items: [
        { icon: LayoutDashboard, href: "insights", label: "Dashboard" },
        { icon: Calendar, href: "manage-events", label: "Manage Events" },
        {
          icon: Ticket,
          href: "booking-tickets",
          label: "Booking & Tickets",
          badge: "3",
        },
        { icon: Users, href: "attendee-insights", label: "Attendee Insights" },
        {
          icon: BarChart3,
          href: "analytics-reports",
          label: "Analytics & Reports",
          isNew: true,
        },
      ],
    },
    {
      title: "Support & Management",
      items: [
        { icon: Headphones, href: "", label: "Contact Support" },
        { icon: Bell, href: "", label: "Notifications", badge: "2" },
        { icon: Settings, href: "", label: "Settings" },
      ],
    },
    {
      title: "Additional Features",
      items: [
        { icon: Megaphone, href: "", label: "Marketing" },
        {
          icon: FolderOpen,
          href: "event-categories",
          label: "Event Categories",
        },
      ],
    },
    {
      title: "Account Management",
      items: [
        { icon: UserCog, href: "manage-users", label: "Manage Users" },
        { icon: LogOut, label: "Logout" }, // 👈 no href, handled separately
      ],
    },
  ];

  const renderNavItem = (item: NavItem, index: number) => (
    <li key={index} className="relative group">
      {item.label === "Logout" ? (
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-6 py-3 rounded-xl transition-all duration-300 text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-red-700 hover:to-red-600"
          aria-label="Logout"
        >
          <item.icon className="w-6 h-6 text-slate-400 group-hover:text-red-400" />
          {!isCollapsed && (
            <span className="font-semibold text-sm">Logout</span>
          )}
        </button>
      ) : (
        <Link
          to={`${item.href}`}
          className={`${
            activeRoute === item.href
              ? "bg-gradient-to-r from-violet-600 to-purple-700 text-white shadow-lg"
              : "text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-600"
          } w-full flex items-center gap-4 px-6 py-3 rounded-xl transition-all duration-300`}
          aria-label={item.label}
        >
          <div className="relative">
            <item.icon
              className={`w-6 h-6 transition-all duration-300 ${
                activeRoute === item.href
                  ? "text-white"
                  : "text-slate-400 group-hover:text-violet-400"
              }`}
            />
            {item.isNew && (
              <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400" />
            )}
          </div>
          {!isCollapsed && <span className="font-semibold text-sm">{item.label}</span>}
        </Link>
      )}
    </li>
  );

  const renderSection = (section: NavSection, index: number) => {
    const isExpanded = expandedSections.includes(section.title);
    return (
      <div key={index} className="mb-8">
        {!isCollapsed && (
          <button
            onClick={() => toggleSection(section.title)}
            className="w-full flex items-center justify-between px-6 py-3 text-slate-400 hover:text-white transition-all duration-300 group"
            aria-expanded={isExpanded}
            aria-controls={`section-${index}`}
          >
            <span className="text-xs font-bold uppercase tracking-wider group-hover:tracking-widest transition-all duration-300">
              {section.title}
            </span>
            <div
              className={`transform transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>
          </button>
        )}

        {(isExpanded || isCollapsed) && (
          <nav
            id={`section-${index}`}
            className="mt-2"
            aria-label={section.title}
          >
            <ul className="space-y-2">
              {section.items.map((item, itemIndex) =>
                renderNavItem(item, itemIndex)
              )}
            </ul>
          </nav>
        )}
      </div>
    );
  };

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-80"
      } min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col border-r border-slate-700 shadow-2xl transition-all duration-300 ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <header className="p-6 border-b border-slate-700 bg-gradient-to-r from-slate-800 to-slate-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg">
              <img
                src="/icon.svg"
                alt="Ticket"
                className="w-6 h-6 text-white"
              />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-3xl font-bold">
                  <span className="text-black">Event</span>
                  <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                    X
                  </span>
                </h1>
              </div>
            )}
          </div>

          <button
            onClick={toggleSidebar}
            className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 transition-all duration-300 hover:shadow-lg"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5 text-slate-300" />
          </button>
        </div>

        {!isCollapsed && (
          <Link
            to={"add"}
            className="w-full flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 rounded-2xl transition-all duration-300 group shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-700 via-pink-600 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div className="text-left flex-1">
              <span className="block text-sm font-bold text-white group-hover:text-violet-100 transition-colors">
                Create Quick Event
              </span>
              <span className="block text-xs text-violet-200 group-hover:text-violet-100 transition-colors">
                Start organizing now
              </span>
            </div>
          </Link>
        )}
      </header>

      <div className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">
        {navSections.map((section, index) => renderSection(section, index))}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e293b;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #7c3aed, #9333ea);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #8b5cf6, #a855f7);
        }
      `}</style>
    </aside>
  );
};

export default AsideMenu;
