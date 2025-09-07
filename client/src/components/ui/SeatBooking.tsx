import { createContext, useContext, useState } from "react";

export interface Seat {
  id: number;
  number: string;
  status: "available" | "reserved" | "paid";
}

export interface BookingContextType {
  seats: Seat[][];
  selectedSeats: string[];
  setSelectedSeats: React.Dispatch<React.SetStateAction<string[]>>;
  getSeatClassName: (seat: Seat, rowIndex: number, seatIndex: number) => string;
  getTotalPrice: () => number;
  getSelectedSeatCount: () => number;
  handleSeatClick: (rowIndex: number, seatIndex: number) => void;
  initializeSeats: (seatData: Seat[][]) => void; 
}

const BookingTicketsContext = createContext<BookingContextType | undefined>(
  undefined
);

export const useBookingTickets = () => {
  const context = useContext(BookingTicketsContext);
  if (!context) {
    throw new Error(
      "useBookingTickets must be used within a BookingTicketsProvider"
    );
  }
  return context;
};

export const BookingTicketsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [seats, setSeats] = useState<Seat[][]>([
    [
      { id: 1, number: "1", status: "available" },
      { id: 2, number: "2", status: "paid" },
      { id: 3, number: "3", status: "available" },
      { id: 4, number: "4", status: "available" }
    ],
    [
      { id: 5, number: "1", status: "available" },
      { id: 6, number: "2", status: "available" },
      { id: 7, number: "3", status: "reserved" },
      { id: 8, number: "4", status: "available" },
      { id: 9, number: "5", status: "available" },
      { id: 10, number: "6", status: "available" }
    ],
    [
      { id: 11, number: "1", status: "available" },
      { id: 12, number: "2", status: "paid" },
      { id: 13, number: "3", status: "available" },
      { id: 14, number: "4", status: "reserved" },
      { id: 15, number: "5", status: "available" },
      { id: 16, number: "6", status: "available" }
    ]
  ]);
  
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);


  const initializeSeats = (seatData: Seat[][]) => {
    setSeats(seatData);
  };

  const getSeatClassName = (
    seat: Seat,
    rowIndex: number,
    seatIndex: number
  ) => {
    const baseClasses = "w-8 h-8 rounded text-xs font-semibold transition-all duration-200 border-2";
    
    if (seat.status === "paid")
      return `${baseClasses} bg-purple-600 text-white cursor-not-allowed border-purple-700`;
    if (seat.status === "reserved")
      return `${baseClasses} bg-purple-400 text-white cursor-not-allowed border-purple-500`;
    
    const seatKey = `${rowIndex}-${seatIndex}`;
    if (selectedSeats.includes(seatKey)) 
      return `${baseClasses} bg-green-500 text-white border-green-600 transform scale-110`;
    
    return `${baseClasses} bg-gray-300 text-gray-800 hover:bg-green-200 border-gray-400 cursor-pointer hover:scale-105`;
  };

  const getTotalPrice = () => {

    return selectedSeats.length * 50;
  };

  const getSelectedSeatCount = () => selectedSeats.length;

  const handleSeatClick = (rowIndex: number, seatIndex: number) => {

    if (!seats[rowIndex] || !seats[rowIndex][seatIndex]) {
      console.error("Invalid seat position");
      return;
    }

    const seat = seats[rowIndex][seatIndex];
    if (seat.status === "paid" || seat.status === "reserved") {
      console.log("Seat is not available");
      return;
    }

    const seatKey = `${rowIndex}-${seatIndex}`;
    console.log(`Toggling seat: ${seatKey}`);
    
    setSelectedSeats((prev) => {
      const newSelection = prev.includes(seatKey)
        ? prev.filter((key) => key !== seatKey)
        : [...prev, seatKey];
      
      console.log("Selected seats updated:", newSelection);
      return newSelection;
    });
  };

  return (
    <BookingTicketsContext.Provider
      value={{
        seats,
        selectedSeats,
        setSelectedSeats,
        getSeatClassName,
        getTotalPrice,
        getSelectedSeatCount,
        handleSeatClick,
        initializeSeats,
      }}
    >
      {children}
    </BookingTicketsContext.Provider>
  );
};

import { useNavigate } from "react-router-dom";

const SeatBooking = () => {
  const navigate = useNavigate();
  const {
    seats,
    selectedSeats,
    getSeatClassName,
    getTotalPrice,
    getSelectedSeatCount,
    handleSeatClick,
  } = useBookingTickets();

 
  const handleConfirmBooking = () => {
    console.log("Confirm booking clicked");
    console.log("Selected seats:", selectedSeats);
    console.log("Total price:", getTotalPrice());
    
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat before booking");
      return;
    }


    const bookingData = {
      selectedSeats,
      totalPrice: getTotalPrice(),
      seatCount: getSelectedSeatCount(),
    };
    
 
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    
    console.log("Navigating to payment with data:", bookingData);
    
 
    try {
      navigate("/payment", { 
        state: bookingData 
      });
    } catch (error) {
      console.error("Navigation failed:", error);
 
      navigate("/payment");
    }
  };


  console.log("SeatBooking render - Selected seats:", selectedSeats);
  console.log("SeatBooking render - Total seats:", seats.flat().length);

  return (
    <div className="fixed left-0 top-0 w-full min-h-screen bg-black/90 z-40">
      <div className="min-h-screen fixed top-0 right-0 w-96 bg-white rounded-lg py-10 px-8 shadow-lg z-50 overflow-y-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Seat Allocation
        </h2>
        
        {/* Legend */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-purple-600"></div>
            <span className="text-xs text-gray-600">Paid</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-purple-400"></div>
            <span className="text-xs text-gray-600">Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-300"></div>
            <span className="text-xs text-gray-600">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span className="text-xs text-gray-600">Selected</span>
          </div>
        </div>

        {/* Stage */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gray-800 text-white px-8 py-2 rounded-lg">
            STAGE
          </div>
        </div>

        {/* Seating Chart */}
        <div className="space-y-3 mb-8">
          {seats.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-2 items-center">
              <div className="w-6 flex items-center justify-center text-sm font-semibold text-gray-600">
                {String.fromCharCode(65 + rowIndex)}
              </div>
              <div className="flex gap-1">
                {row.map((seat, seatIndex) => (
                  <button
                    key={seat.id}
                    onClick={() => {
                      console.log(`Seat clicked: Row ${rowIndex}, Seat ${seatIndex}, Status: ${seat.status}`);
                      handleSeatClick(rowIndex, seatIndex);
                    }}
                    className={getSeatClassName(seat, rowIndex, seatIndex)}
                    disabled={seat.status === "paid" || seat.status === "reserved"}
                    title={`Seat ${String.fromCharCode(65 + rowIndex)}${seat.number} - ${seat.status}`}
                  >
                    {seat.number}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Booking Summary */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold text-gray-800">
                Selected Seats: {getSelectedSeatCount()}
              </span>
              <span className="text-2xl font-bold text-purple-600">
                ${getTotalPrice()}
              </span>
            </div>
            
            {selectedSeats.length > 0 && (
              <div className="text-sm text-gray-600">
                Seats: {selectedSeats.map((seatKey, index) => {
                  const [rowIndex, seatIndex] = seatKey.split("-").map(Number);
                  const rowLetter = String.fromCharCode(65 + rowIndex);
                  const seatNumber = seats[rowIndex]?.[seatIndex]?.number || "?";
                  return `${rowLetter}${seatNumber}${index < selectedSeats.length - 1 ? ", " : ""}`;
                })}
              </div>
            )}
          </div>

          <button
            onClick={handleConfirmBooking}
            disabled={selectedSeats.length === 0}
            className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 text-lg ${
              selectedSeats.length > 0
                ? "bg-purple-600 text-white hover:bg-purple-700 transform hover:scale-105 shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {selectedSeats.length > 0
              ? `Book ${getSelectedSeatCount()} Seat${getSelectedSeatCount() > 1 ? 's' : ''} - $${getTotalPrice()}`
              : "Select Seats to Book"}
          </button>
        </div>
        
        {/* Debug Info (remove in production) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg text-xs">
            <div>Debug Info:</div>
            <div>Total seats: {seats.flat().length}</div>
            <div>Available seats: {seats.flat().filter(s => s.status === 'available').length}</div>
            <div>Selected: {JSON.stringify(selectedSeats)}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatBooking;
