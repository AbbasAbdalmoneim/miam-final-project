import {
  Calendar,
  Clock,
  MapPin,
  MoreHorizontal,
  ArrowRight,
  Edit3,
  Trash2,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";
import type { EventType } from "@/lib/types";
import { useState } from "react";
import { Card } from "./card";
import { Button } from "./button";
import { useAuth } from "@/contexts/AuthProvider";

const EventCard = ({ event }: { event: EventType; isAdmin?: boolean }) => {
  const eventTime = new Date(event.datetime);
  const eventDate = new Date(event.datetime);
  const [openMenu, setOpenMenu] = useState(false);
  const { isAdmin } = useAuth();

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} EGP`;
  };

  const getStatusConfig = () => {
    if (event.availableSeats === 0) {
      return { label: "Sold Out", bg: "bg-red-100", text: "text-red-700", border: "border-red-200" };
    } else if (event.availableSeats < event.seatsAmount * 0.2) {
      return { label: "Few Left", bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200" };
    } else {
      return { label: "Available", bg: "bg-green-100", text: "text-green-700", border: "border-green-200" };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="group relative bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-2xl border">
            {event.emoji}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 text-lg leading-tight truncate group-hover:text-blue-600 transition-colors">
              {event.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{event.category}</p>
            {event.organizer && (
              <p className="text-xs text-gray-400 mt-1">by {event.organizer}</p>
            )}
          </div>
        </div>
        
        {isAdmin && (
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        )}
      </div>

      {openMenu && <ActionMenu setOpenMenu={setOpenMenu} />}


      <div className="space-y-3 mb-6">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
          <span className="text-sm">{event.venue?.name || "Venue TBA"}</span>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span>{eventDate.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-gray-400" />
            <span>{eventTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-lg font-semibold text-green-600">
            {formatCurrency(event?.ticketTypes?.price || 0)}
          </div>
          <div className="text-xs text-gray-500">Price</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-orange-600">
            {event.availableSeats}
          </div>
          <div className="text-xs text-gray-500">Available</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-blue-600">
            {event.seatsAmount - event.availableSeats}
          </div>
          <div className="text-xs text-gray-500">Sold</div>
        </div>
      </div>


      <div className="flex justify-end">
        <Link
          to={isAdmin ? `${event._id}` : `/event/${event._id}`}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>


      <div className="absolute top-4 right-4">
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} border`}>
          {statusConfig.label}
        </span>
      </div>
    </div>
  );
};

export default EventCard;

function ActionMenu({ setOpenMenu }: { setOpenMenu: (open: boolean) => void }) {
  return (
    <Card className="absolute top-16 right-0 w-48 p-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
      <div className="space-y-1">
        <Button className="w-full flex items-center justify-start space-x-3 px-4 py-2 hover:bg-gray-50 text-gray-700 border-0 rounded-lg transition-colors">
          <Edit3 className="w-4 h-4" />
          <span>Update Event</span>
        </Button>
        
        <Button className="w-full flex items-center justify-start space-x-3 px-4 py-2 hover:bg-red-50 text-red-600 border-0 rounded-lg transition-colors">
          <Trash2 className="w-4 h-4" />
          <span>Delete Event</span>
        </Button>
        
        <div className="border-t border-gray-100 pt-1 mt-1">
          <Button
            onClick={() => setOpenMenu(false)}
            className="w-full flex items-center justify-start space-x-3 px-4 py-2 hover:bg-gray-50 text-gray-500 border-0 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
