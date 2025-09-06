import {
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  MapPin,
  Ticket,
  Users,
  XCircle,
  Download,
  Share2,
  Star,
  Shield,
  Smartphone,
  Pin,
  Mail,
  Copy,
  Check,
  Sparkles,
  Crown,
  Zap,
} from "lucide-react";
import QRCode from "react-qr-code";
import { useState, useEffect } from "react";

const TicketPage = () => {
  const [copied, setCopied] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const ticket = {
    _id: "68b5f8cf462c2920bf464725",
    event: "68b5f72ae5dc6890b5e34e07",
    eventName: "Summer Music Festival 2025", // Added this line
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
  };

  const eventDetails = {
    name: "Summer Music Festival 2025",
    date: "2025-09-15T20:00:00.000Z",
    venue: {
      name: "Madison Square Garden",
      address: "4 Pennsylvania Plaza, New York, NY 10001",
    },
    category: "Music Concert",
    organizer: "LiveNation Entertainment",
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
    };
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          color: "text-emerald-600",
          bg: "bg-emerald-50",
          border: "border-emerald-200",
        };
      case "pending":
        return {
          icon: <Clock className="w-5 h-5" />,
          color: "text-amber-600",
          bg: "bg-amber-50",
          border: "border-amber-200",
        };
      case "failed":
        return {
          icon: <XCircle className="w-5 h-5" />,
          color: "text-red-600",
          bg: "bg-red-50",
          border: "border-red-200",
        };
      default:
        return {
          icon: <Clock className="w-5 h-5" />,
          color: "text-gray-600",
          bg: "bg-gray-50",
          border: "border-gray-200",
        };
    }
  };

  const getTicketTypeConfig = (type: string) => {
    switch (type.toLowerCase()) {
      case "vip":
        return {
          gradient: "from-purple-600 via-pink-600 to-red-600",
          icon: <Crown className="w-5 h-5" />,
          label: "VIP EXPERIENCE",
          features: [
            "Premium Seating",
            "Fast Track Entry",
            "Complimentary Drinks",
            "VIP Lounge Access",
          ],
        };
      case "premium":
        return {
          gradient: "from-blue-600 via-indigo-600 to-purple-600",
          icon: <Star className="w-5 h-5" />,
          label: "PREMIUM",
          features: ["Great View", "Priority Entry", "Reserved Seating"],
        };
      default:
        return {
          gradient: "from-gray-600 via-slate-600 to-gray-700",
          icon: <Ticket className="w-5 h-5" />,
          label: "STANDARD",
          features: ["General Admission", "Standard Entry"],
        };
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const statusConfig = getStatusConfig(ticket.paymentDetails.paymentStatus);
  const ticketTypeConfig = getTicketTypeConfig(ticket.ticketType);
  const eventDate = formatEventDate(eventDetails.date);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-500"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header Actions */}
        <div
          className={`flex justify-between items-center mb-8 transition-all duration-1000 ${
            animateIn
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }`}
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              {eventDetails.name}
            </h1>

            <p className="text-slate-600 mt-2">
              Your Digital Ticket - Ready for an amazing experience
            </p>
          </div>

          <div className="flex gap-3">
            <button className="p-3 bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl">
              <Download className="w-5 h-5 text-slate-700" />
            </button>
            <button className="p-3 bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl">
              <Share2 className="w-5 h-5 text-slate-700" />
            </button>
            <button className="p-3 bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl">
              <Pin className="w-5 h-5 text-slate-700" />
            </button>
          </div>
        </div>

        {/* Main Ticket Card */}
        <div
          className={`relative transition-all duration-1000 delay-300 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Ticket Container */}
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>

            {/* Top Section - Event Header */}
            <div
              className={`relative p-8 bg-gradient-to-r ${ticketTypeConfig.gradient} text-white overflow-hidden`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 text-6xl opacity-20">
                  🎵
                </div>
                <div className="absolute bottom-4 left-4 text-4xl opacity-20">
                  🎤
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl opacity-10">
                  🎪
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {ticketTypeConfig.icon}
                    <span className="font-bold text-lg tracking-wider">
                      {ticketTypeConfig.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      PREMIUM EXPERIENCE
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
                      {eventDetails.name}
                    </h2>
                    <div className="space-y-2 text-white/90">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{eventDetails.venue.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>By {eventDetails.organizer}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center md:justify-end">
                    <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <div className="text-4xl font-bold">{eventDate.day}</div>
                      <div className="text-sm font-medium opacity-90">
                        {eventDate.month}
                      </div>
                      <div className="text-lg font-semibold mt-2">
                        {eventDate.time}
                      </div>
                      <div className="text-sm opacity-80">
                        {eventDate.weekday}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Stub Separator */}
            <div className="relative">
              {/* Perforated edge effect */}
              <div className="flex justify-center">
                <div className="w-full border-t-2 border-dashed border-gray-300 relative">
                  {/* Circular cutouts */}
                  <div className="absolute left-0 top-0 w-8 h-8 bg-slate-50 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute right-0 top-0 w-8 h-8 bg-slate-50 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </div>
            </div>

            {/* Bottom Section - Ticket Details */}
            <div className="p-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Seating & QR */}
                <div className="space-y-6">
                  {/* Seat Information */}
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-slate-600" />
                      Your Seats
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {ticket.seatsNumber.map((seat, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-xl p-4 text-center border-2 border-slate-200 hover:border-purple-300 transition-colors duration-300"
                        >
                          <div className="text-2xl font-bold text-slate-800">
                            {seat}
                          </div>
                          <div className="text-xs text-slate-600 mt-1">
                            SEAT
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 text-center">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center justify-center gap-2">
                      <Smartphone className="w-5 h-5 text-slate-600" />
                      Entry Code
                    </h3>
                    <div className="bg-white p-4 rounded-xl border-2 border-slate-200 inline-block">
                      <QRCode
                        size={140}
                        style={{
                          height: "auto",
                          maxWidth: "140px",
                          width: "140px",
                        }}
                        value={`${window.location.origin}/tickets/${ticket._id}`}
                        fgColor="#1e293b"
                        bgColor="#ffffff"
                      />
                    </div>
                    <p className="text-xs text-slate-600 mt-3">
                      Present this QR code at the venue entrance
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-green-700 font-medium">
                        Secure & Verified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Middle Column - Event Details */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-slate-600" />
                      Event Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-slate-600 mb-1">
                          Venue Address
                        </div>
                        <div className="font-medium text-slate-800">
                          {eventDetails.venue.address}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600 mb-1">
                          Category
                        </div>
                        <div className="font-medium text-slate-800">
                          {eventDetails.category}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600 mb-1">
                          Ticket ID
                        </div>
                        <div className="flex items-center gap-2">
                          <code className="font-mono text-sm bg-white px-2 py-1 rounded border">
                            #{ticket._id.slice(-12).toUpperCase()}
                          </code>
                          <button
                            onClick={() => copyToClipboard(ticket._id)}
                            className="p-1 hover:bg-white rounded transition-colors duration-200"
                          >
                            {copied ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-slate-600" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* VIP Features */}
                  {ticket.ticketType === "vip" && (
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                      <h3 className="font-bold text-purple-800 mb-4 flex items-center gap-2">
                        <Crown className="w-5 h-5 text-purple-600" />
                        VIP Benefits
                      </h3>
                      <div className="space-y-2">
                        {ticketTypeConfig.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-sm text-purple-800">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Purchase & Payment */}
                <div className="space-y-6">
                  {/* Purchase Summary */}
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <Ticket className="w-5 h-5 text-slate-600" />
                      Purchase Summary
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Quantity</span>
                        <span className="font-semibold text-slate-800">
                          {ticket.quantity} tickets
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Price per ticket</span>
                        <span className="font-semibold text-slate-800">
                          ${ticket.price}
                        </span>
                      </div>
                      <div className="border-t border-slate-200 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-slate-800">
                            Total Amount
                          </span>
                          <span className="font-bold text-2xl text-purple-600">
                            ${ticket.price}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-slate-500 text-center">
                        Purchased on {formatDate(ticket.createdAt)}
                      </div>
                    </div>
                  </div>

                  {/* Payment Status */}
                  <div
                    className={`${statusConfig.bg} ${statusConfig.border} border-2 rounded-2xl p-6`}
                  >
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-slate-600" />
                      Payment Status
                    </h3>
                    <div className="space-y-3">
                      <div
                        className={`flex items-center gap-3 ${statusConfig.color}`}
                      >
                        {statusConfig.icon}
                        <span className="font-semibold capitalize">
                          {ticket.paymentDetails.paymentStatus}
                        </span>
                      </div>
                      <div className="text-sm text-slate-600">
                        <div className="flex justify-between">
                          <span>Method:</span>
                          <span className="font-medium capitalize">
                            {ticket.paymentDetails.paymentMethod}
                          </span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span>Cardholder:</span>
                          <span className="font-medium">
                            {ticket.paymentDetails.cardName}
                          </span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span>Card:</span>
                          <span className="font-medium">
                            •••• {ticket.paymentDetails.cardNumber.slice(-4)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-3 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm font-medium">Email</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl p-3 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm font-medium">Quick Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <p className="text-sm opacity-90">
                    Need help? Contact support at{" "}
                    <a
                      href="mailto:support@ticketing.com"
                      className="text-blue-300 hover:text-blue-200"
                    >
                      support@ticketing.com
                    </a>
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <Shield className="w-4 h-4" />
                  <span>Secure Digital Ticket</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info Cards */}
        <div
          className={`grid md:grid-cols-3 gap-6 mt-8 transition-all duration-1000 delay-500 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Smartphone className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-800">Mobile Ready</h3>
            </div>
            <p className="text-sm text-slate-600">
              Your ticket is stored securely and accessible offline on your
              mobile device.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-800">Secure Entry</h3>
            </div>
            <p className="text-sm text-slate-600">
              Each ticket contains unique security features and QR codes for
              fraud prevention.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-800">Event Reminders</h3>
            </div>
            <p className="text-sm text-slate-600">
              We'll send you timely reminders about your event and any important
              updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
