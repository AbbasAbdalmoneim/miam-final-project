import React from "react";
import {
  Search,
  Filter,
  Users,
  Instagram,
  Facebook,
  Twitter,
  QrCode,
  ArrowLeft,
  TrendingUp,
  MapPin,
  Calendar,
  Clock,
  Share2,
  Heart,
  Eye,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

const AttendeeInsights: React.FC = () => {
  const navigate = useNavigate();


  const ageData = [
    {
      name: "18-24",
      value: 185,
      percentage: "35.4%",
      color: "#7c3aed",
      emoji: "👩‍🎓",
    },
    {
      name: "25-34",
      value: 156,
      percentage: "29.8%",
      color: "#ec4899",
      emoji: "👨‍💼",
    },
    {
      name: "35-44",
      value: 120,
      percentage: "23.0%",
      color: "#f97316",
      emoji: "👩‍💻",
    },
    {
      name: "45+",
      value: 62,
      percentage: "11.8%",
      color: "#10b981",
      emoji: "👨‍🏫",
    },
  ];

  const interestsData = [
    {
      name: "Live Music",
      value: 180,
      percentage: "34.4%",
      color: "#7c3aed",
      emoji: "🎵",
    },
    {
      name: "Innovation",
      value: 140,
      percentage: "26.8%",
      color: "#ec4899",
      emoji: "🚀",
    },
    {
      name: "EDM Music",
      value: 110,
      percentage: "21.0%",
      color: "#f97316",
      emoji: "🎧",
    },
    {
      name: "Food Festivals",
      value: 93,
      percentage: "17.8%",
      color: "#10b981",
      emoji: "🍕",
    },
  ];

  const locationsData = [
    {
      name: "Cairo",
      value: 227,
      color: "#7c3aed",
      percentage: "43.4%",
      flag: "🇪🇬",
    },
    {
      name: "Alexandria",
      value: 123,
      color: "#ec4899",
      percentage: "23.5%",
      flag: "🏛️",
    },
    {
      name: "Giza",
      value: 90,
      color: "#f97316",
      percentage: "17.2%",
      flag: "🏺",
    },
    {
      name: "Luxor",
      value: 58,
      color: "#10b981",
      percentage: "11.1%",
      flag: "🏜️",
    },
    {
      name: "International",
      value: 25,
      color: "#6366f1",
      percentage: "4.8%",
      flag: "🌍",
    },
  ];

  const engagementData = [
    {
      platform: "Instagram Stories",
      count: 8400,
      icon: Instagram,
      color: "from-pink-500 to-purple-500",
      growth: "+12%",
    },
    {
      platform: "Facebook Shares",
      count: 5200,
      icon: Facebook,
      color: "from-blue-500 to-purple-500",
      growth: "+8%",
    },
    {
      platform: "Twitter Mentions",
      count: 2800,
      icon: Twitter,
      color: "from-cyan-500 to-blue-500",
      growth: "+15%",
    },
    {
      platform: "QR Check-ins",
      count: 12500,
      icon: QrCode,
      color: "from-violet-500 to-pink-500",
      growth: "+20%",
    },
  ];

  const timelineData = [
    { time: "6PM", engagement: 120, checkins: 45 },
    { time: "7PM", engagement: 280, checkins: 120 },
    { time: "8PM", engagement: 450, checkins: 200 },
    { time: "9PM", engagement: 380, checkins: 158 },
    { time: "10PM", engagement: 220, checkins: 85 },
  ];

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
                  🎭 Cairo Music Festival 2025
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-violet-600 font-semibold">
                    <MapPin className="w-4 h-4" />
                    Cairo Opera House, Egypt
                  </div>
                  <div className="flex items-center gap-2 text-pink-600 font-semibold">
                    <Calendar className="w-4 h-4" />
                    April 12, 2025
                  </div>
                  <div className="flex items-center gap-2 text-orange-600 font-semibold">
                    <Clock className="w-4 h-4" />
                    6:00PM - 10:30PM
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search insights..."
                  className="pl-12 pr-4 py-3 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl focus:ring-2 focus:ring-violet-500 w-64 font-medium focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 bg-gradient-to-r from-violet-100 to-purple-100 px-6 py-3 rounded-2xl border border-violet-200">
                <Users className="w-5 h-5 text-violet-600" />
                <span className="font-bold text-violet-700">
                  Total Attendees: 523
                </span>
              </div>

              <button className="flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl hover:bg-white/80 transition-all duration-300 font-semibold text-violet-700">
                <Filter className="w-5 h-5" />
                Filter
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl shadow-slate-900/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-violet-600 font-semibold text-sm mb-1">
                  TOTAL ENGAGEMENT
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-violet-700 to-purple-700 bg-clip-text text-transparent">
                  28.9K
                </p>
                <p className="text-green-600 text-sm font-semibold">↗ +24%</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl shadow-slate-900/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-600 font-semibold text-sm mb-1">
                  SOCIAL REACH
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-pink-700 to-orange-700 bg-clip-text text-transparent">
                  147K
                </p>
                <p className="text-green-600 text-sm font-semibold">↗ +18%</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl">
                <Share2 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl shadow-slate-900/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 font-semibold text-sm mb-1">
                  AVG AGE
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-orange-700 to-violet-700 bg-clip-text text-transparent">
                  28.5
                </p>
                <p className="text-violet-600 text-sm font-semibold">Years</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-500 to-violet-500 rounded-2xl">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl shadow-slate-900/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-violet-600 font-semibold text-sm mb-1">
                  SATISFACTION
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-violet-700 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                  4.8
                </p>
                <p className="text-yellow-500 text-sm font-semibold">★★★★★</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-violet-500 via-pink-500 to-orange-500 rounded-2xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-xl shadow-slate-900/10">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-700 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-6">
                📈 Real-time Engagement
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timelineData}>
                    <defs>
                      <linearGradient
                        id="engagementGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#7c3aed"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#7c3aed"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="time"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#7c3aed", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#7c3aed", fontSize: 12 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="engagement"
                      stroke="#7c3aed"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#engagementGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-xl shadow-slate-900/10">
                <h2 className="text-xl font-bold bg-gradient-to-r from-violet-700 to-purple-700 bg-clip-text text-transparent mb-6">
                  👥 Age Distribution
                </h2>

                <div className="space-y-4">
                  {ageData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-md rounded-2xl border border-white/30"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{item.emoji}</div>
                        <div>
                          <p className="font-bold text-violet-700">
                            {item.name}
                          </p>
                          <p className="text-sm text-violet-600">
                            {item.percentage}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className="text-2xl font-bold"
                          style={{ color: item.color }}
                        >
                          {item.value}
                        </p>
                        <div
                          className="w-12 h-2 rounded-full"
                          style={{ backgroundColor: `${item.color}40` }}
                        >
                          <div
                            className="h-2 rounded-full"
                            style={{
                              backgroundColor: item.color,
                              width: `${(item.value / 185) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-xl shadow-slate-900/10">
                <h2 className="text-xl font-bold bg-gradient-to-r from-pink-700 to-orange-700 bg-clip-text text-transparent mb-6">
                  ❤️ Top Interests
                </h2>

                <div className="h-48 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={interestsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {interestsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3">
                  {interestsData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-md rounded-xl border border-white/30"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-lg">{item.emoji}</div>
                        <span className="font-semibold text-violet-700">
                          {item.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold" style={{ color: item.color }}>
                          {item.value}
                        </p>
                        <p className="text-xs text-violet-600">
                          {item.percentage}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-xl shadow-slate-900/10">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-700 to-violet-700 bg-clip-text text-transparent mb-6">
                🗺️ Geographic Distribution
              </h2>

              <div className="h-64 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={locationsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#7c3aed", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#7c3aed", fontSize: 12 }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {locationsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-5 gap-4">
                {locationsData.map((item, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-md rounded-2xl border border-white/30"
                  >
                    <div className="text-3xl mb-2">{item.flag}</div>
                    <h3 className="font-bold text-violet-700 text-sm">
                      {item.name}
                    </h3>
                    <p
                      className="text-xl font-bold mb-1"
                      style={{ color: item.color }}
                    >
                      {item.value}
                    </p>
                    <p className="text-xs text-violet-600">{item.percentage}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-xl shadow-slate-900/10">
              <h2 className="text-xl font-bold bg-gradient-to-r from-violet-700 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-6">
                📱 Social Media Reach
              </h2>

              <div className="space-y-4">
                {engagementData.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={index}
                      className={`p-4 bg-gradient-to-r ${item.color} rounded-2xl text-white shadow-xl hover:scale-105 transition-all duration-300`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-6 h-6" />
                          <div>
                            <p className="font-bold">{item.platform}</p>
                            <p className="text-sm opacity-90">{item.growth}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">
                            {item.count.toLocaleString()}
                          </p>
                          <p className="text-sm opacity-90">interactions</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-violet-100 to-purple-100 rounded-2xl text-center border border-violet-200">
                <p className="text-sm text-violet-600 font-semibold">
                  TOTAL SOCIAL REACH
                </p>
                <p className="text-3xl font-bold bg-gradient-to-r from-violet-700 to-purple-700 bg-clip-text text-transparent">
                  28,900
                </p>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-xl shadow-slate-900/10">
              <h2 className="text-xl font-bold bg-gradient-to-r from-pink-700 via-orange-600 to-violet-700 bg-clip-text text-transparent mb-6 text-center">
                📱 Quick Access QR
              </h2>

              <div className="flex flex-col items-center">
                <div className="p-6 bg-white rounded-2xl shadow-xl border-4 border-white/50 mb-4">
                  <QRCode
                    size={180}
                    value="https://yourevent.com/cairo-music-festival-2025"
                    bgColor="#ffffff"
                    fgColor="#7c3aed"
                  />
                </div>
                <p className="text-sm text-violet-600 font-semibold text-center">
                  Scan for event details & tickets
                </p>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-xl shadow-slate-900/10">
              <h2 className="text-xl font-bold bg-gradient-to-r from-orange-700 to-violet-700 bg-clip-text text-transparent mb-6">
                🌟 Event Highlights
              </h2>

              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500 rounded-xl">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-green-700">
                        Peak Engagement
                      </p>
                      <p className="text-sm text-green-600">
                        8:00 PM - Main Performance
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500 rounded-xl">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-blue-700">Most Viewed</p>
                      <p className="text-sm text-blue-600">
                        Opening Ceremony Video
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500 rounded-xl">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-purple-700">Most Liked</p>
                      <p className="text-sm text-purple-600">
                        Artist Meet & Greet
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendeeInsights;
