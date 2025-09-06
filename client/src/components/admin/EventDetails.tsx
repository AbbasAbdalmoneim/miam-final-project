import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Edit3,
  BarChart3,
  ArrowLeft,
  Ticket,
  ShoppingCart,
  UserCheck,
  Star,
  TrendingUp,
  Share2,
  Download,
  Heart,
  ExternalLink,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEvents } from "@/contexts/EventsProvider";
import type { EventType } from "@/lib/types";
import QRCode from "react-qr-code";
import SeatsDemo from "../ui/Seats";

const DOMAIN_URL = import.meta.env.VITE_DOMAIN_URL as string;

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEventById } = useEvents();
  const [data, setData] = useState<EventType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let mounted = true;
    const controller = new AbortController();

    const fetchEvent = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const event = await getEventById(id);
        if (mounted && !controller.signal.aborted) {
          setData(event as EventType);
        }
      } catch (err: any) {
        if (mounted && err.name !== "AbortError") {
          setError("Failed to load event");
          console.error("Error fetching event:", err);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchEvent();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [id]);

  const handleShare = async () => {
    if (!data) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: data.name,
          text: data.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Event link copied to clipboard!");
      }
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("Error sharing:", error);
      }
    }
  };

  const handleDownload = () => {
    if (!data) return;

    const eventInfo = `
    Event: ${data.name}
    Date: ${new Date(data.datetime).toLocaleDateString()}
    Venue: ${data.venue?.name || "N/A"}
    Price: ${data.ticketTypes?.price || 0} EGP
    Available Seats: ${data.availableSeats}
    Description: ${data.description}
    `;

    try {
      const blob = new Blob([eventInfo], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data.name.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const eventStats = data
    ? {
        ticketsSold: (data.seatsAmount || 0) - (data.availableSeats || 0),
        capacityUsed: Math.round(
          (((data.seatsAmount || 0) - (data.availableSeats || 0)) /
            (data.seatsAmount || 1)) *
            100
        ),
        revenue: data.revenue || 0,
      }
    : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-violet-600 font-semibold">
            Loading event details...
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return <div>Loading event...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-red-500 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-lg transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-violet-700 mb-4">
            Event Not Found
          </h2>
          <p className="text-violet-600 mb-6">
            The event you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/dashboard/events")}
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-lg transition-all duration-300"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
      </div>

      <div className="relative p-6">
        <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl shadow-slate-900/10 p-8 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate(-1)}
                className="p-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-700 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
                  {data.emoji} {data.name}
                </h1>
                <p className="text-violet-600 font-medium">
                  Comprehensive event overview and management
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => console.log("Add to favorites")}
                className="p-3 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl hover:bg-white/80 transition-all duration-300 text-red-500 hover:text-red-600"
                title="Add to favorites"
              >
                <Heart className="w-5 h-5" />
              </button>

              <button
                onClick={handleShare}
                className="p-3 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl hover:bg-white/80 transition-all duration-300 text-violet-600 hover:text-violet-700"
                title="Share event"
              >
                <Share2 className="w-5 h-5" />
              </button>

              <button
                onClick={handleDownload}
                className="p-3 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl hover:bg-white/80 transition-all duration-300 text-green-600 hover:text-green-700"
                title="Download details"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl shadow-slate-900/10 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-violet-600 font-semibold text-sm mb-1">
                  TICKET PRICE
                </p>
                <p className="text-2xl font-bold bg-gradient-to-r from-violet-700 to-purple-700 bg-clip-text text-transparent">
                  {data.ticketTypes?.price ?? "N/A"} EGP
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl">
                <Ticket className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl shadow-slate-900/10 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-600 font-semibold text-sm mb-1">
                  AVAILABLE SEATS
                </p>
                <p className="text-2xl font-bold bg-gradient-to-r from-pink-700 to-orange-700 bg-clip-text text-transparent">
                  {data.availableSeats}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl shadow-slate-900/10 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 font-semibold text-sm mb-1">
                  TOTAL CAPACITY
                </p>
                <p className="text-2xl font-bold bg-gradient-to-r from-orange-700 to-violet-700 bg-clip-text text-transparent">
                  {data.seatsAmount}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-500 to-violet-500 rounded-2xl">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl shadow-slate-900/10 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-violet-600 font-semibold text-sm mb-1">
                  POPULARITY
                </p>
                <p className="text-lg font-bold bg-gradient-to-r from-violet-700 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                  {data.popularity?.replace(" Popularity", "") || "N/A"}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-violet-500 via-pink-500 to-orange-500 rounded-2xl">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl shadow-xl shadow-slate-900/10 p-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-700 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-8">
                📋 Event Information
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-violet-600 mb-3">
                    Event Name
                  </label>
                  <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl">
                    <Edit3 className="w-5 h-5 text-violet-500" />
                    <span className="font-semibold text-violet-700">
                      {data.name}
                    </span>
                  </div>
                </div>

                {data.venue && (
                  <div>
                    <label className="block text-sm font-bold text-violet-600 mb-3">
                      Event Venue
                    </label>
                    <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl">
                      <MapPin className="w-5 h-5 text-pink-500" />
                      <span className="font-semibold text-violet-700">
                        {data.venue.name}
                        {data.venue.address && (
                          <span className="text-violet-600 ml-2">
                            -{" "}
                            {typeof data.venue.address === "string"
                              ? data.venue.address
                              : `${data.venue.address.street}, ${data.venue.address.city}`}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-violet-600 mb-3">
                      Event Date
                    </label>
                    <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl">
                      <Calendar className="w-5 h-5 text-orange-500" />
                      <span className="font-semibold text-violet-700">
                        {new Date(data.datetime).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-violet-600 mb-3">
                      Event Time
                    </label>
                    <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl">
                      <Clock className="w-5 h-5 text-violet-500" />
                      <span className="font-semibold text-violet-700">
                        {new Date(data.datetime).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-violet-600 mb-3">
                    Event Description
                  </label>
                  <div className="p-6 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl">
                    <p className="text-violet-700 leading-relaxed font-medium">
                      {data.description}
                    </p>
                  </div>
                </div>

                {data.tags && data.tags.length > 0 && (
                  <div>
                    <label className="block text-sm font-bold text-violet-600 mb-3">
                      Event Tags
                    </label>
                    <div className="p-4 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl">
                      <div className="flex flex-wrap gap-3">
                        {data.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 text-sm font-semibold rounded-xl border border-violet-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl shadow-xl shadow-slate-900/10 p-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-700 via-violet-600 to-pink-600 bg-clip-text text-transparent mb-8">
                🪑 Seat Management
              </h2>
              {data && (
                <SeatsDemo
                />
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl shadow-xl shadow-slate-900/10 p-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-700 via-orange-600 to-violet-700 bg-clip-text text-transparent mb-6 text-center">
                📱 Quick Access QR
              </h2>

              <div className="flex flex-col items-center">
                <div className="p-6 bg-white rounded-2xl shadow-xl border-4 border-white/50 mb-4">
                  <QRCode
                    size={200}
                    value={`${DOMAIN_URL}/checkout/${data._id}`}
                    bgColor="#ffffff"
                    fgColor="#7c3aed"
                  />
                </div>
                <p className="text-sm text-violet-600 font-semibold text-center mb-4">
                  Scan for instant ticket booking
                </p>
                <button
                  onClick={() =>
                    window.open(`${DOMAIN_URL}/checkout/${data._id}`, "_blank")
                  }
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Booking Page
                </button>
              </div>
            </div>

            {/* Revenue Stats */}
            {eventStats && (
              <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl shadow-xl shadow-slate-900/10 p-8">
                <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
                  💰 Revenue Analytics
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-700">
                        Current Revenue
                      </span>
                    </div>
                    <span className="text-xl font-bold text-green-700">
                      {eventStats.revenue.toLocaleString()} EGP
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                    <div className="flex items-center gap-3">
                      <ShoppingCart className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-700">
                        Tickets Sold
                      </span>
                    </div>
                    <span className="text-xl font-bold text-blue-700">
                      {eventStats.ticketsSold}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-purple-700">
                        Capacity Used
                      </span>
                    </div>
                    <span className="text-xl font-bold text-purple-700">
                      {eventStats.capacityUsed}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <button className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3">
                <Edit3 className="w-5 h-5" />
                Edit Event Details
              </button>

              <Link
                to={`/dashboard/attendee-insights/${id}`}
                className="w-full px-6 py-4 bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 hover:from-violet-700 hover:to-orange-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <BarChart3 className="w-5 h-5" />
                View Attendee Insights
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default EventDetails;
