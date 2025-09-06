import React, { useState, useMemo } from "react";
import {
  Search,
  Calendar,
  Plus,
  BarChart3,
  Grid,
  List,
  MapPin,
  Clock,
  Users,
  TrendingUp,
  Star,
  Eye,
} from "lucide-react";
import EventCard from "../ui/EventCard";
import { useEvents } from "@/contexts/EventsProvider";
import type { EventType } from "@/lib/types";
import { Link } from "react-router-dom";

const ManageEvents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const { events } = useEvents();

 
  const filteredEvents = useMemo(() => {
    let filtered = events.filter((event: EventType) => 
      event.status === "upcoming" && 
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory !== "all") {
      filtered = filtered.filter(event => 
        event.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(a.datetime).getTime() - new Date(b.datetime).getTime();
        case "name":
          return a.name.localeCompare(b.name);
        case "popularity":
          return b.availableSeats - a.availableSeats;
        default:
          return 0;
      }
    });

    return filtered;
  }, [events, searchTerm, sortBy, selectedCategory]);


  const categories = useMemo(() => {
    const cats = Array.from(new Set(events.map(event => event.category)));
    return ["all", ...cats];
  }, [events]);


  const stats = useMemo(() => {
    const upcoming = events.filter(e => e.status === "upcoming");
    const totalRevenue = upcoming.reduce((sum, event) => sum + (event.revenue || 0), 0);
    const totalSeats = upcoming.reduce((sum, event) => sum + event.seatsAmount, 0);
    const averagePrice = upcoming.length > 0 ? 
      upcoming.reduce((sum, event) => {
        // Get the first ticket type price, or 0 if none exist
        const ticketTypeKeys = event.ticketTypes ? Object.keys(event.ticketTypes) : [];
        const firstTicketTypeKey = ticketTypeKeys[0];
        const price = firstTicketTypeKey ? event.ticketTypes?.price || 0 : 0;
        return sum + price;
      }, 0) / upcoming.length : 0;

    return {
      totalEvents: upcoming.length,
      totalRevenue,
      totalSeats,
      averagePrice: Math.round(averagePrice)
    };
  }, [events]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50">
     
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
      </div>

      <div className="relative p-6 max-w-7xl mx-auto space-y-8">

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-700 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Event Dashboard
          </h1>
          <p className="text-violet-600 text-lg font-medium mb-8">
            Manage and track your upcoming events with powerful insights
          </p>


          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl shadow-slate-900/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-violet-600 font-semibold text-sm">TOTAL EVENTS</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-violet-700 to-purple-700 bg-clip-text text-transparent">
                    {stats.totalEvents}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl shadow-slate-900/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-600 font-semibold text-sm">REVENUE</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-pink-700 to-orange-700 bg-clip-text text-transparent">
                    {stats.totalRevenue.toLocaleString()} EGP
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl shadow-slate-900/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 font-semibold text-sm">TOTAL SEATS</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-orange-700 to-violet-700 bg-clip-text text-transparent">
                    {stats.totalSeats.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-orange-500 to-violet-500 rounded-2xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl shadow-slate-900/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-violet-600 font-semibold text-sm">AVG PRICE</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-violet-700 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                    {stats.averagePrice} EGP
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-violet-500 via-pink-500 to-orange-500 rounded-2xl">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl shadow-slate-900/10">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
  
            <div className="flex flex-wrap gap-4">
              <Link
                to="/dashboard/add"
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 hover:from-violet-700 hover:to-orange-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                Create New Event
              </Link>
              
              <Link
                to="/dashboard/insights"
                className="flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-md border border-white/30 text-violet-700 font-bold rounded-2xl hover:bg-white/80 transition-all duration-300"
              >
                <BarChart3 className="w-5 h-5" />
                View Insights
              </Link>
            </div>

       
            <div className="flex flex-wrap gap-4 items-center">
 
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:border-transparent w-64 font-medium"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl focus:ring-2 focus:ring-violet-500 font-medium text-violet-700"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>

  
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl focus:ring-2 focus:ring-violet-500 font-medium text-violet-700"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="popularity">Sort by Popularity</option>
              </select>


              <div className="flex bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-xl transition-all duration-200 ${
                    viewMode === "grid" 
                      ? "bg-violet-500 text-white shadow-md" 
                      : "text-violet-600 hover:bg-white/50"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-xl transition-all duration-200 ${
                    viewMode === "list" 
                      ? "bg-violet-500 text-white shadow-md" 
                      : "text-violet-600 hover:bg-white/50"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-xl shadow-slate-900/10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-700 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Upcoming Events ({filteredEvents.length})
            </h2>
          </div>

          {filteredEvents.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <div key={event._id} className="transform hover:scale-105 transition-all duration-300">
                    <EventCard event={event} isAdmin={true} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <div key={event._id} className="bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{event.emoji}</div>
                        <div>
                          <h3 className="text-xl font-bold text-violet-700">{event.name}</h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-violet-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.venue.name}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {new Date(event.datetime).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {event.availableSeats} seats
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-4 py-2 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 rounded-xl font-semibold">
                          {event.ticketTypes.price} EGP
                        </span>
                        <button className="p-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-300">
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎭</div>
              <h3 className="text-xl font-bold text-violet-700 mb-2">
                {searchTerm ? `No events found for "${searchTerm}"` : "No upcoming events"}
              </h3>
              <p className="text-violet-600 mb-6">
                {searchTerm 
                  ? "Try adjusting your search terms or filters" 
                  : "Create your first event to get started"
                }
              </p>
              {searchTerm ? (
                <button
                  onClick={() => setSearchTerm("")}
                  className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-lg transition-all duration-300"
                >
                  Clear Search
                </button>
              ) : (
                <Link
                  to="/dashboard/add"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-lg transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Event
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageEvents;
