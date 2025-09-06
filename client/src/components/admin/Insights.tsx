import React, { useState } from "react";
import {
  Users,
  Calendar,
  DollarSign,
  Star,
  Target,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Seats from "../ui/Seats";

interface Event {
  id: number;
  name: string;
  date: string;
  emoji: string;
  bgColor: string;
}

const Insights: React.FC = () => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<"daily" | "weekly" | "monthly">("weekly");

  const upcomingEvents: Event[] = [
    { id: 1, name: "Cynosure Festival", date: "24 March 2025", emoji: "🎭", bgColor: "from-violet-500 to-purple-500" },
    { id: 2, name: "Nightor Festival", date: "30 March 2025", emoji: "🌙", bgColor: "from-purple-500 to-pink-500" },
    { id: 3, name: "Cyndrax Festival", date: "03 April 2025", emoji: "🎪", bgColor: "from-pink-500 to-orange-500" },
    { id: 4, name: "Hyper Festival", date: "10 April 2025", emoji: "⚡", bgColor: "from-orange-500 to-violet-500" },
    { id: 5, name: "EDM Festival", date: "15 April 2025", emoji: "🎵", bgColor: "from-violet-500 to-pink-500" },
  ];

 
  const revenueData = [
    { x: 50, y: 120, value: 45000, change: 12.5, period: "Week 1" },
    { x: 120, y: 80, value: 62000, change: 24.8, period: "Week 2" },
    { x: 190, y: 150, value: 38000, change: -15.2, period: "Week 3" },
    { x: 260, y: 60, value: 78000, change: 35.7, period: "Week 4" },
    { x: 330, y: 100, value: 55000, change: 18.3, period: "Week 5" },
    { x: 400, y: 90, value: 68000, change: 28.9, period: "Week 6" },
  ];

  
  const engagementData = [
    { name: "Live Music Events", value: 450, color: "#7c3aed", percentage: 35.2, trend: "up" },
    { name: "Cultural Festivals", value: 320, color: "#ec4899", percentage: 25.1, trend: "up" },
    { name: "Food & Dining", value: 280, color: "#f97316", percentage: 21.9, trend: "down" },
    { name: "Sports Events", value: 180, color: "#10b981", percentage: 14.1, trend: "up" },
    { name: "Workshops", value: 50, color: "#6366f1", percentage: 3.9, trend: "down" },
  ];

  const generatePath = (data: typeof revenueData) =>
    data.reduce((path, point, index) => {
      const command = index === 0 ? "M" : "L";
      return `${path} ${command} ${point.x} ${point.y}`;
    }, "");

 
  const LineChart = () => (
    <div className="h-80 relative">
      <svg width="100%" height="100%" viewBox="0 0 450 200" className="overflow-visible">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.05" />
          </linearGradient>
        </defs>

      
        <path
          d={`${generatePath(revenueData)} L 400 200 L 50 200 Z`}
          fill="url(#areaGradient)"
          className="animate-pulse"
        />

       
        <path
          d={generatePath(revenueData)}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-lg"
        />

        
        {revenueData.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r={hoveredPoint === index ? "8" : "6"}
              fill="white"
              stroke="#7c3aed"
              strokeWidth="3"
              className="cursor-pointer transition-all duration-300 drop-shadow-lg hover:drop-shadow-2xl"
              onMouseEnter={() => setHoveredPoint(index)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
            
          
            <text
              x={point.x}
              y={point.y - 20}
              textAnchor="middle"
              className="fill-violet-700 font-bold text-sm"
            >
              {(point.value / 1000).toFixed(0)}K EGP
            </text>

            <text
              x={point.x}
              y={point.y - 5}
              textAnchor="middle"
              className={`font-bold text-xs ${point.change > 0 ? 'fill-green-600' : 'fill-red-600'}`}
            >
              {point.change > 0 ? '+' : ''}{point.change}%
            </text>
          </g>
        ))}

        {hoveredPoint !== null && (
          <g>
            <rect
              x={revenueData[hoveredPoint].x - 60}
              y={revenueData[hoveredPoint].y - 80}
              width="120"
              height="50"
              rx="8"
              fill="rgba(124, 58, 237, 0.95)"
              className="drop-shadow-xl"
            />
            <text
              x={revenueData[hoveredPoint].x}
              y={revenueData[hoveredPoint].y - 60}
              textAnchor="middle"
              className="fill-white text-sm font-bold"
            >
              {revenueData[hoveredPoint].period}
            </text>
            <text
              x={revenueData[hoveredPoint].x}
              y={revenueData[hoveredPoint].y - 40}
              textAnchor="middle"
              className="fill-white text-lg font-bold"
            >
              {revenueData[hoveredPoint].value.toLocaleString()} EGP
            </text>
          </g>
        )}
      </svg>
    </div>
  );


  const DoughnutChart = () => {
    const total = engagementData.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;
    const radius = 85;
    const innerRadius = 60;
    const centerX = 120;
    const centerY = 120;

    const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
      const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
      };
    };

    const createArcPath = (startAngle: number, endAngle: number, outerR: number, innerR: number) => {
      const start = polarToCartesian(centerX, centerY, outerR, endAngle);
      const end = polarToCartesian(centerX, centerY, outerR, startAngle);
      const innerStart = polarToCartesian(centerX, centerY, innerR, endAngle);
      const innerEnd = polarToCartesian(centerX, centerY, innerR, startAngle);
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

      return [
        "M", start.x, start.y,
        "A", outerR, outerR, 0, largeArcFlag, 0, end.x, end.y,
        "L", innerEnd.x, innerEnd.y,
        "A", innerR, innerR, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
        "Z",
      ].join(" ");
    };

    return (
      <div className="relative">
        <div className="flex justify-center mb-6">
          <svg width="240" height="240" className="overflow-visible">
            {engagementData.map((segment, index) => {
              const percentage = (segment.value / total) * 100;
              const startAngle = cumulativePercentage * 3.6;
              const endAngle = (cumulativePercentage + percentage) * 3.6;
              cumulativePercentage += percentage;

              return (
                <path
                  key={index}
                  d={createArcPath(startAngle, endAngle, radius, innerRadius)}
                  fill={segment.color}
                  className={`cursor-pointer transition-all duration-300 hover:opacity-80 ${
                    hoveredSegment === index ? "drop-shadow-2xl scale-105" : "drop-shadow-lg"
                  }`}
                  onMouseEnter={() => setHoveredSegment(index)}
                  onMouseLeave={() => setHoveredSegment(null)}
                />
              );
            })}


            <circle cx={centerX} cy={centerY} r={innerRadius - 5} fill="white" className="drop-shadow-lg" />
            <text x={centerX} y={centerY - 5} textAnchor="middle" className="fill-violet-700 text-2xl font-bold">
              {total.toLocaleString()}
            </text>
            <text x={centerX} y={centerY + 15} textAnchor="middle" className="fill-violet-600 text-sm font-semibold">
              Total Events
            </text>
          </svg>
        </div>

     
        <div className="space-y-3">
          {engagementData.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-md rounded-xl border border-white/30">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="font-semibold text-violet-700 text-sm">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-violet-700">{item.value}</span>
                <span className="text-xs text-violet-600">({item.percentage}%)</span>
                {item.trend === "up" ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

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
            Analytics Dashboard
          </h1>
          <p className="text-violet-600 text-lg font-medium">
            Comprehensive insights into your event performance and user engagement
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl shadow-slate-900/10 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-violet-600 font-semibold text-sm mb-1">TOTAL EVENTS</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-violet-700 to-purple-700 bg-clip-text text-transparent">28</p>
                <p className="text-green-600 text-sm font-semibold flex items-center gap-1">
                  <ArrowUpRight className="w-4 h-4" />
                  +12% vs last month
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl">
                <Calendar className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl shadow-slate-900/10 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-600 font-semibold text-sm mb-1">TOTAL BOOKINGS</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-pink-700 to-orange-700 bg-clip-text text-transparent">27,598</p>
                <p className="text-green-600 text-sm font-semibold flex items-center gap-1">
                  <ArrowUpRight className="w-4 h-4" />
                  +24% vs last month
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl shadow-slate-900/10 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 font-semibold text-sm mb-1">REVENUE</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-orange-700 to-violet-700 bg-clip-text text-transparent">623.5K</p>
                <p className="text-green-600 text-sm font-semibold flex items-center gap-1">
                  <ArrowUpRight className="w-4 h-4" />
                  +18% vs last month
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-orange-500 to-violet-500 rounded-2xl">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-6 shadow-xl shadow-slate-900/10 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-violet-600 font-semibold text-sm mb-1">AVG RATING</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-violet-700 via-pink-600 to-orange-600 bg-clip-text text-transparent">4.8</p>
                <p className="text-yellow-500 text-sm font-semibold flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  Excellent feedback
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-violet-500 via-pink-500 to-orange-500 rounded-2xl">
                <Target className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
   
          <div className="xl:col-span-2 bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-xl shadow-slate-900/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-700 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
                  📈 Revenue Analytics
                </h2>
                <p className="text-violet-600 font-medium">Weekly performance overview</p>
              </div>

              <div className="flex bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl p-1">
                {(["daily", "weekly", "monthly"] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      selectedPeriod === period
                        ? "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-md"
                        : "text-violet-600 hover:bg-white/50"
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <LineChart />

            <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-white/30">
              <div className="text-center">
                <p className="text-sm font-semibold text-violet-600 mb-1">Total Revenue</p>
                <p className="text-xl font-bold bg-gradient-to-r from-violet-700 to-purple-700 bg-clip-text text-transparent">
                  346K EGP
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-pink-600 mb-1">Avg Per Event</p>
                <p className="text-xl font-bold bg-gradient-to-r from-pink-700 to-orange-700 bg-clip-text text-transparent">
                  57.7K EGP
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-orange-600 mb-1">Growth Rate</p>
                <p className="text-xl font-bold bg-gradient-to-r from-orange-700 to-violet-700 bg-clip-text text-transparent">
                  +24.8%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-xl shadow-slate-900/10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-700 via-orange-600 to-violet-700 bg-clip-text text-transparent mb-2">
                🎯 Event Categories
              </h2>
              <p className="text-violet-600 font-medium">Distribution by type</p>
            </div>

            <DoughnutChart />
          </div>
        </div>


        <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-xl shadow-slate-900/10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-700 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              🎪 Upcoming Events
            </h2>
            <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-lg transition-all duration-300">
              View All Events
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="text-center p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white/30 hover:scale-105 transition-all duration-300">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${event.bgColor} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                  {event.emoji}
                </div>
                <h3 className="font-bold text-violet-700 mb-2">{event.name}</h3>
                <p className="text-sm text-violet-600">{event.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-xl shadow-slate-900/10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-700 via-violet-600 to-pink-600 bg-clip-text text-transparent mb-2">
              🪑 Seat Management System
            </h2>
            <p className="text-violet-600 font-medium">Configure and manage event seating arrangements</p>
          </div>

          <Seats
           
            
          />
        </div>
      </div>
    </div>
  );
};

export default Insights;
