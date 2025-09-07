import React, { useState, useEffect } from "react";
import {
  Ticket,
  Calendar,
  MapPin,
  CreditCard,
  Users,
  Clock,
  AlertCircle,
  Loader2,
  CheckCircle,
  XCircle,
  QrCode,
  Eye,
  Download,
  Star,
  Crown,
  Plus,
  Search,
  Sparkles,
  Mail,
  Copy,
  Check,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthProvider";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";


interface PaymentDetails {
  paymentMethod: string;
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  paymentStatus: "pending" | "completed" | "failed" | "refunded";
}

interface TicketData {
  _id: string;
  event: string;
  user: string;
  ticketType: "general" | "vip";
  seatsNumber: string[];
  price: number;
  quantity: number;
  status: "reserved" | "paid";
  paymentDetails: PaymentDetails;
  qrCode?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  data: TicketData[];
  success: boolean;
  message: string;
}

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export interface TicketInfoDetailsProps {
  ticket: TicketData;
  onClose: () => void;
}


const TicketInfoDetails: React.FC<TicketInfoDetailsProps> = ({
  ticket,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);



  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-amber-500" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const getTicketTypeConfig = (type: string) => {
    switch (type.toLowerCase()) {
      case "vip":
        return {
          gradient: "from-purple-600 via-pink-600 to-red-600",
          icon: <Crown className="w-5 h-5" />,
          label: "VIP EXPERIENCE",
          bg: "bg-gradient-to-br from-purple-50 to-pink-50",
          border: "border-purple-200",
        };
      default:
        return {
          gradient: "from-blue-600 via-indigo-600 to-purple-600",
          icon: <Star className="w-5 h-5" />,
          label: "PREMIUM",
          bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
          border: "border-blue-200",
        };
    }
  };

  const ticketTypeConfig = getTicketTypeConfig(ticket.ticketType);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
        {/* Header with gradient */}
        <div className={`relative p-8 bg-gradient-to-r ${ticketTypeConfig.gradient} text-white`}>
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full hover:bg-white/30 transition-all duration-300"
            >
              <XCircle className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
              {ticketTypeConfig.icon}
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {ticketTypeConfig.label}
              </h2>
              <div className="flex items-center gap-2">
                <code className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-mono border border-white/30">
                  #{ticket._id.slice(-12).toUpperCase()}
                </code>
                <button
                  onClick={() => copyToClipboard(ticket._id)}
                  className="p-1 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <Copy className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Status badges */}
          <div className="flex gap-3">
            <div className={`px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30`}>
              <span className="font-semibold text-sm">
                {ticket.status.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              {getStatusIcon(ticket.paymentDetails.paymentStatus)}
              <span className="font-semibold text-sm capitalize">
                {ticket.paymentDetails.paymentStatus}
              </span>
            </div>
          </div>
        </div>

        <div className="p-8 overflow-y-auto max-h-[60vh]">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* QR Code Section */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 mb-6">
                <div className="bg-white p-4 rounded-xl border-2 border-slate-200 inline-block mb-4">
                  <QRCode
                    size={180}
                    style={{ height: "auto", maxWidth: "180px", width: "180px" }}
                    value={`${window.location.origin}/tickets/${ticket._id}`}
                    fgColor="#1e293b"
                    bgColor="#ffffff"
                  />
                </div>
                <p className="text-sm text-slate-600 font-medium">
                  Scan for entry validation
                </p>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <Sparkles className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-green-700 font-medium">Secure & Verified</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-3 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">Email</span>
                </button>
                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl p-3 hover:from-green-700 hover:to-emerald-700 transition-all duration-300">
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium">Download</span>
                </button>
              </div>
            </div>

            {/* Event Information */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-slate-600" />
                  Event Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Event ID</div>
                    <div className="font-semibold text-slate-800">
                      #{ticket.event.slice(-8).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Purchased</div>
                    <div className="font-semibold text-slate-800">
                      {formatDate(ticket.createdAt)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Seating */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-slate-600" />
                  Your Seats
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {ticket.seatsNumber.map((seat, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-3 text-center border-2 border-slate-200"
                    >
                      <div className="font-bold text-slate-800">{seat}</div>
                      <div className="text-xs text-slate-600">SEAT</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Purchase & Payment */}
            <div className="space-y-6">
              {/* Purchase Summary */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-slate-600" />
                  Purchase Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Quantity</span>
                    <span className="font-semibold">{ticket.quantity} tickets</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Price per ticket</span>
                    <span className="font-semibold">{ticket.price} EGP</span>
                  </div>
                  <div className="border-t border-slate-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800">Total</span>
                      <span className="font-bold text-2xl text-purple-600">
                        {ticket.price} EGP
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-slate-600" />
                  Payment Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Method</span>
                    <span className="font-medium capitalize">
                      {ticket.paymentDetails.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Cardholder</span>
                    <span className="font-medium">{ticket.paymentDetails.cardName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Card</span>
                    <span className="font-medium">
                      •••• {ticket.paymentDetails.cardNumber.slice(-4)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-r from-slate-800 to-slate-700 text-white">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to={`/tickets/${ticket._id}`}
              target="_blank"
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-center text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Open Full Ticket Page
            </Link>
            <button className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300">
              Share Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyTickets: React.FC = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "vip" | "general">("all");
  const [animateIn, setAnimateIn] = useState(false);

  const { token, user } = useAuth();

  const dummyData: TicketData[] = [
    {
      _id: "68b5f8cf462c2920bf464725",
      event: "68b5f72ae5dc6890b5e34e07",
      user: "68a334ca1441b9f5d8c6666e",
      ticketType: "vip",
      seatsNumber: ["A-4", "B-2"],
      price: 100,
      quantity: 2,
      status: "reserved",
      qrCode: `http://localhost:3000/ticket/68b5f8cf462c2920bf464725`,
      paymentDetails: {
        paymentMethod: "card",
        cardName: "G3far Kamal",
        cardNumber: "4848-4848-4848-4848",
        expiryDate: "08/29",
        cvc: "433",
        paymentStatus: "completed",
      },
      createdAt: "2025-09-01T19:49:35.465Z",
      updatedAt: "2025-09-01T19:49:35.465Z",
      __v: 0,
    },
    {
      _id: "68b5f8d5462c2920bf464728",
      event: "68b5f72ae5dc6890b5e34e07",
      user: "68a334ca1441b9f5d8c6666e",
      ticketType: "general",
      seatsNumber: ["C-1", "C-2", "C-3"],
      price: 100,
      quantity: 3,
      status: "paid",
      qrCode: `http://localhost:3000/ticket/68b5f8d5462c2920bf464728`,
      paymentDetails: {
        paymentMethod: "card",
        cardName: "G3far Kamal",
        cardNumber: "4848-4848-4848-4848",
        expiryDate: "08/29",
        cvc: "433",
        paymentStatus: "completed",
      },
      createdAt: "2025-09-01T19:49:41.245Z",
      updatedAt: "2025-09-01T19:49:41.245Z",
      __v: 0,
    },
  ];

  useEffect(() => {
    fetchTickets();
    setTimeout(() => setAnimateIn(true), 100);
  }, []);

  const generateQRCode = (ticketId: string) => {
    const ticketUrl = `http://localhost:3000/ticket/${ticketId}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      ticketUrl
    )}`;
  };

  const handleViewDetails = (ticket: TicketData) => {
    setSelectedTicket(ticket);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedTicket(null);
  };

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/tickets/${user?._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse = await response.json();
      if (result.success) {
        setTickets(result.data);
      } else {
        throw new Error(result.message || "Failed to fetch tickets");
      }
    } catch (err) {
      console.error("Error fetching tickets:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      setTickets(dummyData);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTicketTypeConfig = (type: string) => {
    switch (type.toLowerCase()) {
      case "vip":
        return {
          gradient: "from-purple-600 via-pink-600 to-red-600",
          icon: <Crown className="w-5 h-5" />,
          label: "VIP",
          bg: "bg-gradient-to-br from-purple-50 to-pink-50",
          border: "border-purple-200",
          textColor: "text-purple-800",
        };
      default:
        return {
          gradient: "from-blue-600 via-indigo-600 to-purple-600",
          icon: <Star className="w-5 h-5" />,
          label: "PREMIUM",
          bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
          border: "border-blue-200",
          textColor: "text-blue-800",
        };
    }
  };



  // Filter tickets
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.event.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || ticket.ticketType === filterType;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-pink-600 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Loading Your Tickets</h3>
          <p className="text-slate-600">Please wait while we fetch your tickets...</p>
        </div>
      </div>
    );
  }

  const ticketsWithQR = filteredTickets.map((ticket) => ({
    ...ticket,
    qrCode: ticket.qrCode || generateQRCode(ticket._id),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className={`mb-12 transition-all duration-1000 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              My Digital Tickets
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              All your event tickets in one secure place
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by ticket ID or event..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                />
              </div>
              
              <div className="flex gap-2">
                {["all", "vip", "general"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type as any)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      filterType === type
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>

              <button
                onClick={fetchTickets}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
              >
                <Loader2 className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-amber-800 font-medium">Connection Error</p>
                  <p className="text-amber-700 text-sm">
                    {error}. Showing demo data instead.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tickets Grid */}
        {tickets.length === 0 ? (
          <div className={`text-center py-20 transition-all duration-1000 delay-300 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-12 shadow-xl max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <Ticket className="w-12 h-12 text-slate-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                No Tickets Found
              </h2>
              <p className="text-slate-600 mb-8">
                You haven't purchased any tickets yet. Start exploring events!
              </p>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto">
                <Plus className="w-5 h-5" />
                Browse Events
              </button>
            </div>
          </div>
        ) : (
          <div className={`grid gap-8 md:grid-cols-2 xl:grid-cols-3 transition-all duration-1000 delay-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {ticketsWithQR.map((ticket, index) => {
              const ticketTypeConfig = getTicketTypeConfig(ticket.ticketType);

              return (
                <div
                  key={ticket._id}
                  className="group bg-white/90 backdrop-blur-sm border border-white/50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Card Header with gradient */}
                  <div className={`relative p-6 bg-gradient-to-r ${ticketTypeConfig.gradient} text-white overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                      <div className="text-6xl">{ticket.ticketType === "vip" ? "👑" : "🎫"}</div>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          {ticketTypeConfig.icon}
                          <span className="font-bold text-lg">{ticketTypeConfig.label}</span>
                        </div>
                        <div className="flex gap-2">
                          <div className={`px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30`}>
                            <span className="text-xs font-semibold">
                              {ticket.status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <code className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-mono border border-white/30">
                          #{ticket._id.slice(-8).toUpperCase()}
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    {/* Event Info */}
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-slate-600" />
                        <span className="text-sm font-medium text-slate-800">Event Details</span>
                      </div>
                      <div className="text-xs text-slate-600 mb-1">Event ID</div>
                      <div className="font-semibold text-slate-800">
                        #{ticket.event.slice(-8).toUpperCase()}
                      </div>
                    </div>

                    {/* Seats */}
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-slate-600" />
                        <span className="text-sm font-medium text-slate-800">Seats</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {ticket.seatsNumber.map((seat, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-800"
                          >
                            {seat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price & Quantity */}
                    <div className="flex justify-between items-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4">
                      <div>
                        <div className="text-xs text-slate-600 mb-1">Total Price</div>
                        <div className="text-2xl font-bold text-purple-600">
                          {ticket.price} EGP
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-600 mb-1">Quantity</div>
                        <div className="text-lg font-semibold text-slate-800">
                          {ticket.quantity} {ticket.quantity === 1 ? "ticket" : "tickets"}
                        </div>
                      </div>
                    </div>

                    {/* Purchase Date */}
                    <div className="text-center">
                      <div className="text-xs text-slate-500">
                        Purchased on {formatDate(ticket.createdAt)}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6 bg-gradient-to-r from-slate-100 to-slate-200 border-t border-slate-200">
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleViewDetails(ticket)}
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Details</span>
                      </button>
                      
                      <Link
                        to={`/tickets/${ticket._id}`}
                        target="_blank"
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <QrCode className="w-4 h-4" />
                        <span>QR</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Stats Summary */}
        {tickets.length > 0 && (
          <div className={`mt-12 grid grid-cols-1 md:grid-cols-4 gap-6 transition-all duration-1000 delay-700 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {[
              { 
                label: "Total Tickets", 
                value: tickets.reduce((sum, ticket) => sum + ticket.quantity, 0),
                icon: <Ticket className="w-6 h-6" />,
                color: "from-blue-500 to-indigo-600"
              },
              { 
                label: "VIP Tickets", 
                value: tickets.filter(t => t.ticketType === "vip").reduce((sum, ticket) => sum + ticket.quantity, 0),
                icon: <Crown className="w-6 h-6" />,
                color: "from-purple-500 to-pink-600"
              },
              { 
                label: "Total Spent", 
                value: `$${tickets.reduce((sum, ticket) => sum + (ticket.price * ticket.quantity), 0)}`,
                icon: <CreditCard className="w-6 h-6" />,
                color: "from-green-500 to-emerald-600"
              },
              { 
                label: "Active Events", 
                value: new Set(tickets.map(t => t.event)).size,
                icon: <Calendar className="w-6 h-6" />,
                color: "from-orange-500 to-red-600"
              },
            ].map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl text-white mb-3`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showDetails && selectedTicket && (
        <TicketInfoDetails
          ticket={selectedTicket}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default MyTickets;
