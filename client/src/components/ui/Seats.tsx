import React, { useState, useCallback } from 'react';
import { ShoppingCart, Check, X, User, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBookingTickets } from '@/contexts/BookingTicketsProvider';

interface EventLocationType {
  name: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface TicketType {
  regular: {
    price: number;
    available: boolean;
  };
  vip?: {
    price: number;
    available: boolean;
  };
  premium?: {
    price: number;
    available: boolean;
  };
}

export interface EventType {
  _id?: string;
  name: string;
  description: string;
  category: string;
  venue: EventLocationType;
  datetime: Date;
  organizer: string;
  emoji: string;
  seatsAmount: number;
  availableSeats: number;
  seatsMap: number[][];
  revenue: number;
  popularity: "High Popularity" | "Medium Popularity" | "Low Popularity";
  ticketTypes: TicketType;
  status: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface SeatsProps {
  event: EventType;
  onSeatsPurchase?: (selectedSeats: { row: number; seat: number }[], totalPrice: number) => void;
}

const Seats: React.FC<SeatsProps> = ({ event}) => {
  const [isProcessing] = useState(false);
  const {setTotalPrice,setSelectedSeats,selectedSeats}=useBookingTickets();
  const navigate = useNavigate();
  
  function handleRedirectPayment(){
    return navigate(`/checkout/${event._id}`)
  }
  
  const getSeatPrice = (row: number) => {
    if (row < 2 && event.ticketTypes.vip) {
      return event.ticketTypes.vip.price;
    }
    if (row < 5 && event.ticketTypes.premium) {
      return event.ticketTypes.premium.price;
    }
    return event.ticketTypes.regular.price;
  };
  
  const getSeatStatus = useCallback((row: number, seat: number) => {
    if (event.seatsMap[row] && event.seatsMap[row][seat] === 1) return 'occupied';
    if (selectedSeats.some(s => s === `${row}-${seat}` && s === `${row}-${seat}`)) return 'selected';
    return 'available';
  }, [event.seatsMap, selectedSeats]);

  const totalPrice = selectedSeats.reduce((total, _) => {
    return total + event.ticketTypes.regular.price;
  }, 0);

  const handleSeatClick = (row: number, seat: number) => {
    const seatStatus = getSeatStatus(row, seat);

    if (seatStatus === "occupied") return;

    if (seatStatus === "selected") {
      setSelectedSeats(prev => prev.filter(s => s !== `${row}-${seat}`));
      setTotalPrice(prev => prev - event.ticketTypes.regular.price);
    } else {
      setSelectedSeats(prev => [...prev, `${row}-${seat}`]);
      setTotalPrice(prev => prev + event.ticketTypes.regular.price);
    }
  };

  const getSeatType = (row: number) => {
    if (row < 2) return 'VIP';
    if (row < 5) return 'Premium';
    return 'Regular';
  };

  const clearSelection = () => {
    setSelectedSeats([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50 p-8">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="bg-white/70 backdrop-blur-xl border-2 border-white/30 rounded-3xl shadow-2xl shadow-slate-900/10 p-8">
          {/* Event Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{event.emoji}</span>
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-700 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                  {event.name}
                </h2>
                <p className="text-violet-600 font-semibold">{event.venue.name}</p>
                <p className="text-purple-500 text-sm">
                  {event.datetime.toLocaleDateString()} at {event.datetime.toLocaleTimeString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-4">
              <span className="px-4 py-2 bg-violet-100 text-violet-800 rounded-full text-sm font-semibold">
                {event.availableSeats} available
              </span>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                event.popularity === 'High Popularity' ? 'bg-red-100 text-red-800' :
                event.popularity === 'Medium Popularity' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {event.popularity}
              </span>
            </div>
          </div>

          {/* Stage */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white text-center py-4 rounded-2xl font-bold text-lg shadow-lg">
              🎭 STAGE
            </div>
          </div>

          {/* Seating Map */}
          <div className="mb-8">
            <div className="flex flex-col items-center gap-3">
              {event.seatsMap.map((row, rowIndex) => (
                <div key={rowIndex} className="flex items-center gap-3">
                  <span className="w-8 text-center text-lg font-bold text-violet-700">
                    {String.fromCharCode(65 + rowIndex)}
                  </span>
                  <div className="flex gap-2">
                    {row.map((_, seatIndex) => {
                      const seatStatus = getSeatStatus(rowIndex, seatIndex);
                      return (
                        <button
                          key={`${rowIndex}-${seatIndex}`}
                          onClick={() => handleSeatClick(rowIndex, seatIndex)}
                          disabled={seatStatus === 'occupied'}
                          className={`w-10 h-10 rounded-lg border-2 transition-all duration-300 flex items-center justify-center text-sm font-bold ${
                            seatStatus === 'occupied'
                              ? 'bg-red-500 border-red-600 text-white cursor-not-allowed'
                              : seatStatus === 'selected'
                              ? 'bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 border-pink-600 text-white transform scale-110 shadow-lg'
                              : 'bg-gradient-to-tr from-pink-100 via-purple-100 to-violet-100 border-violet-200 text-violet-800 hover:from-pink-200 hover:to-violet-200 hover:border-pink-300 cursor-pointer hover:transform hover:scale-105'
                          }`}
                          title={`Row ${String.fromCharCode(65 + rowIndex)}, Seat ${seatIndex + 1} - ${getSeatType(rowIndex)} (${getSeatPrice(rowIndex)} EGP)`}
                        >
                          {seatStatus === 'occupied' ? (
                            <X className="w-5 h-5" />
                          ) : seatStatus === 'selected' ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            seatIndex + 1
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-8 mb-8 p-4 bg-white/50 backdrop-blur-md border border-white/30 rounded-2xl">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-tr from-pink-100 via-purple-100 to-violet-100 border-2 border-violet-200 rounded-lg"></div>
              <span className="text-sm font-medium text-slate-700">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 border-2 border-pink-600 rounded-lg"></div>
              <span className="text-sm font-medium text-slate-700">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-500 border-2 border-red-600 rounded-lg flex items-center justify-center">
                <X className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700">Occupied</span>
            </div>
          </div>

          {/* Selection Summary and Purchase */}
          {selectedSeats.length > 0 ? (
            <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-violet-700 flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Selected Seats ({selectedSeats.length})
                </h3>
                <button
                  onClick={clearSelection}
                  className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition-all duration-200"
                >
                  Clear All
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {selectedSeats.map((_, index) => (
                  <div key={index} className="bg-gradient-to-r from-violet-100 to-purple-100 rounded-xl p-3 border border-violet-200 text-sm">
                    <div className="font-bold text-violet-700">
                      Row {String.fromCharCode(65 + index)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold bg-gradient-to-r from-violet-700 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                  Total: {totalPrice} EGP
                </div>
                <button
                  onClick={()=>{handleRedirectPayment()}}
                  disabled={isProcessing}
                  className={`px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all duration-300 shadow-xl ${
                    isProcessing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 hover:from-violet-700 hover:to-orange-500 text-white shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1'
                  }`}
                >
                  <ShoppingCart className="w-6 h-6" />
                  {isProcessing ? 'Processing...' : 'Purchase Tickets'}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-violet-600">
              <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Select seats to start your booking</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function SeatsDemo() {
  const sampleEvent: EventType = {
    _id: "sample-event-123",
    name: "Summer Music Festival 2025",
    description: "An amazing outdoor music festival featuring top artists",
    category: "Music",
    venue: {
      name: "Central Park Amphitheater",
      address: "123 Park Avenue, New York, NY"
    },
    datetime: new Date("2025-07-15T19:00:00"),
    organizer: "Event Pro Inc.",
    emoji: "🎵",
    seatsAmount: 120,
    availableSeats: 87,
    seatsMap: [
      [0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 1, 0], 
      [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0], 
      [0, 1, 0, 0, 0, 0, 0, 0, 1, 0], 
      [0, 0, 0, 1, 0, 0, 1, 0, 0, 0], 
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0], 
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0], 
      [0, 1, 0, 0, 0, 0, 0, 0, 1, 0] 
    ],
    revenue: 45680,
    popularity: "High Popularity",
    ticketTypes: {
      regular: {
        price: 100,
        available: true
      },
      premium: {
        price: 100,
        available: true
      },
      vip: {
        price: 100,
        available: true
      }
    },
    status: "Active",
    tags: ["music", "outdoor", "festival", "summer"],
    createdAt: new Date("2025-01-15T10:00:00"),
    updatedAt: new Date("2025-09-01T14:30:00")
  };

  const handleSeatsPurchase = (selectedSeats: { row: number; seat: number }[], totalPrice: number) => {
    alert(`Purchase successful!\nSeats: ${selectedSeats.map(s => 
      `${String.fromCharCode(65 + s.row)}${s.seat + 1}`
    ).join(', ')}\nTotal: ${totalPrice} EGP`);
  };

  return (
    <Seats 
      event={sampleEvent} 
      onSeatsPurchase={handleSeatsPurchase}
    />
  );
}
