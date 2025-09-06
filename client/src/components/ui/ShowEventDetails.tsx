import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  TrendingUp,
  Ticket,
  User,
  Tag,
  ArrowLeft,
  Eye,
  EyeOff,
  Clock,
  Building,
  Star,
  ExternalLink,
  ChevronRight,
  Activity,
  Zap,
  Globe,
} from "lucide-react";
import type { EventType } from "@/lib/types";
import { useNavigate } from "react-router-dom";

const ShowEventDetails = ({
  event,
  isOpen,
  setOpen,
}: {
  event: EventType;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [showSeatsMap, setShowSeatsMap] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return {
          color: "from-emerald-500 to-green-600",
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          icon: "🟢",
        };
      case "upcoming":
        return {
          color: "from-amber-500 to-orange-600",
          bg: "bg-amber-50",
          text: "text-amber-700",
          icon: "🟡",
        };
      case "canceled":
        return {
          color: "from-red-500 to-rose-600",
          bg: "bg-red-50",
          text: "text-red-700",
          icon: "🔴",
        };
      case "closed":
        return {
          color: "from-slate-500 to-gray-600",
          bg: "bg-slate-50",
          text: "text-slate-700",
          icon: "⚫",
        };
      default:
        return {
          color: "from-gray-500 to-slate-600",
          bg: "bg-gray-50",
          text: "text-gray-700",
          icon: "⚪",
        };
    }
  };

  const getPopularityConfig = (popularity: string) => {
    if (popularity.toLowerCase().includes("high")) {
      return {
        color: "from-red-500 to-pink-600",
        bg: "bg-red-50",
        text: "text-red-700",
        icon: "🔥",
      };
    } else if (popularity.toLowerCase().includes("medium")) {
      return {
        color: "from-orange-500 to-amber-600",
        bg: "bg-orange-50",
        text: "text-orange-700",
        icon: "⭐",
      };
    } else {
      return {
        color: "from-blue-500 to-indigo-600",
        bg: "bg-blue-50",
        text: "text-blue-700",
        icon: "💫",
      };
    }
  };

  const occupancyRate = (
    ((event.seatsAmount - event.availableSeats) / event.seatsAmount) *
    100
  ).toFixed(1);

  const isBookingAvailable =
    event.status === "active" || event.status === "upcoming";
  const statusConfig = getStatusConfig(event.status);
  const popularityConfig = getPopularityConfig(event.popularity);

  const tabs = [
    { id: "overview", label: "Overview", icon: Building },
    { id: "seating", label: "Seating", icon: Users },
    { id: "details", label: "Details", icon: Tag },
    { id: "analytics", label: "Analytics", icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Floating Navigation */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-5 py-2 bg-purple-700 text-white hover:bg-purple-800 rounded-full shadow-lg border-2 border-purple-400 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back</span>
        </button>
      </div>

      {/* Hero Section with Parallax */}
      <div
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-6">
          <div className="mb-8 flex justify-center">
            <div className="text-8xl md:text-9xl lg:text-[12rem] animate-bounce-slow filter drop-shadow-2xl">
              {event.emoji}
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent leading-tight">
            {event.name}
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            {event.description}
          </p>

          {/* Status and Stats Row */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
            <div
              className={`px-6 py-3 rounded-full bg-gradient-to-r ${statusConfig.color} text-white font-semibold text-lg shadow-xl`}
            >
              <span className="mr-2">{statusConfig.icon}</span>
              {event.status.toUpperCase()}
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">
                {formatDate(event.datetime.toString())}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">{event.venue?.name}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {isBookingAvailable ? (
              <Button
                onClick={() => setOpen(!isOpen)}
                className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
              >
                <Ticket className="w-5 h-5 mr-2" />
                {isOpen ? "Cancel Booking" : "Book Tickets Now"}
              </Button>
            ) : (
              <Button
                disabled
                className="px-8 py-4 text-lg font-semibold bg-gray-600 text-gray-300 rounded-full cursor-not-allowed"
              >
                Booking Unavailable
              </Button>
            )}

            <Button
              variant="outline"
              className="px-8 py-4 text-lg font-semibold bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 rounded-full transition-all duration-300"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              View Venue
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-6 h-6 text-white rotate-90" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative bg-white">
        {/* Tab Navigation */}
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex space-x-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="hidden md:flex items-center gap-4 text-sm text-gray-500">
                <span>
                  Last updated:{" "}
                  {formatDate(new Date(event.updatedAt).toLocaleDateString())}
                </span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-12">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-indigo-100 border-0">
                  <CardContent className="p-8 text-center">
                    <div className="mb-4 mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {event.seatsAmount.toLocaleString()}
                    </div>
                    <div className="text-gray-600 font-medium">
                      Total Capacity
                    </div>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-emerald-50 to-green-100 border-0">
                  <CardContent className="p-8 text-center">
                    <div className="mb-4 mx-auto w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Ticket className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {event.availableSeats.toLocaleString()}
                    </div>
                    <div className="text-gray-600 font-medium">Available</div>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-purple-50 to-violet-100 border-0">
                  <CardContent className="p-8 text-center">
                    <div className="mb-4 mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {occupancyRate}%
                    </div>
                    <div className="text-gray-600 font-medium">Sold Out</div>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-amber-50 to-orange-100 border-0">
                  <CardContent className="p-8 text-center">
                    <div className="mb-4 mx-auto w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <DollarSign className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {formatCurrency(event.revenue)}
                    </div>
                    <div className="text-gray-600 font-medium">Revenue</div>
                  </CardContent>
                </Card>
              </div>

              {/* Event Information Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      Event Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                        <div className="p-3 bg-blue-500 rounded-lg">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-lg">
                            {event.organizer}
                          </p>
                          <p className="text-gray-600">Event Organizer</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl">
                        <div className="p-3 bg-orange-500 rounded-lg">
                          <Tag className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-lg">
                            {event.category}
                          </p>
                          <p className="text-gray-600">Category</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                        <div className="p-3 bg-green-500 rounded-lg">
                          <Clock className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-lg">
                            {formatTime(event.datetime.toString())}
                          </p>
                          <p className="text-gray-600">Event Time</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div
                      className={`p-6 bg-gradient-to-r ${popularityConfig.color} rounded-xl text-white`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-white/90 font-medium">
                          Popularity Score
                        </span>
                        <span className="text-2xl">
                          {popularityConfig.icon}
                        </span>
                      </div>
                      <div className="text-2xl font-bold mb-2">
                        {event.popularity}
                      </div>
                      <div className="text-white/80 text-sm">
                        Based on engagement and sales
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-slate-100 to-gray-200 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-700 font-medium">
                          Event ID
                        </span>
                        <Globe className="w-5 h-5 text-gray-600" />
                      </div>
                      <code className="bg-white px-3 py-2 rounded-lg text-sm font-mono text-gray-800 block">
                        {event._id}
                      </code>
                      <div className="text-gray-600 text-sm mt-2">
                        Unique identifier
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Seating Tab */}
          {activeTab === "seating" && (
            <div className="space-y-8">
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50">
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      Interactive Seating Map
                    </CardTitle>
                    <Button
                      onClick={() => setShowSeatsMap(!showSeatsMap)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-6 py-3"
                    >
                      {showSeatsMap ? (
                        <EyeOff className="w-4 h-4 mr-2" />
                      ) : (
                        <Eye className="w-4 h-4 mr-2" />
                      )}
                      {showSeatsMap ? "Hide Map" : "Show Map"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {showSeatsMap && (
                    <div className="mb-8">
                      <div className="bg-gradient-to-br from-gray-900 to-slate-800 p-8 rounded-2xl">
                        <div className="text-center mb-6">
                          <div className="inline-block bg-gradient-to-r from-amber-400 to-orange-500 text-black px-6 py-2 rounded-full font-semibold mb-4">
                            🎭 STAGE
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <div className="space-y-3">
                            {event.seatsMap.map((row, rowIndex) => (
                              <div
                                key={rowIndex}
                                className="flex gap-2 justify-center"
                              >
                                {row.map((seat, seatIndex) => (
                                  <div
                                    key={`${rowIndex}-${seatIndex}`}
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 cursor-pointer transform hover:scale-110 ${
                                      seat === 1
                                        ? "bg-gradient-to-br from-emerald-400 to-green-500 text-white shadow-lg hover:shadow-emerald-500/50"
                                        : "bg-gradient-to-br from-red-400 to-rose-500 text-white shadow-lg"
                                    }`}
                                  >
                                    {seat === 1 ? "✓" : "✗"}
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-center gap-8 mt-8 text-white">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg"></div>
                            <span className="font-medium">Available Seats</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-gradient-to-br from-red-400 to-rose-500 rounded-lg"></div>
                            <span className="font-medium">Occupied Seats</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Seating Statistics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      {
                        label: "Total Seats",
                        value: event.seatsAmount,
                        color: "from-blue-500 to-indigo-600",
                        icon: Users,
                      },
                      {
                        label: "Sold",
                        value: event.seatsAmount - event.availableSeats,
                        color: "from-red-500 to-rose-600",
                        icon: Ticket,
                      },
                      {
                        label: "Available",
                        value: event.availableSeats,
                        color: "from-green-500 to-emerald-600",
                        icon: Star,
                      },
                      {
                        label: "Occupancy",
                        value: `${occupancyRate}%`,
                        color: "from-purple-500 to-violet-600",
                        icon: Activity,
                      },
                    ].map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <Card
                          key={index}
                          className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                        >
                          <CardContent className="p-6 text-center">
                            <div
                              className={`mb-4 mx-auto w-14 h-14 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                            >
                              <Icon className="w-7 h-7 text-white" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900 mb-2">
                              {typeof stat.value === "number"
                                ? stat.value.toLocaleString()
                                : stat.value}
                            </div>
                            <div className="text-gray-600 font-medium">
                              {stat.label}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Details Tab */}
          {activeTab === "details" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Ticket Information */}
                <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-purple-50">
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                        <Ticket className="w-6 h-6 text-white" />
                      </div>
                      Ticket Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-xl text-gray-900">
                            {event.ticketTypes.name}
                          </h3>
                          <p className="text-gray-600">Premium Experience</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {formatCurrency(event.ticketTypes.price)}
                          </div>
                          <div className="text-sm text-gray-600">
                            per ticket
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="text-center p-4 bg-white rounded-xl">
                          <div className="text-2xl font-bold text-purple-600">
                            {event.ticketTypes.available}
                          </div>
                          <div className="text-sm text-gray-600">Available</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-xl">
                          <div className="text-2xl font-bold text-green-600">
                            {formatCurrency(event.revenue)}
                          </div>
                          <div className="text-sm text-gray-600">
                            Total Revenue
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tags and Categories */}
                <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-orange-50">
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl">
                        <Tag className="w-6 h-6 text-white" />
                      </div>
                      Tags & Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Event Tags
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {event.tags.map((tag, index) => (
                            <span
                              key={tag}
                              className={`px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${
                                index % 4 === 0
                                  ? "from-blue-500 to-indigo-600"
                                  : index % 4 === 1
                                  ? "from-purple-500 to-pink-600"
                                  : index % 4 === 2
                                  ? "from-green-500 to-emerald-600"
                                  : "from-orange-500 to-amber-600"
                              } text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div className="p-4 bg-gradient-to-r from-gray-50 to-slate-100 rounded-xl">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-700">
                            Primary Category
                          </span>
                          <Badge className="bg-gradient-to-r from-slate-600 to-gray-700 text-white px-4 py-1">
                            {event.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3">
                      <Activity className="w-5 h-5 text-blue-600" />
                      Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-l-4 border-green-500">
                      <div className="font-semibold text-green-800 mb-1">
                        Created
                      </div>
                      <div className="text-sm text-green-700">
                        {formatDate(
                          new Date(event.createdAt).toLocaleDateString()
                        )}
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-500">
                      <div className="font-semibold text-blue-800 mb-1">
                        Last Updated
                      </div>
                      <div className="text-sm text-blue-700">
                        {formatDate(
                          new Date(event.updatedAt).toLocaleDateString()
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-purple-50">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        {occupancyRate}%
                      </div>
                      <div className="text-gray-600">Seat Utilization</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-600 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${occupancyRate}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-green-50">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      Revenue
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {formatCurrency(event.revenue)}
                      </div>
                      <div className="text-gray-600">Total Generated</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600">
                        Avg. per ticket
                      </div>
                      <div className="font-semibold text-green-700">
                        {formatCurrency(
                          event.revenue /
                            (event.seatsAmount - event.availableSeats || 1)
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>

        {/* Floating Action Button */}
        {isBookingAvailable && (
          <div className="fixed bottom-8 right-8 z-50">
            <Button
              onClick={() => setOpen(!isOpen)}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl hover:shadow-purple-500/25 transform hover:scale-110 transition-all duration-300"
            >
              <Ticket className="w-6 h-6" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowEventDetails;
